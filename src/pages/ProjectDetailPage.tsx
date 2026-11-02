import React, { useState } from 'react';
import { Development, SiteSettings } from '../types';
import { formatCurrencyNaira, generateWhatsAppLeadUrl } from '../utils/realEstateCalculators';
import { InteractivePlotMap } from '../components/InteractivePlotMap';
import { PaymentCalculator } from '../components/PaymentCalculator';
import {
  MapPin,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  MessageSquare,
  Share2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../components/Toast';
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem
} from '../components/ScrollAnimations';

interface ProjectDetailPageProps {
  development: Development;
  allDevelopments: Development[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (initialDevelopmentId?: string, initialPlotSize?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  development,
  allDevelopments,
  settings,
  onNavigate,
  onOpenLeadModal
}) => {
  const { showToast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const relatedDevelopments = allDevelopments.filter((d) => d.id !== development.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${development.name} | Oasis Ray Developments`,
          text: development.tagline,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Project link copied to clipboard.', 'success');
    }
  };

  const whatsappUrl = generateWhatsAppLeadUrl(settings.whatsappNumber, {
    developmentName: development.name,
    enquiryType: 'Property Purchase'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 overflow-x-hidden">
      {/* 1. PROJECT HERO SECTION */}
      <div className="space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('/developments')} className="hover:text-white transition-colors">
            Developments
          </button>
          <span>/</span>
          <span className="text-[#C8A45D] font-medium">{development.name}</span>
        </div>

        {/* Hero Title & Actions: Slide In Left & Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <SlideInLeft className="space-y-2">
            {/* Clean unboxed availability line: No pills */}
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              <span
                className={`w-2 h-2 ${
                  development.availability === 'Available'
                    ? 'bg-emerald-400'
                    : development.availability === 'Selling Fast'
                    ? 'bg-amber-400'
                    : 'bg-slate-400'
                }`}
              />
              <span className={development.availability === 'Available' ? 'text-emerald-400' : 'text-amber-400'}>
                {development.availability}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[#C8A45D]">{development.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {development.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0" />
              <span>{development.location}</span>
            </div>
          </SlideInLeft>

          <SlideInRight className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#102342] border border-[#1E3A6E] text-slate-300 hover:text-white hover:bg-[#142B52] transition-colors flex items-center gap-2"
              aria-label="Share project"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Advisor</span>
            </a>

            <button
              onClick={() => onOpenLeadModal(development.id)}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors shadow-md"
            >
              Book Site Inspection
            </button>
          </SlideInRight>
        </div>

        {/* Hero Image Showcase */}
        <FadeIn>
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#1E3A6E] bg-[#060E1A] shadow-2xl">
            <img
              src={development.galleryImages[activeImageIndex] || development.heroImage}
              alt={development.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Tagline overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white">
              <span className="font-serif-title italic text-base sm:text-lg text-slate-100 drop-shadow-md">
                "{development.tagline}"
              </span>
              <div className="hidden sm:flex items-center gap-2 bg-[#060E1A]/80 px-3 py-1.5 rounded-lg border border-[#1E3A6E] font-mono text-xs">
                <span>Coordinates:</span>
                <span className="text-[#C8A45D]">{development.mapCoordinates.lat}°N, {development.mapCoordinates.lng}°E</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Gallery Thumbnails */}
        {development.galleryImages.length > 1 && (
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {development.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-28 h-18 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#C8A45D] scale-102 ring-2 ring-[#C8A45D]/30'
                      : 'border-[#1E3A6E] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </FadeIn>
        )}
      </div>

      {/* 2. PROJECT OVERVIEW & QUICK FACTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <SlideInLeft className="lg:col-span-8 space-y-8">
          {/* Overview */}
          <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
            <h2 className="text-xl font-bold text-white tracking-tight">Project Overview</h2>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {development.overview}
            </p>
            <div className="pt-4 border-t border-[#1E3A6E]/50">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Strategic Location & Regional Connectivity
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {development.locationDetails}
              </p>
            </div>
          </div>

          {/* 3. AVAILABLE PLOT SIZES & PRICING: Clean unboxed metadata */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Available Plot Sizes & Pricing</h3>
                <p className="text-xs text-slate-400">All prices are verified and reflect current investment allocations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {development.plotSizes.map((plot) => (
                <div
                  key={plot.id}
                  className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-white">{plot.size}</span>
                      <span className="text-xs font-mono font-medium text-emerald-400">
                        Available
                      </span>
                    </div>
                    <div className="text-xs text-[#C8A45D] font-medium">{plot.title}</div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">{plot.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1E3A6E]/60 space-y-3">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Outright Price</div>
                      <div className="text-lg font-bold font-mono text-white">
                        {formatCurrencyNaira(plot.promoPrice || plot.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenLeadModal(development.id, plot.size)}
                      className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-[#060E1A] hover:bg-[#C8A45D] hover:text-[#0B1930] border border-[#1E3A6E] text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Enquire on this Plot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. INFRASTRUCTURE & AMENITIES */}
          <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Infrastructure & Estate Amenities
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Engineered to ensure security, long-term capital appreciation, and tranquil community living.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {development.infrastructure.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#060E1A]/60 border border-[#1E3A6E]/50">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. TITLE & DOCUMENTATION INFORMATION */}
          <div className="bg-[#060E1A] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#102342] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Land Title & Statutory Documentation
                </h3>
                <p className="text-xs text-slate-400">
                  Every parcel is transparently documented and chartable with Ogun State Bureau of Lands.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {development.titleDocuments.map((doc, idx) => (
                <div key={idx} className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-4 space-y-2">
                  <div className="text-xs text-[#C8A45D] font-mono uppercase tracking-wider font-semibold">
                    {doc.status}
                  </div>
                  <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideInLeft>

        {/* SIDEBAR: Booking & Quick Reservation Desk (Slide In from Right) */}
        <SlideInRight className="lg:col-span-4 space-y-6 sticky top-28">
          <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A45D]">
              Direct Investor Reservation
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400">Starting Price Benchmark</div>
              <div className="text-2xl font-bold font-mono text-white">
                {formatCurrencyNaira(development.startingPrice)}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#1E3A6E]/60 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium text-white">{development.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold text-emerald-400">{development.availability}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="font-medium text-slate-200">{development.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Inspection Days:</span>
                <span className="font-medium text-white">Tuesdays & Saturdays</span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => onOpenLeadModal(development.id)}
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#0B1930]" />
                <span>Book Site Inspection Tour</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>

            <div className="text-[11px] text-slate-400 text-center pt-2">
              Complimentary inspection transport provided from our coordination point in Ogun State.
            </div>
          </div>

          {/* Location Coordinates & Map Preview */}
          <div className="bg-[#060E1A] border border-[#1E3A6E] rounded-2xl p-6 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Location Coordinates
            </h4>
            <div className="text-xs text-slate-400">
              {development.mapCoordinates.label}
            </div>
            <div className="p-3 bg-[#102342] rounded-lg border border-[#1E3A6E] font-mono text-xs text-[#C8A45D] flex items-center justify-between">
              <span>{development.mapCoordinates.lat}, {development.mapCoordinates.lng}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${development.mapCoordinates.lat},${development.mapCoordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
              >
                Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </SlideInRight>
      </div>

      {/* 6. INTERACTIVE ESTATE PLOT MAP */}
      <FadeIn>
        <div className="space-y-4">
          <InteractivePlotMap
            developmentName={development.name}
            plots={development.plots}
            onSelectPlotForEnquiry={(plotNum, size) => {
              onOpenLeadModal(development.id, `${size} (${plotNum})`);
            }}
          />
        </div>
      </FadeIn>

      {/* 7. PAYMENT CALCULATOR */}
      <FadeIn>
        <div className="space-y-4">
          <PaymentCalculator
            plotSizes={development.plotSizes}
            developmentName={development.name}
            onEnquireWithPlan={(summary) => {
              onOpenLeadModal(development.id, summary);
            }}
          />
        </div>
      </FadeIn>

      {/* 8. RELATED DEVELOPMENTS: Slide In */}
      {relatedDevelopments.length > 0 && (
        <FadeIn>
          <div className="space-y-6 pt-8 border-t border-[#1E3A6E]">
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Explore Other Opportunities
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Other Strategic Developments in Ogun State
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedDevelopments.map((d) => (
                <div
                  key={d.id}
                  className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-black shrink-0">
                      <img src={d.heroImage} alt={d.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{d.name}</h4>
                      <p className="text-xs text-slate-400">{d.location}</p>
                      <p className="text-xs font-mono font-bold text-[#C8A45D] mt-1">
                        From {formatCurrencyNaira(d.startingPrice)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onNavigate(`/developments/${d.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors whitespace-nowrap"
                  >
                    View Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
};
