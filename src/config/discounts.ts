/**
 * TNT Limousine Discount Rules and Calculations
 *
 * Data source: TNT GNET Demo HTML files (comprehensive-pricing-engine.html)
 * Last updated: 2025-10-28
 *
 * Business Rules:
 * - Monday-Thursday 10% discount (retail/corporate only, NOT Groundspan)
 * - 6+ hour trip 10% discount (retail/corporate only, NOT Groundspan)
 * - Short notice (same-day/next-day) 15% discount (retail/corporate only, NOT Groundspan)
 * - Multi-vehicle 10% discount (retail/corporate only, NOT Groundspan)
 * - Corporate generic clients get 15% volume discount
 * - Groundspan premium service does NOT receive standard discounts
 * - GNET rates same as retail but partner receives commission
 */

import { Discount } from '@/types/pricing';

/**
 * Discount types and their values
 */
export const DISCOUNT_RATES = {
  WEEKDAY: 0.10,        // 10% Mon-Thu
  LONG_TRIP: 0.10,      // 10% for 6+ hours
  SHORT_NOTICE: 0.15,   // 15% same-day/next-day
  MULTI_VEHICLE: 0.10,  // 10% for 2+ vehicles
  CORPORATE: 0.15       // 15% generic corporate volume discount
} as const;

/**
 * Check if date is Monday through Thursday
 */
export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 4; // Mon=1, Tue=2, Wed=3, Thu=4
}

/**
 * Check if booking is short notice (same day or next day)
 */
export function isShortNotice(serviceDate: Date, bookingDate: Date = new Date()): boolean {
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysDiff = Math.ceil((serviceDate.getTime() - bookingDate.getTime()) / msPerDay);
  return daysDiff <= 1;
}

/**
 * Calculate weekday discount
 * Applies to Monday-Thursday services only
 * NOT applicable to Groundspan premium accounts
 */
export function calculateWeekdayDiscount(
  basePrice: number,
  serviceDate: Date,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): Discount | null {
  // Groundspan does not receive weekday discount
  if (platform === 'groundspan') {
    return null;
  }

  if (!isWeekday(serviceDate)) {
    return null;
  }

  const discountAmount = basePrice * DISCOUNT_RATES.WEEKDAY;

  return {
    name: 'Monday-Thursday Discount',
    type: 'percentage',
    value: DISCOUNT_RATES.WEEKDAY,
    conditions: 'Service scheduled Monday through Thursday'
  };
}

/**
 * Calculate long trip discount
 * Applies to 6+ hour bookings
 * NOT applicable to Groundspan premium accounts
 */
export function calculateLongTripDiscount(
  basePrice: number,
  hours: number,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): Discount | null {
  // Groundspan does not receive long trip discount
  if (platform === 'groundspan') {
    return null;
  }

  if (hours < 6) {
    return null;
  }

  const discountAmount = basePrice * DISCOUNT_RATES.LONG_TRIP;

  return {
    name: '6+ Hour Trip Discount',
    type: 'percentage',
    value: DISCOUNT_RATES.LONG_TRIP,
    conditions: 'Booking duration of 6 hours or more'
  };
}

/**
 * Calculate short notice discount
 * Applies to same-day or next-day bookings
 * NOT applicable to Groundspan premium accounts
 */
export function calculateShortNoticeDiscount(
  basePrice: number,
  serviceDate: Date,
  bookingDate: Date,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): Discount | null {
  // Groundspan does not receive short notice discount
  if (platform === 'groundspan') {
    return null;
  }

  if (!isShortNotice(serviceDate, bookingDate)) {
    return null;
  }

  const discountAmount = basePrice * DISCOUNT_RATES.SHORT_NOTICE;

  return {
    name: 'Late Inquiry Discount',
    type: 'percentage',
    value: DISCOUNT_RATES.SHORT_NOTICE,
    conditions: 'Same-day or next-day booking'
  };
}

/**
 * Calculate multi-vehicle discount
 * Applies when booking 2 or more vehicles
 * NOT applicable to Groundspan premium accounts
 */
export function calculateMultiVehicleDiscount(
  basePrice: number,
  vehicleCount: number,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): Discount | null {
  // Groundspan does not receive multi-vehicle discount
  if (platform === 'groundspan') {
    return null;
  }

  if (vehicleCount < 2) {
    return null;
  }

  const discountAmount = basePrice * DISCOUNT_RATES.MULTI_VEHICLE;

  return {
    name: 'Multi-Vehicle Discount',
    type: 'percentage',
    value: DISCOUNT_RATES.MULTI_VEHICLE,
    conditions: `${vehicleCount} vehicles booked`
  };
}

/**
 * Calculate corporate volume discount
 * Applies ONLY to generic corporate accounts (not Groundspan)
 * Groundspan gets premium service instead of discounts
 */
export function calculateCorporateDiscount(
  basePrice: number,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): Discount | null {
  // Only applies to 'corporate' platform (generic corporate clients)
  // NOT Groundspan (they get premium service instead)
  if (platform !== 'corporate') {
    return null;
  }

  const discountAmount = basePrice * DISCOUNT_RATES.CORPORATE;

  return {
    name: 'Corporate Volume Discount',
    type: 'percentage',
    value: DISCOUNT_RATES.CORPORATE,
    conditions: 'Corporate account holder'
  };
}

/**
 * Calculate all applicable discounts for a booking
 * Returns array of applicable discounts and total discount amount
 */
export function calculateAllDiscounts(params: {
  basePrice: number;
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate';
  serviceDate: Date;
  bookingDate?: Date;
  hours?: number;
  vehicleCount?: number;
}): {
  discounts: Discount[];
  totalDiscountAmount: number;
  finalPrice: number;
} {
  const {
    basePrice,
    platform,
    serviceDate,
    bookingDate = new Date(),
    hours = 3,
    vehicleCount = 1
  } = params;

  const discounts: Discount[] = [];
  let currentPrice = basePrice;

  // Apply weekday discount
  const weekdayDiscount = calculateWeekdayDiscount(currentPrice, serviceDate, platform);
  if (weekdayDiscount) {
    const amount = currentPrice * weekdayDiscount.value;
    currentPrice -= amount;
    discounts.push(weekdayDiscount);
  }

  // Apply long trip discount
  const longTripDiscount = calculateLongTripDiscount(currentPrice, hours, platform);
  if (longTripDiscount) {
    const amount = currentPrice * longTripDiscount.value;
    currentPrice -= amount;
    discounts.push(longTripDiscount);
  }

  // Apply short notice discount
  const shortNoticeDiscount = calculateShortNoticeDiscount(currentPrice, serviceDate, bookingDate, platform);
  if (shortNoticeDiscount) {
    const amount = currentPrice * shortNoticeDiscount.value;
    currentPrice -= amount;
    discounts.push(shortNoticeDiscount);
  }

  // Apply multi-vehicle discount
  const multiVehicleDiscount = calculateMultiVehicleDiscount(currentPrice, vehicleCount, platform);
  if (multiVehicleDiscount) {
    const amount = currentPrice * multiVehicleDiscount.value;
    currentPrice -= amount;
    discounts.push(multiVehicleDiscount);
  }

  // Apply corporate discount
  const corporateDiscount = calculateCorporateDiscount(currentPrice, platform);
  if (corporateDiscount) {
    const amount = currentPrice * corporateDiscount.value;
    currentPrice -= amount;
    discounts.push(corporateDiscount);
  }

  const totalDiscountAmount = basePrice - currentPrice;

  return {
    discounts,
    totalDiscountAmount,
    finalPrice: currentPrice
  };
}

/**
 * Get discount explanation for UI display
 */
export function getDiscountExplanation(platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'): string {
  switch (platform) {
    case 'groundspan':
      return 'Corporate premium service - Includes enhanced service features instead of discounts. Priority booking, dedicated account management, premium vehicle maintenance standards.';
    case 'corporate':
      return 'Generic corporate account - 15% volume discount applied. Standard discounts also available.';
    case 'gnet':
      return 'GNET partner rates - Same as retail with partner commission. All standard discounts apply.';
    case 'retail':
    default:
      return 'Individual customer rates - All standard discounts available (weekday, long trip, short notice, multi-vehicle).';
  }
}
