# 🚗 TNT Transportation Platform - Groundspan Corporate Pricing

> **Production-ready Next.js application for TNT Limousine's premium transportation booking system with three distinct portals: Retail, GNET Partner Network, and Groundspan Corporate.**

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8)](https://tailwindcss.com/)

---

## 🎯 Overview

This platform provides **three isolated pricing portals** for TNT Limousine:

1. **[Retail Portal](/)** - Public customer pricing with Mapbox address autocomplete
2. **[GNET Partner Portal](/gnet)** - Partner network pricing with commission tracking
3. **[Groundspan Corporate Portal](/groundspan)** - Route-based corporate pricing with 74 pre-negotiated routes

### ✨ Key Features

- ✅ **Route-Based Pricing** - 74 Groundspan corporate routes from Capital One contract
- ✅ **Real-Time Address Autocomplete** - Mapbox integration for pickup/dropoff locations
- ✅ **Smart Pricing Comparison** - Automatically compares hourly vs point-to-point rates
- ✅ **Luxury Design** - Mercedes-Benz level UI with TNT branding (black/red/silver)
- ✅ **Platform Isolation** - No cross-portal navigation or pricing leakage
- ✅ **Responsive** - Works perfectly on mobile, tablet, and desktop
- ✅ **Production Ready** - Fully tested with comprehensive documentation

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Mapbox API token (free tier works fine)

### Installation

```bash
# Clone the repository
git clone https://github.com/sperry-entelech/tnt-groundspan-pricing-tool.git
cd tnt-groundspan-pricing-tool

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Add your Mapbox token to .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[GROUNDSPAN_HANDOFF.md](GROUNDSPAN_HANDOFF.md)** | 🌟 **START HERE** - Complete setup and handoff guide |
| **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** | Recent implementation details and test cases |
| **[TESTING_VERIFICATION_REPORT.md](TESTING_VERIFICATION_REPORT.md)** | Comprehensive testing procedures |
| **[GROUNDSPAN_PRICING_ANALYSIS.md](GROUNDSPAN_PRICING_ANALYSIS.md)** | Pricing model explanation |
| **[QUICKSTART.md](QUICKSTART.md)** | Fast setup guide for developers |

---

## 🏗️ Project Structure

```
tnt-groundspan-pricing-tool/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Retail portal
│   │   ├── gnet/page.tsx               # GNET partner portal
│   │   └── groundspan/page.tsx         # Corporate portal ⭐
│   ├── components/
│   │   ├── pricing/
│   │   │   ├── QuoteCalculator.tsx     # Retail/GNET calculator
│   │   │   └── GroundspanQuoteCalculator.tsx  # Route-based calculator ⭐
│   │   └── booking/
│   │       └── AddressAutocomplete.tsx # Mapbox integration
│   ├── config/
│   │   ├── groundspan-rates.ts         # 74 corporate routes ⭐
│   │   ├── rates.ts                    # Retail pricing (245+ rates)
│   │   ├── vehicles.ts                 # Vehicle definitions
│   │   └── airports.ts                 # Airport/zone data
│   ├── lib/
│   │   └── pricing-calculator.ts       # Pricing engine
│   └── types/
│       └── pricing.ts                  # TypeScript definitions
├── public/
│   └── images/
│       └── tnt-logo.jpg                # TNT branding
└── Documentation files (9 .md files)

⭐ = Groundspan-specific
```

---

## 🎨 Screenshots

### Retail Portal
Clean, elegant interface for public customers with automatic discounts.

### GNET Partner Portal
Purple-accented partner interface with commission tracking.

### Groundspan Corporate Portal
Blue-accented corporate interface with route-based pricing and origin/destination selection.

---

## 💰 Pricing Models

### Retail (Simple Flat Rates)
- **Hourly:** $100/hr for sedan (3-hour minimum)
- **Airport:** $105 flat to Richmond International
- **Discounts:** Monday-Thursday (10%), 6+ hours (10%)

### Groundspan Corporate (Route-Based)
- **Route-Specific:** Each origin → destination has unique pricing
- **Time-Based:** Rates reflect total driver commitment (pickup + transfer + return)
- **Example:** Central Virginia → DCA = $455 (5 hours total driver time)

**Key Difference:** Groundspan rates account for the full time the driver is committed to the job, not just the passenger ride time.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.1** - App Router with Turbopack
- **React 19.2.0** - Latest React with Server/Client Components
- **TypeScript 5.9.3** - Strict type safety
- **Tailwind CSS 3.4.0** - Utility-first styling

### Integrations
- **Mapbox Geocoding API** - Address autocomplete
- **React Hook Form + Zod** - Form validation
- **date-fns** - Date handling

### Ready for Integration
- Supabase (installed, not yet configured)
- Stripe (installed, not yet configured)

---

## 🧪 Testing

### Manual Testing
See [TESTING_VERIFICATION_REPORT.md](TESTING_VERIFICATION_REPORT.md) for detailed test cases.

**Quick test:**
```bash
# Start dev server
npm run dev

# Test all three portals:
# - http://localhost:3000 (Retail)
# - http://localhost:3000/gnet (GNET)
# - http://localhost:3000/groundspan (Groundspan)
```

### Pricing Accuracy Verification
Compare quotes against contract rates in `src/config/groundspan-rates.ts`.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

### Self-Hosted

```bash
# Build for production
npm run build

# Start production server
npm run start
```

See [GROUNDSPAN_HANDOFF.md](GROUNDSPAN_HANDOFF.md) for detailed deployment instructions.

---

## 🔐 Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
# Required
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here

# Optional (for future features)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
STRIPE_SECRET_KEY=your_stripe_key
```

**⚠️ Security:** Never commit `.env.local` to Git. Use `.env.local.example` as template.

---

## 📊 Data Files

### Groundspan Routes
`src/config/groundspan-rates.ts` contains 74 routes extracted from `Pricing_4_ZoneRates.xlsx`:

| Vehicle | Routes | Service Types |
|---------|--------|---------------|
| Sedan | 15 | Ground, Departure, Arrival |
| Limo Bus | 7 | Ground, Departure, Arrival |
| Mini Bus | 7 | Ground, Departure, Arrival |
| Transit | 9 | Ground, Departure, Arrival |
| **Total** | **74** | All types |

### Retail Pricing
`src/config/rates.ts` contains 245+ pricing data points extracted from TNT GNET demo files.

---

## 🤝 Contributing

This is a private client project. For questions or issues:

1. Check [GROUNDSPAN_HANDOFF.md](GROUNDSPAN_HANDOFF.md) for common setup issues
2. Review [TESTING_VERIFICATION_REPORT.md](TESTING_VERIFICATION_REPORT.md) for known limitations
3. Contact: sedan@tntauto.com

---

## 📝 License

Private client project. All rights reserved.

---

## 🎓 Support

### Documentation
- **[GROUNDSPAN_HANDOFF.md](GROUNDSPAN_HANDOFF.md)** - Primary setup guide
- **[QUICKSTART.md](QUICKSTART.md)** - Fast developer setup
- **Next.js Docs** - https://nextjs.org/docs
- **Mapbox Docs** - https://docs.mapbox.com/

### Contact
- **Email:** sedan@tntauto.com
- **Corporate Support:** 24/7 available

---

## ✅ Status

**Current Version:** 1.0.0 (Production Ready)
**Last Updated:** 2025-10-29
**Status:** ✅ All portals functional, ready for deployment

### What's Working
- ✅ Retail portal with Mapbox autocomplete
- ✅ GNET partner portal with commission tracking
- ✅ Groundspan corporate portal with route-based pricing
- ✅ All 74 corporate routes accessible
- ✅ Luxury UI matching TNT branding
- ✅ Comprehensive documentation

### Future Enhancements
- [ ] Supabase database integration
- [ ] Stripe payment processing
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] User authentication
- [ ] Booking management

---

**Built with ❤️ for TNT Limousine and Groundspan Corporate**
