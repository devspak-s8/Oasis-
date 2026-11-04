import React from 'react';
import { motion } from 'motion/react';
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
  Quote,
  Award,
  MapPin,
  Layers
} from 'lucide-react';
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem,
  DropLanding,
  WakeUpCard,
  TypewriterText
} from '../components/ScrollAnimations';

import { useTheme } from '../context/ThemeContext';
import { FlungCard } from '../components/FlungCard';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const featuredDevelopments = developments.filter((d) => d.featured).slice(0, 2);

  return (
    <div className="space-y-24 md:space-y-32 pb-24 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[86vh] flex items-center justify-center overflow-hidden bg-[#0B1930] pt-6 pb-20">
        {/* Background Image with Drop Landing Physics and Measured Scrim */}
        <DropLanding className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/IMG-20261104-WA0020_35405fe2.jpg"
            alt="Oasis Ray Developments - Christos Gardens Mowe entrance and estate landscape"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1930] via-[#0B1930]/85 to-[#0B1930]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-[#0B1930]/60" />
        </DropLanding>

        {/* Hero Content with Slide-In Left */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 sm:pt-16">
          <div className="max-w-3xl space-y-6">
            {/* Tagline kicker with dynamic typing animation: Clean unboxed text, no pills, no sparkles */}
            <SlideInLeft delay={0.1}>
              <div className="min-h-[24px] flex items-center">
                <TypewriterText
                  phrases={[
                    "THE CALM SIDE OF SMART INVESTING.",
                    "STRATEGIC LAND ACQUISITION IN HIGH-GROWTH CORRIDORS.",
                    "VESSELS OF ENDURING WEALTH ACROSS GENERATIONS.",
                    "VERIFIED CADASTRAL TITLES & ABSOLUTE INTEGRITY."
                  ]}
                  typingSpeed={55}
                  pauseDuration={2400}
                  className="text-xs font-semibold tracking-widest text-[#C8A45D]"
                />
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
                  className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-all rounded-lg shadow-lg flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Explore Our Developments</span>
                  <ArrowRight className="w-4 h-4 text-[#0B1930] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenLeadModal()}
                  className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#102342] hover:bg-[#1A3868] border border-[#C8A45D]/50 transition-all rounded-lg flex items-center justify-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 text-[#C8A45D]" />
                  <span>Speak to an Advisor</span>
                </button>
              </div>
            </FadeIn>

            {/* Trust Anchors */}
            <FadeIn delay={0.5}>
              <div className="pt-8 border-t border-slate-700/80 flex flex-wrap items-center gap-6 text-xs text-slate-200 font-semibold">
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
            <div className={`text-xs font-semibold uppercase tracking-widest ${
              isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'
            }`}>
              Corporate Profile
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#0B1930]'
            }`}>
              Real Estate With Purpose.{' '}
              <span className={isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'}>Investments With Perspective.</span>
            </h2>
            <div className={`space-y-4 text-sm sm:text-base leading-relaxed font-normal ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
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
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isDark ? 'text-[#C8A45D] hover:text-white' : 'text-[#0B1930] hover:text-[#B38E46]'
                }`}
              >
                <span>Read Full Corporate Profile & Vision</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'}`} />
              </button>
            </div>
          </SlideInLeft>

          <SlideInRight className={`lg:col-span-5 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden ${
            isDark ? 'bg-[#102342] text-white border border-[#1E3A6E]' : 'bg-[#0B1930] text-white border border-[#C8A45D]/40'
          }`}>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Corporate Vision Statement
            </div>
            <p className="font-serif-title text-lg sm:text-xl text-white italic leading-relaxed">
              "{settings.companyVision}"
            </p>
            <div className="pt-4 border-t border-[#1E3A6E] flex items-center justify-between text-xs text-slate-300">
              <span className="text-[#C8A45D] font-bold">OASIS RAY DEVELOPMENTS LTD.</span>
              <span>RC Registered Entity</span>
            </div>
          </SlideInRight>
        </div>
      </section>

      {/* 3. REDESIGNED STRATEGIC BENCHMARKS & METRICS */}
      <section className={`border-y py-16 transition-colors ${
        isDark ? 'bg-[#060E1A]/80 border-slate-800' : 'bg-slate-100/90 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className={`text-xs font-semibold uppercase tracking-widest ${
                  isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'
                }`}>
                  Portfolio & Institutional Benchmarks
                </div>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0B1930]'
                }`}>
                  Measured Value. Structured Growth.
                </h2>
              </div>
              <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Asset Metrics · Oasis Ray Developments Ltd.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {/* Metric 1 */}
            <FlungCard index={0} className="group h-full">
              <div className={`rounded-2xl p-6 sm:p-7 space-y-4 border transition-all flex flex-col justify-between h-full relative overflow-hidden ${
                isDark
                  ? 'bg-[#102342] border-[#1E3A6E] text-white hover:border-[#C8A45D]'
                  : 'bg-white border-slate-200/90 text-[#0B1930] hover:border-[#C8A45D] hover:shadow-lg'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isDark ? 'bg-[#060E1A] border-slate-700 text-[#C8A45D]' : 'bg-slate-50 border-slate-200 text-[#B38E46]'
                    }`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight transition-colors ${
                      isDark ? 'text-white group-hover:text-[#C8A45D]' : 'text-[#0B1930] group-hover:text-[#B38E46]'
                    }`}>
                      2 Major Estates
                    </div>
                    <div className={`text-sm font-bold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Strategic Developments
                    </div>
                  </div>
                </div>
                <div className={`pt-3 border-t space-y-1 ${isDark ? 'border-[#1E3A6E]' : 'border-slate-100'}`}>
                  <div className="text-xs font-bold text-[#C8A45D]">
                    Flagship Estates
                  </div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Christos Gardens (Mowe) & Havilah City (Abeokuta)
                  </div>
                </div>
              </div>
            </FlungCard>

            {/* Metric 2 */}
            <FlungCard index={1} className="group h-full">
              <div className={`rounded-2xl p-6 sm:p-7 space-y-4 border transition-all flex flex-col justify-between h-full relative overflow-hidden ${
                isDark
                  ? 'bg-[#102342] border-[#1E3A6E] text-white hover:border-[#C8A45D]'
                  : 'bg-white border-slate-200/90 text-[#0B1930] hover:border-[#C8A45D] hover:shadow-lg'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isDark ? 'bg-[#060E1A] border-slate-700 text-[#C8A45D]' : 'bg-slate-50 border-slate-200 text-[#B38E46]'
                    }`}>
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className={`text-xl sm:text-2xl font-black tracking-tight transition-colors leading-tight ${
                      isDark ? 'text-white group-hover:text-[#C8A45D]' : 'text-[#0B1930] group-hover:text-[#B38E46]'
                    }`}>
                      Ogun Growth Corridor
                    </div>
                    <div className={`text-sm font-bold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      (Mowe & Abeokuta)
                    </div>
                  </div>
                </div>
                <div className={`pt-3 border-t space-y-1 ${isDark ? 'border-[#1E3A6E]' : 'border-slate-100'}`}>
                  <div className="text-xs font-bold text-[#C8A45D]">
                    Development Axes
                  </div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Anchored to Lagos-Ibadan economic belt
                  </div>
                </div>
              </div>
            </FlungCard>

            {/* Metric 3 */}
            <FlungCard index={2} className="group h-full">
              <div className={`rounded-2xl p-6 sm:p-7 space-y-4 border transition-all flex flex-col justify-between h-full relative overflow-hidden ${
                isDark
                  ? 'bg-[#102342] border-[#1E3A6E] text-white hover:border-[#C8A45D]'
                  : 'bg-white border-slate-200/90 text-[#0B1930] hover:border-[#C8A45D] hover:shadow-lg'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isDark ? 'bg-[#060E1A] border-slate-700 text-[#C8A45D]' : 'bg-slate-50 border-slate-200 text-[#B38E46]'
                    }`}>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className={`text-xl sm:text-2xl font-black tracking-tight transition-colors leading-tight ${
                      isDark ? 'text-white group-hover:text-[#C8A45D]' : 'text-[#0B1930] group-hover:text-[#B38E46]'
                    }`}>
                      Freehold Land Parcels
                    </div>
                    <div className={`text-sm font-bold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Zero-Encumbrance Guarantee
                    </div>
                  </div>
                </div>
                <div className={`pt-3 border-t space-y-1 ${isDark ? 'border-[#1E3A6E]' : 'border-slate-100'}`}>
                  <div className="text-xs font-bold text-[#C8A45D]">
                    Investment Allocation
                  </div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Chartable survey beacons & deed drafting
                  </div>
                </div>
              </div>
            </FlungCard>

            {/* Metric 4 */}
            <FlungCard index={3} className="group h-full">
              <div className={`rounded-2xl p-6 sm:p-7 space-y-4 border transition-all flex flex-col justify-between h-full relative overflow-hidden ${
                isDark
                  ? 'bg-[#102342] border-[#1E3A6E] text-white hover:border-[#C8A45D]'
                  : 'bg-white border-slate-200/90 text-[#0B1930] hover:border-[#C8A45D] hover:shadow-lg'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isDark ? 'bg-[#060E1A] border-slate-700 text-[#C8A45D]' : 'bg-slate-50 border-slate-200 text-[#B38E46]'
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                      isDark ? 'text-white group-hover:text-[#C8A45D]' : 'text-[#0B1930] group-hover:text-[#B38E46]'
                    }`}>
                      10+ Years
                    </div>
                    <div className={`text-sm font-bold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Combined Expertise
                    </div>
                  </div>
                </div>
                <div className={`pt-3 border-t space-y-1 ${isDark ? 'border-[#1E3A6E]' : 'border-slate-100'}`}>
                  <div className="text-xs font-bold text-[#C8A45D]">
                    Leadership Benchmark
                  </div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Institutional governance across market cycles
                  </div>
                </div>
              </div>
            </FlungCard>
          </div>
        </div>
      </section>

      {/* 4. FEATURED DEVELOPMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className={`text-xs font-semibold uppercase tracking-widest ${
                isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'
              }`}>
                Current Portfolio
              </div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-[#0B1930]'
              }`}>
                Featured Real Estate Developments
              </h2>
              <p className={`text-sm max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Explore our active master-planned estates situated in Ogun State's highest-velocity growth corridors.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/developments')}
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap self-start md:self-auto ${
                isDark ? 'text-[#C8A45D] hover:text-white' : 'text-[#0B1930] hover:text-[#B38E46]'
              }`}
            >
              <span>View All Developments ({developments.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D]" />
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {featuredDevelopments.slice(0, 4).map((dev, idx) => (
            <FlungCard
              key={dev.id}
              index={idx}
              className={idx % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-10'}
            >
              <DevelopmentCard
                development={dev}
                onViewDetails={(slug) => onNavigate(`/developments/${slug}`)}
                onQuickEnquire={(id) => onOpenLeadModal(id)}
              />
            </FlungCard>
          ))}
        </div>
      </section>

      {/* 4.5 ARCHITECTURAL RESIDENCES & HOUSING PROTOTYPES */}
      <section className={`border-y py-16 transition-colors ${
        isDark ? 'bg-[#060E1A]/80 border-slate-800' : 'bg-slate-100/90 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className={`text-xs font-semibold uppercase tracking-widest ${
                  isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'
                }`}>
                  Turnkey Housing Prototypes
                </div>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0B1930]'
                }`}>
                  Architectural Residences & Estate Villas
                </h2>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Envision your dream home on our master-planned plots. Explore contemporary villa and duplex prototypes engineered for Oasis Ray communities.
                </p>
              </div>
              <button
                onClick={() => onOpenLeadModal(undefined, 'Housing Construction')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8A45D] hover:bg-[#DFC07C] text-xs font-bold text-[#0B1930] transition-all whitespace-nowrap self-start md:self-auto shadow-md"
              >
                <span>Request Custom Floorplan Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0B1930]" />
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {[
              {
                id: 'house-1',
                title: 'The Grand Horizon Villa',
                category: '4-Bedroom Detached Villa',
                plotReq: 'Fits 500 SQM Plot (Christos Gardens)',
                features: ['4 All-Ensuite Bedrooms', 'Private Infinity Pool Provision', 'Solar Inverter Canopy', '2-Car Covered Garage'],
                image: '/assets/aistudio/IMG-20261104-WA0028_3559ca9a.jpg',
                badge: 'Executive Residence'
              },
              {
                id: 'house-2',
                title: 'The Havilah Apex Terrace',
                category: '3-Bedroom Contemporary Duplex',
                plotReq: 'Fits 300 SQM / 450 SQM Plot (Havilah City)',
                features: ['3 Bedrooms + Boy’s Quarters', 'Open-Plan Family Lounge', 'Smart Lighting Reticulation', 'Gated Boulevard Access'],
                image: '/assets/aistudio/IMG-20261104-WA0019_8697be16.jpg',
                badge: 'Suburban Series'
              },
              {
                id: 'house-3',
                title: 'The Royal Boulevard Compound',
                category: '5-Bedroom Smart Mansion',
                plotReq: 'Fits 1,000 SQM Commercial Enclave',
                features: ['5 Luxury Suites', 'Private Cinema & Study', 'Perimeter CCTV & Access Control', 'Spacious Landscaped Compound'],
                image: '/assets/aistudio/IMG-20261104-WA0014_3013d77c.jpg',
                badge: 'Flagship Mansion'
              }
            ].map((house, idx) => {
              const colSpans = ['md:col-span-4 md:mt-0', 'md:col-span-4 md:mt-8', 'md:col-span-4 md:-mt-4'];
              return (
                <FlungCard key={house.id} index={idx} className={colSpans[idx]}>
                  <div className={`rounded-2xl overflow-hidden border transition-all group flex flex-col justify-between h-full ${
                    isDark
                      ? 'bg-[#102342] border-[#1E3A6E] text-white hover:border-[#C8A45D] shadow-xl'
                      : 'bg-white border-slate-200/90 text-[#0B1930] hover:border-[#B38E46] shadow-sm hover:shadow-lg'
                  }`}>
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={house.image}
                          alt={house.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 bg-[#0B1930]/90 border border-[#C8A45D]/60 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#C8A45D] backdrop-blur-sm">
                          {house.badge}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <div className="text-xs font-bold text-[#C8A45D] uppercase tracking-wide">
                            {house.category}
                          </div>
                          <h3 className={`text-xl font-bold tracking-tight transition-colors mt-1 ${
                            isDark ? 'text-white group-hover:text-[#C8A45D]' : 'text-[#0B1930] group-hover:text-[#B38E46]'
                          }`}>
                            {house.title}
                          </h3>
                          <div className={`text-xs mt-1 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {house.plotReq}
                          </div>
                        </div>

                        <div className={`pt-3 border-t space-y-2 ${isDark ? 'border-[#1E3A6E]' : 'border-slate-100'}`}>
                          {house.features.map((feat, fIdx) => (
                            <div key={fIdx} className={`flex items-center gap-2 text-xs font-medium ${
                              isDark ? 'text-slate-200' : 'text-slate-700'
                            }`}>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => onOpenLeadModal(undefined, `Housing Quote: ${house.title}`)}
                        className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors rounded-xl flex items-center justify-center gap-2 ${
                          isDark
                            ? 'bg-[#1A3868] hover:bg-[#C8A45D] text-white hover:text-[#0B1930] border border-[#C8A45D]/40'
                            : 'bg-[#0B1930] hover:bg-[#1A3868] text-white shadow-md'
                        }`}
                      >
                        <Home className="w-3.5 h-3.5 text-[#C8A45D]" />
                        <span>Request Floorplan & Build Quote</span>
                      </button>
                    </div>
                  </div>
                </FlungCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className={`text-xs font-semibold uppercase tracking-widest ${
              isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'
            }`}>
              Capabilities & Solutions
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-[#0B1930]'
            }`}>
              Our Core Real Estate Services
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              A comprehensive suite of property development, advisory, and marketing services crafted to protect and grow investor capital.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {services.slice(0, 4).map((service, idx) => (
            <FlungCard
              key={service.id}
              index={idx}
              className="h-full"
            >
              <div className={`rounded-xl p-5 sm:p-6 space-y-4 border transition-all flex flex-col justify-between h-full group ${
                isDark
                  ? 'bg-[#102342] border-[#1E3A6E] text-white hover:border-[#C8A45D]'
                  : 'bg-white border-slate-200/90 text-[#0B1930] hover:border-[#B38E46] shadow-sm hover:shadow-lg'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center group-hover:scale-105 transition-transform ${
                      isDark ? 'bg-[#060E1A] border-slate-700 text-[#C8A45D]' : 'bg-slate-50 border-slate-200 text-[#B38E46]'
                    }`}>
                      {serviceIcons[service.iconName] || <Building2 className="w-5 h-5 text-[#C8A45D]" />}
                    </div>
                  </div>
                  <h3 className={`text-base font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#0B1930]'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs leading-relaxed line-clamp-3 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {service.shortDescription}
                  </p>
                </div>

                <div className={`pt-2 border-t ${isDark ? 'border-[#1E3A6E]' : 'border-slate-100'}`}>
                  <button
                    onClick={() => onNavigate('/services')}
                    className="text-xs font-bold text-[#C8A45D] hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    Learn details →
                  </button>
                </div>
              </div>
            </FlungCard>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('/services')}
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              isDark ? 'text-[#C8A45D] hover:text-white' : 'text-[#0B1930] hover:text-[#B38E46]'
            }`}
          >
            <span>View All Specialized Advisory Disciplines</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D]" />
          </button>
        </div>
      </section>

      {/* 6. WHY CHOOSE OASIS RAY */}
      <section className={`relative border-y py-20 overflow-hidden transition-colors ${
        isDark ? 'bg-[#060E1A]/90 border-slate-800' : 'bg-slate-100/80 border-slate-200'
      }`}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className={`text-xs font-semibold uppercase tracking-widest ${
                isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'
              }`}>
                Institutional Pillars
              </div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-[#0B1930]'
              }`}>
                Why Discerning Investors Choose Oasis Ray
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Grounded in transparency, legal vetting, and long-term capital preservation.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {[
              {
                title: 'Strategic Property Locations',
                desc: 'Prime parcels positioned along inter-state expressways and growth corridors.',
                point: 'High Capital Growth'
              },
              {
                title: 'Structured Investments',
                desc: 'Clear milestone payment schedules without hidden charges or unbudgeted levies.',
                point: 'Zero Hidden Levies'
              },
              {
                title: 'Development Focus',
                desc: 'Active infrastructure delivery including gatehouses, paved boulevards, and utilities.',
                point: 'Tangible Progress'
              },
              {
                title: 'Long-Term Value',
                desc: 'Engineered to preserve capital against inflation and yield compounding returns.',
                point: 'Wealth Preservation'
              },
              {
                title: 'Professional Advisory',
                desc: 'Dedicated advisors aligning property portfolios with your financial goals.',
                point: 'Tailored Guidance'
              },
              {
                title: 'Transparent Governance',
                desc: 'Coordinate disclosures, chartable surveys, and open documentation.',
                point: 'Clear State Titles'
              }
            ].map((pillar, idx) => (
              <FlungCard
                key={idx}
                index={idx}
                className="h-full"
              >
                <div className={`border rounded-xl p-5 space-y-3 transition-all h-full flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#102342] border-[#1E3A6E] text-white hover:border-[#C8A45D]'
                    : 'bg-white border-slate-200/90 text-[#0B1930] hover:border-[#B38E46] shadow-xs'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#C8A45D] font-mono font-bold">
                      <span className={`text-[11px] truncate ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>{pillar.point}</span>
                    </div>
                    <h3 className={`text-base font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-[#0B1930]'
                    }`}>{pillar.title}</h3>
                    <p className={`text-xs leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>{pillar.desc}</p>
                  </div>
                </div>
              </FlungCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DEDICATED INVESTMENT PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WakeUpCard delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden bg-[#0B1930] text-white border border-[#C8A45D]/40 p-8 sm:p-12 lg:p-16 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                  Strategic Wealth Preservation
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Your Next Investment Could Begin With The Right Location.
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
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
                    className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#102342] hover:bg-[#1A3868] border border-[#1E3A6E] transition-colors rounded-lg"
                  >
                    Schedule Advisory Call
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden border border-[#C8A45D]/50 shadow-2xl relative">
                  <img
                    src="/assets/aistudio/IMG-20261104-WA0026_8615404d.jpg"
                    alt="Land Banking and Real Estate Investment - Ogun State Corridor"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-center text-xs font-bold text-white bg-[#0B1930]/90 py-1.5 px-2 rounded backdrop-blur-sm border border-[#C8A45D]/40">
                    Strategic Cadastral Growth Corridors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WakeUpCard>
      </section>

      {/* 8. TESTIMONIALS (CLIENT PERSPECTIVES - SCATTERED & FLUNG ANIMATIONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-10 overflow-hidden">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 border-slate-700/30">
            <div className="space-y-1">
              <div className={`text-xs font-semibold uppercase tracking-widest ${
                isDark ? 'text-[#C8A45D]' : 'text-[#B38E46]'
              }`}>
                Client Perspectives
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-[#0B1930]'
              }`}>
                Investor Perspectives & Experiences
              </h2>
            </div>
            <div className={`text-xs italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              * Real feedback from Oasis Ray property subscribers.
            </div>
          </div>
        </FadeIn>

        {/* Scattered Dynamic Flung Cards Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 pt-4 pb-8 items-start">
          {testimonials.slice(0, 4).map((item, idx) => {
            // Alternating flung direction initial positions & rotations
            const initialVariants = [
              { x: -160, y: -70, rotate: -18, opacity: 0, scale: 0.8 },
              { x: 160, y: -90, rotate: 22, opacity: 0, scale: 0.8 },
              { x: -150, y: 90, rotate: -22, opacity: 0, scale: 0.8 },
              { x: 150, y: 70, rotate: 18, opacity: 0, scale: 0.8 }
            ];

            const settledRotations = [-2, 3, -3, 2];
            const colSpans = [
              'md:col-span-7 md:mt-0',
              'md:col-span-5 md:mt-14',
              'md:col-span-5 md:-mt-6',
              'md:col-span-7 md:mt-4'
            ];

            const currentInitial = initialVariants[idx % initialVariants.length];
            const currentRotation = settledRotations[idx % settledRotations.length];
            const currentColSpan = colSpans[idx % colSpans.length];

            return (
              <motion.div
                key={item.id}
                initial={currentInitial}
                whileInView={{
                  x: 0,
                  y: 0,
                  rotate: currentRotation,
                  opacity: 1,
                  scale: 1
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 130,
                  damping: 14,
                  mass: 0.85,
                  delay: idx * 0.12
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  zIndex: 30,
                  transition: { duration: 0.2 }
                }}
                className={`transform transition-all duration-300 ${currentColSpan}`}
              >
                <div
                  className={`border rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl group relative flex flex-col justify-between h-full backdrop-blur-sm ${
                    isDark
                      ? 'bg-[#102342]/95 border-[#1E3A6E] text-white hover:border-[#C8A45D]'
                      : 'bg-white/95 border-slate-200/90 text-[#0B1930] hover:border-[#B38E46] hover:shadow-2xl'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                        isDark ? 'bg-[#060E1A] border-slate-700 text-[#C8A45D]' : 'bg-slate-50 border-slate-200 text-[#B38E46]'
                      }`}>
                        <Quote className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#C8A45D] uppercase tracking-wider">
                        {item.propertyInvested}
                      </span>
                    </div>
                  </div>

                  {/* Shortened Quote */}
                  <p className={`text-sm sm:text-base leading-relaxed italic font-medium ${
                    isDark ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                    "{item.quote}"
                  </p>

                  <div className={`pt-3 border-t flex items-center justify-between ${
                    isDark ? 'border-[#1E3A6E]' : 'border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0B1930] border border-[#C8A45D]/60 flex items-center justify-center text-[#C8A45D] text-xs font-bold">
                        {item.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className={`text-xs sm:text-sm font-bold transition-colors ${
                          isDark ? 'text-white group-hover:text-[#C8A45D]' : 'text-[#0B1930] group-hover:text-[#B38E46]'
                        }`}>
                          {item.authorName}
                        </div>
                        <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.authorRole} · {item.authorLocation}
                        </div>
                      </div>
                    </div>

                    <div className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl bg-[#0B1930] text-white border border-[#C8A45D]/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Let's Build Your Next Chapter in Real Estate.
            </h2>
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto font-normal">
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
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#102342] hover:bg-[#1A3868] border border-[#1E3A6E] transition-all rounded-lg"
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
