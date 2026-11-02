import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, ArrowRight, Shield, Building } from 'lucide-react';
import { api } from '../services/api';
import { Development, SiteSettings } from '../types';
import { generateWhatsAppLeadUrl, validateLeadForm } from '../utils/realEstateCalculators';
import { useToast } from './Toast';

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
  const { showToast } = useToast();
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
      setErrors({});
      setSubmittedLead(null);
    }
  }, [isOpen, initialDevelopmentId, initialPlotSize, initialEnquiryType]);

  if (!isOpen) return null;

  const currentDev = developments.find((d) => d.id === selectedDevId);

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
      showToast('Please correct the highlighted fields in the form.', 'error');
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
        showToast('Enquiry registered successfully. An advisor will contact you shortly.', 'success');
      } else {
        showToast(res.error || 'Failed to submit enquiry. Please try again.', 'error');
      }
    } catch {
      showToast('An unexpected error occurred. Please contact us directly via WhatsApp.', 'error');
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
      aria-labelledby="lead-modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#0B1930] border border-[#1E3A6E] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E3A6E]/70 flex items-center justify-between bg-[#060E1A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#102342] border border-[#C8A45D]/40 flex items-center justify-center">
              <Building className="w-4 h-4 text-[#C8A45D]" />
            </div>
            <div>
              <h3 id="lead-modal-title" className="text-base font-bold text-white tracking-tight">
                {submittedLead ? 'Enquiry Confirmed' : 'Speak with an Investment Advisor'}
              </h3>
              <p className="text-xs text-[#C8A45D]">Oasis Ray Developments Advisory Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close dialogue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submittedLead ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Thank You, {submittedLead.fullName}</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your enquiry has been formally registered with our property investment desk. A dedicated relationship manager will reach out within business hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#102342] border border-[#1E3A6E] max-w-sm mx-auto text-left">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Official Reference ID
                </div>
                <div className="text-lg font-mono font-bold text-[#C8A45D] tracking-wider mt-0.5">
                  {submittedLead.referenceCode}
                </div>
                {submittedLead.developmentName && (
                  <div className="text-xs text-slate-300 mt-1">
                    Development: <span className="text-white font-medium">{submittedLead.developmentName}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Continue on WhatsApp Instant Desk
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-3 text-sm font-medium rounded-lg bg-[#102342] hover:bg-[#142B52] text-slate-200 border border-[#1E3A6E] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#060E1A] border text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                      errors.fullName ? 'border-rose-500' : 'border-[#1E3A6E]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#060E1A] border text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                      errors.phone ? 'border-rose-500' : 'border-[#1E3A6E]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  id="lead-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="babatunde@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#060E1A] border text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                    errors.email ? 'border-rose-500' : 'border-[#1E3A6E]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-dev" className="block text-xs font-semibold text-slate-300 mb-1">
                    Development of Interest
                  </label>
                  <select
                    id="lead-dev"
                    value={selectedDevId}
                    onChange={(e) => {
                      setSelectedDevId(e.target.value);
                      setPlotSize('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
                  >
                    <option value="">-- General Property Enquiry --</option>
                    {developments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="lead-plotsize" className="block text-xs font-semibold text-slate-300 mb-1">
                    Plot Size Preference
                  </label>
                  <select
                    id="lead-plotsize"
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
                  >
                    <option value="">Any Available Size</option>
                    {currentDev ? (
                      currentDev.plotSizes.map((p) => (
                        <option key={p.id} value={p.size}>
                          {p.size} ({p.title})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="300 SQM">300 SQM (Half Plot)</option>
                        <option value="450 SQM">450 SQM (Suburban Villa)</option>
                        <option value="500 SQM">500 SQM (Standard Full Plot)</option>
                        <option value="600 SQM">600 SQM (Prime Plot)</option>
                        <option value="1,000+ SQM">1,000+ SQM (Commercial / Executive)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="lead-type" className="block text-xs font-semibold text-slate-300 mb-1">
                  Enquiry Category <span className="text-rose-400">*</span>
                </label>
                <select
                  id="lead-type"
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#060E1A] border text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                    errors.enquiryType ? 'border-rose-500' : 'border-[#1E3A6E]'
                  }`}
                >
                  <option value="Property Purchase">Property Purchase / Outright Acquisition</option>
                  <option value="Investment Opportunity">Investment Opportunity (Installment / Structured)</option>
                  <option value="Land Banking">Land Banking (Long-Term Capital Preservation)</option>
                  <option value="Site Inspection">Site Inspection Booking</option>
                  <option value="Partnership">Institutional Partnership</option>
                  <option value="Realtor Registration">Realtor / Broker Registration</option>
                  <option value="General Enquiry">General Corporate Enquiry</option>
                </select>
                {errors.enquiryType && <p className="text-[11px] text-rose-400 mt-1">{errors.enquiryType}</p>}
              </div>

              <div>
                <label htmlFor="lead-msg" className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific Requirements / Questions (Optional)
                </label>
                <textarea
                  id="lead-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details such as preferred inspection dates, number of plots, or payment timeline..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1E3A6E]/50">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>Strict investor confidentiality guaranteed.</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 sm:flex-initial px-6 py-2.5 text-xs font-semibold tracking-wide text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] disabled:opacity-50 transition-colors rounded-lg flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>{submitting ? 'Submitting...' : 'Submit Request'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
