import React, { useState } from 'react';
import { Development } from '../types';
import { formatCurrencyNaira } from '../utils/realEstateCalculators';
import {
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Vault
} from 'lucide-react';
import { FadeIn, SlideInLeft, SlideInRight } from '../components/ScrollAnimations';
import { FlungCard } from '../components/FlungCard';

interface InvestmentPageProps {
  developments: Development[];
  onNavigate: (path: string) => void;
  onOpenLeadModal: (initialDevelopmentId?: string, initialPlotSize?: string, enquiryType?: string) => void;
}

export const InvestmentPage: React.FC<InvestmentPageProps> = ({
  developments,
  onNavigate,
  onOpenLeadModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the Oasis Ray approach to land banking?',
      a: 'Land banking with Oasis Ray involves acquiring surveyed, titled parcels in documented growth corridors (such as Mowe-Ofada and Ita Oshin in Abeokuta) ahead of municipal infrastructure maturation. This allows investors to secure plots at baseline entry rates and preserve long-term capital against currency devaluation.'
    },
    {
      q: 'How are titles and boundaries verified before purchase?',
      a: 'All our developments undergo rigorous cadastral survey registration and title charting at the Ogun State Bureau of Lands and Survey. Prospective investors and their legal counsel are provided coordinates for independent verification.'
    },
    {
      q: 'What payment plans are available for diaspora and local buyers?',
      a: 'We offer outright purchase discounts as well as structured 3-month, 6-month, and 12-month installment plans with low initial deposits (20%–30%). This accommodates regular cash-flow cycles without compounding interest.'
    },
    {
      q: 'When do I receive physical allocation of my plot?',
      a: 'Physical allocation of demarcated boundary beacons occurs upon completion of agreed milestone payments, accompanied by the executed Deed of Assignment and official survey documentation.'
    },
    {
      q: 'Can I purchase commercial or multi-plot parcels for development?',
      a: 'Yes. Both Christos Gardens and Havilah City have designated commercial and executive boulevards suitable for institutional facilities, residential duplexes, or clinic/commercial development.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 overflow-x-hidden">
      {/* Header */}
      <SlideInLeft className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
          Wealth Preservation & Growth
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Property Investment Opportunities
        </h1>
        <p className="text-base text-slate-300 leading-relaxed font-normal">
          Structured real estate opportunities focused on capital preservation, strategic corridor selection, and verifiable legal title in Nigeria.
        </p>
      </SlideInLeft>

      {/* Mandatory Regulatory & Risk Disclaimer */}
      <FadeIn>
        <div className="bg-[#060E1A] border-l-4 border-[#C8A45D] rounded-r-2xl p-6 sm:p-8 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-[#C8A45D] font-bold text-sm tracking-wide uppercase">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Statutory Investment Advisory Notice</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real estate values fluctuate according to macroeconomic cycles and infrastructural timelines. OASIS RAY DEVELOPMENTS LTD. does not guarantee fixed capital appreciation or speculative returns. All property investment decisions should be grounded in independently charted survey documentation, certified title verifications, and tailored legal or financial advisory.
          </p>
        </div>
      </FadeIn>

      {/* Land Banking Pillar Section: Left Text / Right Image */}
      <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-8 sm:p-12 space-y-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <SlideInLeft className="lg:col-span-7 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#060E1A] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
              <Vault className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The Strategic Power of Land Banking
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                In high-inflation environments, liquid capital diminishes in purchasing power. Land banking represents a proven defensive strategy that anchors wealth into tangible, non-depreciating acreage across South-West Nigeria's expansion corridors.
              </p>
              <p>
                By positioning early in planned axes like the Mowe-Ofada expressway connector and Abeokuta’s suburban hub at Ita Oshin, investors position their capital directly in front of population migration and municipal infrastructure.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenLeadModal(undefined, undefined, 'Land Banking')}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-lg shadow-sm"
              >
                Request Land Banking Prospectus
              </button>
            </div>
          </SlideInLeft>

          <SlideInRight className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-xl overflow-hidden border border-[#1E3A6E] shadow-2xl">
              <img
                src="/src/assets/images/land_banking_growth_1793643954174.jpg"
                alt="Land banking aerial survey layout"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-[#060E1A] border-t border-[#1E3A6E] text-xs text-slate-300 flex items-center justify-between">
                <span>Surveyed Acreage Demarcation</span>
                <span className="text-[#C8A45D] font-mono">Ogun State</span>
              </div>
            </div>
          </SlideInRight>
        </div>
      </div>

      {/* Available Developments Showcase: Slide from Left and Right */}
      <div className="space-y-6">
        <FadeIn>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
              Active Investment Allocations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Available Development Sites
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {developments[0] && (
            <FlungCard index={0} className="md:col-span-7">
              <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#C8A45D] uppercase">
                      {developments[0].category}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">{developments[0].availability}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{developments[0].name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{developments[0].overview}</p>

                  <div className="space-y-2 pt-2 border-t border-[#1E3A6E]/60 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Location:</span>
                      <span className="font-medium text-white">{developments[0].location}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Entry Investment:</span>
                      <span className="font-mono font-bold text-[#C8A45D]">
                        From {formatCurrencyNaira(developments[0].startingPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Payment Flexibility:</span>
                      <span className="text-white">Up to 12 Months Spread</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E3A6E] flex items-center gap-3">
                  <button
                    onClick={() => onNavigate(`/developments/${developments[0].slug}`)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-[#060E1A] hover:bg-[#142B52] border border-[#1E3A6E] text-slate-200 transition-colors text-center"
                  >
                    View Plot Layout & Details
                  </button>
                  <button
                    onClick={() => onOpenLeadModal(developments[0].id, undefined, 'Investment Opportunity')}
                    className="flex-1 py-2.5 text-xs font-bold rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors text-center shadow-sm"
                  >
                    Enquire on Allocation
                  </button>
                </div>
              </div>
            </FlungCard>
          )}

          {developments[1] && (
            <FlungCard index={1} className="md:col-span-5 md:mt-12">
              <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#C8A45D] uppercase">
                      {developments[1].category}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">{developments[1].availability}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{developments[1].name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{developments[1].overview}</p>

                  <div className="space-y-2 pt-2 border-t border-[#1E3A6E]/60 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Location:</span>
                      <span className="font-medium text-white">{developments[1].location}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Entry Investment:</span>
                      <span className="font-mono font-bold text-[#C8A45D]">
                        From {formatCurrencyNaira(developments[1].startingPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Payment Flexibility:</span>
                      <span className="text-white">Up to 12 Months Spread</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E3A6E] flex items-center gap-3">
                  <button
                    onClick={() => onNavigate(`/developments/${developments[1].slug}`)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-[#060E1A] hover:bg-[#142B52] border border-[#1E3A6E] text-slate-200 transition-colors text-center"
                  >
                    View Plot Layout & Details
                  </button>
                  <button
                    onClick={() => onOpenLeadModal(developments[1].id, undefined, 'Investment Opportunity')}
                    className="flex-1 py-2.5 text-xs font-bold rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors text-center shadow-sm"
                  >
                    Enquire on Allocation
                  </button>
                </div>
              </div>
            </FlungCard>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <FadeIn>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
              Investor Clarity
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Common questions regarding title security, milestone allocations, and investment execution.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <div className="bg-[#102342] border border-[#1E3A6E] rounded-xl overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-[#C8A45D] transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#C8A45D] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-[#1E3A6E]/50 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Advisory CTA */}
      <FadeIn>
        <div className="bg-[#060E1A] border border-[#1E3A6E] rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Ready to Discuss Your Real Estate Portfolio?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Schedule an in-person or virtual consultation with an Oasis Ray investment advisor to review title surveys and available plots.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal(undefined, undefined, 'Investment Consultation')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-lg shadow-sm"
            >
              Book Free Advisory Session
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
