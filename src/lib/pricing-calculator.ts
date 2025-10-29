/**
 * TNT Limousine Comprehensive Pricing Calculator
 *
 * Data source: TNT GNET Demo HTML files
 * Last updated: 2025-10-28
 *
 * This module provides complete pricing calculation logic for all service types
 * and platforms. It handles:
 * - Hourly service pricing
 * - Point-to-point pricing
 * - Airport transfer pricing
 * - Platform-specific rates (retail, GNET, Groundspan, corporate)
 * - Automatic discount application
 * - Surcharge calculation
 * - Multi-vehicle pricing
 */

import {
  HOURLY_RATES,
  POINT_TO_POINT_RATES,
  AIRPORT_RATES,
  GROUNDSPAN_RATES,
  GNET_COMMISSION,
  getHourlyRate,
  getPointToPointRate,
  getAirportRate,
  calculatePointToPointTotal
} from '@/config/rates';

import {
  calculateAllDiscounts,
  DISCOUNT_RATES
} from '@/config/discounts';

import {
  calculateAllSurcharges,
  SURCHARGE_RATES
} from '@/config/surcharges';

import {
  getZoneAirportRate,
  validateAirportRoute
} from '@/config/airports';

import {
  getGroundspanRouteRate,
  GroundspanServiceType,
  GroundspanRoute
} from '@/config/groundspan-rates';

import { VehicleId } from '@/config/vehicles';
import { PriceBreakdown, QuoteResult, Discount, Surcharge } from '@/types/pricing';

/**
 * Platform types
 */
export type Platform = 'retail' | 'gnet' | 'groundspan' | 'corporate';

/**
 * Service types
 */
export type ServiceType = 'hourly' | 'point-to-point' | 'airport';

/**
 * Quote parameters
 */
export interface QuoteParams {
  // Required
  vehicleId: VehicleId;
  platform: Platform;
  serviceType: ServiceType;
  serviceDate: Date;

  // For hourly service
  hours?: number;

  // For point-to-point service
  estimatedHours?: number;

  // For airport service
  zoneId?: string;
  airportCode?: string;

  // For Groundspan route-based pricing
  groundspanOrigin?: string;
  groundspanDestination?: string;
  groundspanServiceType?: GroundspanServiceType;

  // Optional modifiers
  pickupTime?: Date | string;
  vehicleCount?: number;
  bookingDate?: Date;
}

/**
 * Detailed price breakdown
 */
export interface DetailedBreakdown extends PriceBreakdown {
  serviceType: ServiceType;
  platform: Platform;
  vehicleId: VehicleId;
  hours?: number;
  vehicleCount: number;

  // Rate components
  baseRate?: number;
  driverGratuity?: number;
  fuelSurcharge?: number;
  mileageCharge?: number;
  corporatePremium?: number;

  // Before adjustments
  priceBeforeDiscounts: number;
  priceAfterDiscounts: number;
  priceAfterSurcharges: number;

  // GNET specific
  gnetCommission?: number;
  gnetCommissionRate?: number;
}

/**
 * Calculate hourly service pricing
 */
function calculateHourlyPricing(params: QuoteParams): DetailedBreakdown {
  const {
    vehicleId,
    platform,
    hours = 3,
    vehicleCount = 1,
    serviceDate,
    pickupTime,
    bookingDate,
    groundspanOrigin,
    groundspanDestination,
    groundspanServiceType
  } = params;

  const vehicleRates = HOURLY_RATES[vehicleId];
  const actualHours = Math.max(hours, vehicleRates.minimumHours);

  let breakdown: DetailedBreakdown;

  if (platform === 'groundspan') {
    // Check if this is a route-based Groundspan booking
    if (groundspanOrigin && groundspanDestination && groundspanServiceType) {
      const route = getGroundspanRouteRate(
        vehicleId,
        groundspanOrigin,
        groundspanDestination,
        groundspanServiceType
      );

      if (route) {
        // Use route-based pricing
        const basePrice = route.rateType === 'hourly'
          ? route.rate * actualHours
          : route.rate;

        breakdown = {
          serviceType: 'hourly',
          platform,
          vehicleId,
          hours: route.estimatedHours,
          vehicleCount,
          basePrice,
          gratuity: 0, // Included in route rate
          discounts: [], // No discounts for corporate routes
          surcharges: [],
          priceBeforeDiscounts: basePrice,
          priceAfterDiscounts: basePrice,
          priceAfterSurcharges: basePrice,
          subtotal: basePrice,
          total: basePrice * vehicleCount
        };

        // Skip discount/surcharge application for route-based pricing
        return breakdown;
      }
    }

    // Fallback to Groundspan premium rates if no route found
    const groundspanRate = GROUNDSPAN_RATES[vehicleId];
    const basePrice = groundspanRate.hourlyPremium * actualHours;

    breakdown = {
      serviceType: 'hourly',
      platform,
      vehicleId,
      hours: actualHours,
      vehicleCount,
      basePrice,
      baseRate: groundspanRate.breakdown.baseRate * actualHours,
      driverGratuity: groundspanRate.breakdown.driverGratuity * actualHours,
      fuelSurcharge: groundspanRate.breakdown.fuelSurcharge * actualHours,
      mileageCharge: groundspanRate.breakdown.mileageCharge * actualHours,
      corporatePremium: groundspanRate.breakdown.corporatePremium * actualHours,
      gratuity: groundspanRate.breakdown.driverGratuity * actualHours,
      discounts: [],
      surcharges: [],
      priceBeforeDiscounts: basePrice,
      priceAfterDiscounts: basePrice,
      priceAfterSurcharges: basePrice,
      subtotal: basePrice,
      total: basePrice
    };
  } else {
    // Standard retail/GNET/corporate rates
    const basePrice = vehicleRates.totalStandard * actualHours;

    breakdown = {
      serviceType: 'hourly',
      platform,
      vehicleId,
      hours: actualHours,
      vehicleCount,
      basePrice,
      baseRate: vehicleRates.baseRate * actualHours,
      driverGratuity: vehicleRates.driverGratuity * actualHours,
      fuelSurcharge: vehicleRates.fuelSurcharge * actualHours,
      mileageCharge: vehicleRates.mileageCharge * actualHours,
      gratuity: vehicleRates.driverGratuity * actualHours,
      discounts: [],
      surcharges: [],
      priceBeforeDiscounts: basePrice,
      priceAfterDiscounts: basePrice,
      priceAfterSurcharges: basePrice,
      subtotal: basePrice,
      total: basePrice
    };
  }

  // Apply discounts (not for Groundspan)
  const discountResult = calculateAllDiscounts({
    basePrice: breakdown.priceBeforeDiscounts,
    platform,
    serviceDate,
    bookingDate,
    hours: actualHours,
    vehicleCount
  });

  breakdown.discounts = discountResult.discounts;
  breakdown.priceAfterDiscounts = discountResult.finalPrice;
  breakdown.subtotal = discountResult.finalPrice;

  // Apply surcharges
  if (pickupTime) {
    const surchargeResult = calculateAllSurcharges({
      basePrice: breakdown.priceBeforeDiscounts,
      platform,
      serviceDate,
      pickupTime
    });

    breakdown.surcharges = surchargeResult.surcharges;
    breakdown.priceAfterSurcharges = breakdown.priceAfterDiscounts + surchargeResult.totalSurchargeAmount;
    breakdown.subtotal = breakdown.priceAfterSurcharges;
  }

  // Multiply by vehicle count
  if (vehicleCount > 1) {
    breakdown.total = breakdown.subtotal * vehicleCount;
  } else {
    breakdown.total = breakdown.subtotal;
  }

  // Calculate GNET commission if applicable
  if (platform === 'gnet') {
    breakdown.gnetCommissionRate = GNET_COMMISSION.standard;
    breakdown.gnetCommission = breakdown.total * GNET_COMMISSION.standard;
  }

  return breakdown;
}

/**
 * Calculate point-to-point service pricing
 */
function calculatePointToPointPricing(params: QuoteParams): DetailedBreakdown {
  const { vehicleId, platform, estimatedHours = 1, vehicleCount = 1, serviceDate, pickupTime, bookingDate } = params;

  const vehicleRates = POINT_TO_POINT_RATES[vehicleId];
  const baseTotal = calculatePointToPointTotal(vehicleId, estimatedHours, platform);

  const billedAdditionalTime = estimatedHours > 1
    ? Math.ceil((estimatedHours - 1) / vehicleRates.billingIncrement) * vehicleRates.billingIncrement
    : 0;

  const breakdown: DetailedBreakdown = {
    serviceType: 'point-to-point',
    platform,
    vehicleId,
    hours: estimatedHours,
    vehicleCount,
    basePrice: baseTotal,
    baseRate: vehicleRates.baseRate + (billedAdditionalTime * vehicleRates.totalStandard * 0.7),
    driverGratuity: vehicleRates.flatGratuity,
    fuelSurcharge: vehicleRates.fuelSurcharge,
    mileageCharge: vehicleRates.mileageCharge,
    gratuity: vehicleRates.flatGratuity,
    discounts: [],
    surcharges: [],
    priceBeforeDiscounts: baseTotal,
    priceAfterDiscounts: baseTotal,
    priceAfterSurcharges: baseTotal,
    subtotal: baseTotal,
    total: baseTotal
  };

  // Apply Groundspan premium if applicable
  if (platform === 'groundspan') {
    const premium = breakdown.basePrice * 0.15;
    breakdown.corporatePremium = premium;
    breakdown.priceBeforeDiscounts += premium;
    breakdown.priceAfterDiscounts = breakdown.priceBeforeDiscounts;
    breakdown.subtotal = breakdown.priceBeforeDiscounts;
  }

  // Apply discounts (not for Groundspan)
  const discountResult = calculateAllDiscounts({
    basePrice: breakdown.priceAfterDiscounts,
    platform,
    serviceDate,
    bookingDate,
    vehicleCount
  });

  breakdown.discounts = discountResult.discounts;
  breakdown.priceAfterDiscounts = discountResult.finalPrice;
  breakdown.subtotal = discountResult.finalPrice;

  // Apply surcharges
  if (pickupTime) {
    const surchargeResult = calculateAllSurcharges({
      basePrice: breakdown.priceBeforeDiscounts,
      platform,
      serviceDate,
      pickupTime
    });

    breakdown.surcharges = surchargeResult.surcharges;
    breakdown.priceAfterSurcharges = breakdown.priceAfterDiscounts + surchargeResult.totalSurchargeAmount;
    breakdown.subtotal = breakdown.priceAfterSurcharges;
  }

  // Multiply by vehicle count
  if (vehicleCount > 1) {
    breakdown.total = breakdown.subtotal * vehicleCount;
  } else {
    breakdown.total = breakdown.subtotal;
  }

  // Calculate GNET commission if applicable
  if (platform === 'gnet') {
    breakdown.gnetCommissionRate = GNET_COMMISSION.standard;
    breakdown.gnetCommission = breakdown.total * GNET_COMMISSION.standard;
  }

  return breakdown;
}

/**
 * Calculate airport transfer pricing
 */
function calculateAirportPricing(params: QuoteParams): DetailedBreakdown | null {
  const {
    vehicleId,
    platform,
    zoneId,
    airportCode,
    vehicleCount = 1,
    serviceDate,
    pickupTime,
    bookingDate,
    groundspanOrigin,
    groundspanDestination,
    groundspanServiceType
  } = params;

  // Check for Groundspan route-based pricing first
  if (platform === 'groundspan' && groundspanOrigin && groundspanDestination && groundspanServiceType) {
    const route = getGroundspanRouteRate(
      vehicleId,
      groundspanOrigin,
      groundspanDestination,
      groundspanServiceType
    );

    if (route) {
      // Use route-based pricing for Groundspan
      const basePrice = route.rate;

      const breakdown: DetailedBreakdown = {
        serviceType: 'airport',
        platform,
        vehicleId,
        vehicleCount,
        hours: route.estimatedHours,
        basePrice,
        gratuity: 0, // Included in route rate
        discounts: [], // No discounts for corporate routes
        surcharges: [],
        priceBeforeDiscounts: basePrice,
        priceAfterDiscounts: basePrice,
        priceAfterSurcharges: basePrice,
        subtotal: basePrice,
        total: basePrice * vehicleCount
      };

      return breakdown;
    }
  }

  // Standard retail/GNET airport pricing
  if (!zoneId || !airportCode) {
    return null;
  }

  // Validate route exists
  if (!validateAirportRoute(vehicleId, zoneId, airportCode)) {
    return null;
  }

  const zoneRate = getZoneAirportRate(vehicleId, zoneId, airportCode);
  if (!zoneRate) {
    return null;
  }

  const basePrice = zoneRate.rate;

  const breakdown: DetailedBreakdown = {
    serviceType: 'airport',
    platform,
    vehicleId,
    vehicleCount,
    basePrice,
    gratuity: 0, // Included in zone rate
    discounts: [],
    surcharges: [],
    priceBeforeDiscounts: basePrice,
    priceAfterDiscounts: basePrice,
    priceAfterSurcharges: basePrice,
    subtotal: basePrice,
    total: basePrice
  };

  // Apply Groundspan premium if applicable (12% for airport)
  if (platform === 'groundspan') {
    const premium = breakdown.basePrice * 0.12;
    breakdown.corporatePremium = premium;
    breakdown.priceBeforeDiscounts += premium;
    breakdown.priceAfterDiscounts = breakdown.priceBeforeDiscounts;
    breakdown.subtotal = breakdown.priceBeforeDiscounts;
  }

  // Apply discounts
  const discountResult = calculateAllDiscounts({
    basePrice: breakdown.priceAfterDiscounts,
    platform,
    serviceDate,
    bookingDate,
    vehicleCount
  });

  breakdown.discounts = discountResult.discounts;
  breakdown.priceAfterDiscounts = discountResult.finalPrice;
  breakdown.subtotal = discountResult.finalPrice;

  // Apply surcharges
  if (pickupTime) {
    const surchargeResult = calculateAllSurcharges({
      basePrice: breakdown.priceBeforeDiscounts,
      platform,
      serviceDate,
      pickupTime
    });

    breakdown.surcharges = surchargeResult.surcharges;
    breakdown.priceAfterSurcharges = breakdown.priceAfterDiscounts + surchargeResult.totalSurchargeAmount;
    breakdown.subtotal = breakdown.priceAfterSurcharges;
  }

  // Multiply by vehicle count
  if (vehicleCount > 1) {
    breakdown.total = breakdown.subtotal * vehicleCount;
  } else {
    breakdown.total = breakdown.subtotal;
  }

  // Calculate GNET commission if applicable (15% for airport)
  if (platform === 'gnet') {
    breakdown.gnetCommissionRate = GNET_COMMISSION.premium;
    breakdown.gnetCommission = breakdown.total * GNET_COMMISSION.premium;
  }

  return breakdown;
}

/**
 * Main pricing calculator function
 * Returns complete breakdown for requested service
 */
export function calculatePrice(params: QuoteParams): DetailedBreakdown | null {
  switch (params.serviceType) {
    case 'hourly':
      return calculateHourlyPricing(params);
    case 'point-to-point':
      return calculatePointToPointPricing(params);
    case 'airport':
      return calculateAirportPricing(params);
    default:
      return null;
  }
}

/**
 * Compare pricing across different service types
 * Useful for recommending best option to customer
 */
export function compareServiceTypes(params: {
  vehicleId: VehicleId;
  platform: Platform;
  serviceDate: Date;
  estimatedHours: number;
  pickupTime?: Date | string;
  bookingDate?: Date;
  zoneId?: string;
  airportCode?: string;
}): {
  hourly: DetailedBreakdown;
  pointToPoint: DetailedBreakdown;
  airport?: DetailedBreakdown;
  recommended: ServiceType;
  savings?: number;
} | null {
  const { vehicleId, platform, serviceDate, estimatedHours, pickupTime, bookingDate, zoneId, airportCode } = params;

  // Calculate hourly
  const hourly = calculateHourlyPricing({
    vehicleId,
    platform,
    serviceType: 'hourly',
    serviceDate,
    hours: estimatedHours,
    pickupTime,
    bookingDate
  });

  // Calculate point-to-point
  const pointToPoint = calculatePointToPointPricing({
    vehicleId,
    platform,
    serviceType: 'point-to-point',
    serviceDate,
    estimatedHours,
    pickupTime,
    bookingDate
  });

  let airport: DetailedBreakdown | undefined;
  if (zoneId && airportCode) {
    const airportResult = calculateAirportPricing({
      vehicleId,
      platform,
      serviceType: 'airport',
      serviceDate,
      zoneId,
      airportCode,
      pickupTime,
      bookingDate
    });
    if (airportResult) {
      airport = airportResult;
    }
  }

  // Determine recommended option (lowest price)
  const options: Array<{ type: ServiceType; price: number }> = [
    { type: 'hourly', price: hourly.total },
    { type: 'point-to-point', price: pointToPoint.total }
  ];

  if (airport) {
    options.push({ type: 'airport', price: airport.total });
  }

  options.sort((a, b) => a.price - b.price);
  const recommended = options[0].type;
  const savings = options[options.length - 1].price - options[0].price;

  return {
    hourly,
    pointToPoint,
    airport,
    recommended,
    savings: savings > 0 ? savings : undefined
  };
}

/**
 * Format price breakdown for display
 */
export function formatPriceBreakdown(breakdown: DetailedBreakdown): string {
  const lines: string[] = [];

  lines.push(`Service: ${breakdown.serviceType}`);
  lines.push(`Platform: ${breakdown.platform}`);
  lines.push(`Vehicle: ${breakdown.vehicleId}`);

  if (breakdown.baseRate) {
    lines.push(`\nBase Rate: $${breakdown.baseRate.toFixed(2)}`);
  }
  if (breakdown.driverGratuity) {
    lines.push(`Gratuity: $${breakdown.driverGratuity.toFixed(2)}`);
  }
  if (breakdown.fuelSurcharge) {
    lines.push(`Fuel: $${breakdown.fuelSurcharge.toFixed(2)}`);
  }
  if (breakdown.mileageCharge) {
    lines.push(`Mileage: $${breakdown.mileageCharge.toFixed(2)}`);
  }
  if (breakdown.corporatePremium) {
    lines.push(`Corporate Premium: $${breakdown.corporatePremium.toFixed(2)}`);
  }

  lines.push(`\nSubtotal: $${breakdown.priceBeforeDiscounts.toFixed(2)}`);

  if (breakdown.discounts.length > 0) {
    lines.push('\nDiscounts:');
    breakdown.discounts.forEach(d => {
      const amount = breakdown.priceBeforeDiscounts * (d.type === 'percentage' ? d.value : 0);
      lines.push(`  ${d.name}: -$${amount.toFixed(2)}`);
    });
  }

  if (breakdown.surcharges.length > 0) {
    lines.push('\nSurcharges:');
    breakdown.surcharges.forEach(s => {
      const amount = s.type === 'flat' ? s.value : breakdown.priceBeforeDiscounts * s.value;
      lines.push(`  ${s.name}: +$${amount.toFixed(2)}`);
    });
  }

  if (breakdown.vehicleCount > 1) {
    lines.push(`\nVehicles: ${breakdown.vehicleCount}`);
  }

  lines.push(`\nTOTAL: $${breakdown.total.toFixed(2)}`);

  if (breakdown.gnetCommission) {
    lines.push(`\nGNET Commission (${(breakdown.gnetCommissionRate! * 100).toFixed(0)}%): $${breakdown.gnetCommission.toFixed(2)}`);
  }

  return lines.join('\n');
}
