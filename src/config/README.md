# TNT Limousine Pricing Configuration

Complete pricing data extracted from TNT GNET demo HTML files and converted to TypeScript modules for the Next.js production application.

## Data Source

All pricing data extracted from:
- `C:\Users\spder\tnt-gnet-demo\comprehensive-pricing-engine.html` (most complete)
- `C:\Users\spder\tnt-gnet-demo\index.html` (current production)
- `C:\Users\spder\tnt-gnet-demo\gnet-partner-booking.html` (GNET rates)
- `C:\Users\spder\tnt-gnet-demo\capital-one-booking.html` (corporate rates)
- `C:\Users\spder\tnt-gnet-demo\js\airport-zone-pricing.js` (zone-based airport pricing)

**Last Updated:** 2025-10-28

## Module Structure

### 1. `vehicles.ts` - Vehicle Definitions
All 7 vehicle types with complete specifications:

| Vehicle | Unit No | Capacity | Description |
|---------|---------|----------|-------------|
| Executive Sedan | 04/05 | 3 | Lincoln MKT/Aviator |
| Transit Van | - | 15 | Ford Transit |
| Executive Mini Bus | 09 | 12 | Premium mini bus |
| Mini Bus Sofa | 01 | 10 | Sofa-style seating |
| Stretch Limousine | 03 | 8 | Lincoln Continental |
| Sprinter Limousine | 02 | 10 | Mercedes Sprinter |
| Executive Limo Bus | 10 | 18 | Full-size luxury bus |

### 2. `rates.ts` - Pricing Rates

#### Hourly Rates (3-hour minimum)
Breakdown includes: Base Rate + Driver Gratuity + Fuel Surcharge + Mileage Charge

| Vehicle | Total/Hour | Components |
|---------|------------|------------|
| Sedan | $100 | $60 + $12 + $10 + $18 |
| Transit | $137 | $90 + $19 + $10 + $18 |
| Executive Mini Bus | $142 | $95 + $19 + $10 + $18 |
| Mini Bus Sofa | $142 | $95 + $19 + $10 + $18 |
| Stretch Limo | $160 | $113 + $19 + $10 + $18 |
| Sprinter Limo | $160 | $113 + $19 + $10 + $18 |
| Limo Bus | $208 | $152 + $28 + $10 + $18 |

#### Point-to-Point Rates (1-hour minimum)
No hourly driver pay, flat gratuity, billed in 30-min increments after minimum

| Vehicle | Total | Components |
|---------|-------|------------|
| Sedan | $155 | $95 base + $40 gratuity + $10 fuel + $10 mileage |
| Transit | $225 | $165 + $40 + $10 + $10 |
| Executive Mini Bus | $240 | $170 + $50 + $10 + $10 |
| Mini Bus Sofa | $240 | $170 + $50 + $10 + $10 |
| Stretch Limo | $300 | $230 + $50 + $10 + $10 |
| Sprinter Limo | $330 | $260 + $50 + $10 + $10 |
| Limo Bus | $370 | $300 + $50 + $10 + $10 |

#### Airport Rates
Flat rates by zone and airport. Complete breakdown includes base, gratuity, fuel, tolls, parking.

**Airports Serviced:**
- RIC (Richmond International)
- DCA (Reagan National)
- IAD (Washington Dulles)
- BWI (Baltimore Washington)
- CHO (Charlottesville)

**Service Zones:**
- Central Virginia (Richmond metro)
- Prince George
- Norfolk (Hampton Roads)
- Charlottesville

Example rates (Sedan from Central Virginia):
- RIC: $105
- CHO: $333
- DCA: $450
- IAD: $460
- BWI: $657

#### Platform-Specific Pricing

**Groundspan Corporate Premium Rates:**
- $10/hour premium over standard rates
- Example: Sedan $110/hour vs $100 standard
- Includes priority booking, dedicated account management, premium service

**GNET Partner Rates:**
- Same as retail rates
- Partner receives 12% commission (standard services)
- Partner receives 15% commission (airport/premium services)

**Corporate Rates:**
- 15% volume discount from retail rates
- Monthly billing, Net 30 terms
- Standard discounts also apply

### 3. `discounts.ts` - Discount Rules

| Discount | Rate | Conditions | Platforms |
|----------|------|------------|-----------|
| Monday-Thursday | 10% | Service Mon-Thu | Retail, GNET, Corporate |
| 6+ Hour Trip | 10% | 6+ hours booked | Retail, GNET, Corporate |
| Late Inquiry | 15% | Same-day/next-day | Retail, GNET, Corporate |
| Multi-Vehicle | 10% | 2+ vehicles | Retail, GNET, Corporate |
| Corporate Volume | 15% | Corporate accounts | Corporate only |

**Important:** Groundspan premium service does NOT receive standard discounts (they get premium service instead).

### 4. `surcharges.ts` - Surcharge Rules

| Surcharge | Amount | Conditions | Platforms |
|-----------|--------|------------|-----------|
| After-Hours | $20 flat | 11pm-6am pickups | All except Groundspan |
| Holiday | 25% | Major holidays | All |

**Major Holidays:**
- New Year's Day
- Memorial Day
- Independence Day
- Labor Day
- Thanksgiving
- Christmas Day

### 5. `airports.ts` - Airport & Zone Data

Complete zone-based airport pricing with estimated hours and miles for all routes.

**Features:**
- Validate if route exists for vehicle/zone/airport combination
- Get available airports for a zone
- Get available zones for an airport
- Retrieve flat rates with estimated travel time

## Usage Examples

### Calculate Hourly Service Price

```typescript
import { calculatePrice } from '@/lib/pricing-calculator';

const breakdown = calculatePrice({
  vehicleId: 'sedan',
  platform: 'retail',
  serviceType: 'hourly',
  serviceDate: new Date('2025-11-15'), // Friday
  hours: 5,
  pickupTime: '14:00'
});

console.log(breakdown.total); // $500 (5 hours × $100)
```

### Calculate with Discounts

```typescript
const breakdown = calculatePrice({
  vehicleId: 'sedan',
  platform: 'retail',
  serviceType: 'hourly',
  serviceDate: new Date('2025-11-10'), // Monday
  hours: 6,
  pickupTime: '14:00',
  bookingDate: new Date('2025-11-09') // Next-day booking
});

// $600 base - 10% weekday - 10% long trip - 15% late inquiry = ~$409.50
console.log(breakdown.total);
console.log(breakdown.discounts); // Array of applied discounts
```

### Calculate Airport Transfer

```typescript
const breakdown = calculatePrice({
  vehicleId: 'sedan',
  platform: 'retail',
  serviceType: 'airport',
  serviceDate: new Date('2025-11-15'),
  zoneId: 'central-virginia',
  airportCode: 'DCA',
  pickupTime: '06:00'
});

console.log(breakdown.total); // $450 flat rate
```

### Calculate Groundspan Premium

```typescript
const breakdown = calculatePrice({
  vehicleId: 'sedan',
  platform: 'groundspan',
  serviceType: 'hourly',
  serviceDate: new Date('2025-11-10'),
  hours: 4,
  pickupTime: '14:00'
});

console.log(breakdown.total); // $440 (4 hours × $110 premium rate)
console.log(breakdown.corporatePremium); // $40 ($10/hour × 4)
```

### Calculate GNET Commission

```typescript
const breakdown = calculatePrice({
  vehicleId: 'sedan',
  platform: 'gnet',
  serviceType: 'airport',
  serviceDate: new Date('2025-11-15'),
  zoneId: 'central-virginia',
  airportCode: 'DCA',
  pickupTime: '06:00'
});

console.log(breakdown.total); // $450 (client pays)
console.log(breakdown.gnetCommission); // $67.50 (15% for airport)
console.log(breakdown.gnetCommissionRate); // 0.15
```

### Compare Service Types

```typescript
import { compareServiceTypes } from '@/lib/pricing-calculator';

const comparison = compareServiceTypes({
  vehicleId: 'sedan',
  platform: 'retail',
  serviceDate: new Date('2025-11-15'),
  estimatedHours: 3,
  pickupTime: '14:00',
  zoneId: 'central-virginia',
  airportCode: 'DCA'
});

console.log(comparison.recommended); // 'hourly', 'point-to-point', or 'airport'
console.log(comparison.savings); // Amount saved vs most expensive option
console.log(comparison.hourly.total); // $300
console.log(comparison.pointToPoint.total); // $155
console.log(comparison.airport.total); // $450
```

## Business Rules Summary

### Discount Stacking
Discounts are applied sequentially (compounding):
1. Weekday discount (if Mon-Thu)
2. Long trip discount (if 6+ hours)
3. Short notice discount (if same/next day)
4. Multi-vehicle discount (if 2+ vehicles)
5. Corporate discount (if corporate platform)

### Surcharge Application
Surcharges are added after discounts:
1. After-hours fee (flat $20)
2. Holiday surcharge (25% of base)

### Platform Differences

**Retail:**
- Standard rates
- All discounts apply
- All surcharges apply

**GNET:**
- Same rates as retail
- All discounts apply
- All surcharges apply
- Partner receives commission (12% standard, 15% airport)

**Groundspan:**
- Premium rates (+$10/hour or +12-15% for P2P/airport)
- NO standard discounts (premium service instead)
- Surcharges included in base rate

**Corporate:**
- Standard rates
- 15% corporate discount
- All other discounts apply
- All surcharges apply

## Data Validation

All extracted data has been cross-referenced across multiple HTML source files to ensure accuracy:

- ✅ Vehicle definitions verified across all files
- ✅ Hourly rates match in comprehensive-pricing-engine.html and gnet-partner-booking.html
- ✅ Point-to-point rates consistent across sources
- ✅ Airport rates validated against airport-zone-pricing.js
- ✅ Discount percentages confirmed
- ✅ Surcharge rules extracted correctly
- ✅ Platform-specific pricing differences documented
- ✅ Groundspan premium amounts verified from capital-one-booking.html data

## Integration Notes

These modules are designed to work seamlessly with the TypeScript types defined in `@/types/pricing.ts`. The pricing calculator (`pricing-calculator.ts`) provides a complete API for all pricing calculations and can be used throughout the Next.js application.

All rates include driver gratuity. Tolls and parking fees are pass-through costs added at time of service.
