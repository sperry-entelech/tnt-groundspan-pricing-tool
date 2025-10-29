import Image from 'next/image';
import QuoteCalculator from '@/components/pricing/QuoteCalculator';

export default function GNETPartnerPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Luxury Header - Minimalist */}
      <header className="border-b border-gnet-purple/20">
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
              <div className="border-l border-gnet-purple/30 pl-6">
                <div className="bg-gradient-to-r from-gnet-purple to-gnet-violet px-4 py-1 border border-gnet-purple/40">
                  <p className="text-white text-xs tracking-widest uppercase font-light">Partner Portal</p>
                </div>
              </div>
            </div>

            {/* Contact - Minimal & Elegant */}
            <div className="text-right">
              <p className="text-gnet-purple text-sm tracking-widest mb-1">PARTNER SUPPORT</p>
              <a href="mailto:partners@tntlimousine.com" className="text-white text-xl font-light tracking-wide hover:text-gnet-purple transition-colors">
                partners@tntlimousine.com
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Clean & Powerful */}
      <div className="relative border-b border-gnet-purple/20">
        <div className="container mx-auto px-8 py-24">
          <div className="max-w-4xl">
            <h2 className="text-7xl font-light text-white mb-6 tracking-tight leading-tight">
              Premium<br />
              Transportation<br />
              <span className="text-gnet-purple">Pricing</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-gnet-purple to-gnet-violet mb-8"></div>
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
            <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Generate Quote</h3>
            <div className="w-16 h-px bg-gradient-to-r from-gnet-purple to-gnet-violet"></div>
          </div>

          {/* Calculator */}
          <div className="bg-tnt-dark-grey/50 border border-gnet-purple/20 p-12">
            <QuoteCalculator platform="gnet" />
          </div>
        </div>
      </div>

      {/* Partner Features - Minimal Grid */}
      <div className="border-t border-gnet-purple/20 bg-tnt-dark-grey/30">
        <div className="container mx-auto px-8 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-12">
              <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Partnership Benefits</h3>
              <div className="w-16 h-px bg-gradient-to-r from-gnet-purple to-gnet-violet"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h4 className="text-2xl font-light text-white mb-4 tracking-tight">Commission Structure</h4>
                <div className="w-12 h-px bg-gradient-to-r from-gnet-purple to-gnet-violet mb-6"></div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Standard Vehicles</div>
                      <p className="text-tnt-silver text-sm font-light">12% commission on all standard bookings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Premium Vehicles</div>
                      <p className="text-tnt-silver text-sm font-light">15% commission on premium fleet bookings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Volume Bonuses</div>
                      <p className="text-tnt-silver text-sm font-light">Additional incentives for monthly booking targets</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Transparent Tracking</div>
                      <p className="text-tnt-silver text-sm font-light">Real-time commission reporting and analytics</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-2xl font-light text-white mb-4 tracking-tight">Partner Services</h4>
                <div className="w-12 h-px bg-gradient-to-r from-gnet-purple to-gnet-violet mb-6"></div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Priority Dispatch</div>
                      <p className="text-tnt-silver text-sm font-light">Preferential booking and vehicle allocation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Account Manager</div>
                      <p className="text-tnt-silver text-sm font-light">Dedicated support for all partnership needs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Custom Dashboards</div>
                      <p className="text-tnt-silver text-sm font-light">Advanced reporting and business intelligence</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-gnet-purple mt-2"></div>
                    <div>
                      <div className="text-white font-light">Marketing Support</div>
                      <p className="text-tnt-silver text-sm font-light">Co-branding materials and promotional assistance</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Elegant & Minimal */}
      <footer className="border-t border-gnet-purple/20 bg-black">
        <div className="container mx-auto px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h5 className="text-white font-light text-lg mb-4 tracking-wide">Partnership</h5>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>GNET Partner Portal</p>
                  <p>Exclusive Rates</p>
                  <p>Commission Tracking</p>
                </div>
              </div>

              <div>
                <h5 className="text-white font-light text-lg mb-4 tracking-wide">Contact</h5>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>partners@tntlimousine.com</p>
                  <p>(804) XXX-XXXX</p>
                  <p>24/7 Partner Support</p>
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
                <h5 className="text-white font-light text-lg mb-4 tracking-wide">Program</h5>
                <div className="space-y-2 text-tnt-silver font-light">
                  <p>12-15% Commission</p>
                  <p>Volume Incentives</p>
                  <p>Priority Booking</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gnet-purple/20 pt-8">
              <p className="text-tnt-silver text-sm font-light tracking-widest">
                © 2025 GNET PARTNER PROGRAM • TNT LIMOUSINE SERVICE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
