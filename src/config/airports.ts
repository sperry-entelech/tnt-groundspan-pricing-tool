/**
 * TNT Limousine Airport and Zone Definitions
 *
 * Data source: TNT GNET Demo HTML files (airport-zone-pricing.js, comprehensive-pricing-engine.html)
 * Last updated: 2025-10-28
 *
 * Airport transfer pricing is zone-based with flat rates that include:
 * - Base transportation cost
 * - Driver gratuity
 * - Fuel surcharge
 * - Estimated tolls
 * - Airport parking fees
 *
 * Zones represent pickup/dropoff areas for airport transfers
 */

import { VehicleId } from './vehicles';

/**
 * Airport definition
 */
export interface Airport {
  code: string;
  name: string;
  fullName: string;
  city: string;
  state: string;
}

/**
 * Service zone definition
 */
export interface ServiceZone {
  id: string;
  name: string;
  description: string;
  cities?: string[];
}

/**
 * Zone-based airport rate
 */
export interface ZoneAirportRate {
  zone: string;
  airport: string;
  rate: number;
  estimatedHours: number;
  estimatedMiles?: number;
}

/**
 * All airports serviced by TNT
 */
export const AIRPORTS_ARRAY: Airport[] = [
  {
    code: 'RIC',
    name: 'Richmond International',
    fullName: 'Richmond International Airport',
    city: 'Richmond',
    state: 'VA'
  },
  {
    code: 'DCA',
    name: 'Reagan National',
    fullName: 'Ronald Reagan Washington National Airport',
    city: 'Arlington',
    state: 'VA'
  },
  {
    code: 'IAD',
    name: 'Washington Dulles',
    fullName: 'Washington Dulles International Airport',
    city: 'Dulles',
    state: 'VA'
  },
  {
    code: 'BWI',
    name: 'Baltimore Washington',
    fullName: 'Baltimore/Washington International Thurgood Marshall Airport',
    city: 'Baltimore',
    state: 'MD'
  },
  {
    code: 'CHO',
    name: 'Charlottesville',
    fullName: 'Charlottesville Albemarle Airport',
    city: 'Charlottesville',
    state: 'VA'
  }
];

/**
 * Airport code to name mapping (for select dropdowns)
 */
export const AIRPORTS: Record<string, string> = AIRPORTS_ARRAY.reduce((acc, airport) => {
  acc[airport.code] = airport.name;
  return acc;
}, {} as Record<string, string>);

/**
 * Service zones for airport transfers
 */
export const SERVICE_ZONES: ServiceZone[] = [
  {
    id: 'central-virginia',
    name: 'Central Virginia',
    description: 'Richmond metro area and surrounding counties',
    cities: ['Richmond', 'Henrico', 'Chesterfield', 'Hanover', 'Goochland']
  },
  {
    id: 'prince-george',
    name: 'Prince George',
    description: 'Prince George County and surrounding area',
    cities: ['Prince George', 'Hopewell', 'Petersburg']
  },
  {
    id: 'norfolk',
    name: 'Norfolk',
    description: 'Norfolk and Hampton Roads area',
    cities: ['Norfolk', 'Virginia Beach', 'Chesapeake', 'Hampton', 'Newport News']
  },
  {
    id: 'charlottesville',
    name: 'Charlottesville',
    description: 'Charlottesville and Albemarle County area',
    cities: ['Charlottesville', 'Albemarle']
  }
];

/**
 * Zone-based airport rates by vehicle
 * These are flat rates including all fees
 * Source: airport-zone-pricing.js from demo
 */
export const ZONE_AIRPORT_RATES: Record<VehicleId, ZoneAirportRate[]> = {
  'sedan': [
    // Central Virginia zone
    { zone: 'central-virginia', airport: 'RIC', rate: 105, estimatedHours: 1, estimatedMiles: 15 },
    { zone: 'central-virginia', airport: 'DCA', rate: 450, estimatedHours: 4, estimatedMiles: 110 },
    { zone: 'central-virginia', airport: 'IAD', rate: 460, estimatedHours: 4.5, estimatedMiles: 120 },
    { zone: 'central-virginia', airport: 'BWI', rate: 657, estimatedHours: 7, estimatedMiles: 180 },
    { zone: 'central-virginia', airport: 'CHO', rate: 333, estimatedHours: 2.5, estimatedMiles: 70 },
    // Prince George zone
    { zone: 'prince-george', airport: 'RIC', rate: 105, estimatedHours: 2, estimatedMiles: 30 },
    { zone: 'prince-george', airport: 'DCA', rate: 450, estimatedHours: 5, estimatedMiles: 130 },
    { zone: 'prince-george', airport: 'IAD', rate: 460, estimatedHours: 6.5, estimatedMiles: 140 },
    { zone: 'prince-george', airport: 'BWI', rate: 657, estimatedHours: 8, estimatedMiles: 200 },
    // Norfolk zone
    { zone: 'norfolk', airport: 'RIC', rate: 105, estimatedHours: 4, estimatedMiles: 90 },
    { zone: 'norfolk', airport: 'CHO', rate: 333, estimatedHours: 6.5, estimatedMiles: 160 }
  ],
  'transit': [
    // Central Virginia zone
    { zone: 'central-virginia', airport: 'RIC', rate: 175, estimatedHours: 1, estimatedMiles: 15 },
    { zone: 'central-virginia', airport: 'DCA', rate: 700, estimatedHours: 4, estimatedMiles: 110 },
    { zone: 'central-virginia', airport: 'IAD', rate: 710, estimatedHours: 4.5, estimatedMiles: 120 },
    { zone: 'central-virginia', airport: 'BWI', rate: 854, estimatedHours: 7, estimatedMiles: 180 },
    { zone: 'central-virginia', airport: 'CHO', rate: 525, estimatedHours: 2.5, estimatedMiles: 70 },
    // Prince George zone
    { zone: 'prince-george', airport: 'RIC', rate: 175, estimatedHours: 2, estimatedMiles: 30 },
    { zone: 'prince-george', airport: 'DCA', rate: 700, estimatedHours: 5, estimatedMiles: 130 },
    { zone: 'prince-george', airport: 'IAD', rate: 710, estimatedHours: 6.5, estimatedMiles: 140 },
    { zone: 'prince-george', airport: 'BWI', rate: 854, estimatedHours: 8, estimatedMiles: 200 },
    // Norfolk zone
    { zone: 'norfolk', airport: 'RIC', rate: 175, estimatedHours: 4, estimatedMiles: 90 }
  ],
  'executive-mini-bus': [
    // Central Virginia zone
    { zone: 'central-virginia', airport: 'RIC', rate: 185, estimatedHours: 1, estimatedMiles: 15 },
    { zone: 'central-virginia', airport: 'DCA', rate: 720, estimatedHours: 4, estimatedMiles: 110 },
    { zone: 'central-virginia', airport: 'IAD', rate: 730, estimatedHours: 4.5, estimatedMiles: 120 },
    { zone: 'central-virginia', airport: 'BWI', rate: 874, estimatedHours: 7, estimatedMiles: 180 },
    { zone: 'central-virginia', airport: 'CHO', rate: 545, estimatedHours: 2.5, estimatedMiles: 70 },
    // Prince George zone
    { zone: 'prince-george', airport: 'RIC', rate: 185, estimatedHours: 2, estimatedMiles: 30 },
    { zone: 'prince-george', airport: 'DCA', rate: 720, estimatedHours: 5, estimatedMiles: 130 },
    { zone: 'prince-george', airport: 'IAD', rate: 730, estimatedHours: 6.5, estimatedMiles: 140 },
    { zone: 'prince-george', airport: 'BWI', rate: 874, estimatedHours: 8, estimatedMiles: 200 }
  ],
  'mini-bus-sofa': [
    // Central Virginia zone
    { zone: 'central-virginia', airport: 'RIC', rate: 185, estimatedHours: 1, estimatedMiles: 15 },
    { zone: 'central-virginia', airport: 'DCA', rate: 720, estimatedHours: 4, estimatedMiles: 110 },
    { zone: 'central-virginia', airport: 'IAD', rate: 730, estimatedHours: 4.5, estimatedMiles: 120 },
    { zone: 'central-virginia', airport: 'BWI', rate: 874, estimatedHours: 7, estimatedMiles: 180 },
    { zone: 'central-virginia', airport: 'CHO', rate: 545, estimatedHours: 2.5, estimatedMiles: 70 },
    // Prince George zone
    { zone: 'prince-george', airport: 'RIC', rate: 185, estimatedHours: 2, estimatedMiles: 30 },
    { zone: 'prince-george', airport: 'DCA', rate: 720, estimatedHours: 5, estimatedMiles: 130 },
    { zone: 'prince-george', airport: 'IAD', rate: 730, estimatedHours: 6.5, estimatedMiles: 140 },
    { zone: 'prince-george', airport: 'BWI', rate: 874, estimatedHours: 8, estimatedMiles: 200 }
  ],
  'stretch-limo': [
    // Central Virginia zone
    { zone: 'central-virginia', airport: 'RIC', rate: 220, estimatedHours: 1, estimatedMiles: 15 },
    { zone: 'central-virginia', airport: 'DCA', rate: 820, estimatedHours: 4, estimatedMiles: 110 },
    { zone: 'central-virginia', airport: 'IAD', rate: 830, estimatedHours: 4.5, estimatedMiles: 120 },
    { zone: 'central-virginia', airport: 'BWI', rate: 1020, estimatedHours: 7, estimatedMiles: 180 },
    { zone: 'central-virginia', airport: 'CHO', rate: 625, estimatedHours: 2.5, estimatedMiles: 70 },
    // Prince George zone
    { zone: 'prince-george', airport: 'RIC', rate: 220, estimatedHours: 2, estimatedMiles: 30 },
    { zone: 'prince-george', airport: 'DCA', rate: 820, estimatedHours: 5, estimatedMiles: 130 },
    { zone: 'prince-george', airport: 'IAD', rate: 830, estimatedHours: 6.5, estimatedMiles: 140 },
    { zone: 'prince-george', airport: 'BWI', rate: 1020, estimatedHours: 8, estimatedMiles: 200 }
  ],
  'sprinter-limo': [
    // Central Virginia zone
    { zone: 'central-virginia', airport: 'RIC', rate: 194, estimatedHours: 1, estimatedMiles: 15 },
    { zone: 'central-virginia', airport: 'DCA', rate: 780, estimatedHours: 4, estimatedMiles: 110 },
    { zone: 'central-virginia', airport: 'IAD', rate: 790, estimatedHours: 4.5, estimatedMiles: 120 },
    { zone: 'central-virginia', airport: 'BWI', rate: 910, estimatedHours: 7, estimatedMiles: 180 },
    { zone: 'central-virginia', airport: 'CHO', rate: 575, estimatedHours: 2.5, estimatedMiles: 70 },
    // Prince George zone
    { zone: 'prince-george', airport: 'RIC', rate: 194, estimatedHours: 2, estimatedMiles: 30 },
    { zone: 'prince-george', airport: 'DCA', rate: 780, estimatedHours: 5, estimatedMiles: 130 },
    { zone: 'prince-george', airport: 'IAD', rate: 790, estimatedHours: 6.5, estimatedMiles: 140 },
    { zone: 'prince-george', airport: 'BWI', rate: 910, estimatedHours: 8, estimatedMiles: 200 },
    // Norfolk zone
    { zone: 'norfolk', airport: 'RIC', rate: 194, estimatedHours: 4, estimatedMiles: 90 }
  ],
  'limo-bus': [
    // Central Virginia zone
    { zone: 'central-virginia', airport: 'RIC', rate: 225, estimatedHours: 1, estimatedMiles: 15 },
    { zone: 'central-virginia', airport: 'DCA', rate: 1020, estimatedHours: 4, estimatedMiles: 110 },
    { zone: 'central-virginia', airport: 'IAD', rate: 1045, estimatedHours: 4.5, estimatedMiles: 120 },
    { zone: 'central-virginia', airport: 'BWI', rate: 1265, estimatedHours: 7, estimatedMiles: 180 },
    { zone: 'central-virginia', airport: 'CHO', rate: 624, estimatedHours: 2.5, estimatedMiles: 70 },
    // Prince George zone
    { zone: 'prince-george', airport: 'RIC', rate: 225, estimatedHours: 2, estimatedMiles: 30 },
    { zone: 'prince-george', airport: 'DCA', rate: 1020, estimatedHours: 5, estimatedMiles: 130 },
    { zone: 'prince-george', airport: 'IAD', rate: 1045, estimatedHours: 6.5, estimatedMiles: 140 },
    { zone: 'prince-george', airport: 'BWI', rate: 1265, estimatedHours: 8, estimatedMiles: 200 },
    // Norfolk zone
    { zone: 'norfolk', airport: 'RIC', rate: 225, estimatedHours: 4, estimatedMiles: 90 }
  ]
};

/**
 * Get airport by code
 */
export function getAirportByCode(code: string): Airport | undefined {
  return AIRPORTS_ARRAY.find(a => a.code.toLowerCase() === code.toLowerCase());
}

/**
 * Get zone by ID
 */
export function getZoneById(id: string): ServiceZone | undefined {
  return SERVICE_ZONES.find(z => z.id === id);
}

/**
 * Get zone-based rate for vehicle, zone, and airport
 */
export function getZoneAirportRate(
  vehicleId: VehicleId,
  zoneId: string,
  airportCode: string
): ZoneAirportRate | undefined {
  const vehicleRates = ZONE_AIRPORT_RATES[vehicleId];
  if (!vehicleRates) return undefined;

  return vehicleRates.find(
    r => r.zone === zoneId && r.airport.toLowerCase() === airportCode.toLowerCase()
  );
}

/**
 * Get all available airports for a zone and vehicle
 */
export function getAvailableAirportsForZone(
  vehicleId: VehicleId,
  zoneId: string
): Airport[] {
  const vehicleRates = ZONE_AIRPORT_RATES[vehicleId];
  if (!vehicleRates) return [];

  const availableCodes = vehicleRates
    .filter(r => r.zone === zoneId)
    .map(r => r.airport);

  return AIRPORTS_ARRAY.filter(a => availableCodes.includes(a.code));
}

/**
 * Get all available zones for an airport and vehicle
 */
export function getAvailableZonesForAirport(
  vehicleId: VehicleId,
  airportCode: string
): ServiceZone[] {
  const vehicleRates = ZONE_AIRPORT_RATES[vehicleId];
  if (!vehicleRates) return [];

  const availableZoneIds = vehicleRates
    .filter(r => r.airport.toLowerCase() === airportCode.toLowerCase())
    .map(r => r.zone);

  return SERVICE_ZONES.filter(z => availableZoneIds.includes(z.id));
}

/**
 * Check if a route exists
 */
export function validateAirportRoute(
  vehicleId: VehicleId,
  zoneId: string,
  airportCode: string
): boolean {
  const rate = getZoneAirportRate(vehicleId, zoneId, airportCode);
  return rate !== undefined;
}

/**
 * Get all airports as simple list
 */
export function getAllAirportCodes(): string[] {
  return AIRPORTS_ARRAY.map(a => a.code);
}

/**
 * Get all zones as simple list
 */
export function getAllZoneIds(): string[] {
  return SERVICE_ZONES.map(z => z.id);
}
