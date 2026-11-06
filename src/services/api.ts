import { Development, LeadEnquiry, ServiceItem, SiteSettings, Testimonial } from '../types';
import { INITIAL_DEVELOPMENTS, INITIAL_SERVICES, INITIAL_SETTINGS, INITIAL_TESTIMONIALS } from '../data/initialData';
import { validateLeadForm } from '../utils/realEstateCalculators';

// Local storage keys for resilient offline and cross-tab sharing
const STORAGE_KEYS = {
  DEVELOPMENTS: 'oasis_ray_developments',
  ENQUIRIES: 'oasis_ray_enquiries',
  SETTINGS: 'oasis_ray_settings',
  TESTIMONIALS: 'oasis_ray_testimonials',
  ADMIN_TOKEN: 'oasis_ray_admin_token'
};

function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to local cache:', e);
  }
}

// Initial seed verification & cache migration for official contact info
const cachedSettings = getLocal<SiteSettings | null>(STORAGE_KEYS.SETTINGS, null);
if (!cachedSettings || cachedSettings.phone?.includes('803') || cachedSettings.email?.includes('info@')) {
  setLocal(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
}
if (!localStorage.getItem(STORAGE_KEYS.DEVELOPMENTS)) {
  setLocal(STORAGE_KEYS.DEVELOPMENTS, INITIAL_DEVELOPMENTS);
}
if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
  setLocal(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
}
if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
  setLocal(STORAGE_KEYS.ENQUIRIES, [
    {
      id: 'enq-sample-1',
      referenceCode: 'ORD-2026-8941',
      fullName: 'Chief Babatunde Awolowo',
      email: 'babatunde.a@capitalvest.ng',
      phone: '+234 803 555 1290',
      interestedDevelopmentId: 'christos-gardens',
      interestedDevelopmentName: 'CHRISTOS GARDENS',
      plotSizePreference: '1,000 SQM (Commercial Boulevard)',
      enquiryType: 'Property Purchase',
      message: 'Looking to acquire twin commercial plots along the main boulevard for private clinic.',
      status: 'Site Inspection Scheduled',
      notes: 'Site visit confirmed for Saturday 11:00 AM with resident surveyor.',
      createdAt: '2026-10-28T09:30:00.000Z'
    },
    {
      id: 'enq-sample-2',
      referenceCode: 'ORD-2026-7712',
      fullName: 'Dr. Amaka Uche',
      email: 'amaka.uche@hospitality.co.uk',
      phone: '+44 7911 123456',
      interestedDevelopmentId: 'havilah-city',
      interestedDevelopmentName: 'HAVILAH CITY',
      plotSizePreference: '600 SQM (Suburban Parcel)',
      enquiryType: 'Land Banking',
      message: 'Interested in the 12-month installment plan for diaspora land banking in Abeokuta.',
      status: 'Contacted',
      notes: 'Sent PDF brochure and video drone footage via WhatsApp.',
      createdAt: '2026-10-30T14:15:00.000Z'
    }
  ]);
}

export const api = {
  // Developments
  async getDevelopments(): Promise<Development[]> {
    try {
      const res = await fetch('/api/developments');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.DEVELOPMENTS, data);
        return data;
      }
    } catch {
      // Fallback to local
    }
    return getLocal<Development[]>(STORAGE_KEYS.DEVELOPMENTS, INITIAL_DEVELOPMENTS);
  },

  async getDevelopmentBySlug(slug: string): Promise<Development | undefined> {
    const list = await this.getDevelopments();
    return list.find((d) => d.slug === slug || d.id === slug);
  },

  async saveDevelopment(dev: Development): Promise<Development> {
    const current = getLocal<Development[]>(STORAGE_KEYS.DEVELOPMENTS, INITIAL_DEVELOPMENTS);
    const existingIndex = current.findIndex((d) => d.id === dev.id);
    let updated: Development[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...dev, updatedAt: new Date().toISOString() };
    } else {
      updated = [
        ...current,
        { ...dev, id: dev.id || `dev-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ];
    }
    setLocal(STORAGE_KEYS.DEVELOPMENTS, updated);

    try {
      await fetch('/api/developments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dev)
      });
    } catch {
      // Offline fallback already handled
    }
    return dev;
  },

  async deleteDevelopment(id: string): Promise<boolean> {
    const current = getLocal<Development[]>(STORAGE_KEYS.DEVELOPMENTS, INITIAL_DEVELOPMENTS);
    const filtered = current.filter((d) => d.id !== id);
    setLocal(STORAGE_KEYS.DEVELOPMENTS, filtered);

    try {
      await fetch(`/api/developments/${id}`, { method: 'DELETE' });
    } catch {
      // Handled
    }
    return true;
  },

  // Enquiries / Leads
  async getEnquiries(): Promise<LeadEnquiry[]> {
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.ENQUIRIES, data);
        return data;
      }
    } catch {
      // fallback
    }
    return getLocal<LeadEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
  },

  async submitEnquiry(payload: {
    fullName: string;
    email: string;
    phone: string;
    interestedDevelopmentId?: string;
    interestedDevelopmentName?: string;
    plotSizePreference?: string;
    enquiryType: string;
    message?: string;
  }): Promise<{ success: boolean; lead?: LeadEnquiry; error?: string }> {
    const validation = validateLeadForm(payload);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      return { success: false, error: firstError };
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newLead: LeadEnquiry = {
      id: `enq-${Date.now()}`,
      referenceCode: `ORD-2026-${randomSuffix}`,
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      interestedDevelopmentId: payload.interestedDevelopmentId,
      interestedDevelopmentName: payload.interestedDevelopmentName,
      plotSizePreference: payload.plotSizePreference,
      enquiryType: payload.enquiryType,
      message: payload.message?.trim(),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const current = getLocal<LeadEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const updated = [newLead, ...current];
    setLocal(STORAGE_KEYS.ENQUIRIES, updated);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
    } catch {
      // Handled locally
    }

    return { success: true, lead: newLead };
  },

  async updateEnquiryStatus(
    id: string,
    status: LeadEnquiry['status'],
    notes?: string
  ): Promise<LeadEnquiry | null> {
    const current = getLocal<LeadEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const index = current.findIndex((e) => e.id === id);
    if (index === -1) return null;

    current[index] = {
      ...current[index],
      status,
      ...(notes !== undefined ? { notes } : {})
    };
    setLocal(STORAGE_KEYS.ENQUIRIES, current);

    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
    } catch {
      // Handled
    }
    return current[index];
  },

  // Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.SETTINGS, data);
        return data;
      }
    } catch {
      // fallback
    }
    return getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async updateSettings(settings: SiteSettings): Promise<SiteSettings> {
    setLocal(STORAGE_KEYS.SETTINGS, settings);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
    } catch {
      // fallback
    }
    return settings;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.TESTIMONIALS, data);
        return data;
      }
    } catch {
      // fallback
    }
    return getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  },

  async saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    const current = getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
    const existingIndex = current.findIndex((t) => t.id === testimonial.id);
    let updated: Testimonial[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = testimonial;
    } else {
      updated = [{ ...testimonial, id: testimonial.id || `t-${Date.now()}` }, ...current];
    }
    setLocal(STORAGE_KEYS.TESTIMONIALS, updated);

    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial)
      });
    } catch {
      // fallback
    }
    return testimonial;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const current = getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
    const filtered = current.filter((t) => t.id !== id);
    setLocal(STORAGE_KEYS.TESTIMONIALS, filtered);
    return true;
  },

  // Services
  getServices(): ServiceItem[] {
    return INITIAL_SERVICES;
  },

  // Admin Auth
  verifyAdmin(pinOrPassword: string): boolean {
    // Standard secure corporate passcode for client admin session
    const valid = pinOrPassword === 'oasis2026' || pinOrPassword === 'OasisAdmin2026!';
    if (valid) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, 'authenticated');
    }
    return valid;
  },

  isAdminAuthenticated(): boolean {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) === 'authenticated';
  },

  adminLogout(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  }
};
