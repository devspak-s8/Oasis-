import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';
import { SlideInLeft, FadeIn } from '../components/ScrollAnimations';

interface PrivacyPolicyPageProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ settings, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 overflow-x-hidden">
      <SlideInLeft>
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
            Regulatory & Data Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy & Investor Data Protection
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Last Updated & Ratified: November 2026 · OASIS RAY DEVELOPMENTS LTD.
          </p>
        </div>
      </SlideInLeft>

      <FadeIn className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-10 space-y-8 text-sm text-slate-300 leading-relaxed shadow-xl">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C8A45D]" />
            1. Commitment to Privacy
          </h2>
          <p>
            OASIS RAY DEVELOPMENTS LTD. ("Oasis Ray", "we", "our", or "us") respects your fundamental privacy rights and is dedicated to securing the personal and financial information you entrust to us. This Privacy Policy details our procedures for collecting, processing, safeguarding, and storing investor information in accordance with the Nigeria Data Protection Act (NDPA) and global industry standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#C8A45D]" />
            2. Information We Collect
          </h2>
          <p>
            When you interact with our web platform, submit an enquiry, or engage with our investment advisory team, we may collect the following data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
            <li><strong>Identity & Contact Data:</strong> Full legal name, email address, telephone/WhatsApp number, and postal address.</li>
            <li><strong>Investment Preferences:</strong> Development of interest (Christos Gardens, Havilah City), preferred plot dimensions, intended timeline, and payment plan preferences.</li>
            <li><strong>Transaction Records:</strong> In accordance with statutory real estate conveyance, verified identification documents (e.g. National Identification Number, International Passport, or Voter's Card) for deed registration.</li>
            <li><strong>Technical & Analytical Data:</strong> Anonymized browser information, session metrics, and referral source data used exclusively for site optimization.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C8A45D]" />
            3. Purpose of Data Processing
          </h2>
          <p>Your information is processed strictly for legitimate corporate purposes, including:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              'Direct investor communication and inspection tour coordination',
              'Drafting Contracts of Sale and Deeds of Assignment',
              'Statutory survey charting and boundary documentation',
              'Anti-Money Laundering (AML) and SCUML regulatory compliance',
              'Providing milestone invoice schedules and allocation notices',
              'Responding to customer inquiries submitted through the platform'
            ].map((purpose, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs bg-[#060E1A]/60 p-2.5 rounded-lg border border-[#1E3A6E]/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>{purpose}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Non-Disclosure & Third-Party Sharing</h2>
          <p>
            OASIS RAY DEVELOPMENTS LTD. will never sell, rent, or trade your personal information to third-party commercial marketing brokers. Information is shared only with verified statutory bodies (such as the Ogun State Bureau of Lands) and licensed legal conveyancers required to formalize your property title.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Security of Data</h2>
          <p>
            We implement industry-grade technical and organizational safeguards, including SSL/TLS encryption for all data transmissions, restricted role-based internal administrative access, and secure off-site archival of physical contracts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Contact Our Data Compliance Desk</h2>
          <p>
            If you have questions, corrections, or requests regarding your personal records held with Oasis Ray Developments, please reach out to our compliance desk:
          </p>
          <div className="p-4 rounded-xl bg-[#060E1A] border border-[#1E3A6E] text-xs space-y-1">
            <div><strong>Email:</strong> {settings.email}</div>
            <div><strong>Address:</strong> {settings.officeAddress}</div>
            <div><strong>Attn:</strong> Legal & Regulatory Compliance Officer</div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
};
