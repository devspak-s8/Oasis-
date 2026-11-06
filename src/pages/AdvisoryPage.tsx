import React, { useState, useEffect } from 'react';
import { Development, SiteSettings } from '../types';
import { api } from '../services/api';
import { generateWhatsAppLeadUrl, validateLeadForm } from '../utils/realEstateCalculators';
import { CustomSelect } from '../components/CustomSelect';
import { useToast } from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Award, 
  MapPin, 
  UserCheck 
} from 'lucide-react';
import { FadeIn, SlideInLeft } from '../components/ScrollAnimations';

interface AdvisoryPageProps {
  developments: Development[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  initialDevId?: string;
  initialPlotSize?: string;
}

export const AdvisoryPage: React.FC<AdvisoryPageProps> = ({
  developments,
  settings,
  onNavigate,
  initialDevId,
  initialPlotSize
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedDevId, setSelectedDevId] = useState(initialDevId || '');
  const [plotSize, setPlotSize] = useState(initialPlotSize || '');
  const [enquiryType, setEnquiryType] = useState('Property Acquisition');
  const [inspectionPreference, setInspectionPreference] = useState('Weekend Tour');
  
  // Contact details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedLead, setSubmittedLead] = useState<{
    referenceCode: string;
    fullName: string;
    developmentName?: string;
  } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const currentDev = developments.find((d) => d.id === selectedDevId);

  // Dropdown options
  const developmentOptions = [
    { value: '', label: '-- General Advisory / All Locations --', sublabel: 'Explore all high-growth corridors' },
    ...developments.map((d) => ({
      value: d.id,
      label: d.name,
      sublabel: d.location
    }))
  ];

  const plotOptions = currentDev
    ? [
        { value: '', label: 'Any Available Size' },
        ...currentDev.plotSizes.map((p) => ({
          value: p.size,
          label: `${p.size} (${p.title})`
        }))
      ]
    : [
        { value: '', label: 'Any Available Size' },
        { value: '300 SQM', label: '300 SQM (Starter Plot)' },
        { value: '450 SQM', label: '450 SQM (Suburban Villa)' },
        { value: '500 SQM', label: '500 SQM (Standard Full Plot)' },
        { value: '600 SQM', label: '600 SQM (Executive Plot)' },
        { value: '1,000+ SQM', label: '1,000+ SQM (Commercial / Acreage)' }
      ];

  const enquiryOptions = [
    { value: 'Property Acquisition', label: 'Outright Land Acquisition' },
    { value: 'Structured Payment Plan', label: 'Structured 12-Month Installment Plan' },
    { value: 'Site Inspection Booking', label: 'Guided On-Site Inspection Booking' },
    { value: 'Land Banking', label: 'Long-Term Land Banking Portfolio' },
    { value: 'Realtor Brokerage', label: 'Realtor / Broker Partnership' },
    { value: 'Corporate Advisory', label: 'Corporate & Diaspora Advisory Desk' }
  ];

  const inspectionOptions = [
    { value: 'Weekend Tour', label: 'Weekend Group Chauffeur Tour (Sat / Sun)' },
    { value: 'Weekday Tour', label: 'Weekday Private Inspection (Mon - Fri)' },
    { value: 'Virtual Video Walkthrough', label: 'Virtual Live HD Video Inspection' },
    { value: 'Not Ready Yet', label: 'No Inspection Needed Right Now' }
  ];

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      fullName,
      email,
      phone,
      interestedDevelopmentId: selectedDevId,
      interestedDevelopmentName: currentDev ? currentDev.name : 'General Advisory',
      plotSizePreference: plotSize,
      enquiryType,
      message: `${message ? message + ' | ' : ''}Inspection: ${inspectionPreference}`
    };

    const validation = validateLeadForm(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please complete all required contact details.', 'error');
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await api.submitEnquiry(payload);
      if (res.success && res.lead) {
        setSubmittedLead({
          referenceCode: res.lead.referenceCode,
          fullName: res.lead.fullName,
          developmentName: res.lead.interestedDevelopmentName
        });
        setCurrentStep(3);
        showToast('Advisor desk booking created successfully!', 'success');
      } else {
        showToast(res.error || 'Failed to submit enquiry. Please try again.', 'error');
      }
    } catch {
      showToast('An error occurred. Please reach out via WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    return generateWhatsAppLeadUrl(settings.whatsappNumber, {
      clientName: fullName || submittedLead?.fullName,
      developmentName: currentDev?.name || submittedLead?.developmentName,
      plotSize: plotSize || undefined,
      enquiryType,
      referenceCode: submittedLead?.referenceCode
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header Banner */}
      <SlideInLeft className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C8A45D]/15 text-[#C8A45D] border border-[#C8A45D]/30">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Oasis Ray Advisory Desk</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-[#00097C]'
        }`}>
          Speak with an Investment Advisor
        </h1>
        <p className={`text-base leading-relaxed font-normal max-w-2xl ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Get direct, personalized guidance from our senior real estate consultants on strategic land acquisition, boundary verification, zero-encumbrance title search, and structured payment schedules across Ogun State growth corridors.
        </p>
      </SlideInLeft>

      {/* Main Grid: Form Flow + Trust Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Step Paged Form (8 cols) */}
        <div className={`lg:col-span-8 rounded-2xl border shadow-xl p-6 sm:p-8 transition-colors ${
          isDark ? 'bg-[#000538] border-[#14288F] text-white' : 'bg-white border-slate-200 text-[#00097C]'
        }`}>
          {/* Step Progress Indicators */}
          <div className="mb-8 border-b pb-6 border-slate-700/40">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => currentStep > 1 && setCurrentStep(1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === 1
                      ? 'bg-[#C8A45D] text-[#00097C] ring-4 ring-[#C8A45D]/20 shadow-md'
                      : currentStep > 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStep > 1 ? '✓' : '1'}
                </button>
                <span className={`text-[11px] font-bold tracking-tight uppercase ${
                  currentStep === 1 ? 'text-[#C8A45D]' : isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  1. Estate Choice
                </span>
              </div>

              <div className={`flex-1 h-0.5 mx-2 ${currentStep > 1 ? 'bg-emerald-500' : 'bg-slate-700/40'}`} />

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => currentStep === 3 && setCurrentStep(2)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === 2
                      ? 'bg-[#C8A45D] text-[#00097C] ring-4 ring-[#C8A45D]/20 shadow-md'
                      : currentStep > 2
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStep > 2 ? '✓' : '2'}
                </button>
                <span className={`text-[11px] font-bold tracking-tight uppercase ${
                  currentStep === 2 ? 'text-[#C8A45D]' : isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  2. Contact & Tour
                </span>
              </div>

              <div className={`flex-1 h-0.5 mx-2 ${currentStep === 3 ? 'bg-emerald-500' : 'bg-slate-700/40'}`} />

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === 3
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20 shadow-md'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  3
                </div>
                <span className={`text-[11px] font-bold tracking-tight uppercase ${
                  currentStep === 3 ? 'text-emerald-400' : isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  3. Reference Desk
                </span>
              </div>
            </div>
          </div>

          {/* Step 1: Property & Investment Preferences */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="paged-step-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-[#00097C]'}`}>
                    Step 1: Select Property & Land Preferences
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Tell us which development location or plot dimension matches your investment horizon.
                  </p>
                </div>

                <div className="space-y-5">
                  <CustomSelect
                    label="Select Estate / Development Location"
                    options={developmentOptions}
                    value={selectedDevId}
                    onChange={(val) => {
                      setSelectedDevId(val);
                      setPlotSize('');
                    }}
                    placeholder="Choose development or general enquiry..."
                  />

                  <CustomSelect
                    label="Plot Size Preference"
                    options={plotOptions}
                    value={plotSize}
                    onChange={(val) => setPlotSize(val)}
                    placeholder="Choose land plot dimensions..."
                  />

                  <CustomSelect
                    label="Primary Advisory Category"
                    options={enquiryOptions}
                    value={enquiryType}
                    onChange={(val) => setEnquiryType(val)}
                    placeholder="Choose enquiry purpose..."
                  />

                  {currentDev && (
                    <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                      isDark ? 'bg-[#000538] border-[#14288F]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#C8A45D]/40">
                        <img src={currentDev.heroImage} alt={currentDev.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-[#C8A45D]">{currentDev.name}</div>
                        <div className={`text-xs font-semibold flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          <MapPin className="w-3 h-3 text-[#C8A45D]" />
                          <span>{currentDev.location}</span>
                        </div>
                        <div className="text-[11px] text-emerald-400 font-bold">
                          Starting at ₦{(currentDev.startingPrice / 1000000).toFixed(1)} Million
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#00097C] bg-[#C8A45D] hover:bg-[#DFC07C] transition-all rounded-xl shadow-lg flex items-center gap-2 active:scale-95"
                    >
                      <span>Proceed to Contact & Tour Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact Details & Tour Booking */}
            {currentStep === 2 && (
              <motion.div
                key="paged-step-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-[#00097C]'}`}>
                    Step 2: Investor Contact & On-Site Inspection Schedule
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Provide your contact info so our senior advisor can send site surveys, layout blueprints, and schedule your site visit.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="adv-name" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="adv-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Olumide Adeleke"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 ${
                          errors.fullName
                            ? 'border-rose-500'
                            : isDark
                            ? 'bg-[#000538] border-[#14288F] text-white placeholder:text-slate-500'
                            : 'bg-slate-50 border-slate-300 text-[#00097C] placeholder:text-slate-400'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="adv-phone" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Phone / WhatsApp Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="adv-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 803 123 4567"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 ${
                          errors.phone
                            ? 'border-rose-500'
                            : isDark
                            ? 'bg-[#000538] border-[#14288F] text-white placeholder:text-slate-500'
                            : 'bg-slate-50 border-slate-300 text-[#00097C] placeholder:text-slate-400'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="adv-email" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="adv-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="olumide@investor.com"
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 ${
                        errors.email
                          ? 'border-rose-500'
                          : isDark
                          ? 'bg-[#000538] border-[#14288F] text-white placeholder:text-slate-500'
                          : 'bg-slate-50 border-slate-300 text-[#00097C] placeholder:text-slate-400'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  <CustomSelect
                    label="Preferred On-Site Inspection Schedule"
                    options={inspectionOptions}
                    value={inspectionPreference}
                    onChange={(val) => setInspectionPreference(val)}
                    placeholder="Select tour type..."
                  />

                  <div>
                    <label htmlFor="adv-notes" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Additional Notes / Specific Questions (Optional)
                    </label>
                    <textarea
                      id="adv-notes"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Asking about Ogun State C of O status, 12-month payment spreads, or commercial plot availability..."
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 ${
                        isDark
                          ? 'bg-[#000538] border-[#14288F] text-white placeholder:text-slate-500'
                          : 'bg-slate-50 border-slate-300 text-[#00097C] placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className={`px-5 py-3 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 ${
                        isDark ? 'bg-[#00097C] border-[#14288F] text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Step 1</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#00097C] bg-[#C8A45D] hover:bg-[#DFC07C] disabled:opacity-50 transition-all rounded-xl shadow-lg flex items-center gap-2 active:scale-95"
                    >
                      <span>{submitting ? 'Creating Reference...' : 'Submit Advisory Booking'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Verified Reference Summary & WhatsApp Routing */}
            {currentStep === 3 && submittedLead && (
              <motion.div
                key="paged-step-3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-20 h-20 bg-emerald-500/15 border-2 border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#00097C]'}`}>
                    Advisory Booking Confirmed
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Welcome, <span className="font-bold text-[#C8A45D]">{submittedLead.fullName}</span>. Your enquiry has been assigned to a senior investment advisor at Oasis Ray Developments.
                  </p>
                </div>

                {/* Reference ID Card */}
                <div className={`p-6 rounded-2xl border max-w-md mx-auto text-left shadow-lg space-y-3 ${
                  isDark ? 'bg-[#000538] border-[#14288F]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between border-b pb-3 border-slate-700/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Reference ID</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-[#C8A45D] tracking-widest">
                    {submittedLead.referenceCode}
                  </div>
                  {submittedLead.developmentName && (
                    <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Selected Location: <span className="font-bold">{submittedLead.developmentName}</span>
                    </div>
                  )}
                  <div className="text-[11px] text-slate-400 pt-1">
                    Guaranteed response window: <span className="text-[#C8A45D] font-semibold">Under 15 Minutes</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open WhatsApp Advisory Desk</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('/developments')}
                    className={`w-full sm:w-auto px-6 py-3.5 text-xs font-semibold rounded-xl border transition-colors ${
                      isDark ? 'bg-[#00097C] border-[#14288F] text-slate-200 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Explore More Estates
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Advisory Desk Credentials & Trust Pillar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <FadeIn delay={0.2}>
            <div className={`rounded-2xl border p-6 space-y-5 transition-colors ${
              isDark ? 'bg-[#000538] border-[#14288F] text-white' : 'bg-white border-slate-200 text-[#00097C]'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00097C] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#00097C]'}`}>
                    Why Speak with Us?
                  </h4>
                  <p className="text-[11px] text-[#C8A45D]">Institutional Guarantee</p>
                </div>
              </div>

              <div className="space-y-3 pt-1 text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">Verified Titles:</span> Survey-backed state records
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">Zero Encumbrance:</span> Dispute-free clear titles
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">12-Month Spreads:</span> Flexible payment plans
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">Free Site Tours:</span> Chauffeur-driven visits
                  </div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                isDark ? 'bg-[#000538] border-[#14288F]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-[#C8A45D]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Desk Hours</span>
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Mon – Sat: 8 AM – 6 PM | <span className="text-emerald-400 font-bold">24/7 WhatsApp</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
