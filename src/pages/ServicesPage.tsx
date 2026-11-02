import React from 'react';
import { ServiceItem } from '../types';
import {
  Building2,
  Landmark,
  TrendingUp,
  Vault,
  Home,
  Compass,
  Megaphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { FadeIn, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '../components/ScrollAnimations';

interface ServicesPageProps {
  services: ServiceItem[];
  onOpenLeadModal: (initialDevelopmentId?: string, initialPlotSize?: string, initialEnquiryType?: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-[#C8A45D]" />,
  Landmark: <Landmark className="w-6 h-6 text-[#C8A45D]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#C8A45D]" />,
  Vault: <Vault className="w-6 h-6 text-[#C8A45D]" />,
  Home: <Home className="w-6 h-6 text-[#C8A45D]" />,
  Compass: <Compass className="w-6 h-6 text-[#C8A45D]" />,
  Megaphone: <Megaphone className="w-6 h-6 text-[#C8A45D]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#C8A45D]" />
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ services, onOpenLeadModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 overflow-x-hidden">
      {/* Header */}
      <SlideInLeft className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
          Our Expertise
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Core Real Estate Services
        </h1>
        <p className="text-base text-slate-300 leading-relaxed font-normal">
          From master-planned estate developments and strategic land banking to statutory title consultancy, OASIS RAY DEVELOPMENTS LTD. delivers end-to-end expertise engineered to build and protect generational wealth.
        </p>
      </SlideInLeft>

      {/* Services Detailed List: Alternating Slide in Left and Right */}
      <div className="space-y-8">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 0;
          const Wrapper = isEven ? SlideInLeft : SlideInRight;

          return (
            <Wrapper key={service.id} delay={0.05}>
              <div
                id={service.id}
                className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-10 shadow-lg hover:border-[#C8A45D]/50 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number & Icon & Title */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#060E1A] border border-[#C8A45D]/40 flex items-center justify-center">
                        {serviceIcons[service.iconName] || <Building2 className="w-6 h-6 text-[#C8A45D]" />}
                      </div>
                      <span className="text-sm font-mono font-bold text-[#C8A45D]">
                        SERVICE {service.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>

                    <div className="text-xs text-slate-400">
                      Target Audience: <span className="text-slate-200 font-medium">{service.targetAudience}</span>
                    </div>

                    <div>
                      <button
                        onClick={() => onOpenLeadModal(undefined, undefined, service.title)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors shadow-sm"
                      >
                        <span>Request Consultation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Descriptions & Benefits */}
                  <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-[#1E3A6E] lg:pl-8">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Scope of Service
                      </h4>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {service.fullDescription}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C8A45D]">
                        Key Client Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {service.benefits.map((benefit, bIdx) => (
                          <div
                            key={bIdx}
                            className="bg-[#060E1A]/80 border border-[#1E3A6E]/60 rounded-lg p-3 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-200 font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* Advisory Callout */}
      <FadeIn>
        <div className="rounded-2xl bg-[#060E1A] border border-[#1E3A6E] p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Need Customized Advisory for an Institutional Portfolio?</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            We structure bespoke land banking syndicates for corporate groups, cooperative societies, and diaspora families looking for coordinated acquisition in Ogun State.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal(undefined, undefined, 'Institutional Advisory')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-lg shadow-sm"
            >
              Speak to Lead Consultant
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
