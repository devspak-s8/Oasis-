export type AvailabilityStatus = 'Available' | 'Selling Fast' | 'Sold Out' | 'Coming Soon';

export interface PlotSpecification {
  id: string;
  size: string; // e.g. "300 SQM", "500 SQM"
  title: string;
  price: number;
  promoPrice?: number;
  description?: string;
  isAvailable: boolean;
}

export interface PlotMapItem {
  id: string;
  plotNumber: string;
  size: string;
  status: 'available' | 'reserved' | 'sold';
  category: 'Standard Residential' | 'Executive Residential' | 'Commercial Boulevard' | 'Green Space';
  x: number; // percentage coordinate 0-100 on interactive estate map
  y: number; // percentage coordinate 0-100
  dimensions: string;
}

export interface Development {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  state: string;
  category: string;
  startingPrice: number;
  availability: AvailabilityStatus;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  locationDetails: string;
  plotSizes: PlotSpecification[];
  paymentPlans: {
    durationMonths: number;
    title: string;
    description: string;
    initialDepositPercent: number;
  }[];
  infrastructure: string[];
  titleDocuments: {
    title: string;
    status: string;
    description: string;
  }[];
  mapCoordinates: {
    lat: number;
    lng: number;
    label: string;
  };
  plots: PlotMapItem[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  targetAudience: string;
  iconName: string;
}

export interface LeadEnquiry {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  interestedDevelopmentId?: string;
  interestedDevelopmentName?: string;
  plotSizePreference?: string;
  enquiryType: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Site Inspection Scheduled' | 'Follow-up' | 'Closed';
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  authorLocation: string;
  propertyInvested: string;
  quote: string;
  isVerified: boolean;
  date: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  founderName: string;
  founderRole: string;
  companyVision: string;
  companyMission: string;
  officeAddress: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  workingHours: string;
  stats: {
    developmentsCount: string;
    locationsCovered: string;
    opportunitiesCount: string;
    experienceYears: string;
  };
  socialLinks: {
    instagram: string;
    linkedin: string;
    facebook: string;
    twitter: string;
  };
}
