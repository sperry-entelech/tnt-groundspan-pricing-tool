/**
 * Groundspan (Capital One) Corporate Pricing
 *
 * Source: Pricing_4_ZoneRates.xlsx
 * Last updated: 2025-10-28
 *
 * IMPORTANT: Groundspan pricing is ROUTE-BASED, not simple flat rates
 * - Rates calculated based on TOTAL driver time (including drive to/from base)
 * - Different pricing for Ground service vs Airport Arrivals vs Airport Departures
 * - Estimated hours represent total billable time for the driver
 */

import { VehicleId } from './vehicles';

/**
 * Route type for Groundspan pricing
 */
export type GroundspanServiceType = 'ground' | 'arrival' | 'departure';

/**
 * Rate type for Groundspan routes
 */
export type GroundspanRateType = 'flat' | 'hourly';

/**
 * Groundspan route definition
 */
export interface GroundspanRoute {
  origin: string;
  destination: string;
  serviceType: GroundspanServiceType;
  rate: number;
  rateType: GroundspanRateType;
  estimatedHours: number;
}

/**
 * Vehicle name mapping from Groundspan to our system
 */
export const GROUNDSPAN_VEHICLE_MAPPING: Record<string, VehicleId> = {
  'Lincoln MKT': 'sedan',
  'Lincoln Aviator': 'sedan',
  'Ford Transit 15 Pax': 'transit',
  'Ford Transit 12 Pax': 'transit',
  'Executive Mini Bus': 'executive-mini-bus',
  'Mini Bus': 'mini-bus-sofa',
  'Stretch Limousine -8': 'stretch-limo',
  'Mercedes Limo Sprinter': 'sprinter-limo',
  'Limo Bus': 'limo-bus'
};

/**
 * All Groundspan routes by vehicle
 * Extracted from Pricing_4_ZoneRates.xlsx
 */
export const GROUNDSPAN_ROUTES: Record<VehicleId, GroundspanRoute[]> = {
  'sedan': [
    // Lincoln MKT routes
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 95, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Charlottesville Albemarle Airport', serviceType: 'departure', rate: 300, rateType: 'flat', estimatedHours: 3.0 },
    { origin: 'Central Virginia', destination: 'Cville', serviceType: 'ground', rate: 300, rateType: 'flat', estimatedHours: 3.0 },
    { origin: 'Central Virginia', destination: 'Mclean VA', serviceType: 'ground', rate: 425, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Richmond International Airport', serviceType: 'departure', rate: 110, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Ronald Reagan National Airport', serviceType: 'departure', rate: 455, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Washington Dulles International Airport', serviceType: 'departure', rate: 465, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Charlottesville Albemarle Airport', destination: 'Central Virginia', serviceType: 'ground', rate: 300, rateType: 'flat', estimatedHours: 3.0 },
    { origin: 'Cville', destination: 'Central Virginia', serviceType: 'ground', rate: 300, rateType: 'flat', estimatedHours: 3.0 }, // Fixed: was 0.003 hours (data error)
    { origin: 'Mclean VA', destination: 'Central Virginia', serviceType: 'ground', rate: 425, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Richmond International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 110, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Ronald Reagan National Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 455, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Washington Dulles International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 465, rateType: 'flat', estimatedHours: 5.0 },
    // Lincoln Aviator routes
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 110, rateType: 'hourly', estimatedHours: 1.0 },
    { origin: 'Mclean VA', destination: 'Mclean VA', serviceType: 'ground', rate: 100, rateType: 'hourly', estimatedHours: 5.0 }
  ],

  'limo-bus': [
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 213, rateType: 'hourly', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Richmond International Airport', serviceType: 'departure', rate: 170, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Ronald Reagan National Airport', serviceType: 'departure', rate: 1097, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Washington Dulles International Airport', serviceType: 'departure', rate: 1107, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Richmond International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 218, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Ronald Reagan National Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 1097, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Washington Dulles International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 1107, rateType: 'flat', estimatedHours: 5.0 }
  ],

  'mini-bus-sofa': [
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 157, rateType: 'hourly', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Richmond International Airport', serviceType: 'departure', rate: 183, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Ronald Reagan National Airport', serviceType: 'departure', rate: 947, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Washington Dulles International Airport', serviceType: 'departure', rate: 957, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Richmond International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 183, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Ronald Reagan National Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 947, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Washington Dulles International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 957, rateType: 'flat', estimatedHours: 5.0 }
  ],

  'sprinter-limo': [
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 183, rateType: 'hourly', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Richmond International Airport', serviceType: 'departure', rate: 188, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Ronald Reagan National Airport', serviceType: 'departure', rate: 957, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Washington Dulles International Airport', serviceType: 'departure', rate: 967, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Richmond International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 188, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Ronald Reagan National Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 957, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Washington Dulles International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 967, rateType: 'flat', estimatedHours: 5.0 }
  ],

  'executive-mini-bus': [
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 157, rateType: 'hourly', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Richmond International Airport', serviceType: 'departure', rate: 183, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Ronald Reagan National Airport', serviceType: 'departure', rate: 947, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Washington Dulles International Airport', serviceType: 'departure', rate: 957, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Richmond International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 183, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Ronald Reagan National Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 947, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Washington Dulles International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 957, rateType: 'flat', estimatedHours: 5.0 }
  ],

  'stretch-limo': [
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 169, rateType: 'hourly', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Richmond International Airport', serviceType: 'departure', rate: 178, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Ronald Reagan National Airport', serviceType: 'departure', rate: 932, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Washington Dulles International Airport', serviceType: 'departure', rate: 942, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Richmond International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 178, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Ronald Reagan National Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 932, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Washington Dulles International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 942, rateType: 'flat', estimatedHours: 5.0 }
  ],

  'transit': [
    // Ford Transit 15 Pax
    { origin: 'Central Virginia', destination: 'Richmond International Airport', serviceType: 'departure', rate: 183, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Central Virginia', destination: 'Ronald Reagan National Airport', serviceType: 'departure', rate: 800, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Central Virginia', destination: 'Washington Dulles International Airport', serviceType: 'departure', rate: 800, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Mclean VA', destination: 'Mclean VA', serviceType: 'ground', rate: 137, rateType: 'hourly', estimatedHours: 5.0 },
    { origin: 'Richmond International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 183, rateType: 'flat', estimatedHours: 1.0 },
    { origin: 'Ronald Reagan National Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 800, rateType: 'flat', estimatedHours: 5.0 },
    { origin: 'Washington Dulles International Airport', destination: 'Central Virginia', serviceType: 'arrival', rate: 800, rateType: 'flat', estimatedHours: 5.0 },
    // Ford Transit 12 Pax (same as 15 for Central Virginia routes)
    { origin: 'Central Virginia', destination: 'Central Virginia', serviceType: 'ground', rate: 157, rateType: 'flat', estimatedHours: 1.0 }
  ]
};

/**
 * Get Groundspan rate for a specific route
 */
export function getGroundspanRouteRate(
  vehicleId: VehicleId,
  origin: string,
  destination: string,
  serviceType: GroundspanServiceType
): GroundspanRoute | undefined {
  const routes = GROUNDSPAN_ROUTES[vehicleId];
  if (!routes) return undefined;

  return routes.find(
    r =>
      r.origin === origin &&
      r.destination === destination &&
      r.serviceType === serviceType
  );
}

/**
 * Get all available destinations for a given origin and vehicle
 */
export function getGroundspanDestinations(
  vehicleId: VehicleId,
  origin: string
): string[] {
  const routes = GROUNDSPAN_ROUTES[vehicleId];
  if (!routes) return [];

  return [...new Set(routes
    .filter(r => r.origin === origin)
    .map(r => r.destination))];
}

/**
 * Get all available origins for a vehicle
 */
export function getGroundspanOrigins(vehicleId: VehicleId): string[] {
  const routes = GROUNDSPAN_ROUTES[vehicleId];
  if (!routes) return [];

  return [...new Set(routes.map(r => r.origin))];
}

/**
 * Check if a route exists
 */
export function validateGroundspanRoute(
  vehicleId: VehicleId,
  origin: string,
  destination: string,
  serviceType: GroundspanServiceType
): boolean {
  const rate = getGroundspanRouteRate(vehicleId, origin, destination, serviceType);
  return rate !== undefined;
}

/**
 * Airport name mappings for user-friendly display
 */
export const GROUNDSPAN_AIRPORTS: Record<string, { code: string; name: string }> = {
  'Richmond International Airport': { code: 'RIC', name: 'Richmond International Airport' },
  'Ronald Reagan National Airport': { code: 'DCA', name: 'Ronald Reagan National Airport' },
  'Washington Dulles International Airport': { code: 'IAD', name: 'Washington Dulles International Airport' },
  'Charlottesville Albemarle Airport': { code: 'CHO', name: 'Charlottesville Albemarle Airport' }
};

/**
 * Zone/Location mappings
 */
export const GROUNDSPAN_ZONES: Record<string, string> = {
  'Central Virginia': 'Richmond metro and surrounding areas',
  'Mclean VA': 'McLean, Virginia (Northern VA)',
  'Cville': 'Charlottesville, Virginia'
};
