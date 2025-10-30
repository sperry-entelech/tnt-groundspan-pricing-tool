'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddressAutocomplete from '../booking/AddressAutocomplete';
import { calculatePrice, compareServiceTypes, DetailedBreakdown } from '@/lib/pricing-calculator';
import { VEHICLES } from '@/config/vehicles';
import { AIRPORTS } from '@/config/airports';
import { Platform, ServiceType, QuoteResult, Address } from '@/types/pricing';
import { format } from 'date-fns';

interface QuoteFormData {
  vehicleId: string;
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  pickupTime: string;
  hours?: number;
  passengers: number;
  airport?: string;
}

interface QuoteCalculatorProps {
  platform?: Platform;
  onQuoteGenerated?: (quote: QuoteResult) => void;
}

export default function QuoteCalculator({
  platform = 'retail',
  onQuoteGenerated,
}: QuoteCalculatorProps) {
  const [pickupAddress, setPickupAddress] = useState<Address | undefined>();
  const [dropoffAddress, setDropoffAddress] = useState<Address | undefined>();
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [comparison, setComparison] = useState<{
    hourly: DetailedBreakdown;
    pointToPoint: DetailedBreakdown;
    airport?: DetailedBreakdown;
    savings?: number;
    recommended: ServiceType;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      vehicleId: 'sedan',
      serviceType: 'hourly',
      passengers: 1,
      hours: 3,
    },
  });

  const serviceType = watch('serviceType');
  const vehicleId = watch('vehicleId');
  const selectedVehicle = VEHICLES.find((v) => v.id === vehicleId);

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    try {
      const serviceDate = new Date(`${data.pickupDate}T${data.pickupTime}`);
      const bookingDate = new Date();

      // Calculate the requested quote
      const result = calculatePrice({
        vehicleId: data.vehicleId,
        platform,
        serviceType: data.serviceType,
        serviceDate,
        bookingDate,
        hours: data.hours,
        pickupTime: data.pickupTime,
        airportCode: data.airport,
        zoneId: pickupAddress?.zone,
      });

      setQuote(result);

      // If hourly or point-to-point, calculate both for comparison
      if (data.serviceType === 'hourly' || data.serviceType === 'point-to-point') {
        const comp = compareServiceTypes({
          vehicleId: data.vehicleId,
          platform,
          serviceDate,
          bookingDate,
          estimatedHours: data.hours || 3,
          pickupTime: data.pickupTime,
        });
        setComparison(comp);
      } else {
        setComparison(null);
      }

      if (result) {
        onQuoteGenerated?.(result);
      }
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

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Service Type Selection */}
        <div className="bg-black/40 border border-tnt-silver/20 p-8">
          <div>
            <h3 className="text-2xl font-light tracking-tight text-white">Select Service Type</h3>
            <div className="w-12 h-px bg-tnt-red mt-2"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {['hourly', 'point-to-point', 'airport'].map((type) => (
              <label
                key={type}
                className={`bg-black/40 border p-6 cursor-pointer transition-all ${
                  serviceType === type
                    ? 'border-tnt-red/60 bg-black/60'
                    : 'border-tnt-silver/20 hover:border-tnt-silver/40'
                }`}
              >
                <input
                  type="radio"
                  value={type}
                  {...register('serviceType', { required: true })}
                  className="sr-only"
                />
                <div className="text-center">
                  <h4 className="font-light text-white text-lg mb-2">
                    {type === 'point-to-point' ? 'Point-to-Point' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </h4>
                  <p className="text-sm text-tnt-silver/80 font-light">
                    {type === 'hourly' && 'Hourly service with minimum 3 hours'}
                    {type === 'point-to-point' && 'One-way or round trip'}
                    {type === 'airport' && 'Flat rate airport transfers'}
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
              <div className="w-12 h-px bg-tnt-red mt-2"></div>
            </div>
            <a
              href="https://www.tntlimousine.com/fleet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tnt-silver hover:text-tnt-red transition-colors font-light text-sm tracking-wide"
            >
              View Full Fleet →
            </a>
          </div>
          <div className="mt-6">
            <select
              {...register('vehicleId', { required: true })}
              className="w-full bg-black/40 border border-tnt-silver/20 text-white font-light px-4 py-3 focus:outline-none focus:border-tnt-red/60 transition-colors"
            >
              {VEHICLES.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} - {vehicle.capacity} passengers
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-black/40 border border-tnt-silver/20 p-8">
          <div>
            <h3 className="text-2xl font-light tracking-tight text-white">Trip Details</h3>
            <div className="w-12 h-px bg-tnt-red mt-2"></div>
          </div>
          <div className="space-y-6 mt-6">
            {/* Pickup Location */}
            <AddressAutocomplete
              label="Pickup Location"
              placeholder="Enter pickup address..."
              value={watch('pickupLocation') || ''}
              onChange={(addr, full) => {
                setValue('pickupLocation', addr);
                setPickupAddress(full);
              }}
              required
              error={errors.pickupLocation?.message}
            />

            {/* Dropoff Location (not for airport) */}
            {serviceType !== 'airport' && (
              <AddressAutocomplete
                label={serviceType === 'point-to-point' ? 'Dropoff Location' : 'Dropoff Location (Optional)'}
                placeholder="Enter dropoff address..."
                value={watch('dropoffLocation') || ''}
                onChange={(addr, full) => {
                  setValue('dropoffLocation', addr);
                  setDropoffAddress(full);
                }}
                required={serviceType === 'point-to-point'}
              />
            )}

            {/* Airport Selection (airport service only) */}
            {serviceType === 'airport' && (
              <div>
                <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                  Select Airport <span className="text-tnt-red">*</span>
                </label>
                <select
                  {...register('airport', { required: serviceType === 'airport' })}
                  className="input-field"
                >
                  <option value="">Choose airport...</option>
                  {Object.entries(AIRPORTS).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name} ({code})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                  Pickup Date <span className="text-tnt-red">*</span>
                </label>
                <input
                  type="date"
                  {...register('pickupDate', { required: true })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                  Pickup Time <span className="text-tnt-red">*</span>
                </label>
                <input
                  type="time"
                  {...register('pickupTime', { required: true })}
                  className="input-field"
                />
              </div>
            </div>

            {/* Hours (hourly service only) */}
            {serviceType === 'hourly' && (
              <div>
                <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                  Number of Hours <span className="text-tnt-red">*</span>
                </label>
                <input
                  type="number"
                  {...register('hours', {
                    required: serviceType === 'hourly',
                    min: 3,
                    max: 24
                  })}
                  min="3"
                  max="24"
                  className="input-field"
                />
                <p className="text-xs text-tnt-silver/70 mt-2 font-light">Minimum 3 hours required</p>
              </div>
            )}

            {/* Passengers */}
            <div>
              <label className="block text-sm text-tnt-silver tracking-widest uppercase font-light mb-2">
                Number of Passengers <span className="text-tnt-red">*</span>
              </label>
              <input
                type="number"
                {...register('passengers', { required: true, min: 1 })}
                min="1"
                max={selectedVehicle?.capacity || 20}
                className="input-field"
              />
              {selectedVehicle && (
                <p className="text-xs text-tnt-silver/70 mt-2 font-light">
                  Maximum capacity: {selectedVehicle.capacity} passengers
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-lg py-4"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent"></div>
              Calculating...
            </span>
          ) : (
            'Request Quote'
          )}
        </button>
      </form>

      {/* Quote Results */}
      {quote && (
        <div className="mt-12 space-y-8">
          {/* Service Comparison (if applicable) */}
          {comparison && (
            <div className="border border-tnt-red/40 bg-tnt-red/10 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-light tracking-tight text-white">Pricing Recommendation</h3>
                <p className="text-white/80 mt-2 font-light">
                  We compared both service types to find you the best value
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className={`bg-black/60 p-6 border ${
                  comparison.recommended === 'hourly' ? 'border-tnt-red/60' : 'border-tnt-silver/20'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-light text-white text-lg">Hourly Service</h4>
                    {comparison.recommended === 'hourly' && (
                      <span className="text-xs bg-white/90 text-black px-3 py-1 font-light tracking-wide">
                        Best Value
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-light text-white">
                    {formatCurrency(comparison.hourly.breakdown.total)}
                  </p>
                </div>

                <div className={`bg-black/60 p-6 border ${
                  comparison.recommended === 'point-to-point' ? 'border-tnt-red/60' : 'border-tnt-silver/20'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-light text-white text-lg">Point-to-Point</h4>
                    {comparison.recommended === 'point-to-point' && (
                      <span className="text-xs bg-white/90 text-black px-3 py-1 font-light tracking-wide">
                        Best Value
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-light text-white">
                    {formatCurrency(comparison.pointToPoint.breakdown.total)}
                  </p>
                </div>
              </div>

              {comparison.savings && comparison.savings > 0 && (
                <div className="mt-6 bg-white/90 p-4 text-center border border-tnt-silver/20">
                  <p className="text-black font-light tracking-wide">
                    You save {formatCurrency(comparison.savings)} with {comparison.recommended} service
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Main Quote Display */}
          <div className="bg-black/40 border border-tnt-red/40 p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-tnt-silver/20">
              <h3 className="text-2xl font-light tracking-tight text-white">Your Quote</h3>
              <div className="text-right">
                <p className="text-xs text-tnt-silver tracking-widest uppercase font-light mb-2">Total Price</p>
                <p className="text-5xl font-light text-tnt-red">
                  {formatCurrency(quote.breakdown.total)}
                </p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-tnt-silver font-light">Base Rate</span>
                <span className="text-white font-light">{formatCurrency(quote.breakdown.basePrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tnt-silver font-light">Gratuity</span>
                <span className="text-white font-light">{formatCurrency(quote.breakdown.gratuity)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tnt-silver font-light">Fuel Surcharge</span>
                <span className="text-white font-light">{formatCurrency(quote.breakdown.fuelSurcharge)}</span>
              </div>
              {quote.breakdown.mileageCharge > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-tnt-silver font-light">Mileage Charge</span>
                  <span className="text-white font-light">{formatCurrency(quote.breakdown.mileageCharge)}</span>
                </div>
              )}

              {/* Discounts */}
              {quote.breakdown.discounts.length > 0 && (
                <div className="border-t border-tnt-silver/20 pt-4 mt-4 space-y-3">
                  {quote.breakdown.discounts.map((discount, idx) => (
                    <div key={idx} className="flex justify-between items-center text-tnt-red">
                      <span className="font-light">{discount.name}</span>
                      <span className="font-light">-{formatCurrency(discount.value)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Surcharges */}
              {quote.breakdown.surcharges.length > 0 && (
                <div className="border-t border-tnt-silver/20 pt-4 mt-4 space-y-3">
                  {quote.breakdown.surcharges.map((surcharge, idx) => (
                    <div key={idx} className="flex justify-between items-center text-tnt-red">
                      <span className="font-light">{surcharge.name}</span>
                      <span className="font-light">+{formatCurrency(surcharge.value)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center text-xl border-t border-tnt-silver/20 pt-6 mt-6">
                <span className="text-white font-light">Total</span>
                <span className="text-tnt-red font-light text-2xl">{formatCurrency(quote.breakdown.total)}</span>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="mt-8 space-y-4">
              {/* Primary CTA - Book Now */}
              <a
                href={`tel:804-XXX-XXXX`}
                className="btn-primary w-full text-center block"
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
                  href="https://www.tntlimousine.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-tnt-silver px-10 py-4 font-light tracking-widest uppercase text-sm hover:bg-tnt-silver/10 border border-tnt-silver/40 hover:border-tnt-silver transition-all duration-300 text-center block"
                >
                  Email Quote
                </a>
              </div>

              {/* Additional Info */}
              <div className="bg-tnt-dark-grey/50 border border-tnt-silver/20 p-6 mt-6">
                <p className="text-tnt-silver font-light text-sm text-center">
                  Quote valid for 48 hours • Final price subject to confirmation • 24/7 Reservations
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
