import React from 'react';
import { Development, ServiceItem, SiteSettings, Testimonial } from '../types';
import { DevelopmentCard } from '../components/DevelopmentCard';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Landmark,
  TrendingUp,
  Compass,
  Home,
  Vault,
  Megaphone,
  CheckCircle2,
  PhoneCall,
  Quote
} from 'lucide-react';
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem
} from '../components/ScrollAnimations';

interface HomePageProps {
  developments: Development[];
  services: ServiceItem[];
  settings: SiteSettings;
  testimonials: Testimonial[];
  onNavigate: (path: string) => void;
  onOpenLeadModal: (initialDevelopmentId?: string, initialPlotSize?: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-[#C8A45D]" />,
  Landmark: <Landmark className="w-5 h-5 text-[#C8A45D]" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[#C8A45D]" />,
  Vault: <Vault className="w-5 h-5 text-[#C8A45D]" />,
  Home: <Home className="w-5 h-5 text-[#C8A45D]" />,
  Compass: <Compass className="w-5 h-5 text-[#C8A45D]" />,
  Megaphone: <Megaphone className="w-5 h-5 text-[#C8A45D]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#C8A45D]" />
};

export const HomePage: React.FC<HomePageProps> = ({
  developments,
  services,
  settings,
  testimonials,
  onNavigate,
  onOpenLeadModal
}) => {
  const featuredDevelopments = developments.filter((d) => d.featured).slice(0, 2);

  return (
    <div className="space-y-24 md:space-y-32 pb-24 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[86vh] flex items-center justify-center overflow-hidden bg-[#0B1930] pt-6 pb-20">
        {/* Background Image with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_oasis_development_1793643952183.jpg"
            alt="Oasis Ray Developments master planned community"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1930] via-[#0B1930]/85 to-[#0B1930]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-[#0B1930]/60" />
        </div>

        {/* Hero Content with Slide-In Left */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 sm:pt-16">
          <div className="max-w-3xl space-y-6">
            {/* Tagline kicker: Clean unboxed text, no pills, no sparkles */}
            <SlideInLeft delay={0.1}>
              <div className="text-xs font-semibold tracking-widest text-[#C8A45D] uppercase">
                {settings.tagline}
              </div>
            </SlideInLeft>

            {/* Main Headline */}
            <SlideInLeft delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Building More Than Properties.{' '}
                <span className="text-[#C8A45D]">Creating Generational Value.</span>
              </h1>
            </SlideInLeft>

            {/* Supporting Text */}
            <SlideInLeft delay={0.3}>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Oasis Ray Developments creates structured real estate opportunities through strategic land acquisition, property development and intelligent investment solutions.
              </p>
            </SlideInLeft>

            {/* CTAs */}
            <FadeIn delay={0.4}>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('/developments')}
                  className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-all rounded-lg shadow-lg shadow-[#C8A45D]/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Explore Our Developments</span>
                  <ArrowRight className="w-4 h-4 text-[#0B1930] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenLeadModal()}
                  className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#102342]/90 hover:bg-[#142B52] border border-[#1E3A6E] transition-all rounded-lg flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <PhoneCall className="w-4 h-4 text-[#C8A45D]" />
                  <span>Speak to an Advisor</span>
                </button>
              </div>
            </FadeIn>

            {/* Trust Anchors */}
            <FadeIn delay={0.5}>
              <div className="pt-8 border-t border-[#1E3A6E]/50 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A45D]" />
                  <span>Zero-Encumbrance Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A45D]" />
                  <span>Structured Milestone Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A45D]" />
                  <span>Registered State Surveys</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION: Left Slide-In / Right Slide-In */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <SlideInLeft className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
              Corporate Profile
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Real Estate With Purpose.{' '}
              <span className="text-[#C8A45D]">Investments With Perspective.</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                Oasis Ray Developments Ltd. is an established real estate development, investment and property marketing company operating at the intersection of capital discipline and community foresight.
              </p>
              <p>
                Our core commitment is helping individuals, high-net-worth investors, diaspora clients, and corporate entities acquire, bank, and develop prime real estate assets across strategically positioned corridors. Every property in our portfolio is selected through exhaustive due diligence, verifiable title charting, and infrastructure viability assessments.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8A45D] hover:text-[#DFC07C] transition-colors"
              >
                <span>Read Full Corporate Profile & Vision</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </SlideInLeft>

          <SlideInRight className="lg:col-span-5 bg-[#102342] border border-[#1E3A6E] rounded-2xl p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Corporate Vision Statement
            </div>
            <p className="font-serif-title text-lg sm:text-xl text-white italic leading-relaxed">
              "{settings.companyVision}"
            </p>
            <div className="pt-4 border-t border-[#1E3A6E] flex items-center justify-between text-xs text-slate-400">
              <span className="text-[#C8A45D] font-semibold">OASIS RAY DEVELOPMENTS LTD.</span>
              <span>RC Registered Entity</span>
            </div>
          </SlideInRight>
        </div>
      </section>

      {/* 3. COMPANY STATISTICS (Editable Placeholders): Staggered Fade */}
      <section className="bg-[#060E1A] border-y border-[#1E3A6E]/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
            <StaggerItem direction="left" className="space-y-1 border-l-2 border-[#C8A45D] pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {settings.stats.developmentsCount}
              </div>
              <div className="text-xs text-slate-400">Flagship Developments</div>
            </StaggerItem>

            <StaggerItem direction="up" className="space-y-1 border-l-2 border-[#C8A45D] pl-4">
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {settings.stats.locationsCovered}
              </div>
              <div className="text-xs text-slate-400">Strategic Development Axes</div>
            </StaggerItem>

            <StaggerItem direction="up" className="space-y-1 border-l-2 border-[#C8A45D] pl-4">
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {settings.stats.opportunitiesCount}
              </div>
              <div className="text-xs text-slate-400">Active Investment Allocation</div>
            </StaggerItem>

            <StaggerItem direction="right" className="space-y-1 border-l-2 border-[#C8A45D] pl-4">
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {settings.stats.experienceYears}
              </div>
              <div className="text-xs text-slate-400">Industry Leadership Benchmark</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 4. FEATURED DEVELOPMENTS: Left & Right Slide In */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Current Portfolio
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Featured Real Estate Developments
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Explore our active gated communities and master developments situated in Ogun State's fastest growing residential and commercial corridors.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/developments')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8A45D] hover:text-[#DFC07C] transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>View All Developments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredDevelopments[0] && (
            <SlideInLeft delay={0.1}>
              <DevelopmentCard
                development={featuredDevelopments[0]}
                onViewDetails={(slug) => onNavigate(`/developments/${slug}`)}
                onQuickEnquire={(id) => onOpenLeadModal(id)}
              />
            </SlideInLeft>
          )}

          {featuredDevelopments[1] && (
            <SlideInRight delay={0.2}>
              <DevelopmentCard
                development={featuredDevelopments[1]}
                onViewDetails={(slug) => onNavigate(`/developments/${slug}`)}
                onQuickEnquire={(id) => onOpenLeadModal(id)}
              />
            </SlideInRight>
          )}
        </div>
      </section>

      {/* 5. CORE SERVICES: Staggered Fade & Slide In */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
              Capabilities & Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Our Core Real Estate Services
            </h2>
            <p className="text-sm text-slate-300">
              A comprehensive, end-to-end suite of property development, advisory, and marketing services crafted to protect and grow investor capital.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {services.map((service, idx) => (
            <StaggerItem
              key={service.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-6 space-y-4 hover:border-[#C8A45D]/50 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#060E1A] border border-[#1E3A6E] flex items-center justify-center">
                    {serviceIcons[service.iconName] || <Building2 className="w-5 h-5 text-[#C8A45D]" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {service.number}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1E3A6E]/40">
                <button
                  onClick={() => onNavigate('/services')}
                  className="text-xs font-medium text-[#C8A45D] hover:text-[#DFC07C] inline-flex items-center gap-1 transition-colors"
                >
                  Learn details →
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 6. WHY CHOOSE OASIS RAY: Left & Right Grid Stagger */}
      <section className="bg-[#060E1A] border-y border-[#1E3A6E]/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Institutional Pillars
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Why Discerning Investors Choose Oasis Ray
              </h2>
              <p className="text-sm text-slate-300">
                Grounded in transparency, rigorous legal vetting, and long-term capital preservation across market cycles.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {[
              {
                title: 'Strategic Property Locations',
                desc: 'All projects are situated along demonstrable civic infrastructure trajectories, including inter-state expressways and rail hubs.',
                point: 'High capital velocity',
                dir: 'left' as const
              },
              {
                title: 'Structured Investment Opportunities',
                desc: 'Clear, milestone-based payment schedules that enable transparent capital allocation without unbudgeted levies.',
                point: 'Zero hidden charges',
                dir: 'up' as const
              },
              {
                title: 'Development-Focused Approach',
                desc: 'We are active developers, not passive land merchants. We build gatehouses, paved boulevards, drainage, and utilities.',
                point: 'Tangible infrastructure',
                dir: 'right' as const
              },
              {
                title: 'Long-Term Value Creation',
                desc: 'Structured to preserve capital against currency devaluation and yield compounding generational appreciation.',
                point: 'Inflation resilience',
                dir: 'left' as const
              },
              {
                title: 'Professional Property Advisory',
                desc: 'Dedicated investment advisors who listen, evaluate your financial objectives, and match you with suitable parcels.',
                point: 'Personalized guidance',
                dir: 'up' as const
              },
              {
                title: 'Transparent Communication',
                desc: 'Full coordinate disclosure, chartable surveys, on-site live inspection tours, and transparent contractual terms.',
                point: 'Absolute integrity',
                dir: 'right' as const
              }
            ].map((pillar, idx) => (
              <StaggerItem
                key={idx}
                direction={pillar.dir}
                className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-6 space-y-3 hover:border-[#C8A45D]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-[#C8A45D] font-mono font-semibold">
                  <span>0{idx + 1}.</span>
                  <span className="text-[11px] text-slate-400">{pillar.point}</span>
                </div>
                <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. DEDICATED INVESTMENT PROMOTION: Left Text / Right Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#102342] border border-[#1E3A6E] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <SlideInLeft className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Strategic Wealth Preservation
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Your Next Investment Could Begin With The Right Location.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Land banking and structured property acquisitions remain the most resilient hedge against economic volatility in Nigeria. Speak with our advisory team to review verified title documents, site surveys, and structured installment options.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('/investment')}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-lg shadow-sm"
                >
                  Explore Investment Opportunities
                </button>
                <button
                  onClick={() => onOpenLeadModal()}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#060E1A] hover:bg-[#142B52] border border-[#1E3A6E] transition-colors rounded-lg"
                >
                  Schedule Advisory Call
                </button>
              </div>
            </SlideInLeft>

            <SlideInRight className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden border border-[#C8A45D]/40 shadow-2xl relative">
                <img
                  src="/src/assets/images/land_banking_growth_1793643954174.jpg"
                  alt="Land Banking and Real Estate Investment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-center text-xs font-semibold text-white bg-[#0B1930]/90 py-1.5 px-2 rounded backdrop-blur-sm border border-[#1E3A6E]">
                  Verified Cadastral Growth Corridors
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* 8. FOUNDER SECTION: Left Portrait / Right Text */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Founder Portrait (Slide In from Left) */}
            <SlideInLeft className="md:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 aspect-square rounded-2xl overflow-hidden border-2 border-[#C8A45D]/60 shadow-2xl">
                <img
                  src="/src/assets/images/founder_oluwayemi_portrait_1793643953758.jpg"
                  alt="Oluwayemi James Damilare - Founder & Lead Visionary"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </SlideInLeft>

            {/* Founder Message (Slide In from Right) */}
            <SlideInRight className="md:col-span-7 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Executive Leadership
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {settings.founderName}
              </h2>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {settings.founderRole}
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed pt-2">
                <p>
                  "At Oasis Ray Developments, we believe that real estate development is far more than building walls or surveying boundaries. It is the deliberate stewardship of spaces that become conduits of enduring prosperity, security, and influence for families and organizations."
                </p>
                <p>
                  "We have dedicated our enterprise to being the calm side of smart investing — a sanctuary where investors encounter clarity, transparent documentation, and genuine execution across every market cycle."
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E3A6E] flex items-center justify-between text-xs text-slate-400">
                <span>Oasis Ray Developments Ltd.</span>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-[#C8A45D] hover:text-[#DFC07C] font-semibold"
                >
                  Founder Profile →
                </button>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS: Slide In from Left and Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Client Perspectives
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Verified Investor Experiences
              </h2>
            </div>
            <div className="text-xs text-slate-400 italic">
              * All reviews are verified by Oasis Ray investor relations.
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials[0] && (
            <SlideInLeft delay={0.1}>
              <div className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-6 sm:p-8 space-y-4 relative flex flex-col justify-between h-full">
                <Quote className="w-8 h-8 text-[#C8A45D]/30" />
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{testimonials[0].quote}"
                </p>
                <div className="pt-4 border-t border-[#1E3A6E]/50 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{testimonials[0].authorName}</div>
                    <div className="text-xs text-slate-400">{testimonials[0].authorRole} · {testimonials[0].authorLocation}</div>
                  </div>
                  <div className="text-[11px] text-[#C8A45D] font-mono font-medium">
                    {testimonials[0].propertyInvested}
                  </div>
                </div>
              </div>
            </SlideInLeft>
          )}

          {testimonials[1] && (
            <SlideInRight delay={0.2}>
              <div className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-6 sm:p-8 space-y-4 relative flex flex-col justify-between h-full">
                <Quote className="w-8 h-8 text-[#C8A45D]/30" />
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{testimonials[1].quote}"
                </p>
                <div className="pt-4 border-t border-[#1E3A6E]/50 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{testimonials[1].authorName}</div>
                    <div className="text-xs text-slate-400">{testimonials[1].authorRole} · {testimonials[1].authorLocation}</div>
                  </div>
                  <div className="text-[11px] text-[#C8A45D] font-mono font-medium">
                    {testimonials[1].propertyInvested}
                  </div>
                </div>
              </div>
            </SlideInRight>
          )}
        </div>
      </section>

      {/* 10. FINAL CTA: Fade and Lift */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-to-br from-[#102342] to-[#060E1A] border border-[#C8A45D]/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Let's Build Your Next Chapter in Real Estate.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Discover opportunities, explore our developments and connect with the Oasis Ray team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <button
                onClick={() => onNavigate('/developments')}
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-all rounded-lg shadow-md"
              >
                Explore Properties
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1930] hover:bg-[#142B52] border border-[#1E3A6E] transition-all rounded-lg"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};
