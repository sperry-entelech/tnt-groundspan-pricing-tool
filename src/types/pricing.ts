// Platform Types
export type Platform = 'retail' | 'gnet' | 'groundspan' | 'corporate';

// Service Types
export type ServiceType = 'hourly' | 'point-to-point' | 'airport';

// Vehicle Types
export interface VehicleType {
  id: string;
  name: string;
  unitNo: string;
  capacity: number;
  description?: string;
}

// Pricing Structures
export interface HourlyPricing {
  baseHourly: number;
  gratuity: number;
  fuelSurcharge: number;
  mileageCharge: number;
  totalHourly: number;
  minHours: number;
}

export interface PointToPointPricing {
  baseRate: number;
  gratuityFlat: number;
  fuelSurcharge: number;
  mileageCharge: number;
  total: number;
}

export interface AirportPricing {
  [airport: string]: number;
}

export interface VehiclePricing {
  vehicle: VehicleType;
  hourly: HourlyPricing;
  pointToPoint: PointToPointPricing;
  airport: AirportPricing;
}

// Discounts & Surcharges
export interface Discount {
  name: string;
  type: 'percentage' | 'flat';
  value: number;
  conditions?: string;
}

export interface Surcharge {
  name: string;
  type: 'percentage' | 'flat';
  value: number;
  conditions?: string;
}

// Quote Request
export interface QuoteRequest {
  platform: Platform;
  vehicleType: string;
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDateTime: Date;
  hours?: number;
  passengers: number;
  airport?: string;
  zone?: string;
}

// Price Breakdown
export interface PriceBreakdown {
  basePrice: number;
  gratuity: number;
  fuelSurcharge: number;
  mileageCharge: number;
  discounts: Discount[];
  surcharges: Surcharge[];
  subtotal: number;
  total: number;
}

// Quote Result
export interface QuoteResult {
  id?: string;
  platform: Platform;
  vehicleType: string;
  serviceType: ServiceType;
  recommendedService?: ServiceType;
  hourlyPrice?: number;
  pointToPointPrice?: number;
  airportPrice?: number;
  savings?: number;
  breakdown: PriceBreakdown;
  alternativeOptions?: QuoteResult[];
  createdAt?: Date;
}

// Booking
export interface BookingRequest extends QuoteRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  corporateAccount?: string;
}

export interface Booking extends BookingRequest {
  id: string;
  quoteId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'deposit' | 'paid' | 'invoiced';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Corporate Account
export interface CorporateAccount {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  pricingTier: string;
  discountPercentage?: number;
  billingTerms: string;
  accountManager?: string;
  active: boolean;
  createdAt: Date;
}

// Address
export interface Address {
  formatted: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  zone?: string;
}
