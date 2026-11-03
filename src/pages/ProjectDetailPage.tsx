import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  Sparkles,
  Loader2,
  Send,
  Building
} from 'lucide-react';
import { useToast } from '../components/Toast';
import { motion, AnimatePresence } from 'motion/react';
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem
} from '../components/ScrollAnimations';

import { useTheme } from '../context/ThemeContext';
import { FlungCard } from '../components/FlungCard';

interface ProjectDetailPageProps {
  development: Development;
  allDevelopments: Development[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (initialDevelopmentId?: string, initialPlotSize?: string, initialEnquiryType?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  development,
  allDevelopments,
  settings,
  onNavigate,
  onOpenLeadModal
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { showToast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  // Smooth page loading transition effect on route load
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [development.id]);

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

  const getFullLandWhatsAppUrl = (selectedPlot?: string) => {
    const plotsSummary = development.plotSizes
      .map((p) => `• ${p.size} (${p.title}): ${formatCurrencyNaira(p.promoPrice || p.price)}`)
      .join('\n');

    const titleSummary = development.titleDocuments.map((t) => `• ${t.title}: ${t.status}`).join('\n');

    const text = `Hello Oasis Ray Developments Advisory Desk,\n\nI am interested in making a detailed inquiry for:\n📍 *Property:* ${development.name}\n📍 *Location:* ${development.location}\n💰 *Starting Price:* ${formatCurrencyNaira(development.startingPrice)}\n${selectedPlot ? `📐 *Selected Plot:* ${selectedPlot}\n` : ''}\n📋 *Plot Sizes & Outright Pricing:*\n${plotsSummary}\n\n📜 *Title Status:*\n${titleSummary}\n\nMAP Coordinates: ${development.mapCoordinates.lat}°N, ${development.mapCoordinates.lng}°E\n\nPlease connect me with a senior advisor for allocation details, physical inspection schedules, and installment options.`;

    return `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  if (pageLoading) {
    return (
      <div className={`min-h-[70vh] flex flex-col items-center justify-center space-y-4 p-8 ${
        isDark ? 'bg-[#0B1930] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}
          className="w-14 h-14 rounded-2xl bg-[#102342] border border-[#C8A45D] flex items-center justify-center text-[#C8A45D] shadow-2xl"
        >
          <Building className="w-7 h-7" />
        </motion.div>
        <div className="text-center space-y-1">
          <div className={`text-sm font-bold tracking-tight uppercase ${
            isDark ? 'text-white' : 'text-[#0B1930]'
          }`}>
            Loading {development.name}
          </div>
          <div className="text-xs text-[#C8A45D] font-mono">
            Retrieving Cadastral Coordinates & Title Records...
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 overflow-x-hidden"
    >
      {/* 1. PROJECT HERO SECTION */}
      <div className="space-y-6">
        {/* Navigation Breadcrumb */}
        <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <button onClick={() => onNavigate('/')} className="hover:text-[#C8A45D] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('/developments')} className="hover:text-[#C8A45D] transition-colors">
            Developments
          </button>
          <span>/</span>
          <span className="text-[#C8A45D] font-semibold">{development.name}</span>
        </div>

        {/* Hero Title & Actions: Slide In Left & Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <SlideInLeft className="space-y-2">
            {/* Clean unboxed availability line */}
            <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <span className={development.availability === 'Available' ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}>
                {development.availability}
              </span>
              <span>·</span>
              <span className="text-[#C8A45D]">{development.category}</span>
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-[#0B1930]'
            }`}>
              {development.name}
            </h1>

            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0" />
              <span>{development.location}</span>
            </div>
          </SlideInLeft>

          <SlideInRight className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleShare}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-2 ${
                isDark
                  ? 'bg-[#102342] border-[#1E3A6E] text-slate-300 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
              }`}
              aria-label="Share project"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <a
              href={getFullLandWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow-sm"
              title="Open WhatsApp with full property details pre-filled"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Go to WhatsApp with Full Specs</span>
            </a>

            <button
              onClick={() => onOpenLeadModal(development.id, undefined, 'Detailed Land Inquiry')}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors shadow-md flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#0B1930]" />
              <span>Inquire About Land</span>
            </button>
          </SlideInRight>
        </div>

        {/* Hero Image Showcase */}
        <FadeIn>
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#1E3A6E] bg-slate-950 shadow-2xl">
            <img
              src={development.galleryImages[activeImageIndex] || development.heroImage}
              alt={development.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Tagline overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white">
              <span className="font-serif-title italic text-base sm:text-lg text-white drop-shadow-md">
                "{development.tagline}"
              </span>
              <div className="hidden sm:flex items-center gap-2 bg-[#060E1A]/90 px-3 py-1.5 rounded-lg border border-[#1E3A6E] font-mono text-xs text-white">
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
                      : 'border-slate-700 opacity-70 hover:opacity-100'
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
          <div className={`rounded-2xl p-6 sm:p-8 space-y-4 border shadow-sm ${
            isDark ? 'bg-[#102342] border-[#1E3A6E] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>Project Overview</h2>
            <p className={`text-sm leading-relaxed font-normal ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {development.overview}
            </p>
            <div className={`pt-4 border-t ${isDark ? 'border-[#1E3A6E]/50' : 'border-slate-100'}`}>
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Strategic Location & Regional Connectivity
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {development.locationDetails}
              </p>
            </div>
          </div>

          {/* 3. AVAILABLE PLOT SIZES & PRICING */}
          <div className="space-y-4">
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>Available Plot Sizes & Pricing</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>All prices are verified and reflect current investment allocations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {development.plotSizes.map((plot) => (
                <div
                  key={plot.id}
                  className={`rounded-xl p-5 space-y-3 flex flex-col justify-between border ${
                    isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930] shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>{plot.size}</span>
                      <span className="text-xs font-mono font-medium text-emerald-500">
                        Available
                      </span>
                    </div>
                    <div className="text-xs text-[#C8A45D] font-semibold">{plot.title}</div>
                    <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{plot.description}</p>
                  </div>

                  <div className={`pt-3 border-t space-y-3 ${isDark ? 'border-[#1E3A6E]' : 'border-slate-100'}`}>
                    <div>
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Outright Price</div>
                      <div className={`text-lg font-bold font-mono ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                        {formatCurrencyNaira(plot.promoPrice || plot.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenLeadModal(development.id, plot.size)}
                      className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                        isDark
                          ? 'bg-[#060E1A] hover:bg-[#C8A45D] hover:text-[#0B1930] border border-[#1E3A6E] text-slate-200'
                          : 'bg-[#0B1930] hover:bg-[#1A3868] text-white'
                      }`}
                    >
                      <span>Enquire on this Plot</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. INFRASTRUCTURE & AMENITIES */}
          <div className={`rounded-2xl p-6 sm:p-8 space-y-6 border shadow-sm ${
            isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
          }`}>
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                Infrastructure & Estate Amenities
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Engineered to ensure security, long-term capital appreciation, and tranquil community living.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {development.infrastructure.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border ${
                  isDark ? 'bg-[#060E1A]/60 border-[#1E3A6E]/50 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. TITLE & DOCUMENTATION INFORMATION */}
          <div className={`rounded-2xl p-6 sm:p-8 space-y-6 border ${
            isDark ? 'bg-[#060E1A] border-[#1E3A6E] text-white' : 'bg-slate-100 border-slate-200 text-[#0B1930]'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                isDark ? 'bg-[#102342] border-[#C8A45D]/40 text-[#C8A45D]' : 'bg-white border-slate-300 text-[#B38E46]'
              }`}>
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                  Land Title & Statutory Documentation
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Every parcel is transparently documented and chartable with Ogun State Bureau of Lands.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {development.titleDocuments.map((doc, idx) => (
                <div key={idx} className={`rounded-xl p-4 space-y-2 border ${
                  isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
                }`}>
                  <div className="text-xs text-[#C8A45D] font-mono uppercase tracking-wider font-semibold">
                    {doc.status}
                  </div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>{doc.title}</h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideInLeft>

        {/* SIDEBAR: Booking & Quick Reservation Desk */}
        <SlideInRight className="lg:col-span-4 space-y-6 sticky top-28">
          <div className={`rounded-2xl p-6 space-y-5 border shadow-xl ${
            isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
          }`}>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A45D]">
              Direct Investor Reservation
            </div>

            <div className="space-y-1">
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Starting Price Benchmark</div>
              <div className={`text-2xl font-bold font-mono ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                {formatCurrencyNaira(development.startingPrice)}
              </div>
            </div>

            <div className={`space-y-2 pt-2 border-t text-xs ${isDark ? 'border-[#1E3A6E]/60 text-slate-300' : 'border-slate-100 text-slate-600'}`}>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>{development.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold text-emerald-500">{development.availability}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{development.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Inspection Days:</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>Tuesdays & Saturdays</span>
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
                href={getFullLandWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>

            <div className={`text-[11px] text-center pt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Complimentary inspection transport provided from our coordination point in Ogun State.
            </div>
          </div>

          {/* Location Coordinates & Map Preview */}
          <div className={`rounded-2xl p-6 space-y-3 border ${
            isDark ? 'bg-[#060E1A] border-[#1E3A6E] text-white' : 'bg-slate-100 border-slate-200 text-[#0B1930]'
          }`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Location Coordinates
            </h4>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {development.mapCoordinates.label}
            </div>
            <div className={`p-3 rounded-lg border font-mono text-xs flex items-center justify-between ${
              isDark ? 'bg-[#102342] border-[#1E3A6E] text-[#C8A45D]' : 'bg-white border-slate-300 text-[#0B1930]'
            }`}>
              <span>{development.mapCoordinates.lat}, {development.mapCoordinates.lng}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${development.mapCoordinates.lat},${development.mapCoordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs hover:underline flex items-center gap-1 ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#0B1930]'}`}
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

      {/* 8. RELATED DEVELOPMENTS */}
      {relatedDevelopments.length > 0 && (
        <FadeIn>
          <div className={`space-y-6 pt-8 border-t ${isDark ? 'border-[#1E3A6E]' : 'border-slate-200'}`}>
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
                Explore Other Opportunities
              </div>
              <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                Other Strategic Developments in Ogun State
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {relatedDevelopments.map((d, idx) => (
                <FlungCard
                  key={d.id}
                  index={idx}
                  className="md:col-span-6"
                >
                  <div
                    className={`rounded-xl p-5 border flex flex-col sm:flex-row gap-5 items-center justify-between shadow-lg ${
                      isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930] shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                        <img src={d.heroImage} alt={d.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>{d.name}</h4>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{d.location}</p>
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
                </FlungCard>
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </motion.div>
  );
};
