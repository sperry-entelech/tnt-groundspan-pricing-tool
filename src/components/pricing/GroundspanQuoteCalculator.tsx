'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { calculatePrice } from '@/lib/pricing-calculator';
import { VEHICLES } from '@/config/vehicles';
import {
  getGroundspanOrigins,
  getGroundspanDestinations,
  GroundspanServiceType,
  GROUNDSPAN_AIRPORTS,
  GROUNDSPAN_ZONES
} from '@/config/groundspan-rates';
import { Platform, QuoteResult } from '@/types/pricing';
import { format } from 'date-fns';

interface GroundspanQuoteFormData {
  vehicleId: string;
  origin: string;
  destination: string;
  groundspanServiceType: GroundspanServiceType;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
}

interface GroundspanQuoteCalculatorProps {
  platform?: Platform;
}

export default function GroundspanQuoteCalculator({
  platform = 'groundspan',
}: GroundspanQuoteCalculatorProps) {
  const [quote, setQuote] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GroundspanQuoteFormData>({
    defaultValues: {
      vehicleId: 'sedan',
      origin: '',
      destination: '',
      groundspanServiceType: 'ground',
      passengers: 1,
    },
  });

  const vehicleId = watch('vehicleId');
  const origin = watch('origin');
  const groundspanServiceType = watch('groundspanServiceType');

  // Update available destinations when origin or vehicle changes
  useEffect(() => {
    if (vehicleId && origin) {
      const destinations = getGroundspanDestinations(vehicleId as any, origin);
      setAvailableDestinations(destinations);
      // Reset destination if it's not in the new list
      const currentDest = watch('destination');
      if (currentDest && !destinations.includes(currentDest)) {
        setValue('destination', '');
      }
    } else {
      setAvailableDestinations([]);
    }
  }, [vehicleId, origin, setValue, watch]);

  const onSubmit = async (data: GroundspanQuoteFormData) => {
    setLoading(true);
    try {
      const serviceDate = new Date(`${data.pickupDate}T${data.pickupTime}`);
      const bookingDate = new Date();

      // Determine service type based on Groundspan service type
      const serviceType = data.groundspanServiceType === 'ground' ? 'hourly' : 'airport';

      // Calculate the quote using route-based pricing
      const result = calculatePrice({
        vehicleId: data.vehicleId as any,
        platform: 'groundspan',
        serviceType: serviceType as any,
        serviceDate,
        bookingDate,
        pickupTime: data.pickupTime,
        groundspanOrigin: data.origin,
        groundspanDestination: data.destination,
        groundspanServiceType: data.groundspanServiceType,
      });

      setQuote(result);
    } catch (error) {
      console.error('Error calculating quote:', error);
      alert('Error calculating quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getLocationDisplay = (location: string) => {
    // Check if it's an airport
    if (GROUNDSPAN_AIRPORTS[location]) {
      return `${GROUNDSPAN_AIRPORTS[location].code} - ${GROUNDSPAN_AIRPORTS[location].name}`;
    }
    // Check if it's a zone
    if (GROUNDSPAN_ZONES[location]) {
      return `${location} (${GROUNDSPAN_ZONES[location]})`;
    }
    return location;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Service Type Selection */}
        <div className="bg-black/40 border border-tnt-silver/20 p-8">
          <div>
            <h3 className="text-2xl font-light tracking-tight text-white">Select Service Type</h3>
            <div className="w-12 h-px bg-groundspan-blue mt-2"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {(['ground', 'arrival', 'departure'] as GroundspanServiceType[]).map((type) => (
              <label
                key={type}
                className={`bg-black/40 border p-6 cursor-pointer transition-all ${
                  groundspanServiceType === type
                    ? 'border-groundspan-blue/60 bg-black/60'
                    : 'border-tnt-silver/20 hover:border-tnt-silver/40'
                }`}
              >
                <input
                  type="radio"
                  value={type}
                  {...register('groundspanServiceType', { required: true })}
                  className="sr-only"
                />
                <div className="text-center">
                  <h4 className="font-light text-white text-lg mb-2">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </h4>
                  <p className="text-sm text-tnt-silver/80 font-light">
                    {type === 'ground' && 'Within-zone transportation'}
                    {type === 'arrival' && 'Airport pickup service'}
                    {type === 'departure' && 'Airport dropoff service'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle Selection */}
        <div className="bg-black/40 border border-tnt-silver/20 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-light tracking-tight text-white">Select Vehicle</h3>
              <div className="w-12 h-px bg-groundspan-blue mt-2"></div>
            </div>
            <a
              href="https://www.tntlimousine.com/fleet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tnt-silver hover:text-groundspan-blue transition-colors font-light text-sm tracking-wide"
            >
              View Full Fleet →
            </a>
          </div>
          <div className="mt-6">
            <select
              {...register('vehicleId', { required: true })}
              className="w-full bg-black/40 border border-tnt-silver/20 text-white font-light px-4 py-3 focus:outline-none focus:border-groundspan-blue/60 transition-colors"
            >
              {VEHICLES.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} - {vehicle.capacity} passengers
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Route Selection */}
        <div className="bg-black/40 border border-tnt-silver/20 p-8">
          <div>
            <h3 className="text-2xl font-light tracking-tight text-white">Route Details</h3>
            <div className="w-12 h-px bg-groundspan-blue mt-2"></div>
          </div>
          <div className="space-y-6 mt-6">
            {/* Origin Selection */}
            <div>
              <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                Origin <span className="text-groundspan-blue">*</span>
              </label>
              <select
                {...register('origin', { required: true })}
                className="input-field focus:border-groundspan-blue/60"
              >
                <option value="">Select origin...</option>
                {vehicleId && getGroundspanOrigins(vehicleId as any).map((orig) => (
                  <option key={orig} value={orig}>
                    {getLocationDisplay(orig)}
                  </option>
                ))}
              </select>
              {errors.origin && (
                <p className="text-tnt-red text-sm mt-1">Origin is required</p>
              )}
            </div>

            {/* Destination Selection */}
            <div>
              <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                Destination <span className="text-groundspan-blue">*</span>
              </label>
              <select
                {...register('destination', { required: true })}
                className="input-field focus:border-groundspan-blue/60"
                disabled={!origin || availableDestinations.length === 0}
              >
                <option value="">Select destination...</option>
                {availableDestinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {getLocationDisplay(dest)}
                  </option>
                ))}
              </select>
              {errors.destination && (
                <p className="text-tnt-red text-sm mt-1">Destination is required</p>
              )}
              {origin && availableDestinations.length === 0 && (
                <p className="text-tnt-silver/60 text-sm mt-1">
                  No routes available for this origin and vehicle combination
                </p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                  Pickup Date <span className="text-groundspan-blue">*</span>
                </label>
                <input
                  type="date"
                  {...register('pickupDate', { required: true })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="input-field focus:border-groundspan-blue/60"
                />
              </div>
              <div>
                <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                  Pickup Time <span className="text-groundspan-blue">*</span>
                </label>
                <input
                  type="time"
                  {...register('pickupTime', { required: true })}
                  className="input-field focus:border-groundspan-blue/60"
                />
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                Number of Passengers <span className="text-groundspan-blue">*</span>
              </label>
              <input
                type="number"
                {...register('passengers', { required: true, min: 1 })}
                min="1"
                className="input-field focus:border-groundspan-blue/60"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full bg-groundspan-blue border-groundspan-blue hover:bg-blue-700 hover:border-blue-700"
        >
          {loading ? 'Calculating...' : 'Calculate Corporate Rate'}
        </button>
      </form>

      {/* Quote Results */}
      {quote && (
        <div className="mt-12 bg-black/40 border border-groundspan-blue/30 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-light text-white tracking-tight">Your Corporate Rate</h2>
              <div className="w-16 h-px bg-groundspan-blue mt-2"></div>
            </div>
            <div className="text-right">
              <p className="text-sm text-tnt-silver font-light tracking-wider uppercase">Total</p>
              <p className="text-4xl font-light text-groundspan-blue">{formatCurrency(quote.total)}</p>
            </div>
          </div>

          {/* Route Details */}
          <div className="bg-tnt-dark-grey/50 border border-tnt-silver/10 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-tnt-silver/60 text-sm tracking-wide uppercase font-light mb-1">Route</p>
                <p className="text-white font-light">
                  {getLocationDisplay(watch('origin'))} → {getLocationDisplay(watch('destination'))}
                </p>
              </div>
              <div>
                <p className="text-tnt-silver/60 text-sm tracking-wide uppercase font-light mb-1">Service Type</p>
                <p className="text-white font-light capitalize">{watch('groundspanServiceType')}</p>
              </div>
              <div>
                <p className="text-tnt-silver/60 text-sm tracking-wide uppercase font-light mb-1">Vehicle</p>
                <p className="text-white font-light">
                  {VEHICLES.find(v => v.id === watch('vehicleId'))?.name}
                </p>
              </div>
              {quote.hours && (
                <div>
                  <p className="text-tnt-silver/60 text-sm tracking-wide uppercase font-light mb-1">
                    Estimated Driver Time
                  </p>
                  <p className="text-white font-light">{quote.hours} {quote.hours === 1 ? 'hour' : 'hours'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-2 border-b border-tnt-silver/10">
              <span className="text-tnt-silver font-light">Base Rate</span>
              <span className="text-white font-light">{formatCurrency(quote.basePrice)}</span>
            </div>
            {quote.gratuity > 0 && (
              <div className="flex justify-between py-2 border-b border-tnt-silver/10">
                <span className="text-tnt-silver font-light">Gratuity</span>
                <span className="text-white font-light">{formatCurrency(quote.gratuity)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 border-t-2 border-groundspan-blue/30">
              <span className="text-white text-lg font-light tracking-wide uppercase">Total</span>
              <span className="text-groundspan-blue text-lg font-light">{formatCurrency(quote.total)}</span>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 space-y-4">
            {/* Primary CTA - Book Now */}
            <a
              href="tel:804-XXX-XXXX"
              className="btn-primary w-full text-center block bg-groundspan-blue border-groundspan-blue hover:bg-blue-700 hover:border-blue-700"
            >
              Call to Book Now (804) XXX-XXXX
            </a>

            {/* Secondary CTAs */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-secondary w-full"
              >
                Modify Quote
              </button>
              <a
                href="mailto:sedan@tntauto.com"
                className="bg-transparent text-tnt-silver px-10 py-4 font-light tracking-widest uppercase text-sm hover:bg-tnt-silver/10 border border-tnt-silver/40 hover:border-tnt-silver transition-all duration-300 text-center block"
              >
                Email Quote
              </a>
            </div>

            {/* Additional Info */}
            <div className="bg-tnt-dark-grey/50 border border-tnt-silver/20 p-6 mt-6">
              <p className="text-tnt-silver font-light text-sm text-center">
                Corporate contract rates • Quote valid for 30 days • Dedicated account management
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
