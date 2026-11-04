import React, { useState, useEffect } from 'react';
import { Development, SiteSettings } from '../types';
import { formatCurrencyNaira, generateWhatsAppLeadUrl } from '../utils/realEstateCalculators';
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
  Loader2,
  Send,
  Building,
  Play,
  Video,
  Maximize2,
  Copy,
  Check,
  CreditCard,
  X,
  Download,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileText
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
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);
  const [copiedBankIndex, setCopiedBankIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
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

  const handleCopyBank = (accountNumber: string, bankName: string, index: number) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBankIndex(index);
    showToast(`${bankName} account number (${accountNumber}) copied to clipboard.`, 'success');
    setTimeout(() => setCopiedBankIndex(null), 2500);
  };

  if (pageLoading) {
    return (
      <div className={`min-h-[70vh] flex flex-col items-center justify-center space-y-4 p-8 ${
        isDark ? 'bg-[#060E1A] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#1E3A6E]/30 border-t-[#C8A45D] animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <div className={`text-sm font-bold tracking-wider uppercase ${
            isDark ? 'text-white' : 'text-[#0B1930]'
          }`}>
            Loading Property Details
          </div>
          <div className="text-xs text-[#C8A45D] font-mono">
            Retrieving Verifiable Title & Cadastral Records...
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
        {/* Hero Title & Actions: Slide In Left & Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <SlideInLeft className="space-y-2">
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
            {development.subscriptionFormPdfUrl && (
              <a
                href={development.subscriptionFormPdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                title="Download Official Subscription Form & FAQ Document (PDF)"
              >
                <Download className="w-4 h-4 text-[#0B1930]" />
                <span>Download Form & FAQ (PDF)</span>
              </a>
            )}

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
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => onOpenLeadModal(development.id, undefined, 'Detailed Land Inquiry')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors shadow-sm flex items-center gap-1.5 ${
                isDark
                  ? 'bg-[#1A3868] hover:bg-[#234B8C] border-[#C8A45D]/40 text-white'
                  : 'bg-[#0B1930] hover:bg-[#1A3868] text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>Inquire Now</span>
            </button>
          </SlideInRight>
        </div>

        {/* Hero Image Showcase */}
        <FadeIn>
          <div
            onClick={() => setSelectedLightboxImage(development.galleryImages[activeImageIndex] || development.heroImage)}
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#1E3A6E] bg-slate-950 shadow-2xl cursor-pointer group"
          >
            <img
              src={development.galleryImages[activeImageIndex] || development.heroImage}
              alt={development.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Click to enlarge pill button */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 rounded-lg bg-[#060E1A]/85 hover:bg-[#C8A45D] text-white hover:text-[#0B1930] border border-[#1E3A6E] transition-all flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Full Size</span>
              </span>
            </div>

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

            {/* Landmarks List from Official Documents */}
            {development.landmarksList && development.landmarksList.length > 0 && (
              <div className={`pt-4 border-t ${isDark ? 'border-[#1E3A6E]/50' : 'border-slate-100'}`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Nearby Key Landmarks & Institutions (Within Proximity)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {development.landmarksList.map((landmark, lIdx) => (
                    <span
                      key={lIdx}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                        isDark
                          ? 'bg-[#060E1A] border-[#1E3A6E] text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-[#C8A45D] shrink-0" />
                      <span>{landmark}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. AVAILABLE PLOT SIZES & PRICING */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A45D]">
                  Cadastral Plot Offerings
                </div>
                <h3 className={`text-2xl font-extrabold tracking-tight mt-0.5 ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                  Available Plot Sizes & Pricing Tiers
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Select your preferred parcel size to view structured tenures, upfront discounts, and physical demarcation specifications.
                </p>
              </div>

              {/* Special Promotion & Corner Piece Notice */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                  5% Discount on One-Off Payment
                </span>
                {development.cornerPieceFee && (
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${
                    isDark ? 'bg-[#060E1A] border-[#1E3A6E] text-[#C8A45D]' : 'bg-slate-50 border-slate-200 text-[#0B1930]'
                  }`}>
                    Corner Piece: +{formatCurrencyNaira(development.cornerPieceFee)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {development.plotSizes.map((plot) => {
                const whatsappPlotUrl = getFullLandWhatsAppUrl(plot.size);
                return (
                  <div
                    key={plot.id}
                    className={`rounded-2xl border p-6 sm:p-7 space-y-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl relative overflow-hidden group ${
                      isDark
                        ? 'bg-[#0B1930] border-[#1E3A6E] hover:border-[#C8A45D]/80'
                        : 'bg-white border-slate-200 hover:border-[#C8A45D] shadow-sm'
                    }`}
                  >
                    {/* Top ambient gold accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A45D]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-5">
                      {/* Badge Row */}
                      <div className="flex items-center justify-between gap-3">
                        <span className={`px-3.5 py-1.5 rounded-lg font-mono font-black text-sm tracking-wide border shadow-xs ${
                          isDark
                            ? 'bg-[#102342] border-[#C8A45D]/50 text-[#C8A45D]'
                            : 'bg-amber-50 border-[#C8A45D] text-[#0B1930]'
                        }`}>
                          {plot.size}
                        </span>
                      </div>

                      {/* Title & Plot Purpose */}
                      <div className="space-y-1.5">
                        <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                          {plot.title}
                        </h4>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {plot.description}
                        </p>
                      </div>

                      {/* Main Outright Price Hero */}
                      <div className={`p-4 rounded-xl border space-y-1.5 ${
                        isDark ? 'bg-[#060E1A]/80 border-[#1E3A6E]/80' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Outright Benchmark Price</span>
                          {plot.promoPrice && plot.promoPrice < plot.price && (
                            <span className="text-emerald-400 font-mono font-bold">5% Off Rate</span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-2xl sm:text-3xl font-black font-mono text-[#C8A45D] tracking-tight">
                            {formatCurrencyNaira(plot.promoPrice || plot.price)}
                          </span>
                          {plot.promoPrice && plot.promoPrice < plot.price && (
                            <span className="text-xs text-slate-500 line-through font-mono">
                              {formatCurrencyNaira(plot.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Plot Key Specifications Checklist */}
                      <div className="space-y-2 text-xs">
                        <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                          <span>Survey beacon demarcation & clear plot coordinate boundaries</span>
                        </div>
                        <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                          <span>Direct motorable estate road access with drainage integration</span>
                        </div>
                        <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                          <span>Verifiable title documentation (Deed of Assignment & Survey Plan)</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className={`pt-4 border-t space-y-2.5 ${isDark ? 'border-[#1E3A6E]/60' : 'border-slate-100'}`}>
                      <button
                        onClick={() => onOpenLeadModal(development.id, plot.size, 'Plot Reservation Enquiry')}
                        className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.99]"
                      >
                        <Calendar className="w-4 h-4 text-[#0B1930]" />
                        <span>Reserve Plot & Schedule Inspection</span>
                      </button>

                      <a
                        href={whatsappPlotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                          isDark
                            ? 'bg-[#060E1A] hover:bg-emerald-600 hover:text-white border-[#1E3A6E] text-slate-300 hover:border-emerald-600'
                            : 'bg-white hover:bg-emerald-600 hover:text-white border-slate-300 text-slate-700 hover:border-emerald-600 shadow-2xs'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                        <span>Enquire on {plot.size} via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3.5 OFFICIAL PRE-LAUNCH FLYERS & VERIFIED BROCHURES */}
          {development.officialFlyers && development.officialFlyers.length > 0 && (
            <div className={`rounded-2xl p-6 sm:p-8 space-y-6 border shadow-sm ${
              isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A45D]">
                    Official Documentation
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight mt-0.5 ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                    Pre-Launch Flyers & Verified Brochures
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Click any official brochure below to inspect full pricing tables, registered landmarks, and bank verification.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {development.officialFlyers.map((flyerUrl, fIdx) => (
                  <div
                    key={fIdx}
                    onClick={() => setSelectedLightboxImage(flyerUrl)}
                    className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all aspect-[3/4] bg-slate-950 ${
                      isDark ? 'border-[#1E3A6E] hover:border-[#C8A45D]' : 'border-slate-300 hover:border-[#C8A45D] shadow-xs'
                    }`}
                  >
                    <img
                      src={flyerUrl}
                      alt={`${development.name} official brochure ${fIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity flex items-end p-3">
                      <div className="flex items-center justify-between w-full text-white text-[11px] font-semibold">
                        <span>Click to Enlarge</span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#C8A45D]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3.8 LIVE VIDEO SITE INSPECTION & DRONE WALKTHROUGH */}
          {development.videos && development.videos.length > 0 && (
            <div className={`rounded-2xl p-6 sm:p-8 space-y-6 border shadow-sm ${
              isDark ? 'bg-[#060E1A] border-[#1E3A6E] text-white' : 'bg-slate-50 border-slate-200 text-[#0B1930]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A45D]">
                    <Video className="w-4 h-4" />
                    <span>Ground Reality & Verification</span>
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                    Drone Survey & On-Site Video Tours
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Real unedited footage filmed directly at {development.name}. Inspect access roads, topography, and active site markers.
                  </p>
                </div>
              </div>

              {/* Video Player Box */}
              <div className="relative rounded-xl overflow-hidden bg-black border border-[#1E3A6E] shadow-2xl aspect-video max-w-4xl mx-auto">
                <video
                  key={development.videos[activeVideoIndex]?.url}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain bg-black"
                >
                  <source src={development.videos[activeVideoIndex]?.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Clip Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {development.videos.map((vid, vIdx) => (
                  <button
                    key={vid.id}
                    onClick={() => setActiveVideoIndex(vIdx)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      activeVideoIndex === vIdx
                        ? 'border-[#C8A45D] bg-[#102342] text-white shadow-md ring-1 ring-[#C8A45D]/40'
                        : isDark
                        ? 'border-[#1E3A6E]/70 bg-[#060E1A] text-slate-300 hover:border-[#C8A45D]/60'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-[#C8A45D]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C8A45D]">
                        <Play className="w-3 h-3 fill-[#C8A45D]" />
                        <span>{vid.type}</span>
                      </div>
                      {activeVideoIndex === vIdx && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs font-bold line-clamp-1">{vid.title}</div>
                    <div className={`text-[10px] mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {vid.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

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

          {/* 5.1 STATUTORY FEES & ANCILLARY SCHEDULE */}
          {development.statutoryFees && development.statutoryFees.length > 0 && (
            <div className={`rounded-2xl p-6 sm:p-8 space-y-6 border shadow-sm ${
              isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A45D]">
                    Official Fee Schedule
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                    Statutory Fees & Ancillary Charges
                  </h3>
                </div>
                <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#C8A45D]/10 border border-[#C8A45D]/30 text-[#C8A45D] font-medium">
                  Payable within 3 months post-tenure
                </div>
              </div>

              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                In strict compliance with Ogun State physical planning and land administration protocols, the following mandatory statutory fees apply upon full settlement of land purchase:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {development.statutoryFees.map((fee, fIdx) => (
                  <div
                    key={fIdx}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 ${
                      isDark ? 'bg-[#060E1A]/80 border-[#1E3A6E]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">{fee.label}</span>
                      <span className="text-sm font-mono font-black text-[#C8A45D]">{fee.amount}</span>
                    </div>
                    {fee.description && (
                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {fee.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {development.cornerPieceFee && (
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${
                  isDark ? 'bg-[#0B1930] border-[#C8A45D]/30 text-slate-200' : 'bg-amber-50/60 border-amber-200 text-slate-800'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-[#C8A45D] shrink-0" />
                    <span><strong>Corner Piece Plots:</strong> Attract an additional statutory premium of <strong>{formatCurrencyNaira(development.cornerPieceFee)}</strong>.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5.2 BUILDING RESTRICTIONS & ARCHITECTURAL GUIDELINES */}
          {development.buildingGuidelines && development.buildingGuidelines.length > 0 && (
            <div className={`rounded-2xl p-6 sm:p-8 space-y-5 border shadow-sm ${
              isDark ? 'bg-[#060E1A] border-[#1E3A6E] text-white' : 'bg-slate-50 border-slate-200 text-[#0B1930]'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#102342] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D] shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                    Building Restrictions & Guidelines
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Strict estate covenants preserving property values, aesthetic harmony, and security.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                {development.buildingGuidelines.map((guide, gIdx) => (
                  <div
                    key={gIdx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                      isDark ? 'bg-[#102342]/60 border-[#1E3A6E]/60 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed font-medium">{guide}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5.3 OFFICIAL FAQ ACCORDION */}
          {development.faqList && development.faqList.length > 0 && (
            <div className={`rounded-2xl p-6 sm:p-8 space-y-6 border shadow-sm ${
              isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A45D]">
                    Investor Frequently Asked Questions
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                    Official FAQs & Terms of Subscription
                  </h3>
                </div>
                <div className="text-xs text-slate-400">
                  {development.faqList.length} Verified Answers
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {development.faqList.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className={`rounded-xl border transition-all ${
                        isOpen
                          ? 'border-[#C8A45D] bg-[#060E1A]/80 shadow-md'
                          : isDark
                          ? 'border-[#1E3A6E]/60 bg-[#060E1A]/40 hover:border-[#1E3A6E]'
                          : 'border-slate-200 bg-slate-50/80 hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                        className="w-full p-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                      >
                        <span className={`text-xs sm:text-sm font-bold ${isOpen ? 'text-[#C8A45D]' : isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                          {faq.question}
                        </span>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                          isOpen ? 'bg-[#C8A45D] text-[#0B1930] border-[#C8A45D]' : isDark ? 'bg-[#102342] text-slate-400 border-[#1E3A6E]' : 'bg-white text-slate-500 border-slate-200'
                        }`}>
                          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className={`px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                              isDark ? 'border-[#1E3A6E]/50 text-slate-300' : 'border-slate-200 text-slate-600'
                            }`}>
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5.4 OFFICIAL SUBSCRIPTION FORM & FAQ PDF DOWNLOAD BANNER */}
          {development.subscriptionFormPdfUrl && (
            <div className={`rounded-2xl p-6 sm:p-8 border shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 ${
              isDark ? 'bg-gradient-to-r from-[#102342] to-[#060E1A] border-[#C8A45D]/40 text-white' : 'bg-gradient-to-r from-slate-50 to-amber-50/40 border-[#C8A45D]/50 text-[#0B1930]'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C8A45D] text-[#0B1930] flex items-center justify-center shrink-0 shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D]">Official Legal Document</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Verified PDF</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold">
                    Official Subscription Form & FAQ ({development.name})
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Download the complete subscription dossier, subscriber undertakings, statutory fee breakdown, and cadastral survey notes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <a
                  href={development.subscriptionFormPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto py-3 px-5 rounded-xl bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Form PDF</span>
                </a>
              </div>
            </div>
          )}
        </SlideInLeft>

        {/* SIDEBAR: Booking & Quick Reservation Desk */}
        <SlideInRight className="lg:col-span-4 space-y-6 sticky top-28">
          {/* VERIFIED BANK ACCOUNT DETAILS CARD */}
          <div className={`rounded-2xl p-6 space-y-4 border shadow-xl ${
            isDark ? 'bg-[#060E1A] border-[#C8A45D]/40 text-white' : 'bg-white border-[#C8A45D]/50 text-[#0B1930] shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#C8A45D]">
                  Verified Corporate Bank
                </div>
                <div className="text-[11px] font-medium text-slate-400">
                  OASIS RAY DEVELOPMENTS LTD
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Official Corporate
              </span>
            </div>

            <div className="space-y-3">
              {(development.bankAccounts || settings.bankAccounts || []).map((bank, bIdx) => {
                const isCopied = copiedBankIndex === bIdx;
                return (
                  <div
                    key={bIdx}
                    className={`p-4 rounded-xl border space-y-2.5 ${
                      isDark ? 'bg-[#102342] border-[#1E3A6E]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#C8A45D] tracking-wide">{bank.bankName}</span>
                      <span className="text-[10px] font-mono text-slate-400">Oasis Ray Corporate</span>
                    </div>

                    <div>
                      <span className={`text-[10px] uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Account Name
                      </span>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>
                        {bank.accountName}
                      </span>
                    </div>

                    <div>
                      <span className={`text-[10px] uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Account Number
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-lg font-mono font-black text-[#C8A45D] tracking-wider">
                          {bank.accountNumber}
                        </span>
                        <button
                          onClick={() => handleCopyBank(bank.accountNumber, bank.bankName, bIdx)}
                          className="p-1.5 px-2.5 rounded-lg bg-[#060E1A] hover:bg-[#C8A45D] text-white hover:text-[#0B1930] border border-[#1E3A6E] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95"
                          title="Copy Account Number"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#1E3A6E]/50 text-[10px] text-slate-400 flex items-center justify-between">
              <span className="text-slate-300">Zero personal accounts</span>
              <span className="text-[#C8A45D]">Never pay cash</span>
            </div>
          </div>

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

              {development.subscriptionFormPdfUrl && (
                <a
                  href={development.subscriptionFormPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                    isDark
                      ? 'border-[#C8A45D]/40 bg-[#060E1A] text-[#C8A45D] hover:bg-[#C8A45D] hover:text-[#0B1930]'
                      : 'border-[#C8A45D] bg-amber-50/50 text-[#0B1930] hover:bg-[#C8A45D] hover:text-[#0B1930]'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Subscription Form (PDF)</span>
                </a>
              )}
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

      {/* 9. HIGH-RESOLUTION LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#C8A45D] transition-colors rounded-full bg-slate-900/80 border border-slate-700 cursor-pointer shadow-lg"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedLightboxImage}
                alt="Enlarged property asset"
                className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl border border-[#1E3A6E]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
