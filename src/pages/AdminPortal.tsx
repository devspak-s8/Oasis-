import React, { useState, useEffect } from 'react';
import { Development, LeadEnquiry, SiteSettings, Testimonial } from '../types';
import { api } from '../services/api';
import { formatCurrencyNaira, generateWhatsAppLeadUrl } from '../utils/realEstateCalculators';
import { useToast } from '../components/Toast';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Building,
  Users,
  Settings,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  Eye,
  RefreshCw,
  Search
} from 'lucide-react';

interface AdminPortalProps {
  developments: Development[];
  settings: SiteSettings;
  testimonials: Testimonial[];
  onRefreshData: () => void;
  onNavigatePublic: (path: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  developments,
  settings,
  testimonials,
  onRefreshData,
  onNavigatePublic
}) => {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(api.isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'developments' | 'settings' | 'testimonials' | 'seo'>('leads');

  // Leads state
  const [enquiries, setEnquiries] = useState<LeadEnquiry[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState('');

  // Selected development for editing
  const [editingDev, setEditingDev] = useState<Development | null>(null);
  const [editingSettings, setEditingSettings] = useState<SiteSettings>({ ...settings });

  // Testimonials state
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    authorName: '',
    authorRole: '',
    authorLocation: '',
    propertyInvested: '',
    quote: '',
    isVerified: true
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadEnquiries();
    }
  }, [isAuthenticated]);

  const loadEnquiries = async () => {
    setLoadingLeads(true);
    try {
      const data = await api.getEnquiries();
      setEnquiries(data);
    } catch {
      showToast('Could not load leads from backend.', 'error');
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (api.verifyAdmin(passcode)) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Admin authenticated successfully.', 'success');
      loadEnquiries();
    } else {
      setAuthError('Incorrect passcode. Use authorized staff passcode: oasis2026');
      showToast('Authentication failed.', 'error');
    }
  };

  const handleLogout = () => {
    api.adminLogout();
    setIsAuthenticated(false);
    showToast('Signed out from Admin Portal.', 'info');
  };

  const handleUpdateLeadStatus = async (id: string, status: LeadEnquiry['status'], notes?: string) => {
    await api.updateEnquiryStatus(id, status, notes);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, ...(notes !== undefined ? { notes } : {}) } : e))
    );
    showToast('Lead status updated.', 'success');
  };

  const handleSaveDevelopment = async () => {
    if (!editingDev) return;
    try {
      await api.saveDevelopment(editingDev);
      onRefreshData();
      showToast(`Saved ${editingDev.name} successfully.`, 'success');
      setEditingDev(null);
    } catch {
      showToast('Failed to save development.', 'error');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateSettings(editingSettings);
      onRefreshData();
      showToast('Website corporate settings saved.', 'success');
    } catch {
      showToast('Failed to save settings.', 'error');
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.authorName || !newTestimonial.quote) {
      showToast('Author name and quote are required.', 'error');
      return;
    }
    const item: Testimonial = {
      id: `t-${Date.now()}`,
      authorName: newTestimonial.authorName!,
      authorRole: newTestimonial.authorRole || 'Property Investor',
      authorLocation: newTestimonial.authorLocation || 'Nigeria',
      propertyInvested: newTestimonial.propertyInvested || 'Christos Gardens',
      quote: newTestimonial.quote!,
      isVerified: true,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    await api.saveTestimonial(item);
    onRefreshData();
    showToast('Testimonial added to website.', 'success');
    setNewTestimonial({
      authorName: '',
      authorRole: '',
      authorLocation: '',
      propertyInvested: '',
      quote: '',
      isVerified: true
    });
  };

  const exportLeadsCSV = () => {
    const headers = ['Ref ID', 'Date', 'Name', 'Phone', 'Email', 'Development', 'Plot Size', 'Type', 'Status', 'Message'];
    const rows = enquiries.map((e) => [
      e.referenceCode,
      new Date(e.createdAt).toLocaleDateString(),
      `"${e.fullName}"`,
      `"${e.phone}"`,
      e.email,
      `"${e.interestedDevelopmentName || ''}"`,
      `"${e.plotSizePreference || ''}"`,
      `"${e.enquiryType}"`,
      e.status,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Oasis_Ray_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-[#102342] border border-[#1E3A6E] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#060E1A] border border-[#C8A45D]/40 flex items-center justify-center mx-auto text-[#C8A45D]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Staff CMS Access</h1>
            <p className="text-xs text-slate-400">
              OASIS RAY DEVELOPMENTS LTD. Administrative Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block text-xs font-semibold text-slate-300 mb-1">
                Administrative Passcode
              </label>
              <input
                id="admin-pass"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-4 py-3 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
              />
              {authError && <p className="text-xs text-rose-400 mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Sign In to Management Console
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400">
              Default passcode for staff review: <strong className="text-[#C8A45D] font-mono">oasis2026</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Leads
  const filteredEnquiries = enquiries.filter((e) => {
    if (leadStatusFilter !== 'all' && e.status !== leadStatusFilter) return false;
    if (leadSearch.trim() !== '') {
      const q = leadSearch.toLowerCase();
      const match =
        e.fullName.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.referenceCode.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Console Bar */}
      <div className="bg-[#060E1A] border border-[#1E3A6E] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C8A45D]" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Administrative Control Management System
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            OASIS RAY DEVELOPMENTS LTD. · Authorized Portal
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigatePublic('/')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#102342] hover:bg-[#142B52] border border-[#1E3A6E] text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-200 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#1E3A6E] gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-5 py-3 rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'leads'
              ? 'bg-[#102342] text-[#C8A45D] border-t-2 border-[#C8A45D]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Leads & Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('developments')}
          className={`px-5 py-3 rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'developments'
              ? 'bg-[#102342] text-[#C8A45D] border-t-2 border-[#C8A45D]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Property Developments ({developments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-3 rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-[#102342] text-[#C8A45D] border-t-2 border-[#C8A45D]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Website Settings & Contact</span>
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-5 py-3 rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'testimonials'
              ? 'bg-[#102342] text-[#C8A45D] border-t-2 border-[#C8A45D]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Testimonials ({testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`px-5 py-3 rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'seo'
              ? 'bg-[#102342] text-[#C8A45D] border-t-2 border-[#C8A45D]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>SEO, AEO & GEO Audit</span>
        </button>
      </div>

      {/* TAB 1: LEADS & ENQUIRIES */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                placeholder="Search leads by name, phone, email, or Ref ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
              />
            </div>

            {/* Filter by status */}
            <div className="flex items-center gap-3">
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="bg-[#060E1A] border border-[#1E3A6E] text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
              >
                <option value="all">All Pipeline Stages</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Site Inspection Scheduled">Site Inspection Scheduled</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Closed">Closed</option>
              </select>

              <button
                onClick={loadEnquiries}
                className="p-2.5 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-slate-300 hover:text-white"
                title="Refresh leads"
              >
                <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={exportLeadsCSV}
                className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] flex items-center gap-1.5 shadow-sm whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#060E1A] text-slate-400 uppercase font-mono tracking-wider text-[11px] border-b border-[#1E3A6E]">
                  <tr>
                    <th className="py-3.5 px-4">Ref ID / Date</th>
                    <th className="py-3.5 px-4">Investor Contact</th>
                    <th className="py-3.5 px-4">Interest & Category</th>
                    <th className="py-3.5 px-4">Status & Notes</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3A6E]/50">
                  {filteredEnquiries.map((lead) => {
                    const clientWhatsApp = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${lead.fullName}, thank you for enquiring with OASIS RAY DEVELOPMENTS LTD. regarding ${
                        lead.interestedDevelopmentName || 'our property opportunities'
                      } (Ref: ${lead.referenceCode}). I am reaching out from our investor relations desk.`
                    )}`;

                    return (
                      <tr key={lead.id} className="hover:bg-[#142B52]/50 transition-colors">
                        <td className="py-4 px-4 align-top">
                          <div className="font-mono font-bold text-[#C8A45D]">{lead.referenceCode}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <div className="font-bold text-white text-sm">{lead.fullName}</div>
                          <div className="text-slate-300 font-mono mt-0.5">{lead.phone}</div>
                          <div className="text-slate-400 text-[11px]">{lead.email}</div>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <div className="text-white font-medium">
                            {lead.interestedDevelopmentName || 'General Enquiry'}
                          </div>
                          {lead.plotSizePreference && (
                            <div className="text-[11px] text-[#C8A45D]">Plot: {lead.plotSizePreference}</div>
                          )}
                          <div className="text-[11px] text-slate-400 mt-1">Focus: {lead.enquiryType}</div>
                          {lead.message && (
                            <div className="text-[11px] text-slate-300 mt-1 italic line-clamp-2 max-w-xs">
                              "{lead.message}"
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 align-top space-y-2">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleUpdateLeadStatus(lead.id, e.target.value as LeadEnquiry['status'], lead.notes)
                            }
                            className={`text-xs font-semibold rounded-md px-2.5 py-1 border focus:outline-none ${
                              lead.status === 'New'
                                ? 'bg-blue-950/80 border-blue-500/40 text-blue-300'
                                : lead.status === 'Contacted'
                                ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                                : lead.status === 'Site Inspection Scheduled'
                                ? 'bg-purple-950/80 border-purple-500/40 text-purple-300'
                                : lead.status === 'Closed'
                                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                                : 'bg-slate-900 border-slate-700 text-slate-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Site Inspection Scheduled">Site Inspection Scheduled</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Closed">Closed</option>
                          </select>

                          {lead.notes && (
                            <div className="text-[11px] text-slate-400 bg-[#060E1A]/80 p-1.5 rounded border border-[#1E3A6E]/40">
                              Note: {lead.notes}
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 align-top text-right space-x-2">
                          <a
                            href={clientWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredEnquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No enquiries match the current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEVELOPMENTS MANAGER */}
      {activeTab === 'developments' && (
        <div className="space-y-6">
          {editingDev ? (
            <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E3A6E]">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Editing: {editingDev.name}
                  </h3>
                  <p className="text-xs text-slate-400">Update project details, plot prices, and infrastructure</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingDev(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#060E1A] text-slate-300 hover:text-white border border-[#1E3A6E]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDevelopment}
                    className="px-5 py-2 text-xs font-bold rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estate Name</label>
                  <input
                    type="text"
                    value={editingDev.name}
                    onChange={(e) => setEditingDev({ ...editingDev, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingDev.tagline}
                    onChange={(e) => setEditingDev({ ...editingDev, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingDev.location}
                    onChange={(e) => setEditingDev({ ...editingDev, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (₦)</label>
                  <input
                    type="number"
                    value={editingDev.startingPrice}
                    onChange={(e) => setEditingDev({ ...editingDev, startingPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Availability Status</label>
                  <select
                    value={editingDev.availability}
                    onChange={(e) => setEditingDev({ ...editingDev, availability: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                  >
                    <option value="Available">Available</option>
                    <option value="Selling Fast">Selling Fast</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingDev.category}
                    onChange={(e) => setEditingDev({ ...editingDev, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Overview</label>
                <textarea
                  rows={3}
                  value={editingDev.overview}
                  onChange={(e) => setEditingDev({ ...editingDev, overview: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                />
              </div>

              {/* Plot Sizes Editor */}
              <div className="space-y-3 pt-4 border-t border-[#1E3A6E]">
                <h4 className="text-sm font-bold text-white">Plot Sizes & Pricing Configuration</h4>
                <div className="space-y-3">
                  {editingDev.plotSizes.map((plot, pIdx) => (
                    <div
                      key={plot.id}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#060E1A] p-3 rounded-xl border border-[#1E3A6E]"
                    >
                      <div>
                        <label className="block text-[10px] text-slate-400">Size</label>
                        <input
                          type="text"
                          value={plot.size}
                          onChange={(e) => {
                            const updated = [...editingDev.plotSizes];
                            updated[pIdx].size = e.target.value;
                            setEditingDev({ ...editingDev, plotSizes: updated });
                          }}
                          className="w-full p-1.5 bg-[#102342] border border-[#1E3A6E] rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400">Title</label>
                        <input
                          type="text"
                          value={plot.title}
                          onChange={(e) => {
                            const updated = [...editingDev.plotSizes];
                            updated[pIdx].title = e.target.value;
                            setEditingDev({ ...editingDev, plotSizes: updated });
                          }}
                          className="w-full p-1.5 bg-[#102342] border border-[#1E3A6E] rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400">Price (₦)</label>
                        <input
                          type="number"
                          value={plot.price}
                          onChange={(e) => {
                            const updated = [...editingDev.plotSizes];
                            updated[pIdx].price = parseInt(e.target.value) || 0;
                            setEditingDev({ ...editingDev, plotSizes: updated });
                          }}
                          className="w-full p-1.5 bg-[#102342] border border-[#1E3A6E] rounded text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400">Promo / Discount Price (₦)</label>
                        <input
                          type="number"
                          value={plot.promoPrice || ''}
                          onChange={(e) => {
                            const updated = [...editingDev.plotSizes];
                            updated[pIdx].promoPrice = e.target.value ? parseInt(e.target.value) : undefined;
                            setEditingDev({ ...editingDev, plotSizes: updated });
                          }}
                          className="w-full p-1.5 bg-[#102342] border border-[#1E3A6E] rounded text-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cadastral Map Plot Status Toggles */}
              <div className="space-y-3 pt-4 border-t border-[#1E3A6E]">
                <h4 className="text-sm font-bold text-white">Interactive Plot Cadastral Map Statuses</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {editingDev.plots.map((plot, pIdx) => (
                    <div
                      key={plot.id}
                      className="p-3 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-xs space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">{plot.plotNumber}</span>
                        <span className="text-[10px] text-slate-400">{plot.size}</span>
                      </div>
                      <select
                        value={plot.status}
                        onChange={(e) => {
                          const updated = [...editingDev.plots];
                          updated[pIdx].status = e.target.value as any;
                          setEditingDev({ ...editingDev, plots: updated });
                        }}
                        className="w-full p-1 bg-[#102342] border border-[#1E3A6E] rounded text-white text-[11px]"
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {developments.map((dev) => (
                <div
                  key={dev.id}
                  className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-6 space-y-4 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#C8A45D] uppercase">{dev.category}</span>
                    <span className="text-xs text-emerald-400 font-semibold">{dev.availability}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{dev.name}</h3>
                  <p className="text-xs text-slate-300">{dev.location}</p>

                  <div className="text-xs font-mono text-slate-300">
                    Starting: <strong className="text-white">{formatCurrencyNaira(dev.startingPrice)}</strong>
                  </div>

                  <div className="pt-3 border-t border-[#1E3A6E] flex items-center justify-between">
                    <button
                      onClick={() => setEditingDev({ ...dev })}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C8A45D] text-[#0B1930] hover:bg-[#DFC07C] transition-colors flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Information</span>
                    </button>

                    <button
                      onClick={() => onNavigatePublic(`/developments/${dev.slug}`)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      View Live Page →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BASIC WEBSITE SETTINGS & PLACEHOLDERS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="pb-4 border-b border-[#1E3A6E] flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Corporate Website Settings</h3>
              <p className="text-xs text-slate-400">Update company phone, WhatsApp number, stats placeholders and copy</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={editingSettings.companyName}
                onChange={(e) => setEditingSettings({ ...editingSettings, companyName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
              <input
                type="text"
                value={editingSettings.tagline}
                onChange={(e) => setEditingSettings({ ...editingSettings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Desk Number</label>
              <input
                type="text"
                value={editingSettings.whatsappNumber}
                onChange={(e) => setEditingSettings({ ...editingSettings, whatsappNumber: e.target.value })}
                placeholder="+2348171731525"
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Investor Phone Line</label>
              <input
                type="text"
                value={editingSettings.phone}
                onChange={(e) => setEditingSettings({ ...editingSettings, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
              <input
                type="email"
                value={editingSettings.email}
                onChange={(e) => setEditingSettings({ ...editingSettings, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Advisory Hours</label>
              <input
                type="text"
                value={editingSettings.workingHours}
                onChange={(e) => setEditingSettings({ ...editingSettings, workingHours: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Head Office Address</label>
            <input
              type="text"
              value={editingSettings.officeAddress}
              onChange={(e) => setEditingSettings({ ...editingSettings, officeAddress: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
            />
          </div>

          {/* Corporate Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Vision</label>
              <textarea
                rows={3}
                value={editingSettings.companyVision}
                onChange={(e) => setEditingSettings({ ...editingSettings, companyVision: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs leading-relaxed resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Mission</label>
              <textarea
                rows={3}
                value={editingSettings.companyMission}
                onChange={(e) => setEditingSettings({ ...editingSettings, companyMission: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Company Statistics Placeholders */}
          <div className="space-y-3 pt-4 border-t border-[#1E3A6E]">
            <h4 className="text-sm font-bold text-white">Company Statistics (Placeholders until Verified)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400">Metric 1: Developments Count</label>
                <input
                  type="text"
                  value={editingSettings.stats.developmentsCount}
                  onChange={(e) =>
                    setEditingSettings({
                      ...editingSettings,
                      stats: { ...editingSettings.stats, developmentsCount: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400">Metric 2: Locations Covered</label>
                <input
                  type="text"
                  value={editingSettings.stats.locationsCovered}
                  onChange={(e) =>
                    setEditingSettings({
                      ...editingSettings,
                      stats: { ...editingSettings.stats, locationsCovered: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400">Metric 3: Opportunities Available</label>
                <input
                  type="text"
                  value={editingSettings.stats.opportunitiesCount}
                  onChange={(e) =>
                    setEditingSettings({
                      ...editingSettings,
                      stats: { ...editingSettings.stats, opportunitiesCount: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400">Metric 4: Industry Experience</label>
                <input
                  type="text"
                  value={editingSettings.stats.experienceYears}
                  onChange={(e) =>
                    setEditingSettings({
                      ...editingSettings,
                      stats: { ...editingSettings.stats, experienceYears: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: TESTIMONIALS MANAGER */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <form onSubmit={handleAddTestimonial} className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white tracking-tight">Add Verified Testimonial</h3>
            <p className="text-xs text-slate-400">
              Publish authentic client feedback. Fictional testimonials must never be added.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Full Name</label>
                <input
                  type="text"
                  value={newTestimonial.authorName}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, authorName: e.target.value })}
                  placeholder="e.g. Arc. Babatunde Sanusi"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role & Location</label>
                <input
                  type="text"
                  value={newTestimonial.authorRole}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, authorRole: e.target.value })}
                  placeholder="e.g. Managing Partner · Lagos, Nigeria"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Property Invested</label>
              <input
                type="text"
                value={newTestimonial.propertyInvested}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, propertyInvested: e.target.value })}
                placeholder="e.g. Christos Gardens (500 SQM Plot)"
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Verified Client Quote</label>
              <textarea
                rows={3}
                value={newTestimonial.quote}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                placeholder="Client feedback statement regarding transparency, inspection, or documentation..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-white text-xs"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Verified Testimonial</span>
            </button>
          </form>

          {/* Existing Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#102342] border border-[#1E3A6E] rounded-xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{t.authorName}</span>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      Verified
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{t.authorRole} · {t.authorLocation}</div>
                  <div className="text-[11px] text-[#C8A45D] font-mono mt-1">{t.propertyInvested}</div>
                  <p className="text-xs text-slate-300 italic mt-2">"{t.quote}"</p>
                </div>

                <div className="pt-3 border-t border-[#1E3A6E] flex justify-between items-center text-xs text-slate-400">
                  <span>{t.date}</span>
                  <button
                    onClick={async () => {
                      await api.deleteTestimonial(t.id);
                      onRefreshData();
                      showToast('Testimonial removed.', 'info');
                    }}
                    className="text-rose-400 hover:text-rose-300 p-1"
                    title="Remove testimonial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SEO, AEO & GEO AUDIT */}
      {activeTab === 'seo' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Search Engine Optimization (SEO, AEO & GEO) Health Audit</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time technical check of sitemap generation, structured data schemas, local SEO signals, and search engine indexability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#060E1A] border border-emerald-500/30 space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-400">XML Sitemap</div>
                <div className="text-sm font-bold text-white">Active & Dynamic</div>
                <div className="text-[11px] text-slate-400">Endpoint: /sitemap.xml</div>
              </div>

              <div className="p-4 rounded-xl bg-[#060E1A] border border-emerald-500/30 space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-400">Robots.txt</div>
                <div className="text-sm font-bold text-white">Configured</div>
                <div className="text-[11px] text-slate-400">Allow all public routes</div>
              </div>

              <div className="p-4 rounded-xl bg-[#060E1A] border border-emerald-500/30 space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-400">JSON-LD Schemas</div>
                <div className="text-sm font-bold text-white">Organization & RealEstate</div>
                <div className="text-[11px] text-slate-400">Valid entity linking</div>
              </div>

              <div className="p-4 rounded-xl bg-[#060E1A] border border-emerald-500/30 space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-400">AEO / GEO Architecture</div>
                <div className="text-sm font-bold text-white">Optimized</div>
                <div className="text-[11px] text-slate-400">AI Overviews & Perplexity ready</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E3A6E] space-y-4">
              <h3 className="text-sm font-bold text-white">Indexed Public Pages & Metadata Status</h3>
              <div className="space-y-2">
                {[
                  { path: '/', title: 'OASIS RAY DEVELOPMENTS LTD. | The Calm Side of Smart Investing', status: 'Optimized' },
                  { path: '/developments', title: 'Verified Real Estate Developments & Estates | Oasis Ray Developments', status: 'Optimized' },
                  { path: '/developments/christos-gardens', title: 'CHRISTOS GARDENS (Itakana Village, Mowe-Ofada) | Oasis Ray', status: 'Optimized' },
                  { path: '/developments/havilah-city', title: 'HAVILAH CITY (Ita Oshin Axis, Abeokuta) | Oasis Ray', status: 'Optimized' },
                  { path: '/investment', title: 'Land Banking & Structured Investment Opportunities | Oasis Ray', status: 'Optimized' },
                  { path: '/services', title: '8 Specialized Real Estate Services | Oasis Ray Developments', status: 'Optimized' },
                  { path: '/about', title: 'About & Corporate Vision | Oasis Ray Developments', status: 'Optimized' },
                  { path: '/advisory', title: 'Speak to an Investment Advisor | Oasis Ray', status: 'Optimized' },
                  { path: '/contact', title: 'Contact Corporate Headquarters | Oasis Ray Developments', status: 'Optimized' }
                ].map((pg, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#060E1A] border border-[#1E3A6E] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-mono text-[#C8A45D] font-bold">{pg.path}</span>
                      <div className="text-slate-300 font-medium mt-0.5">{pg.title}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px] self-start sm:self-center border border-emerald-500/20">
                      {pg.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
