import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, ArrowRight, ArrowLeft, Shield, Building, UserCheck } from 'lucide-react';
import { api } from '../services/api';
import { Development, SiteSettings } from '../types';
import { generateWhatsAppLeadUrl, validateLeadForm } from '../utils/realEstateCalculators';
import { useToast } from './Toast';
import { CustomSelect } from './CustomSelect';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDevelopmentId?: string;
  initialPlotSize?: string;
  initialEnquiryType?: string;
  developments: Development[];
  settings: SiteSettings;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  initialDevelopmentId,
  initialPlotSize,
  initialEnquiryType,
  developments,
  settings
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDevId, setSelectedDevId] = useState(initialDevelopmentId || '');
  const [plotSize, setPlotSize] = useState(initialPlotSize || '');
  const [enquiryType, setEnquiryType] = useState(initialEnquiryType || 'Property Purchase');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedLead, setSubmittedLead] = useState<{
    referenceCode: string;
    fullName: string;
    developmentName?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialDevelopmentId) setSelectedDevId(initialDevelopmentId);
      if (initialPlotSize) setPlotSize(initialPlotSize);
      if (initialEnquiryType) setEnquiryType(initialEnquiryType);
      setCurrentStep(1);
      setErrors({});
      setSubmittedLead(null);
    }
  }, [isOpen, initialDevelopmentId, initialPlotSize, initialEnquiryType]);

  if (!isOpen) return null;

  const currentDev = developments.find((d) => d.id === selectedDevId);

  // Dropdown options
  const developmentOptions = [
    { value: '', label: '-- General Property Enquiry --', sublabel: 'Explore all available locations' },
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
        { value: '300 SQM', label: '300 SQM (Half Plot)' },
        { value: '450 SQM', label: '450 SQM (Suburban Villa)' },
        { value: '500 SQM', label: '500 SQM (Standard Full Plot)' },
        { value: '600 SQM', label: '600 SQM (Prime Plot)' },
        { value: '1,000+ SQM', label: '1,000+ SQM (Commercial / Executive)' }
      ];

  const enquiryOptions = [
    { value: 'Property Purchase', label: 'Property Purchase / Outright Acquisition' },
    { value: 'Investment Opportunity', label: 'Investment Opportunity (Installment / Structured)' },
    { value: 'Land Banking', label: 'Land Banking (Long-Term Capital Preservation)' },
    { value: 'Site Inspection', label: 'Site Inspection Booking' },
    { value: 'Partnership', label: 'Institutional Partnership' },
    { value: 'Realtor Registration', label: 'Realtor / Broker Registration' },
    { value: 'General Enquiry', label: 'General Corporate Enquiry' }
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
      interestedDevelopmentName: currentDev ? currentDev.name : 'General Enquiry',
      plotSizePreference: plotSize,
      enquiryType,
      message
    };

    const validation = validateLeadForm(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please correct highlighted fields before submitting.', 'error');
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
        showToast('Enquiry registered successfully!', 'success');
      } else {
        showToast(res.error || 'Failed to submit enquiry. Please try again.', 'error');
      }
    } catch {
      showToast('An unexpected error occurred. Please contact us on WhatsApp.', 'error');
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className={`relative w-full max-w-xl border rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors ${
        isDark ? 'bg-[#000538] border-[#14288F] text-white' : 'bg-white border-slate-200 text-[#00097C]'
      }`}>
        {/* Header Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'bg-[#000538] border-[#14288F]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00097C] border border-[#C8A45D]/40 flex items-center justify-center">
              <Building className="w-4 h-4 text-[#C8A45D]" />
            </div>
            <div>
              <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#00097C]'}`}>
                {currentStep === 3 ? 'Enquiry Confirmed' : 'Speak with an Investment Advisor'}
              </h3>
              <p className="text-xs text-[#C8A45D]">Oasis Ray Developments Advisory Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Close dialogue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {currentStep !== 3 && (
          <div className={`px-6 py-2.5 border-b flex items-center justify-between text-xs font-semibold ${
            isDark ? 'bg-[#00097C]/50 border-[#14288F]/50 text-slate-300' : 'bg-slate-100/70 border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 1 ? 'bg-[#C8A45D] text-[#00097C]' : 'bg-emerald-500 text-white'
              }`}>
                {currentStep > 1 ? '✓' : '1'}
              </span>
              <span>Step 1: Property Preferences</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-400/30" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 2 ? 'bg-[#C8A45D] text-[#00097C]' : 'bg-slate-700 text-slate-300'
              }`}>
                2
              </span>
              <span>Step 2: Contact Details</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Custom Select: Development */}
                <CustomSelect
                  label="Development of Interest"
                  options={developmentOptions}
                  value={selectedDevId}
                  onChange={(val) => {
                    setSelectedDevId(val);
                    setPlotSize('');
                  }}
                  placeholder="Select estate location..."
                />

                {/* Custom Select: Plot Size */}
                <CustomSelect
                  label="Plot Size Preference"
                  options={plotOptions}
                  value={plotSize}
                  onChange={(val) => setPlotSize(val)}
                  placeholder="Select preferred land size..."
                />

                {/* Custom Select: Enquiry Category */}
                <CustomSelect
                  label="Enquiry Category *"
                  options={enquiryOptions}
                  value={enquiryType}
                  onChange={(val) => setEnquiryType(val)}
                  placeholder="Select enquiry purpose..."
                />

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#00097C] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-xl shadow-md flex items-center gap-2"
                  >
                    <span>Next: Personal Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-name" className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Babatunde Adeleke"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
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
                      <label htmlFor="lead-phone" className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Phone Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 803 123 4567"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
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
                    <label htmlFor="lead-email" className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="babatunde@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                        errors.email
                          ? 'border-rose-500'
                          : isDark
                          ? 'bg-[#000538] border-[#14288F] text-white placeholder:text-slate-500'
                          : 'bg-slate-50 border-slate-300 text-[#00097C] placeholder:text-slate-400'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="lead-msg" className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Specific Requirements / Inspection Notes (Optional)
                    </label>
                    <textarea
                      id="lead-msg"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Preferred inspection date, number of plots, or payment timeline..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                        isDark
                          ? 'bg-[#000538] border-[#14288F] text-white placeholder:text-slate-500'
                          : 'bg-slate-50 border-slate-300 text-[#00097C] placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 ${
                        isDark ? 'bg-[#00097C] border-[#14288F] text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#00097C] bg-[#C8A45D] hover:bg-[#DFC07C] disabled:opacity-50 transition-colors rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span>{submitting ? 'Submitting...' : 'Complete Registration'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {currentStep === 3 && submittedLead && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#00097C]'}`}>
                    Thank You, {submittedLead.fullName}
                  </h4>
                  <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Your enquiry has been registered with our property investment desk. A dedicated manager will connect with you shortly.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border max-w-sm mx-auto text-left ${
                  isDark ? 'bg-[#00097C] border-[#14288F]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`text-[11px] uppercase tracking-wider font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Official Reference ID
                  </div>
                  <div className="text-lg font-mono font-bold text-[#C8A45D] tracking-wider mt-0.5">
                    {submittedLead.referenceCode}
                  </div>
                  {submittedLead.developmentName && (
                    <div className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Development: <span className="font-bold">{submittedLead.developmentName}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Continue on WhatsApp Desk</span>
                  </a>
                  <button
                    onClick={onClose}
                    className={`px-5 py-3 text-xs font-semibold rounded-xl border transition-colors ${
                      isDark ? 'bg-[#00097C] border-[#14288F] text-slate-200 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

