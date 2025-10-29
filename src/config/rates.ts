/**
 * TNT Limousine Pricing Rates
 *
 * Data source: TNT GNET Demo HTML files (comprehensive-pricing-engine.html, gnet-partner-booking.html, capital-one-booking.html)
 * Last updated: 2025-10-28
 *
 * Complete pricing structure for all service types and platforms:
 * - Retail (standard individual customer rates)
 * - GNET (partner network rates - same as retail with commission structure)
 * - Groundspan (corporate premium rates - higher than retail)
 * - Corporate (other corporate clients - 15% discount from retail)
 */

import { VehicleId } from './vehicles';

/**
 * Hourly Rate Structure
 * Minimum 3 hours for hourly service
 */
export interface HourlyRate {
  baseRate: number;
  driverGratuity: number;
  fuelSurcharge: number;
  mileageCharge: number;
  totalStandard: number;
  minimumHours: number;
}

/**
 * Point-to-Point Rate Structure
 * Minimum 1 hour, flat gratuity (no hourly driver pay)
 * Billing in 30-minute increments after minimum
 */
export interface PointToPointRate {
  baseRate: number;
  flatGratuity: number;
  fuelSurcharge: number;
  mileageCharge: number;
  totalStandard: number;
  minimumHours: number;
  billingIncrement: number; // 0.5 = 30 minutes
}

/**
 * Airport Rate Structure (by airport code)
 */
export interface AirportRates {
  [airportCode: string]: {
    total: number;
    base: number;
    gratuity: number;
    fuel: number;
    tolls: number;
    parking: number;
  };
}

/**
 * RETAIL RATES (Standard Individual Customer Pricing)
 */
export const HOURLY_RATES: Record<VehicleId, HourlyRate> = {
  'sedan': {
    baseRate: 60,
    driverGratuity: 12,
    fuelSurcharge: 10,
    mileageCharge: 18,
    totalStandard: 100,
    minimumHours: 3
  },
  'transit': {
    baseRate: 90,
    driverGratuity: 19,
    fuelSurcharge: 10,
    mileageCharge: 18,
    totalStandard: 137,
    minimumHours: 3
  },
  'executive-mini-bus': {
    baseRate: 95,
    driverGratuity: 19,
    fuelSurcharge: 10,
    mileageCharge: 18,
    totalStandard: 142,
    minimumHours: 3
  },
  'mini-bus-sofa': {
    baseRate: 95,
    driverGratuity: 19,
    fuelSurcharge: 10,
    mileageCharge: 18,
    totalStandard: 142,
    minimumHours: 3
  },
  'stretch-limo': {
    baseRate: 113,
    driverGratuity: 19,
    fuelSurcharge: 10,
    mileageCharge: 18,
    totalStandard: 160,
    minimumHours: 3
  },
  'sprinter-limo': {
    baseRate: 113,
    driverGratuity: 19,
    fuelSurcharge: 10,
    mileageCharge: 18,
    totalStandard: 160,
    minimumHours: 3
  },
  'limo-bus': {
    baseRate: 152,
    driverGratuity: 28,
    fuelSurcharge: 10,
    mileageCharge: 18,
    totalStandard: 208,
    minimumHours: 3
  }
};

export const POINT_TO_POINT_RATES: Record<VehicleId, PointToPointRate> = {
  'sedan': {
    baseRate: 95,
    flatGratuity: 40,
    fuelSurcharge: 10,
    mileageCharge: 10,
    totalStandard: 155,
    minimumHours: 1,
    billingIncrement: 0.5
  },
  'transit': {
    baseRate: 165,
    flatGratuity: 40,
    fuelSurcharge: 10,
    mileageCharge: 10,
    totalStandard: 225,
    minimumHours: 1,
    billingIncrement: 0.5
  },
  'executive-mini-bus': {
    baseRate: 170,
    flatGratuity: 50,
    fuelSurcharge: 10,
    mileageCharge: 10,
    totalStandard: 240,
    minimumHours: 1,
    billingIncrement: 0.5
  },
  'mini-bus-sofa': {
    baseRate: 170,
    flatGratuity: 50,
    fuelSurcharge: 10,
    mileageCharge: 10,
    totalStandard: 240,
    minimumHours: 1,
    billingIncrement: 0.5
  },
  'stretch-limo': {
    baseRate: 230,
    flatGratuity: 50,
    fuelSurcharge: 10,
    mileageCharge: 10,
    totalStandard: 300,
    minimumHours: 1,
    billingIncrement: 0.5
  },
  'sprinter-limo': {
    baseRate: 260,
    flatGratuity: 50,
    fuelSurcharge: 10,
    mileageCharge: 10,
    totalStandard: 330,
    minimumHours: 1,
    billingIncrement: 0.5
  },
  'limo-bus': {
    baseRate: 300,
    flatGratuity: 50,
    fuelSurcharge: 10,
    mileageCharge: 10,
    totalStandard: 370,
    minimumHours: 1,
    billingIncrement: 0.5
  }
};

/**
 * Airport Rates by Vehicle
 * Note: Not all vehicles available for all airports
 */
export const AIRPORT_RATES: Record<VehicleId, AirportRates> = {
  'sedan': {
    richmond: { total: 105, base: 70, gratuity: 15, fuel: 10, tolls: 5, parking: 5 },
    charlottesville: { total: 333, base: 250, gratuity: 40, fuel: 25, tolls: 10, parking: 8 },
    williamsburg: { total: 280, base: 210, gratuity: 35, fuel: 20, tolls: 10, parking: 5 },
    national: { total: 450, base: 340, gratuity: 50, fuel: 30, tolls: 20, parking: 10 },
    dulles: { total: 460, base: 350, gratuity: 50, fuel: 30, tolls: 20, parking: 10 },
    bwi: { total: 657, base: 500, gratuity: 70, fuel: 40, tolls: 35, parking: 12 }
  },
  'transit': {
    richmond: { total: 175, base: 125, gratuity: 20, fuel: 15, tolls: 5, parking: 10 },
    charlottesville: { total: 525, base: 400, gratuity: 60, fuel: 35, tolls: 20, parking: 10 },
    williamsburg: { total: 420, base: 320, gratuity: 50, fuel: 25, tolls: 15, parking: 10 },
    national: { total: 700, base: 530, gratuity: 75, fuel: 45, tolls: 35, parking: 15 },
    dulles: { total: 710, base: 540, gratuity: 75, fuel: 45, tolls: 35, parking: 15 },
    bwi: { total: 854, base: 650, gratuity: 90, fuel: 55, tolls: 44, parking: 15 }
  },
  'executive-mini-bus': {
    richmond: { total: 185, base: 135, gratuity: 22, fuel: 15, tolls: 5, parking: 8 },
    charlottesville: { total: 545, base: 420, gratuity: 65, fuel: 35, tolls: 15, parking: 10 },
    williamsburg: { total: 440, base: 340, gratuity: 55, fuel: 25, tolls: 10, parking: 10 },
    national: { total: 720, base: 550, gratuity: 80, fuel: 45, tolls: 30, parking: 15 },
    dulles: { total: 730, base: 560, gratuity: 80, fuel: 45, tolls: 30, parking: 15 },
    bwi: { total: 874, base: 670, gratuity: 95, fuel: 55, tolls: 39, parking: 15 }
  },
  'mini-bus-sofa': {
    richmond: { total: 185, base: 135, gratuity: 22, fuel: 15, tolls: 5, parking: 8 },
    charlottesville: { total: 545, base: 420, gratuity: 65, fuel: 35, tolls: 15, parking: 10 },
    williamsburg: { total: 440, base: 340, gratuity: 55, fuel: 25, tolls: 10, parking: 10 },
    national: { total: 720, base: 550, gratuity: 80, fuel: 45, tolls: 30, parking: 15 },
    dulles: { total: 730, base: 560, gratuity: 80, fuel: 45, tolls: 30, parking: 15 },
    bwi: { total: 874, base: 670, gratuity: 95, fuel: 55, tolls: 39, parking: 15 }
  },
  'stretch-limo': {
    richmond: { total: 220, base: 165, gratuity: 28, fuel: 15, tolls: 5, parking: 7 },
    charlottesville: { total: 625, base: 480, gratuity: 75, fuel: 40, tolls: 20, parking: 10 },
    williamsburg: { total: 520, base: 400, gratuity: 65, fuel: 30, tolls: 15, parking: 10 },
    national: { total: 820, base: 630, gratuity: 95, fuel: 50, tolls: 30, parking: 15 },
    dulles: { total: 830, base: 640, gratuity: 95, fuel: 50, tolls: 30, parking: 15 },
    bwi: { total: 1020, base: 780, gratuity: 110, fuel: 65, tolls: 50, parking: 15 }
  },
  'sprinter-limo': {
    richmond: { total: 194, base: 140, gratuity: 25, fuel: 16, tolls: 5, parking: 8 },
    charlottesville: { total: 575, base: 440, gratuity: 70, fuel: 35, tolls: 20, parking: 10 },
    williamsburg: { total: 480, base: 370, gratuity: 60, fuel: 25, tolls: 15, parking: 10 },
    national: { total: 780, base: 600, gratuity: 90, fuel: 45, tolls: 30, parking: 15 },
    dulles: { total: 790, base: 610, gratuity: 90, fuel: 45, tolls: 20, parking: 15 },
    bwi: { total: 910, base: 700, gratuity: 100, fuel: 55, tolls: 40, parking: 15 }
  },
  'limo-bus': {
    richmond: { total: 225, base: 165, gratuity: 30, fuel: 18, tolls: 5, parking: 7 },
    charlottesville: { total: 624, base: 475, gratuity: 75, fuel: 40, tolls: 24, parking: 10 },
    williamsburg: { total: 525, base: 400, gratuity: 65, fuel: 35, tolls: 15, parking: 10 },
    national: { total: 1020, base: 780, gratuity: 120, fuel: 60, tolls: 45, parking: 15 },
    dulles: { total: 1045, base: 800, gratuity: 120, fuel: 60, tolls: 50, parking: 15 },
    bwi: { total: 1265, base: 970, gratuity: 140, fuel: 75, tolls: 65, parking: 15 }
  }
};

/**
 * GROUNDSPAN CORPORATE PREMIUM RATES
 * These are HIGHER than standard rates with a $10/hour premium
 * Includes priority booking, dedicated account management, premium service
 */
export interface GroundspanRate {
  hourlyPremium: number;
  premiumAmount: number;
  breakdown: {
    baseRate: number;
    driverGratuity: number;
    fuelSurcharge: number;
    mileageCharge: number;
    corporatePremium: number;
  };
}

export const GROUNDSPAN_RATES: Record<VehicleId, GroundspanRate> = {
  'sedan': {
    hourlyPremium: 110, // vs $100 standard
    premiumAmount: 10,
    breakdown: {
      baseRate: 60,
      driverGratuity: 12,
      fuelSurcharge: 10,
      mileageCharge: 18,
      corporatePremium: 10
    }
  },
  'transit': {
    hourlyPremium: 147, // vs $137 standard
    premiumAmount: 10,
    breakdown: {
      baseRate: 90,
      driverGratuity: 19,
      fuelSurcharge: 10,
      mileageCharge: 18,
      corporatePremium: 10
    }
  },
  'executive-mini-bus': {
    hourlyPremium: 152, // vs $142 standard
    premiumAmount: 10,
    breakdown: {
      baseRate: 95,
      driverGratuity: 19,
      fuelSurcharge: 10,
      mileageCharge: 18,
      corporatePremium: 10
    }
  },
  'mini-bus-sofa': {
    hourlyPremium: 152, // vs $142 standard
    premiumAmount: 10,
    breakdown: {
      baseRate: 95,
      driverGratuity: 19,
      fuelSurcharge: 10,
      mileageCharge: 18,
      corporatePremium: 10
    }
  },
  'stretch-limo': {
    hourlyPremium: 170, // vs $160 standard
    premiumAmount: 10,
    breakdown: {
      baseRate: 113,
      driverGratuity: 19,
      fuelSurcharge: 10,
      mileageCharge: 18,
      corporatePremium: 10
    }
  },
  'sprinter-limo': {
    hourlyPremium: 170, // vs $160 standard
    premiumAmount: 10,
    breakdown: {
      baseRate: 113,
      driverGratuity: 19,
      fuelSurcharge: 10,
      mileageCharge: 18,
      corporatePremium: 10
    }
  },
  'limo-bus': {
    hourlyPremium: 218, // vs $208 standard
    premiumAmount: 10,
    breakdown: {
      baseRate: 152,
      driverGratuity: 28,
      fuelSurcharge: 10,
      mileageCharge: 18,
      corporatePremium: 10
    }
  }
};

/**
 * GNET Commission Structure
 * GNET rates are the same as retail, but with commission paid to partner
 */
export const GNET_COMMISSION = {
  standard: 0.12, // 12% for hourly services
  premium: 0.15   // 15% for airport/luxury services
} as const;

/**
 * Helper function to get hourly rate for any platform
 */
export function getHourlyRate(vehicleId: VehicleId, platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'): number {
  switch (platform) {
    case 'groundspan':
      return GROUNDSPAN_RATES[vehicleId].hourlyPremium;
    case 'retail':
    case 'gnet':
    default:
      return HOURLY_RATES[vehicleId].totalStandard;
  }
}

/**
 * Helper function to get point-to-point rate for any platform
 */
export function getPointToPointRate(vehicleId: VehicleId, platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'): number {
  const baseRate = POINT_TO_POINT_RATES[vehicleId].totalStandard;

  if (platform === 'groundspan') {
    // Groundspan gets 15% premium on P2P
    return baseRate * 1.15;
  }

  return baseRate;
}

/**
 * Helper function to calculate point-to-point pricing with additional time
 */
export function calculatePointToPointTotal(
  vehicleId: VehicleId,
  estimatedHours: number,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate' = 'retail'
): number {
  const rates = POINT_TO_POINT_RATES[vehicleId];
  const minimumCharge = rates.totalStandard;

  if (estimatedHours <= 1) {
    return minimumCharge;
  }

  // Additional time after minimum hour, billed in 30-min increments
  const additionalTime = estimatedHours - 1;
  const billedAdditionalTime = Math.ceil(additionalTime / rates.billingIncrement) * rates.billingIncrement;

  // Additional time charged at 70% of hourly rate
  const additionalCharge = billedAdditionalTime * (rates.totalStandard * 0.7);

  let total = minimumCharge + additionalCharge;

  // Apply Groundspan premium if applicable
  if (platform === 'groundspan') {
    total *= 1.15;
  }

  return total;
}

/**
 * Helper function to get airport rate for any platform
 */
export function getAirportRate(
  vehicleId: VehicleId,
  airportCode: string,
  platform: 'retail' | 'gnet' | 'groundspan' | 'corporate'
): number | null {
  const vehicleRates = AIRPORT_RATES[vehicleId];
  if (!vehicleRates || !vehicleRates[airportCode]) {
    return null;
  }

  const baseRate = vehicleRates[airportCode].total;

  if (platform === 'groundspan') {
    // Groundspan gets 12% premium on airport transfers
    return baseRate * 1.12;
  }

  return baseRate;
}
