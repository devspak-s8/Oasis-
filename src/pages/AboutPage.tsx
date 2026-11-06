import React from 'react';
import { SiteSettings } from '../types';
import { ShieldCheck, Target, Eye, Compass, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FadeIn, SlideInLeft, SlideInRight } from '../components/ScrollAnimations';
import { FlungCard } from '../components/FlungCard';

interface AboutPageProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  onOpenLeadModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onNavigate, onOpenLeadModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-20 overflow-x-hidden">
      {/* Header */}
      <SlideInLeft className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
          Corporate Identity
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          About OASIS RAY DEVELOPMENTS LTD.
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          A real estate development, investment and property marketing company committed to creating structured property opportunities that generate lasting generational value.
        </p>
      </SlideInLeft>

      {/* Vision & Mission Cards: Left & Right Slide In */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision */}
        <SlideInLeft>
          <div className="bg-[#00097C] border border-[#14288F] rounded-2xl p-8 space-y-4 shadow-xl h-full">
            <div className="w-10 h-10 rounded-lg bg-[#000538] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
              <Eye className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Company Vision
            </div>
            <p className="font-serif-title text-xl text-white italic leading-relaxed">
              "{settings.companyVision}"
            </p>
            <div className="text-xs text-slate-400 pt-2 border-t border-[#14288F]">
              Ratified Corporate Vision
            </div>
          </div>
        </SlideInLeft>

        {/* Mission */}
        <SlideInRight>
          <div className="bg-[#00097C] border border-[#14288F] rounded-2xl p-8 space-y-4 shadow-xl h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#000538] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Company Mission
              </div>
              <p className="text-base text-slate-200 leading-relaxed font-medium">
                {settings.companyMission}
              </p>
            </div>
            <div className="text-xs text-slate-400 pt-3 border-t border-[#14288F] flex items-center justify-between">
              <span>Operational Blueprint</span>
              <span className="text-[#C8A45D] font-semibold">Capital Preservation Charter</span>
            </div>
          </div>
        </SlideInRight>
      </div>

      {/* Founder Profile: Left Portrait / Right Bio */}
      <div className="bg-[#000538] border border-[#14288F] rounded-2xl p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <SlideInLeft className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C8A45D]/60 shadow-2xl bg-[#000538] group">
              <img
                src="/assets/aistudio/IMG_0554_7a96fa6d.JPG"
                alt={`${settings.founderName} - Managing Director & CEO`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000538]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#00097C]/90 backdrop-blur-sm border border-[#C8A45D]/40 text-center shadow-lg">
                <span className="text-xs font-bold text-[#C8A45D] uppercase tracking-wider block">
                  {settings.founderName}
                </span>
                <span className="text-[11px] text-white/90 font-medium">
                  {settings.founderRole || 'Managing Director & Chief Executive Officer'}
                </span>
              </div>
            </div>
          </SlideInLeft>

          <SlideInRight className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
              Executive Leadership
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {settings.founderName}
            </h2>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {settings.founderRole || 'Managing Director & Chief Executive Officer'}
            </div>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed pt-2">
              <p>
                Oluwayemi James Damilare is the Founder and Lead Visionary of OASIS RAY DEVELOPMENTS LTD. Under his leadership, the firm has cultivated a distinct ethos centered around calm, disciplined, and verifiable property acquisitions in Nigeria's high-potential growth hubs.
              </p>
              <div className="p-4 rounded-xl bg-[#00097C] border border-[#14288F] italic text-slate-200 text-xs sm:text-sm leading-relaxed my-2">
                "At Oasis Ray Developments, we believe that real estate development is far more than building walls or surveying boundaries. It is the deliberate stewardship of spaces that become conduits of enduring prosperity, security, and influence for families and organizations across every market cycle."
              </div>
              <p>
                His strategic focus prioritizes structured land acquisition, physical estate execution, rigorous cadastral verification, and opening transparent channels for investors both within Nigeria and across the global diaspora.
              </p>
            </div>

            <div className="pt-4 border-t border-[#14288F]/50 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-[#C8A45D]">
                <Award className="w-4 h-4" /> Stewardship & Generational Value
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Executive Leadership
              </span>
            </div>
          </SlideInRight>
        </div>
      </div>

      {/* Suggested Core Values (No pill badge) */}
      <div className="space-y-6">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Guiding Principles
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Core Values
              </h2>
            </div>
            <span className="text-xs text-amber-400 font-mono font-medium self-start sm:self-auto">
              [Suggested Core Values — Client Approval Recommended]
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {[
            {
              title: 'Integrity & Due Diligence',
              desc: 'Every parcel is thoroughly charted, legally vetted, and physically demarcated.'
            },
            {
              title: 'Strategic Foresight',
              desc: 'Acquiring acreage strictly along civic and infrastructural expansion corridors.'
            },
            {
              title: 'Capital Preservation',
              desc: 'Protecting subscriber capital against market volatility and currency erosion.'
            },
            {
              title: 'Transparent Execution',
              desc: 'Open communication, realistic milestones, and seamless title handover.'
            }
          ].map((val, idx) => (
            <FlungCard
              key={idx}
              index={idx}
              className="bg-[#00097C] border border-[#14288F] rounded-xl p-6 space-y-2 h-full shadow-lg"
            >
              <h3 className="text-base font-bold text-white">{val.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
            </FlungCard>
          ))}
        </div>
      </div>

      {/* Company Approach to Real Estate */}
      <FadeIn>
        <div className="bg-[#00097C] border border-[#14288F] rounded-2xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
              Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The Oasis Ray Development Approach
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unlike speculative property agents, Oasis Ray operates as a full-lifecycle property development firm. We believe the foundation of smart investing lies in patient research, statutory alignment with state master plans, and physical infrastructure investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#14288F]">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">1. Corridor Identification</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We pinpoint emerging industrial and suburban axes in Ogun State that benefit from proximity to Lagos commercial arteries.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">2. Statutory Perfection</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Before introducing a development to the public, boundary surveys are lodged and title documentation workflows initiated.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">3. Infrastructure Provisioning</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We execute physical site enhancements—from access boulevards and gatehouses to drainage and power reticulation.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* CTA Section */}
      <FadeIn>
        <div className="rounded-2xl bg-[#000538] border border-[#C8A45D]/40 p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl font-bold text-white">
            Explore Our Active Developments
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Discover how Christos Gardens and Havilah City align with your real estate acquisition goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('/developments')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#00097C] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-lg shadow-sm"
            >
              View Developments
            </button>
            <button
              onClick={onOpenLeadModal}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#00097C] hover:bg-[#142B52] border border-[#14288F] transition-colors rounded-lg"
            >
              Speak to an Advisor
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
