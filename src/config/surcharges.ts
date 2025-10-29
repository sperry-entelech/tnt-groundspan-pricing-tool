/**
 * TNT Limousine Surcharge Rules and Calculations
 *
 * Data source: TNT GNET Demo HTML files (comprehensive-pricing-engine.html)
 * Last updated: 2025-10-28
 *
 * Business Rules:
 * - After-hours pickup fee: $20 flat (11pm-6am pickups)
 * - Holiday surcharge: 25% of base price
 * - Surcharges apply to ALL platforms including Groundspan
 * - Tolls and parking: pass-through costs (added at time of service)
 */

import { Surcharge } from '@/types/pricing';

/**
 * Surcharge rates
 */
export const SURCHARGE_RATES = {
  AFTER_HOURS: 20,    // $20 flat fee
  HOLIDAY: 0.25       // 25% of base price
} as const;

/**
 * Check if pickup time is after hours (11pm - 6am)
 */
export function isAfterHours(pickupTime: Date | string): boolean {
  let hour: number;

  if (typeof pickupTime === 'string') {
    // Handle HH:MM format
    const [hourStr] = pickupTime.split(':');
    hour = parseInt(hourStr, 10);
  } else {
    // Handle Date object
    hour = pickupTime.getHours();
  }

  // After hours: 11pm (23) to 6am (6)
  return hour >= 23 || hour < 6;
}

/**
 * Check if date is a major holiday
 * Major holidays: New Year's Day, Memorial Day, Independence Day, Labor Day,
 * Thanksgiving, Christmas Day
 */
export function isHoliday(date: Date): boolean {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();
  const dayOfWeek = date.getDay(); // 0=Sunday

  // Fixed holidays
  if (month === 0 && day === 1) return true; // New Year's Day
  if (month === 6 && day === 4) return true; // Independence Day
  if (month === 11 && day === 25) return true; // Christmas

  // Memorial Day (last Monday in May)
  if (month === 4 && dayOfWeek === 1) {
    const nextWeek = new Date(date);
    nextWeek.setDate(day + 7);
    if (nextWeek.getMonth() !== 4) return true; // This is the last Monday in May
  }

  // Labor Day (first Monday in September)
  if (month === 8 && dayOfWeek === 1 && day <= 7) return true;

  // Thanksgiving (fourth Thursday in November)
  if (month === 10 && dayOfWeek === 4) {
    const weekOfMonth = Math.ceil(day / 7);
    if (weekOfMonth === 4) return true;
  }

  return false;
}

/**
 * Calculate after-hours pickup surcharge
 * $20 flat fee for pickups between 11pm and 6am
 * Applies to ALL platforms including Groundspan
 */
export function calculateAfterHoursSurcharge(
  pickupTime: Date | string,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): Surcharge | null {
  // Groundspan corporate premium includes after-hours in their base rate
  if (platform === 'groundspan') {
    return null;
  }

  if (!isAfterHours(pickupTime)) {
    return null;
  }

  return {
    name: 'After-Hours Pickup Fee',
    type: 'flat',
    value: SURCHARGE_RATES.AFTER_HOURS,
    conditions: 'Pickup time between 11pm and 6am'
  };
}

/**
 * Calculate holiday surcharge
 * 25% of base price for service on major holidays
 * Applies to ALL platforms including Groundspan
 */
export function calculateHolidaySurcharge(
  basePrice: number,
  serviceDate: Date,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): Surcharge | null {
  if (!isHoliday(serviceDate)) {
    return null;
  }

  const surchargeAmount = basePrice * SURCHARGE_RATES.HOLIDAY;

  return {
    name: 'Holiday Service Surcharge',
    type: 'percentage',
    value: SURCHARGE_RATES.HOLIDAY,
    conditions: 'Service on major holiday'
  };
}

/**
 * Calculate all applicable surcharges for a booking
 * Returns array of applicable surcharges and total surcharge amount
 */
export function calculateAllSurcharges(params: {
  basePrice: number;
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate';
  serviceDate: Date;
  pickupTime: Date | string;
}): {
  surcharges: Surcharge[];
  totalSurchargeAmount: number;
  finalPrice: number;
} {
  const {
    basePrice,
    platform,
    serviceDate,
    pickupTime
  } = params;

  const surcharges: Surcharge[] = [];
  let currentPrice = basePrice;

  // Apply after-hours surcharge
  const afterHoursSurcharge = calculateAfterHoursSurcharge(pickupTime, platform);
  if (afterHoursSurcharge) {
    currentPrice += afterHoursSurcharge.value;
    surcharges.push(afterHoursSurcharge);
  }

  // Apply holiday surcharge (calculated on base before after-hours)
  const holidaySurcharge = calculateHolidaySurcharge(basePrice, serviceDate, platform);
  if (holidaySurcharge) {
    const amount = basePrice * holidaySurcharge.value;
    currentPrice += amount;
    surcharges.push(holidaySurcharge);
  }

  const totalSurchargeAmount = currentPrice - basePrice;

  return {
    surcharges,
    totalSurchargeAmount,
    finalPrice: currentPrice
  };
}

/**
 * List of US Federal Holidays for reference
 */
export const FEDERAL_HOLIDAYS = [
  'New Year\'s Day',
  'Martin Luther King Jr. Day',
  'Presidents\' Day',
  'Memorial Day',
  'Juneteenth',
  'Independence Day',
  'Labor Day',
  'Columbus Day',
  'Veterans Day',
  'Thanksgiving',
  'Christmas Day'
] as const;

/**
 * Get surcharge explanation for UI display
 */
export function getSurchargeExplanation(): string {
  return `Surcharges apply to all bookings when conditions are met:\n\n` +
    `• After-Hours Fee: $${SURCHARGE_RATES.AFTER_HOURS} for pickups between 11pm-6am\n` +
    `• Holiday Surcharge: ${SURCHARGE_RATES.HOLIDAY * 100}% on major holidays\n` +
    `• Tolls and parking fees are pass-through costs billed at actual amount`;
}

/**
 * Get list of upcoming holidays for the year
 */
export function getHolidaysForYear(year: number): Date[] {
  const holidays: Date[] = [];

  // Fixed date holidays
  holidays.push(new Date(year, 0, 1));   // New Year's Day
  holidays.push(new Date(year, 6, 4));   // Independence Day
  holidays.push(new Date(year, 11, 25)); // Christmas

  // Memorial Day - last Monday in May
  const memorialDay = new Date(year, 4, 31);
  while (memorialDay.getDay() !== 1) {
    memorialDay.setDate(memorialDay.getDate() - 1);
  }
  holidays.push(memorialDay);

  // Labor Day - first Monday in September
  const laborDay = new Date(year, 8, 1);
  while (laborDay.getDay() !== 1) {
    laborDay.setDate(laborDay.getDate() + 1);
  }
  holidays.push(laborDay);

  // Thanksgiving - fourth Thursday in November
  const thanksgiving = new Date(year, 10, 1);
  let thursdayCount = 0;
  while (thursdayCount < 4) {
    if (thanksgiving.getDay() === 4) {
      thursdayCount++;
      if (thursdayCount === 4) break;
    }
    thanksgiving.setDate(thanksgiving.getDate() + 1);
  }
  holidays.push(thanksgiving);

  return holidays.sort((a, b) => a.getTime() - b.getTime());
}
