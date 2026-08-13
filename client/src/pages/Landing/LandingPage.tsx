import React from 'react';
import { LandingNavbar } from './components/LandingNavbar';
import { MarketTicker } from './components/MarketTicker';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DashboardPreview } from './components/DashboardPreview';
import { ScreenshotAnalysis } from './components/ScreenshotAnalysis';
import { AIChatPreview } from './components/AIChatPreview';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { LandingFooter } from './components/LandingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      {/* Global Sticky Navbar */}
      <LandingNavbar />

      {/* Live Market Ticker */}
      <MarketTicker />

      {/* Hero Section */}
      <div id="home">
        <HeroSection />
      </div>

      {/* Feature Section */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Why Choose Us Comparison */}
      <div id="markets">
        <WhyChooseUs />
      </div>

      {/* Interactive Dashboard Showcase */}
      <div id="prediction">
        <DashboardPreview />
      </div>

      {/* Vision AI Screenshot Analysis */}
      <ScreenshotAnalysis />

      {/* ChatGPT-5 Financial Assistant Section */}
      <AIChatPreview />

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Testimonials */}
      <div id="about">
        <TestimonialsSection />
      </div>

      {/* FAQ Section */}
      <div id="contact">
        <FAQSection />
      </div>

      {/* Call to Action Banner */}
      <CTASection />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};
