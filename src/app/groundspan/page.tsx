import Image from 'next/image';
import GroundspanQuoteCalculator from '@/components/pricing/GroundspanQuoteCalculator';

export default function GroundspanCorporatePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Luxury Header - Minimalist */}
      <header className="border-b border-groundspan-blue/20">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
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

              {/* Platform Differentiator */}
              <div className="border-l border-groundspan-blue/30 pl-6">
                <div className="bg-groundspan-blue px-4 py-1 border border-groundspan-blue/40">
                  <p className="text-white text-xs tracking-widest uppercase font-light">Corporate Account</p>
                </div>
              </div>
            </div>

            {/* Contact - Minimal & Elegant */}
            <div className="text-right">
              <p className="text-groundspan-blue text-sm tracking-widest mb-1">CORPORATE SUPPORT</p>
              <a href="mailto:sedan@tntauto.com" className="text-white text-xl font-light tracking-wide hover:text-groundspan-blue transition-colors">
                sedan@tntauto.com
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Clean & Powerful */}
      <div className="relative border-b border-groundspan-blue/20">
        <div className="container mx-auto px-8 py-24">
          <div className="max-w-4xl">
            <h2 className="text-7xl font-light text-white mb-6 tracking-tight leading-tight">
              Corporate<br />
              <span className="text-groundspan-blue">Priority Access</span>
            </h2>
            <div className="w-24 h-px bg-groundspan-blue mb-8"></div>
            <p className="text-xl text-tnt-silver font-light leading-relaxed max-w-2xl">
              Experience unparalleled luxury with Richmond's premier limousine service.
              Professional, punctual, and pristine.
            </p>
          </div>
        </div>
      </div>

      {/* Corporate Account Access */}
      <div className="border-b border-groundspan-blue/20 bg-tnt-dark-grey/30">
        <div className="container mx-auto px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/40 border border-groundspan-blue/20 p-12">
              <h3 className="text-3xl font-light text-white mb-4 tracking-tight">Corporate Account Access</h3>
              <div className="w-16 h-px bg-groundspan-blue mb-6"></div>
              <p className="text-tnt-silver font-light leading-relaxed mb-8">
                Groundspan employees can access exclusive corporate pricing and account features.
                Contact your account manager for login credentials.
              </p>
              <div className="flex gap-6">
                <button className="bg-groundspan-blue text-white px-10 py-4 font-light tracking-widest uppercase text-sm hover:bg-blue-700 transition-all duration-300 border border-groundspan-blue hover:border-white">
                  Sign In
                </button>
                <button className="bg-transparent text-tnt-silver px-10 py-4 font-light tracking-widest uppercase text-sm hover:bg-tnt-silver/10 border border-tnt-silver/40 hover:border-tnt-silver transition-all duration-300">
                  Request Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Calculator - Sleek Container */}
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Generate Quote</h3>
            <div className="w-16 h-px bg-groundspan-blue"></div>
          </div>

          {/* Calculator */}
          <div className="bg-tnt-dark-grey/50 border border-groundspan-blue/20 p-12">
            <GroundspanQuoteCalculator platform="groundspan" />
          </div>
        </div>
      </div>

      {/* Corporate Features - Minimal Grid */}
      <div className="border-t border-groundspan-blue/20 bg-tnt-dark-grey/30">
        <div className="container mx-auto px-8 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-12">
              <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Corporate Benefits</h3>
              <div className="w-16 h-px bg-groundspan-blue"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h4 className="text-2xl font-light text-white mb-4 tracking-tight">Account Features</h4>
                <div className="w-12 h-px bg-groundspan-blue mb-6"></div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">Corporate Billing</div>
                      <p className="text-tnt-silver text-sm font-light">Net 30 payment terms with detailed invoicing</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">Multiple Users</div>
                      <p className="text-tnt-silver text-sm font-light">Add employees to your corporate account</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">Booking History</div>
                      <p className="text-tnt-silver text-sm font-light">Access all past and upcoming trips</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">Expense Reports</div>
                      <p className="text-tnt-silver text-sm font-light">Download detailed reports for accounting</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-2xl font-light text-white mb-4 tracking-tight">Premium Services</h4>
                <div className="w-12 h-px bg-groundspan-blue mb-6"></div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">Priority Booking</div>
                      <p className="text-tnt-silver text-sm font-light">Guaranteed vehicle availability for corporate accounts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">Airport Packages</div>
                      <p className="text-tnt-silver text-sm font-light">Special rates for frequent airport transfers</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">Event Transportation</div>
                      <p className="text-tnt-silver text-sm font-light">Custom pricing for conferences and special events</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-groundspan-blue mt-2"></div>
                    <div>
                      <div className="text-white font-light">24/7 Support</div>
                      <p className="text-tnt-silver text-sm font-light">Dedicated hotline for corporate accounts</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Elegant & Minimal */}
      <footer className="border-t border-groundspan-blue/20 bg-black">
        <div className="container mx-auto px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h5 className="text-white font-light text-lg mb-4 tracking-wide">Corporate Account</h5>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>Groundspan Corporate</p>
                  <p>Premium Rates</p>
                  <p>Net 30 Billing</p>
                </div>
              </div>

              <div>
                <h5 className="text-white font-light text-lg mb-4 tracking-wide">Contact</h5>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>sedan@tntauto.com</p>
                  <p>(804) XXX-XXXX</p>
                  <p>24/7 Corporate Support</p>
                </div>
              </div>

              <div>
                <h5 className="text-white font-light text-lg mb-4 tracking-wide">Services</h5>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>Executive Transportation</p>
                  <p>Airport Transfers</p>
                  <p>Corporate Events</p>
                </div>
              </div>

              <div>
                <h5 className="text-white font-light text-lg mb-4 tracking-wide">Features</h5>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>Priority Booking</p>
                  <p>Flexible Billing</p>
                  <p>Account Manager</p>
                </div>
              </div>
            </div>

            <div className="border-t border-groundspan-blue/20 pt-8">
              <p className="text-tnt-silver text-sm font-light tracking-widest">
                © 2025 GROUNDSPAN CORPORATE ACCOUNT • TNT LIMOUSINE SERVICE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
