import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { api } from '../services/api';
import { validateLeadForm, generateWhatsAppLeadUrl } from '../utils/realEstateCalculators';
import { useToast } from '../components/Toast';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SlideInLeft, SlideInRight, FadeIn } from '../components/ScrollAnimations';

interface ContactPageProps {
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [enquiryType, setEnquiryType] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      fullName,
      email,
      phone,
      enquiryType,
      message: subject ? `Subject: ${subject}\n\n${message}` : message
    };

    const validation = validateLeadForm(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await api.submitEnquiry(payload);
      if (res.success && res.lead) {
        setSubmittedCode(res.lead.referenceCode);
        showToast('Your message has been sent successfully.', 'success');
        setFullName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        showToast(res.error || 'Failed to submit form.', 'error');
      }
    } catch {
      showToast('Error communicating with server. Please try WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = generateWhatsAppLeadUrl(settings.whatsappNumber, {
    clientName: fullName || undefined,
    enquiryType
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 overflow-x-hidden">
      {/* Header */}
      <SlideInLeft>
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
            Direct Communication
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Connect With Our Advisory Team
          </h1>
          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Whether you are looking to acquire a verified residential parcel, schedule a physical site inspection tour, or explore institutional land banking, our team is at your service.
          </p>
        </div>
      </SlideInLeft>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Details */}
        <SlideInLeft className="lg:col-span-5 space-y-8">
          <div className="bg-[#00097C] border border-[#14288F] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Corporate Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#000538] border border-[#14288F] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#C8A45D]" />
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Head Office Address</div>
                  <div className="text-white text-xs font-medium mt-0.5">{settings.officeAddress}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#000538] border border-[#14288F] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#C8A45D]" />
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Direct Investor Line</div>
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-white text-xs font-medium hover:text-[#C8A45D] transition-colors mt-0.5 block">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#000538] border border-[#14288F] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#C8A45D]" />
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Official Correspondence</div>
                  <a href={`mailto:${settings.email}`} className="text-white text-xs font-medium hover:text-[#C8A45D] transition-colors mt-0.5 block">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#000538] border border-[#14288F] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#C8A45D]" />
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Advisory Hours</div>
                  <div className="text-slate-200 text-xs mt-0.5">{settings.workingHours}</div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-4 border-t border-[#14288F]/60">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Conversation on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Location Map Preview Card */}
          <div className="bg-[#000538] border border-[#14288F] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Site Coordinates & Regional Hub
              </h4>
              <span className="text-[10px] text-[#C8A45D] font-mono">Ogun State, NG</span>
            </div>
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#14288F] relative bg-[#00097C] flex items-center justify-center">
              <div className="text-center p-4 space-y-2">
                <MapPin className="w-6 h-6 text-[#C8A45D]" />
                <div className="text-xs font-bold text-white">Mowe-Ofada & Abeokuta Corridors</div>
                <div className="text-[11px] text-slate-400">
                  Site inspection rendezvous arranged at our estate reception pavilions.
                </div>
              </div>
            </div>
          </div>
        </SlideInLeft>

        {/* Contact Form */}
        <SlideInRight className="lg:col-span-7 bg-[#00097C] border border-[#14288F] rounded-2xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-2 mb-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Submit an Official Enquiry
            </h3>
            <p className="text-xs text-slate-300">
              Complete the form below to receive formal documentation, schedule an inspection, or connect with a consultant.
            </p>
          </div>

          {submittedCode && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold">Enquiry Registered!</span> Your official reference code is{' '}
                <strong className="font-mono text-white underline">{submittedCode}</strong>. Our team will contact you within business hours.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Oluwaseun Adeleke"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#000538] border text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                    errors.fullName ? 'border-rose-500' : 'border-[#14288F]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 803 123 4567"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#000538] border text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                    errors.phone ? 'border-rose-500' : 'border-[#14288F]'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seun@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#000538] border text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                    errors.email ? 'border-rose-500' : 'border-[#14288F]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-category" className="block text-xs font-semibold text-slate-300 mb-1">
                  Enquiry Category <span className="text-rose-400">*</span>
                </label>
                <select
                  id="contact-category"
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#000538] border border-[#14288F] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Property Purchase">Property Purchase (Outright)</option>
                  <option value="Investment Opportunity">Investment Opportunity (Installment)</option>
                  <option value="Land Banking">Land Banking</option>
                  <option value="Site Inspection">Site Inspection Tour Booking</option>
                  <option value="Partnership">Corporate / Institutional Partnership</option>
                  <option value="Realtor Registration">Realtor / Broker Network Registration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-300 mb-1">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Booking Inspection for Christos Gardens this Saturday"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#000538] border border-[#14288F] text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 mb-1">
                Your Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Kindly include any specific questions regarding plot dimensions, payment timelines, or inspection logistics..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#000538] border border-[#14288F] text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#14288F]/50">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
                <span>Encrypted and strictly confidential submission.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#00097C] bg-[#C8A45D] hover:bg-[#DFC07C] disabled:opacity-50 transition-colors rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{submitting ? 'Transmitting...' : 'Send Message'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </SlideInRight>
      </div>
    </div>
  );
};
