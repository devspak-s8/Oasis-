import { Development, ServiceItem, SiteSettings, Testimonial } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'OASIS RAY DEVELOPMENTS LTD.',
  tagline: 'The Calm Side of Smart Investing.',
  founderName: 'Oluwayemi James Damilare',
  founderRole: 'Founder & Lead Visionary',
  companyVision:
    'To establish a real estate company whose developments become vessels through which wealth, influence and opportunity flow across every market, every cycle and every generation.',
  companyMission:
    '[Mission Statement Pending Final Client Ratification] Delivering structured, high-integrity property assets that protect capital and yield generational value through transparent development and disciplined acquisition.',
  officeAddress: 'KM 42 Lagos-Ibadan Expressway / Mowe-Ofada Strategic Hub, Ogun State, Nigeria (Head Office)',
  phone: '+234 (0) 803 000 0000',
  whatsappNumber: '+2348030000000',
  email: 'info@oasisraydevelopments.com',
  workingHours: 'Monday – Friday: 8:30 AM – 5:30 PM | Saturday (Inspections by Appointment): 10:00 AM – 3:00 PM',
  stats: {
    developmentsCount: '02 Strategic Developments',
    locationsCovered: 'Ogun Growth Corridor (Mowe & Abeokuta)',
    opportunitiesCount: 'Verified Freehold Parcels',
    experienceYears: '10+ Years Combined Expertise'
  },
  socialLinks: {
    instagram: 'https://instagram.com/oasisraydevelopments',
    linkedin: 'https://linkedin.com/company/oasis-ray-developments',
    facebook: 'https://facebook.com/oasisraydevelopments',
    twitter: 'https://twitter.com/oasisraydev'
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    number: '01',
    title: 'Real Estate Development',
    shortDescription: 'Master planning and physical execution of modern residential and mixed-use communities engineered for lasting generational value.',
    fullDescription: 'We oversee the complete development lifecycle from site feasibility, surveying, architectural layout, and infrastructure provisioning to final handover. Our engineering standards guarantee enduring structural integrity and serene community living.',
    benefits: ['Comprehensive master-planning', 'Vetted engineering and construction', 'Clear infrastructure milestones'],
    targetAudience: 'Homeowners, property investors, diaspora buyers',
    iconName: 'Building2'
  },
  {
    id: 's2',
    number: '02',
    title: 'Land Acquisition and Sales',
    shortDescription: 'Securing prime, dispute-free greenfield and brownfield lands in documented high-velocity growth corridors.',
    fullDescription: 'Every parcel in our portfolio undergoes thorough legal vetting, cadastral coordinate verification, and boundary demarcation to ensure absolute peace of mind for every investor.',
    benefits: ['Zero-encumbrance verification', 'Immediate physical allocation', 'Registered title documentation'],
    targetAudience: 'Private land buyers, institutional developers, corporate syndicates',
    iconName: 'Landmark'
  },
  {
    id: 's3',
    number: '03',
    title: 'Property Investment Opportunities',
    shortDescription: 'Curated commercial and residential vehicles designed to match risk appetites with capital preservation objectives.',
    fullDescription: 'We structure entry points into high-growth developments with clear payment terms, milestone disbursements, and predictable capital growth horizons backed by tangible land assets.',
    benefits: ['Hedge against inflation', 'Transparent milestone frameworks', 'Documented ownership rights'],
    targetAudience: 'High-net-worth investors, diaspora syndicates, cooperative societies',
    iconName: 'TrendingUp'
  },
  {
    id: 's4',
    number: '04',
    title: 'Land Banking',
    shortDescription: 'Acquiring strategic acreage ahead of planned civic infrastructure expansion for substantial long-term capital appreciation.',
    fullDescription: 'Our research team identifies emerging industrial and suburban axes before retail market pricing takes hold, enabling investors to hold certified plots through maturation cycles with minimal holding costs.',
    benefits: ['Strategic entry-level pricing', 'Exponential capital growth potential', 'Secure perimeter holding'],
    targetAudience: 'Long-term wealth builders, pension funds, generational family trusts',
    iconName: 'Vault'
  },
  {
    id: 's5',
    number: '05',
    title: 'Residential Property Development',
    shortDescription: 'Turnkey residential homes, contemporary duplexes, and gated estate units characterized by functional aesthetics.',
    fullDescription: 'We design living environments that prioritize natural airflow, spatial efficiency, privacy, and community safety. Each home is built to harmonise with its natural landscape while integrating modern utilities.',
    benefits: ['Modern architectural blueprints', 'Energy-conscious layouts', 'Quality building materials'],
    targetAudience: 'Aspiring homeowners, executives, diaspora returnees',
    iconName: 'Home'
  },
  {
    id: 's6',
    number: '06',
    title: 'Real Estate Consultancy',
    shortDescription: 'Objective, research-grounded advisory on property valuation, title regularization, and site feasibility in Ogun and South-West Nigeria.',
    fullDescription: 'Our team delivers clarity on zoning regulations, statutory governor’s consent workflows, layout approvals, and regional spatial master plans, safeguarding your property capital from regulatory pitfalls.',
    benefits: ['Rigorous due diligence', 'Regulatory alignment guidance', 'Site feasibility audits'],
    targetAudience: 'Private buyers, corporate developers, institutional funds',
    iconName: 'Compass'
  },
  {
    id: 's7',
    number: '07',
    title: 'Property Marketing and Brokerage',
    shortDescription: 'Connecting accredited property developments with qualified local and global diaspora investors through transparent marketing.',
    fullDescription: 'We operate professional marketing channels built on truthful representation, accurate video walk-throughs, verified coordinate sharing, and seamless contract signing protocols.',
    benefits: ['Verified marketing disclosures', 'Dedicated investor relationship desk', 'Virtual inspection tools'],
    targetAudience: 'Property developers, realtors, accredited sales partners',
    iconName: 'Megaphone'
  },
  {
    id: 's8',
    number: '08',
    title: 'Real Estate Investment Advisory',
    shortDescription: 'Bespoke portfolio structuring that assists investors in allocating capital strategically across property cycles.',
    fullDescription: 'We help you navigate market timing, currency devaluation buffers, exit strategies, and asset diversification across residential, commercial, and agricultural development boundaries.',
    benefits: ['Personalized capital allocation', 'Clear risk disclosures', 'Portfolio diversification roadmap'],
    targetAudience: 'First-time investors, corporate treasuries, executive families',
    iconName: 'ShieldCheck'
  }
];

export const INITIAL_DEVELOPMENTS: Development[] = [
  {
    id: 'christos-gardens',
    slug: 'christos-gardens',
    name: 'CHRISTOS GARDENS',
    tagline: 'Refined Living in the High-Growth Mowe-Ofada Axis',
    location: 'Mowe-Ofada, Ogun State',
    state: 'Ogun State',
    category: 'Residential Master-Planned Estate',
    startingPrice: 3500000,
    availability: 'Selling Fast',
    heroImage: '/src/assets/images/christos_gardens_mowe_1793643952097.jpg',
    galleryImages: [
      '/src/assets/images/christos_gardens_mowe_1793643952097.jpg',
      '/src/assets/images/hero_oasis_development_1793643952183.jpg',
      '/src/assets/images/land_banking_growth_1793643954174.jpg'
    ],
    overview:
      'Christos Gardens is an intentionally designed master-planned residential community positioned in the peaceful yet rapid-growth Mowe-Ofada development corridor of Ogun State. Located just off the bustling Lagos-Ibadan economic corridor, it provides discerning investors and families with an ideal sanctuary combining urban accessibility with peaceful suburban living.',
    locationDetails:
      'Mowe-Ofada Corridor, Obafemi Owode Local Government Area, Ogun State. Within 25 minutes of Berger/Lagos boundary, easily accessed via the newly dualized interchange roads, and proximate to established educational institutions and corporate developments.',
    plotSizes: [
      {
        id: 'cg-300',
        size: '300 SQM',
        title: 'Starter Residential Plot',
        price: 2500000,
        promoPrice: 2200000,
        description: 'Ideal for contemporary 3-bedroom semi-detached or bungalow designs with private compound space.',
        isAvailable: true
      },
      {
        id: 'cg-500',
        size: '500 SQM',
        title: 'Standard Residential Plot',
        price: 3500000,
        promoPrice: 3200000,
        description: 'Standard full plot perfect for a 4-5 bedroom detached duplex with dedicated parking and lush garden.',
        isAvailable: true
      },
      {
        id: 'cg-1000',
        size: '1,000 SQM',
        title: 'Commercial & Executive Enclave',
        price: 6800000,
        promoPrice: 6500000,
        description: 'Prime boulevard plot suited for executive twin duplexes, clinic, or private family compound.',
        isAvailable: true
      }
    ],
    paymentPlans: [
      {
        durationMonths: 0,
        title: 'Outright Payment (0% Interest)',
        description: '100% payment within 30 days. Grants immediate physical allocation and deed issuance.',
        initialDepositPercent: 100
      },
      {
        durationMonths: 3,
        title: '3-Month Standard Milestone',
        description: '30% initial commitment with the balance split across 2 equal monthly tranches without interest.',
        initialDepositPercent: 30
      },
      {
        durationMonths: 6,
        title: '6-Month Structured Installment',
        description: '25% down payment with structured monthly disbursements over 180 days.',
        initialDepositPercent: 25
      },
      {
        durationMonths: 12,
        title: '12-Month Flexible Investor Plan',
        description: '20% down payment with comfortable monthly payments tailored to cash-flow cycles.',
        initialDepositPercent: 20
      }
    ],
    infrastructure: [
      'Engineered Perimeter Fencing with Razor Wire Protection',
      'Architectural Security Gatehouse & 24/7 Monitored Access Control',
      'Paved Internal Estate Road Network with Interlocking Pavers',
      'Covered Drainage Channels with Natural Runoff Grates',
      'Dedicated Transformer and Central Electricity Reticulation',
      'Clean Central Water Distribution and Borehole Supply',
      'Designated Family Recreational Park and Green Belt',
      'Commercial Precinct Buffer for Essential Daily Retail'
    ],
    titleDocuments: [
      {
        title: 'Registered Survey Plan',
        status: 'Verified & Chartable',
        description: 'Coordinated boundary pillars lodged at the Ogun State Bureau of Lands and Survey.'
      },
      {
        title: 'Deed of Assignment',
        status: 'Contractual Guarantee',
        description: 'Legally executed transfer of freehold title from the registered developer to the subscriber.'
      },
      {
        title: 'Governor’s Consent / C of O',
        status: 'In Processing / Pending Final Approval',
        description: 'Statutory government gazetting and perfection submitted under Ogun State Ministry of Physical Planning.'
      }
    ],
    mapCoordinates: {
      lat: 6.8123,
      lng: 3.4412,
      label: 'Christos Gardens, Mowe-Ofada Corridor, Ogun State'
    },
    plots: [
      { id: 'p1', plotNumber: 'Plot 01', size: '500 SQM', status: 'available', category: 'Executive Residential', x: 14, y: 24, dimensions: '18m × 28m' },
      { id: 'p2', plotNumber: 'Plot 02', size: '500 SQM', status: 'available', category: 'Executive Residential', x: 25, y: 24, dimensions: '18m × 28m' },
      { id: 'p3', plotNumber: 'Plot 03', size: '500 SQM', status: 'reserved', category: 'Executive Residential', x: 36, y: 24, dimensions: '18m × 28m' },
      { id: 'p4', plotNumber: 'Plot 04', size: '500 SQM', status: 'sold', category: 'Executive Residential', x: 47, y: 24, dimensions: '18m × 28m' },
      { id: 'p5', plotNumber: 'Plot 05', size: '300 SQM', status: 'available', category: 'Standard Residential', x: 14, y: 58, dimensions: '12m × 25m' },
      { id: 'p6', plotNumber: 'Plot 06', size: '300 SQM', status: 'available', category: 'Standard Residential', x: 25, y: 58, dimensions: '12m × 25m' },
      { id: 'p7', plotNumber: 'Plot 07', size: '300 SQM', status: 'available', category: 'Standard Residential', x: 36, y: 58, dimensions: '12m × 25m' },
      { id: 'p8', plotNumber: 'Plot 08', size: '300 SQM', status: 'sold', category: 'Standard Residential', x: 47, y: 58, dimensions: '12m × 25m' },
      { id: 'p9', plotNumber: 'Plot 09', size: '1,000 SQM', status: 'available', category: 'Commercial Boulevard', x: 64, y: 26, dimensions: '30m × 33m' },
      { id: 'p10', plotNumber: 'Plot 10', size: '1,000 SQM', status: 'reserved', category: 'Commercial Boulevard', x: 80, y: 26, dimensions: '30m × 33m' },
      { id: 'p11', plotNumber: 'Plot 11', size: '500 SQM', status: 'available', category: 'Executive Residential', x: 64, y: 58, dimensions: '18m × 28m' },
      { id: 'p12', plotNumber: 'Plot 12', size: '500 SQM', status: 'available', category: 'Executive Residential', x: 80, y: 58, dimensions: '18m × 28m' }
    ],
    featured: true,
    createdAt: '2025-08-15T00:00:00.000Z',
    updatedAt: '2026-11-01T00:00:00.000Z'
  },
  {
    id: 'havilah-city',
    slug: 'havilah-city',
    name: 'HAVILAH CITY',
    tagline: 'Strategic Hillside Master-Planned Development in Abeokuta',
    location: 'Ita Oshin, Abeokuta, Ogun State',
    state: 'Ogun State',
    category: 'Strategic Mixed-Use & Suburban Development',
    startingPrice: 2200000,
    availability: 'Available',
    heroImage: '/src/assets/images/havilah_city_abeokuta_1793643953227.jpg',
    galleryImages: [
      '/src/assets/images/havilah_city_abeokuta_1793643953227.jpg',
      '/src/assets/images/land_banking_growth_1793643954174.jpg',
      '/src/assets/images/hero_oasis_development_1793643952183.jpg'
    ],
    overview:
      'Havilah City is an expansive master development situated in Ita Oshin, the gateway corridor of historic Abeokuta, Ogun State. Combining breathtaking elevated topography with deliberate infrastructural planning, Havilah City is envisioned as a flagship estate for forward-thinking property owners, land banking strategists, and executive homebuilders.',
    locationDetails:
      'Ita Oshin Urban Hub, Abeokuta North Local Government Area, Ogun State. Strategically connected to the Lagos-Abeokuta Expressway and the Abeokuta-Lagos Railway corridor (Prof. Wole Soyinka Train Station at Laderin), providing rapid regional connectivity.',
    plotSizes: [
      {
        id: 'hc-450',
        size: '450 SQM',
        title: 'Suburban Villa Parcel',
        price: 2200000,
        promoPrice: 1950000,
        description: 'Elevated parcel overlooking green valleys, perfectly proportioned for modern residential detached homes.',
        isAvailable: true
      },
      {
        id: 'hc-600',
        size: '600 SQM',
        title: 'Prime Full Residential Plot',
        price: 2800000,
        promoPrice: 2500000,
        description: 'Expansive estate plot with wide street frontage, ideal for luxury family villa with outhouse.',
        isAvailable: true
      },
      {
        id: 'hc-1200',
        size: '1,200 SQM',
        title: 'Commercial / Institutional Parcel',
        price: 5400000,
        promoPrice: 4900000,
        description: 'Strategic corner piece on the main entry boulevard for community retail, nursery, or hospitality.',
        isAvailable: true
      }
    ],
    paymentPlans: [
      {
        durationMonths: 0,
        title: 'Outright Plan (Discounted)',
        description: 'Full payment within 30 days inclusive of instant documentation drafting.',
        initialDepositPercent: 100
      },
      {
        durationMonths: 6,
        title: '6-Month Balanced Spread',
        description: '30% initial deposit with equal remaining payments spaced over six months.',
        initialDepositPercent: 30
      },
      {
        durationMonths: 12,
        title: '12-Month Land Banking Spread',
        description: '20% commitment down payment for investors banking land as long-term wealth assets.',
        initialDepositPercent: 20
      }
    ],
    infrastructure: [
      'Grand Architectural Gatehouse and Estate Security Post',
      'Clearly Demarcated Survey Beacons for Every Individual Parcel',
      'Graded and Stabilized Internal Boulevard Roadways',
      'Perimeter Concrete Boundary Demarcation',
      'High-Clearance Electrical Poles and Substation Reservation',
      'Eco-Conscious Topographical Runoff and Storm Drainage System',
      'Solar-Powered Main Entrance and Boulevard Lighting',
      'Estate Facility Office for On-Site Support'
    ],
    titleDocuments: [
      {
        title: 'Registered Perimeter Survey',
        status: 'Lodged and Chartable',
        description: 'Boundary survey coordinates certified by registered surveyor and charted at Ogun State Survey Office.'
      },
      {
        title: 'Contract of Sale & Deed of Assignment',
        status: 'Fully Executable',
        description: 'Binding legal documentation transferring interest and rights to each property investor.'
      },
      {
        title: 'Excision in Progress',
        status: 'Government Gazette Pipeline',
        description: 'Official land title perfection underway in coordination with relevant state ministry authorities.'
      }
    ],
    mapCoordinates: {
      lat: 7.1852,
      lng: 3.3150,
      label: 'Havilah City, Ita Oshin, Abeokuta, Ogun State'
    },
    plots: [
      { id: 'hc-p1', plotNumber: 'Parcel 01', size: '600 SQM', status: 'available', category: 'Executive Residential', x: 20, y: 28, dimensions: '20m × 30m' },
      { id: 'hc-p2', plotNumber: 'Parcel 02', size: '600 SQM', status: 'available', category: 'Executive Residential', x: 30, y: 28, dimensions: '20m × 30m' },
      { id: 'hc-p3', plotNumber: 'Parcel 03', size: '600 SQM', status: 'reserved', category: 'Executive Residential', x: 40, y: 28, dimensions: '20m × 30m' },
      { id: 'hc-p4', plotNumber: 'Parcel 04', size: '450 SQM', status: 'available', category: 'Standard Residential', x: 20, y: 52, dimensions: '15m × 30m' },
      { id: 'hc-p5', plotNumber: 'Parcel 05', size: '450 SQM', status: 'available', category: 'Standard Residential', x: 30, y: 52, dimensions: '15m × 30m' },
      { id: 'hc-p6', plotNumber: 'Parcel 06', size: '450 SQM', status: 'sold', category: 'Standard Residential', x: 40, y: 52, dimensions: '15m × 30m' },
      { id: 'hc-p7', plotNumber: 'Parcel 07', size: '1,200 SQM', status: 'available', category: 'Commercial Boulevard', x: 65, y: 35, dimensions: '30m × 40m' },
      { id: 'hc-p8', plotNumber: 'Parcel 08', size: '600 SQM', status: 'available', category: 'Executive Residential', x: 65, y: 62, dimensions: '20m × 30m' }
    ],
    featured: true,
    createdAt: '2025-09-01T00:00:00.000Z',
    updatedAt: '2026-11-01T00:00:00.000Z'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    authorName: 'Engr. Folorunsho Alabi',
    authorRole: 'Infrastructure Consultant',
    authorLocation: 'Lagos & UK Diaspora',
    propertyInvested: 'Christos Gardens',
    quote: 'Oasis Ray provided verified coordinate surveys and clear title documentation. Their transparent communication sets the gold standard.',
    isVerified: true,
    date: 'February 2026'
  },
  {
    id: 't2',
    authorName: 'Mrs. Titilayo Adebayo',
    authorRole: 'Private Investor',
    authorLocation: 'Abeokuta, Ogun State',
    propertyInvested: 'Havilah City',
    quote: 'The strategic location of Havilah City and flexible payment spreads made property acquisition completely seamless for our family.',
    isVerified: true,
    date: 'January 2026'
  },
  {
    id: 't3',
    authorName: 'Dr. Babatunde Ogunleye',
    authorRole: 'Medical Specialist',
    authorLocation: 'Manchester, UK',
    propertyInvested: 'Christos Gardens',
    quote: 'The integrity of their cadastral surveys gave me total peace of mind. Zero bureaucracy, zero ambiguity—just pure institutional excellence.',
    isVerified: true,
    date: 'November 2025'
  },
  {
    id: 't4',
    authorName: 'Barrister Amina Danjuma',
    authorRole: 'Legal Counsel',
    authorLocation: 'Abuja, FCT',
    propertyInvested: 'Havilah City',
    quote: 'As a corporate attorney, title verification was key. Oasis Ray delivered unencumbered state title documents before any contract signing.',
    isVerified: true,
    date: 'October 2025'
  }
];
