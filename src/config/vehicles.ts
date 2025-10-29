/**
 * TNT Limousine Vehicle Definitions
 *
 * Data source: TNT GNET Demo HTML files
 * Last updated: 2025-10-28
 *
 * All vehicle types with capacities, unit numbers, and descriptions.
 */

import { VehicleType } from '@/types/pricing';

export const VEHICLES: VehicleType[] = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    unitNo: '04/05',
    capacity: 3,
    description: 'Lincoln MKT/Aviator - Comfortable sedan for small groups'
  },
  {
    id: 'transit',
    name: 'Transit Van',
    unitNo: '',
    capacity: 15,
    description: 'Ford Transit - Up to 15 passengers'
  },
  {
    id: 'executive-mini-bus',
    name: 'Executive Mini Bus',
    unitNo: '09',
    capacity: 12,
    description: 'Premium mini bus with executive seating'
  },
  {
    id: 'mini-bus-sofa',
    name: 'Mini Bus with Sofa Seating',
    unitNo: '01',
    capacity: 10,
    description: 'Mini bus featuring comfortable sofa-style seating'
  },
  {
    id: 'stretch-limo',
    name: 'Stretch Limousine',
    unitNo: '03',
    capacity: 8,
    description: 'Lincoln Continental - Classic stretch limousine'
  },
  {
    id: 'sprinter-limo',
    name: 'Sprinter Limousine',
    unitNo: '02',
    capacity: 10,
    description: 'Mercedes Sprinter - Luxury limousine van'
  },
  {
    id: 'limo-bus',
    name: 'Executive Limo Bus',
    unitNo: '10',
    capacity: 18,
    description: 'Full-size luxury limo bus for large groups'
  }
] as const;

/**
 * Get vehicle by ID
 */
export function getVehicleById(id: string): VehicleType | undefined {
  return VEHICLES.find(v => v.id === id);
}

/**
 * Get vehicles by minimum capacity
 */
export function getVehiclesByCapacity(minCapacity: number): VehicleType[] {
  return VEHICLES.filter(v => v.capacity >= minCapacity);
}

/**
 * Vehicle ID type for type safety
 */
export type VehicleId = typeof VEHICLES[number]['id'];
