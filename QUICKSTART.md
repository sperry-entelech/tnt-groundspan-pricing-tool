# TNT Transportation Platform - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Open the Application
The development server is already running at:
**http://localhost:3050**

Open this URL in your web browser to see the application.

### 2. Explore the Three Platforms

#### Retail Customer Portal
- **URL:** http://localhost:3050/
- **Features:** Standard pricing with all discounts
- **Best For:** General public, direct customers

#### GNET Partner Portal
- **URL:** http://localhost:3050/gnet
- **Features:** Partner pricing with commission tracking
- **Best For:** GNET affiliate partners

#### Groundspan Corporate Portal
- **URL:** http://localhost:3050/groundspan
- **Features:** Corporate rates and account management
- **Best For:** Groundspan employees and corporate accounts

---

## 📝 How to Get a Quote

### Step 1: Select Service Type
Choose from three service types:
- **Hourly:** For events, tours, or extended trips (minimum 3 hours)
- **Point-to-Point:** For one-way or round trips
- **Airport:** Flat-rate airport transfers

### Step 2: Select Vehicle
Pick from our fleet:
- **Sedan (3 passengers)** - Best for business travel
- **Transit Van (15 passengers)** - Large groups
- **Executive Mini Bus (12 passengers)** - Corporate events
- **Mini Bus Sofa (10 passengers)** - Comfortable group travel
- **Stretch Limousine (8 passengers)** - Special occasions
- **Sprinter Limousine (10 passengers)** - Premium group travel
- **Limo Bus (18 passengers)** - Large parties and events

### Step 3: Enter Trip Details
- **Pickup Location:** Start typing an address (will autocomplete when you add Mapbox token)
- **Dropoff Location:** Required for point-to-point service
- **Date & Time:** Select pickup date and time
- **Hours:** For hourly service, select number of hours (3-24)
- **Passengers:** Enter number of travelers

### Step 4: Get Instant Quote
Click "Get Instant Quote" and see:
- **Smart Pricing Comparison:** If applicable, we'll show both hourly and point-to-point rates
- **Best Value Recommendation:** We'll tell you which service saves you money
- **Complete Breakdown:** See base rate, gratuity, fuel, surcharges, and discounts
- **Total Price:** Clear, upfront pricing with no hidden fees

---

## 💰 Pricing Examples

### Example 1: Weekday Wedding Transportation
- **Vehicle:** Stretch Limousine
- **Service:** Hourly (4 hours)
- **Date:** Monday
- **Base Rate:** $160/hour × 4 = $640
- **Monday Discount:** -$64 (10%)
- **Total:** $576 (saves $64!)

### Example 2: Airport Transfer
- **Vehicle:** Sedan
- **Service:** Airport (Richmond to RIC)
- **Zone:** Central Virginia
- **Flat Rate:** $105
- **Total:** $105 (no surprises!)

### Example 3: Corporate Event
- **Vehicle:** Transit Van
- **Service:** Hourly (6 hours)
- **Date:** Thursday
- **Base Rate:** $137/hour × 6 = $822
- **Monday-Thursday Discount:** -$82.20 (10%)
- **6+ Hour Discount:** -$74 (10% of discounted)
- **Total:** $665.80 (saves $156.20!)

---

## 🎯 Smart Features

### Automatic Discounts
Our system automatically applies all eligible discounts:
- ✅ **Monday-Thursday:** 10% off hourly and point-to-point
- ✅ **6+ Hours:** Additional 10% off for long trips
- ✅ **Same-Day/Next-Day:** 15% off for last-minute bookings
- ✅ **Multi-Vehicle:** 10% off when booking 2+ vehicles
- ✅ **Corporate:** 15% off for corporate accounts (Groundspan)

### Smart Recommendations
The calculator compares hourly vs point-to-point pricing and recommends the option that saves you money. For example:
- **Short trips (under 3 hours):** Usually cheaper with point-to-point
- **Long trips (over 6 hours):** Usually cheaper with hourly + discounts

### Transparent Pricing
Every quote shows:
- Base rate breakdown
- Gratuity (built-in, no hidden tips)
- Fuel surcharge
- Mileage charges (if applicable)
- All discounts applied
- Any surcharges (after-hours, holidays)
- **Final total** in bold

---

## 🔧 Configuration Needed

### To Enable Full Functionality

#### 1. Mapbox API Token (for Address Autocomplete)
1. Go to https://account.mapbox.com/access-tokens/
2. Create a new token or copy existing token
3. Open `.env.local` in the project root
4. Replace the placeholder:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_actual_mapbox_token_here
   ```
5. Restart the development server

#### 2. Groundspan Pricing Plan
- Send the Groundspan contract/pricing document
- We'll customize the corporate rates based on your agreement

#### 3. Supabase Database (for saving quotes/bookings)
- Create account at https://supabase.com
- Create new project
- Copy project URL and API keys to `.env.local`

#### 4. Stripe (for payment processing)
- Set up Stripe account at https://stripe.com
- Get API keys from dashboard
- Add to `.env.local`

---

## 🎨 Platform Differences

### Retail (Red Theme)
- **Discounts:** All discounts available
- **Pricing:** Standard rates
- **Features:** Best for price-conscious customers
- **Payments:** Credit card, deposit required

### GNET Partners (Purple Theme)
- **Discounts:** All retail discounts
- **Pricing:** Standard rates
- **Commission:** 12% standard vehicles, 15% premium
- **Features:** Commission tracking, partner reporting

### Groundspan Corporate (Blue Theme)
- **Discounts:** Corporate-specific discounts only
- **Pricing:** Premium rates (+$10/hour vs retail)
- **Features:** Net 30 billing, account management, priority booking
- **Payments:** Invoice billing, no upfront payment

---

## 🧪 Test Scenarios

### Test 1: Best Price Comparison
1. Go to http://localhost:3050/
2. Select "Sedan" vehicle
3. Choose "Hourly" service
4. Enter 3 hours on a Monday
5. Get quote
6. **Result:** Should show Monday discount applied

### Test 2: Platform Differences
1. Get a quote on Retail page (/)
2. Get the same quote on GNET page (/gnet)
3. Get the same quote on Groundspan page (/groundspan)
4. **Result:** Notice pricing differences and features

### Test 3: Service Comparison
1. Select a vehicle and set hours to 4
2. Choose "Hourly" service and get quote
3. Then change to "Point-to-Point" and get quote
4. **Result:** See which service is cheaper (once address fields work with Mapbox)

---

## 📱 Responsive Design

The application works on:
- ✅ **Desktop:** Full feature set, side-by-side comparisons
- ✅ **Tablet:** Optimized layouts, touch-friendly
- ✅ **Mobile:** Stacked components, easy thumb navigation

Test it by resizing your browser window or opening on different devices.

---

## ⌨️ Keyboard Shortcuts

### Address Autocomplete
- **Arrow Down:** Navigate to next suggestion
- **Arrow Up:** Navigate to previous suggestion
- **Enter:** Select highlighted suggestion
- **Escape:** Close suggestions dropdown

### Forms
- **Tab:** Move to next field
- **Shift+Tab:** Move to previous field
- **Enter:** Submit form (on button focus)

---

## 🆘 Troubleshooting

### Issue: Address autocomplete not working
**Solution:** Add valid Mapbox API token to `.env.local` and restart server

### Issue: Quotes showing incorrect prices
**Solution:** Check date/time selection, vehicle type, and service type. All pricing logic is working correctly based on TNT's current rate sheets.

### Issue: Page not loading
**Solution:**
1. Check if server is running: `npm run dev`
2. Check console for errors: Press F12 in browser
3. Verify port 3050 is not blocked by firewall

### Issue: Changes not appearing
**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Restart development server
3. Clear browser cache

---

## 📚 Project Structure

```
tnt-transportation-platform/
├── src/app/                 # Pages (Next.js App Router)
│   ├── page.tsx            # Retail customer portal
│   ├── gnet/page.tsx       # GNET partner portal
│   └── groundspan/page.tsx # Groundspan corporate portal
│
├── src/components/          # React components
│   ├── booking/
│   │   └── AddressAutocomplete.tsx  # Mapbox address search
│   └── pricing/
│       └── QuoteCalculator.tsx      # Main quote form
│
├── src/lib/                # Business logic
│   └── pricing-calculator.ts       # Pricing engine
│
├── src/config/             # Configuration
│   ├── vehicles.ts         # Vehicle definitions
│   ├── rates.ts           # Pricing rates
│   ├── discounts.ts       # Discount rules
│   ├── surcharges.ts      # Surcharge rules
│   └── airports.ts        # Airport/zone data
│
└── src/types/             # TypeScript types
    └── pricing.ts         # Type definitions
```

---

## 🔄 Development Workflow

### Making Changes

#### To Update Pricing Rates:
1. Open `src/config/rates.ts`
2. Find the relevant rate section
3. Update the numbers
4. Save the file (auto-reloads)

#### To Add a New Vehicle:
1. Open `src/config/vehicles.ts`
2. Add new vehicle to VEHICLES array
3. Open `src/config/rates.ts`
4. Add pricing for new vehicle
5. Save and test

#### To Modify Discounts:
1. Open `src/config/discounts.ts`
2. Adjust discount percentages or add new rules
3. Update calculation logic if needed
4. Test with various scenarios

### Git Workflow (Future)
```bash
# Create new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create pull request on GitHub
```

---

## 📊 Performance Tips

### Development Mode
- Hot reloading enabled (changes appear automatically)
- Detailed error messages
- Source maps for debugging
- Slower than production

### Production Mode (Future)
```bash
npm run build     # Build optimized version
npm start         # Start production server
```
- Minified code
- Optimized images
- Fast page loads
- No debug information

---

## 🎓 Learning Resources

### Next.js Documentation
https://nextjs.org/docs

### React Documentation
https://react.dev

### Tailwind CSS
https://tailwindcss.com/docs

### TypeScript Handbook
https://www.typescriptlang.org/docs

### Mapbox API
https://docs.mapbox.com/api/search/geocoding/

---

## ✅ Pre-Launch Checklist

Before going to production:
- [ ] Add valid Mapbox API token
- [ ] Review and adjust Groundspan pricing
- [ ] Set up Supabase database
- [ ] Configure Stripe payment processing
- [ ] Set up email notifications (SendGrid)
- [ ] Test on multiple devices/browsers
- [ ] Security audit
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] Set up monitoring (Sentry)
- [ ] Configure custom domain
- [ ] SSL certificate verification
- [ ] Train staff on admin dashboard
- [ ] Create user documentation

---

## 📞 Support

### Questions?
- **Technical Issues:** Check PROJECT_STATUS.md for detailed information
- **Pricing Logic:** Review src/config/ files for rate details
- **Feature Requests:** Create GitHub issue or contact development team

### Development Server Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality
npm run type-check   # Verify TypeScript
```

---

**Happy Quoting! 🚗💨**

The TNT Transportation Platform is ready to revolutionize your booking process with smart pricing, instant quotes, and seamless user experience across all platforms.

For detailed technical information, see `PROJECT_STATUS.md`