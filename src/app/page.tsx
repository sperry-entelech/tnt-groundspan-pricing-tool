import Image from 'next/image';
import QuoteCalculator from '@/components/pricing/QuoteCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Luxury Header - Minimalist */}
      <header className="border-b border-tnt-silver/20">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* TNT Logo */}
            <div className="relative w-64 h-16">
              <Image
                src="/images/tnt-logo.jpg"
                alt="TNT Limousine"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Contact - Minimal & Elegant */}
            <div className="text-right">
              <p className="text-tnt-silver text-sm tracking-widest mb-1">24/7 RESERVATIONS</p>
              <a href="tel:804-XXX-XXXX" className="text-white text-xl font-light tracking-wide hover:text-tnt-red transition-colors">
                (804) XXX-XXXX
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Clean & Powerful */}
      <div className="relative border-b border-tnt-silver/20">
        <div className="container mx-auto px-8 py-24">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-light text-white mb-6 tracking-tight leading-tight">
              Premium<br />
              Transportation<br />
              <span className="text-tnt-red">Elevated</span>
            </h1>
            <div className="w-24 h-px bg-tnt-red mb-8"></div>
            <p className="text-xl text-tnt-silver font-light leading-relaxed max-w-2xl">
              Experience unparalleled luxury with Richmond's premier limousine service.
              Professional, punctual, and pristine.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Calculator - Sleek Container */}
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-light text-white mb-3 tracking-tight">Instant Quote</h2>
            <div className="w-16 h-px bg-tnt-red"></div>
          </div>

          {/* Calculator */}
          <div className="bg-tnt-dark-grey/50 border border-tnt-silver/20 p-12">
            <QuoteCalculator platform="retail" />
          </div>
        </div>
      </div>

      {/* Service Highlights - Minimal Grid */}
      <div className="border-t border-tnt-silver/20 bg-tnt-dark-grey/30">
        <div className="container mx-auto px-8 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-tight">Best Price Guarantee</h3>
              <div className="w-12 h-px bg-tnt-red mb-4"></div>
              <p className="text-tnt-silver font-light leading-relaxed">
                Intelligent pricing that compares hourly versus point-to-point rates,
                ensuring you always receive optimal value.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-tight">Instant Confirmation</h3>
              <div className="w-12 h-px bg-tnt-red mb-4"></div>
              <p className="text-tnt-silver font-light leading-relaxed">
                Real-time availability and immediate pricing. No waiting,
                no guesswork—just professional service at your fingertips.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-tight">Premium Fleet</h3>
              <div className="w-12 h-px bg-tnt-red mb-4"></div>
              <p className="text-tnt-silver font-light leading-relaxed">
                From executive sedans to luxury limousine buses.
                Meticulously maintained vehicles for every occasion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Elegant & Minimal */}
      <footer className="border-t border-tnt-silver/20 bg-black">
        <div className="container mx-auto px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h4 className="text-white font-light text-lg mb-4 tracking-wide">Contact</h4>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>Richmond, Virginia</p>
                  <p>(804) XXX-XXXX</p>
                  <p>info@tntlimousine.com</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-light text-lg mb-4 tracking-wide">Hours</h4>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>Available 24/7</p>
                  <p>365 Days a Year</p>
                  <p>Always at Your Service</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-light text-lg mb-4 tracking-wide">Service Area</h4>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>Richmond Metropolitan</p>
                  <p>Central Virginia</p>
                  <p>All Major Airports</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-light text-lg mb-4 tracking-wide">Fleet</h4>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>Executive Sedans</p>
                  <p>Luxury Limousines</p>
                  <p>Executive Coaches</p>
                </div>
              </div>
            </div>

            <div className="border-t border-tnt-silver/20 pt-8">
              <p className="text-tnt-silver text-sm font-light tracking-widest">
                © 2025 TNT LIMOUSINE SERVICE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
