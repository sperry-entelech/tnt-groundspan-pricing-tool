# Groundspan Corporate Pricing Analysis

**Source:** `Pricing_4_ZoneRates.xlsx`
**Date:** 2025-10-28
**Records:** 74 routes across 8 vehicle types

---

## 🔑 Key Differences: Retail vs. Groundspan

### Retail Pricing (Current Implementation)
- **Simple structure**: Hourly, Point-to-Point, or Airport flat rates
- **Location-agnostic hourly**: $100/hour for sedan regardless of location
- **Zone-based airports**: Richmond area → RIC = $105 (fixed)
- **No route differentiation**: Same hourly rate everywhere

### Groundspan Corporate Pricing (NEW)
- **Route-specific**: Each Origin → Destination combination has unique pricing
- **Time-based calculation**: Rates reflect TOTAL driver time including:
  - Drive time TO pickup location
  - Service/transfer time
  - Drive time BACK to base
- **Service type differentiation**:
  - **Ground**: Within-zone transportation (e.g., Central Virginia → Central Virginia)
  - **Departure**: Dropoff at airport
  - **Arrival**: Pickup from airport
- **Hourly vs Flat**: Mix of hourly ground service and flat-rate transfers

---

## 📊 Pricing Examples

### Example 1: Richmond Airport Transfer
**Retail Customer:**
- Service: Airport transfer
- Vehicle: Sedan
- Route: Central Virginia → RIC Airport
- **Price: $105** (flat rate)

**Groundspan Corporate:**
- Service: Departure
- Vehicle: Lincoln MKT (sedan)
- Route: Central Virginia → Richmond International Airport
- Estimated time: 1 hour
- **Price: $110** (flat rate - 5% premium)

### Example 2: Reagan National Airport
**Retail Customer:**
- Service: Airport transfer
- Vehicle: Sedan
- Route: Central Virginia → DCA
- **Price: $450** (flat rate)

**Groundspan Corporate:**
- Service: Departure
- Vehicle: Lincoln MKT (sedan)
- Route: Central Virginia → Ronald Reagan National Airport
- Estimated time: **5 hours** (includes drive to CVA, transfer, drive back)
- **Price: $455** (flat rate - reflects 5 hour commitment)

### Example 3: Ground Transportation
**Retail Customer:**
- Service: Hourly
- Vehicle: Sedan
- Hours: 3 (minimum)
- **Price: $100/hour = $300** (plus discounts)

**Groundspan Corporate:**
- Service: Ground
- Vehicle: Lincoln Aviator (sedan)
- Route: Central Virginia → Central Virginia
- **Price: $110/hour** (10% premium)

---

## 🚗 Vehicle Mapping

| Groundspan Name | System ID | Notes |
|---|---|---|
| Lincoln MKT | `sedan` | Executive sedan |
| Lincoln Aviator | `sedan` | Alternative executive sedan |
| Ford Transit 15 Pax | `transit` | 15-passenger van |
| Ford Transit 12 Pax | `transit` | 12-passenger van |
| Executive Mini Bus | `executive-mini-bus` | Unit 09 |
| Mini Bus | `mini-bus-sofa` | Unit 01 |
| Stretch Limousine -8 | `stretch-limo` | Unit 03 - 8 passengers |
| Mercedes Limo Sprinter | `sprinter-limo` | Unit 02 |
| Limo Bus | `limo-bus` | Unit 10 - 18 passengers |

---

## 📍 Available Routes (74 total)

### Airports Served
- **RIC**: Richmond International Airport
- **DCA**: Ronald Reagan National Airport
- **IAD**: Washington Dulles International Airport
- **CHO**: Charlottesville Albemarle Airport

### Primary Zones
- **Central Virginia**: Richmond metro area (primary service area)
- **Mclean VA**: Northern Virginia (McLean area)
- **Cville**: Charlottesville area

### Service Types
1. **Ground Service**: Within-zone transportation
   - Example: Central Virginia → Central Virginia
   - Pricing: Hourly or flat depending on vehicle

2. **Departure Service**: Airport dropoffs
   - Example: Central Virginia → RIC Airport
   - Pricing: Flat rate based on estimated total time

3. **Arrival Service**: Airport pickups
   - Example: RIC Airport → Central Virginia
   - Pricing: Flat rate based on estimated total time

---

## 💡 Billing Logic Explanation

**User's Key Insight:**
> "We calculate corporate airport runs or zone deals based on how many hours it would take us to do the job including driving to the zone to pick them up and driving home"

### Example Breakdown: DCA Airport Transfer

**Scenario**: Groundspan employee needs dropoff at Reagan National Airport (DCA)

**Time Calculation:**
1. **Drive from TNT base → Central Virginia pickup** = ~30 min
2. **Central Virginia → DCA** = ~2 hours
3. **Wait/service time** = ~30 min
4. **Drive from DCA → TNT base** = ~2 hours
5. **TOTAL DRIVER TIME** = **~5 hours**

**Therefore:**
- Estimated Hours: 5.0
- Rate: $455 flat (for sedan)
- This covers the ENTIRE 5-hour commitment of the driver

This is why longer-distance routes have higher flat rates - they reflect the full time the driver is committed to the job, not just the passenger ride time.

---

## 🔧 Implementation Status

### ✅ Completed
- [x] Extracted all 74 routes from Excel spreadsheet
- [x] Created `groundspan-rates.ts` configuration file
- [x] Mapped vehicle names to system IDs
- [x] Organized routes by service type (ground/arrival/departure)
- [x] Documented pricing model differences

### ⏳ Next Steps
1. **Update pricing calculator** to handle Groundspan route-based pricing
2. **Modify Groundspan portal UI** to show:
   - Origin selection (dropdown or address)
   - Destination selection (based on available routes)
   - Service type (ground/arrival/departure)
3. **Integrate route lookup** in pricing calculation logic
4. **Add estimated hours display** in quote results
5. **Test all 74 route combinations** for accuracy

### ❓ Questions for User
1. **Data Verification**: Row 8 shows "Cville → Central Virginia" with 0.003 hours - is this a typo? Should be 3.0?
2. **Route Completeness**: Are there any other origins/destinations needed beyond what's in the spreadsheet?
3. **Rate Updates**: How often do these corporate rates change?
4. **Billing Terms**: Should quotes show the "estimated hours" to corporate users, or keep it hidden?

---

## 📋 Route Summary by Vehicle

| Vehicle | Total Routes | Ground | Departures | Arrivals |
|---|---|---|---|---|
| Sedan (MKT/Aviator) | 15 | 5 | 5 | 5 |
| Limo Bus | 7 | 1 | 3 | 3 |
| Mini Bus | 7 | 1 | 3 | 3 |
| Mercedes Sprinter | 7 | 1 | 3 | 3 |
| Executive Mini Bus | 7 | 1 | 3 | 3 |
| Stretch Limo | 7 | 1 | 3 | 3 |
| Transit (15/12 Pax) | 9 | 2 | 4 | 3 |
| **TOTAL** | **74** | **13** | **24** | **23** |

---

## 💰 Price Comparison: Retail vs Groundspan

### Richmond Airport (RIC)
| Vehicle | Retail | Groundspan | Difference |
|---|---|---|---|
| Sedan | $105 | $110 | +$5 (+4.8%) |
| Transit | $175 | $183 | +$8 (+4.6%) |
| Mini Bus | $185 | $183 | -$2 (-1.1%) |
| Stretch Limo | $220 | $178 | -$42 (-19.1%) |
| Limo Bus | $225 | $170-218 | -$55 to -$7 |

### Reagan National (DCA)
| Vehicle | Retail | Groundspan | Difference |
|---|---|---|---|
| Sedan | $450 | $455 | +$5 (+1.1%) |
| Transit | $700 | $800 | +$100 (+14.3%) |
| Mini Bus | $720 | $947 | +$227 (+31.5%) |
| Stretch Limo | $820 | $932 | +$112 (+13.7%) |
| Limo Bus | $1020 | $1097 | +$77 (+7.5%) |

**Analysis**: Groundspan rates are generally HIGHER for longer trips (reflecting true driver time commitment) but can be lower for short local trips.

---

This pricing model is much more sophisticated than retail - it accounts for the true cost of the driver's time commitment, not just the passenger experience.
