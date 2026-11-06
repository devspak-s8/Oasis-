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
  officeAddress: '3rd Floor, Goldcrest Plaza, Ikota, Lekki, Lagos State, Nigeria (Head Office)',
  phone: '+234 817 173 1525',
  whatsappNumber: '+2348171731525',
  email: 'hello@oasisraydevelopments.com',
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
  },
  bankAccounts: [
    {
      bankName: 'FCMB',
      accountName: 'OASIS RAY DEVELOPMENTS LTD',
      accountNumber: '2008892202'
    },
    {
      bankName: 'WEMA BANK',
      accountName: 'OASIS RAY DEVELOPMENTS LTD',
      accountNumber: '0128047846'
    }
  ]
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
    title: 'Master-Planned Land Parcellation',
    shortDescription: 'Precision coordinate-demarcated residential estate plots with verified survey beacons and perimeter fencing.',
    fullDescription: 'We deliver fully serviced estate layouts ready for immediate subscriber possession. Each plot features verified boundary markers, engineered access corridors, integrated drainage reticulation, and clear estate guidelines that ensure orderly, prestigious community development without tenement structures.',
    benefits: ['Verified boundary beacons', 'Engineered access corridors', 'Pre-allocated residential zones'],
    targetAudience: 'Private land buyers, prospective homeowners, generational investors',
    iconName: 'Landmark'
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
    tagline: 'Refined Living & Smart Investment in Mowe-Ofada',
    location: 'Itakana Village, Mowe Ofada, Ogun State',
    state: 'Ogun State',
    category: 'Residential Master-Planned Estate',
    startingPrice: 4500000,
    availability: 'Selling Fast',
    subscriptionFormPdfUrl: '/assets/aistudio/de3f881c-25fa-4b80-aa4d-62a7ea48895f_6bec1654.PDF',
    cornerPieceFee: 1000000,
    heroImage: '/assets/aistudio/IMG-20261104-WA0020_35405fe2.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261104-WA0020_35405fe2.jpg',
      '/assets/aistudio/IMG-20261104-WA0018_f94f4d70.jpg',
      '/assets/aistudio/IMG-20261104-WA0028_3559ca9a.jpg',
      '/assets/aistudio/IMG-20261104-WA0025_37b8c650.jpg',
      '/assets/aistudio/IMG-20261104-WA0017_f3eb4dd9.jpg',
      '/assets/aistudio/IMG-20261104-WA0003_c9fda3d4.jpg',
      '/assets/aistudio/IMG-20261104-WA0002_b45eed29.jpg',
      '/assets/aistudio/IMG-20261104-WA0004_3f87f0e1.jpg',
      '/assets/aistudio/IMG-20261104-WA0005_86f8e81d.jpg'
    ],
    officialFlyers: [
      '/assets/aistudio/IMG-20261104-WA0002_b45eed29.jpg',
      '/assets/aistudio/IMG-20261104-WA0004_3f87f0e1.jpg',
      '/assets/aistudio/IMG-20261104-WA0005_86f8e81d.jpg',
      '/assets/aistudio/IMG-20261104-WA0003_c9fda3d4.jpg'
    ],
    videos: [
      {
        id: 'cg-vid-presenter',
        title: 'Full Site Presentation & Title Briefing',
        description: 'Comprehensive guided presentation at Christos Gardens detailing C of O title, topography, and pre-launch pricing.',
        url: '/assets/aistudio/VID-20261104-WA0032_a98697f9.mp4',
        type: 'presentation'
      },
      {
        id: 'cg-vid-drone',
        title: 'Aerial Drone Survey & Entrance Boulevard',
        description: 'High-altitude drone sweep capturing the main billboard, motorable road network, and verdant layout.',
        url: '/assets/aistudio/VID-20261104-WA0030_a9348488.mp4',
        type: 'aerial'
      },
      {
        id: 'cg-vid-inspection',
        title: 'Physical Ground Tour & Client Inspection',
        description: 'On-the-ground inspection walkthrough showcasing dry table land, access paths, and beacon demarcations.',
        url: '/assets/aistudio/VID-20261104-WA0031_89e7e5d6.mp4',
        type: 'tour'
      },
      {
        id: 'cg-vid-flyover',
        title: 'Mowe-Ofada Growth Corridor Flyover',
        description: 'Landscape perspective showing proximity to key transit routes and thriving neighboring settlements.',
        url: '/assets/aistudio/VID-20261104-WA0029_41e6b938.mp4',
        type: 'aerial'
      }
    ],
    overview:
      'Christos Gardens is an intentionally designed master-planned residential community positioned in Itakana Village along the rapid-growth Mowe-Ofada corridor of Ogun State. Covered with a verifiable Certificate of Occupancy (C of O), it provides discerning investors and families with an ideal sanctuary combining direct accessibility to the Lagos-Ibadan economic artery with serene suburban living.',
    locationDetails:
      'Itakana Village, Mowe-Ofada Axis, Obafemi Owode Local Government Area, Ogun State. Within close proximity to major industrial, academic, and municipal institutions.',
    landmarksList: [
      'Royal Garden City',
      'Nestle Foods Plc',
      'Chrisland Millennium University',
      'Obafemi Owode Local Government',
      'Olam Oil'
    ],
    plotSizes: [
      {
        id: 'cg-300',
        size: '300 SQM',
        title: 'Starter Residential Plot',
        price: 5000000,
        promoPrice: 4500000,
        description: '0-3 Months Outright: ₦4.5M | 3-6 Months: ₦5M | 6-9 Months: ₦5.5M. Initial Deposit: ₦1 Million. 5% discount on one-off payment! Starter residential estate land plot with clear coordinate beacons and immediate layout allocation.',
        isAvailable: true
      },
      {
        id: 'cg-500',
        size: '500 SQM',
        title: 'Standard Residential Plot',
        price: 8000000,
        promoPrice: 7000000,
        description: '0-3 Months Outright: ₦7.0M | 3-6 Months: ₦7.5M | 6-9 Months: ₦8M. Initial Deposit: ₦2 Million. 5% discount on one-off payment! Full standard residential estate land plot with registered survey and verifiable C of O.',
        isAvailable: true
      }
    ],
    paymentPlans: [
      {
        durationMonths: 3,
        title: '0 – 3 Months (Outright / Interest Free)',
        description: '300 SQM: ₦4,500,000 | 500 SQM: ₦7,000,000. 5% discount on one-off payment! Instant physical allocation upon full settlement.',
        initialDepositPercent: 25
      },
      {
        durationMonths: 6,
        title: '3 – 6 Months Structured Spread',
        description: '300 SQM: ₦5,000,000 (Initial Deposit: ₦1M) | 500 SQM: ₦7,500,000 (Initial Deposit: ₦2M). Monthly balanced installments.',
        initialDepositPercent: 20
      },
      {
        durationMonths: 9,
        title: '6 – 9 Months Extended Plan',
        description: '300 SQM: ₦5,500,000 (Initial Deposit: ₦1M) | 500 SQM: ₦8,000,000 (Initial Deposit: ₦2M). Flexible spread tailored to cash cycles.',
        initialDepositPercent: 20
      }
    ],
    statutoryFees: [
      { label: 'Survey Plan', amount: '₦500,000', description: 'Coordinated registered survey lodged at Ogun State Bureau of Lands' },
      { label: 'Legal Documentation (Deed of Assignment)', amount: '₦200,000', description: 'Formal conveyance and statutory contract of sale execution' },
      { label: 'Developmental Fee (300 SQM)', amount: '₦600,000', description: 'Covers street lights, drainage system, security, estate gate house, tarred road' },
      { label: 'Developmental Fee (500 SQM)', amount: '₦1,000,000', description: 'Covers street lights, drainage system, security, estate gate house, tarred road' }
    ],
    infrastructure: [
      'Perimeter Fencing with Boundary Beacons',
      'Beautification of the Estate',
      'Estate Gate House',
      'Motorable & Highly Accessible Road',
      'Street Lights along Internal Corridors',
      'Engineered Drainage System',
      '24/7 Security Patrols',
      'Tarred Road Network'
    ],
    titleDocuments: [
      {
        title: 'Verifiable Certificate of Occupancy (C of O)',
        status: 'Verifiable Title',
        description: 'Statutory government freehold title guaranteeing peace of mind.'
      },
      {
        title: 'Registered Survey Plan',
        status: 'Lodged and Chartable',
        description: 'Certified cadastral boundary survey charted with Ogun State Bureau of Lands.'
      },
      {
        title: 'Deed of Assignment & Contract of Sale',
        status: 'Executed on Handover',
        description: 'Binding legal documentation transferring title and ownership interest.'
      }
    ],
    buildingGuidelines: [
      'Residential houses must be built in designated residential areas.',
      'Shops are not allowed within residential houses.',
      'Tenement buildings ("Face Me I Face You") are strictly not permitted in the estate.',
      'Subscribers who have been allocated their plots may commence construction, provided the applicable Development Levy has been fully paid.'
    ],
    bankAccounts: [
      { bankName: 'FCMB', accountName: 'OASIS RAY DEVELOPMENTS LTD', accountNumber: '2008892202' },
      { bankName: 'WEMA BANK', accountName: 'OASIS RAY DEVELOPMENTS LTD', accountNumber: '0128047846' }
    ],
    faqList: [
      {
        question: 'Where is Christos Gardens located?',
        answer: 'Christos Gardens is located at ITAKANA VILLAGE, Mowe Ofada, Ogun State.'
      },
      {
        question: 'Who are the developers of Christos Gardens?',
        answer: 'OASIS RAY DEVELOPMENTS LTD.'
      },
      {
        question: 'What type of infrastructure will the developer provide?',
        answer: 'Perimeter fencing, Beautification of the Estate, Estate Gate House, Motorable and Accessible Road, Street light, Drainage System, Security, and Tarred Road.'
      },
      {
        question: 'What other estates and/or institutions are within 3km radius of the Estate?',
        answer: 'Royal Garden City, Nestle Foods Plc, Chrisland Millennium University, Obafemi Owode Local Government, and Olam Oil.'
      },
      {
        question: 'Is there any document/title on the land?',
        answer: 'The title on the land is A Verifiable C of O (Certificate of Occupancy).'
      },
      {
        question: 'What is the price for a cornerpiece plot?',
        answer: 'A Corner piece land attracts an additional ₦1,000,000 premium.'
      },
      {
        question: 'What is the price per plot and affordable payment plan?',
        answer: '300 SQMS: 0-3 Months Outright: ₦4.5M | 3-6 Months: ₦5M | 6-9 Months: ₦5.5M (Initial Deposit: ₦1 Million). 500 SQMS: 0-3 Months Outright: ₦7M | 3-6 Months: ₦7.5M | 6-9 Months: ₦8M (Initial Deposit: ₦2 Million). 5% discount applies on one-off payment!'
      },
      {
        question: 'What other payments do I make apart from the payment for the land?',
        answer: 'Survey plan: ₦500,000. Legal documentation: ₦200,000. Developmental Fee: ₦600,000 for 300 SQM, and ₦1,000,000 for 500 SQM.'
      },
      {
        question: 'What will the development levy be used for?',
        answer: 'Street light, Drainage System, Security, Gate House, and Tarred Road.'
      },
      {
        question: 'What do I get after completion of payments for the land?',
        answer: 'A duly executed receipt of purchase, Contract of Sale, Copy of Survey plan, and Deed of Assignment.'
      },
      {
        question: 'Can I pay a deposit and pay the balance any time within the tenure chosen?',
        answer: 'After payment of the initial deposit, you are expected to pay the balance monthly. Non-payment as and when due will be treated as a breach of contract which can either result to termination or revocation of the contract.'
      },
      {
        question: 'Is there any restriction as to the type of building I can erect on the land?',
        answer: 'Yes. Residential houses must be built in designated residential areas. Shops are not allowed within residential houses. Tenement buildings ("Face Me I Face You") are strictly not permitted in the estate.'
      },
      {
        question: 'Where do I make payments?',
        answer: 'Payments should be deposited into either of our official corporate accounts: FCMB (2008892202) or WEMA BANK (0128047846) in favour of OASIS RAY DEVELOPMENTS LTD. We accept no liability for cash payment to any person.'
      }
    ],
    mapCoordinates: {
      lat: 6.8123,
      lng: 3.4412,
      label: 'Christos Gardens, Itakana Village, Mowe-Ofada, Ogun State'
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
    tagline: 'Strategic Master-Planned Development along Tarred Expressroad in Abeokuta',
    location: 'Ibara Orile, Ita Oshin Axis, Abeokuta, Ogun State',
    state: 'Ogun State',
    category: 'Strategic Mixed-Use & Suburban Development',
    startingPrice: 900000,
    availability: 'Available',
    subscriptionFormPdfUrl: '/assets/aistudio/3dc04db0-9829-4962-9e39-cb47b3cb866c_7183dd3c.PDF',
    cornerPieceFee: 400000,
    heroImage: '/assets/aistudio/IMG-20261104-WA0019_8697be16.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261104-WA0019_8697be16.jpg',
      '/assets/aistudio/IMG-20261104-WA0012_6e249195.jpg',
      '/assets/aistudio/IMG-20261104-WA0014_3013d77c.jpg',
      '/assets/aistudio/IMG-20261104-WA0026_8615404d.jpg',
      '/assets/aistudio/IMG-20261104-WA0015_6878fb98.jpg',
      '/assets/aistudio/IMG-20261104-WA0016_9d09e626.jpg',
      '/assets/aistudio/IMG-20261104-WA0027_8e524f7c.jpg',
      '/assets/aistudio/IMG-20261104-WA0024_6407fbff.jpg',
      '/assets/aistudio/IMG-20261104-WA0021_7aa786a8.jpg',
      '/assets/aistudio/IMG-20261104-WA0022_0b74a954.jpg',
      '/assets/aistudio/IMG-20261104-WA0023_80e56988.jpg',
      '/assets/aistudio/IMG-20261104-WA0007_4c8d0946.jpg',
      '/assets/aistudio/IMG-20261104-WA0011_335cee98.jpg',
      '/assets/aistudio/IMG-20261104-WA0008_3c6477ec.jpg',
      '/assets/aistudio/IMG-20261104-WA0009_842667a4.jpg',
      '/assets/aistudio/IMG-20261104-WA0006_2d6e4917.jpg',
      '/assets/aistudio/IMG-20261104-WA0010_e9809bb6.jpg'
    ],
    officialFlyers: [
      '/assets/aistudio/IMG-20261104-WA0007_4c8d0946.jpg',
      '/assets/aistudio/IMG-20261104-WA0011_335cee98.jpg',
      '/assets/aistudio/IMG-20261104-WA0008_3c6477ec.jpg',
      '/assets/aistudio/IMG-20261104-WA0009_842667a4.jpg',
      '/assets/aistudio/IMG-20261104-WA0006_2d6e4917.jpg',
      '/assets/aistudio/IMG-20261104-WA0010_e9809bb6.jpg'
    ],
    overview:
      'Havilah City is an expansive master development situated directly along the tarred expressroad in Ibara Orile, Ita Oshin Axis, Abeokuta. Combining elevated topography with strategic regional connectivity, Havilah City provides forward-thinking land bankers and homeowners with dispute-free parcels with a Registered Survey and C of O in view.',
    locationDetails:
      'Located along the Tarred Expressroad in Ibara Orile, Ita Oshin Axis, Abeokuta, Ogun State. Highly accessible and proximate to major commercial hubs and transport networks.',
    landmarksList: [
      'Ita Oshin Motor Parks',
      'Oke Ata Housing Estate',
      'Federal Neuropsychiatric Hospital Aro',
      'Lafenwa Market',
      'Old Brewery Abeokuta',
      'Olumo Rock',
      'Crescent University'
    ],
    plotSizes: [
      {
        id: 'hc-300',
        size: '300 SQM (Residential)',
        title: 'Starter Residential Plot',
        price: 1200000,
        promoPrice: 900000,
        description: '0-6 Months (Interest Free): ₦900,000 | 6-9 Months: ₦1,200,000 | 9-12 Months: ₦1,500,000. Initial Deposit: ₦300,000. 5% discount on one-off payment!',
        isAvailable: true
      },
      {
        id: 'hc-500',
        size: '500 SQM (Residential)',
        title: 'Standard Residential Plot',
        price: 2000000,
        promoPrice: 1500000,
        description: '0-6 Months (Interest Free): ₦1,500,000 | 6-9 Months: ₦2,000,000 | 9-12 Months: ₦2,300,000. Initial Deposit: ₦300,000. 5% discount on one-off payment!',
        isAvailable: true
      },
      {
        id: 'hc-acre',
        size: '1 Acre / 3,000 SQMS (Acre Deal)',
        title: 'Prime Land Banking Acre Deal',
        price: 9700000,
        promoPrice: 8700000,
        description: '0-6 Months (Interest Free): ₦8,700,000 | 6-9 Months: ₦9,300,000 | 9-12 Months: ₦9,700,000. Initial Deposit: ₦1,000,000. 5% discount on one-off payment!',
        isAvailable: true
      },
      {
        id: 'hc-comm-500',
        size: '500 SQMS (Commercial)',
        title: 'Commercial Frontage Plot',
        price: 2500000,
        promoPrice: 2500000,
        description: '0-3 Months: ₦2,500,000 | 3-6 Months: ₦3,000,000 | 6-9 Months: ₦3,300,000 | 9-12 Months: ₦3,600,000. Initial Deposit: ₦500,000.',
        isAvailable: true
      },
      {
        id: 'hc-comm-1000',
        size: '1,000 SQMS (Commercial)',
        title: 'Commercial Boulevard Parcel',
        price: 4500000,
        promoPrice: 4500000,
        description: '0-3 Months: ₦4,500,000 | 3-6 Months: ₦5,000,000 | 6-9 Months: ₦5,500,000 | 9-12 Months: ₦6,000,000. Initial Deposit: ₦1,000,000.',
        isAvailable: true
      }
    ],
    paymentPlans: [
      {
        durationMonths: 6,
        title: '0 – 6 Months (Interest Free / Pre-Launch)',
        description: '300 SQM: ₦900,000 | 500 SQM: ₦1,500,000 | 1 Acre (3,000 SQM): ₦8,700,000. 5% discount on one-off payment! Initial deposit from ₦300K.',
        initialDepositPercent: 20
      },
      {
        durationMonths: 9,
        title: '6 – 9 Months Structured Spread',
        description: '300 SQM: ₦1,200,000 | 500 SQM: ₦2,000,000 | 1 Acre: ₦9,300,000. Balanced milestone distributions spaced over 270 days.',
        initialDepositPercent: 20
      },
      {
        durationMonths: 12,
        title: '9 – 12 Months Land Banking Spread',
        description: '300 SQM: ₦1,500,000 | 500 SQM: ₦2,300,000 | 1 Acre: ₦9,700,000. Tailored spread for long-term wealth builders banking acreage.',
        initialDepositPercent: 20
      }
    ],
    statutoryFees: [
      {
        label: 'Statutory Charges (300 SQM)',
        amount: '₦600,000',
        description: 'Includes Development Levy, Provisional Survey, and Legal Documentation'
      },
      {
        label: 'Statutory Charges (500 SQM)',
        amount: '₦800,000',
        description: 'Includes Development Levy, Provisional Survey, and Legal Documentation'
      },
      {
        label: 'Statutory Charges (1 Acre / 3,000 SQMS)',
        amount: '₦4,000,000',
        description: 'Includes Development Levy, Provisional Survey, and Legal Documentation'
      }
    ],
    infrastructure: [
      'Estate Gate House',
      'Perimeter Fencing',
      'Motorable and Accessible Road',
      'Beautification of Estate',
      'Clearly Demarcated Survey Beacons for Every Parcel',
      'Eco-Conscious Topographical Runoff & Storm Drainage System'
    ],
    titleDocuments: [
      {
        title: 'Registered Survey / C of O in view',
        status: 'Lodged & In View',
        description: 'Cadastral boundary survey registered at Ogun State Bureau of Lands with C of O in view.'
      },
      {
        title: 'Contract of Sale & Deed of Assignment',
        status: 'Fully Executable',
        description: 'Binding legal documentation transferring interest and unencumbered rights to each buyer.'
      }
    ],
    buildingGuidelines: [
      'Residential houses must be built in designated residential areas, and Commercial buildings in designated commercial areas.',
      'Shops are not allowed within residential houses.',
      'Tenement buildings ("Face Me I Face You") are strictly not permitted in the estate.',
      'Subscribers who have been allocated their plots may commence construction, provided the applicable Development Levy has been fully paid.'
    ],
    bankAccounts: [
      { bankName: 'FCMB', accountName: 'OASIS RAY DEVELOPMENTS LTD', accountNumber: '2008892202' }
    ],
    faqList: [
      {
        question: 'Where is Havilah City located?',
        answer: 'Havilah City is located along the Tarred Expressroad in Ibara Orile, Ita Oshin Axis, Abeokuta.'
      },
      {
        question: 'Who are the developers?',
        answer: 'OASIS RAY DEVELOPMENTS LTD.'
      },
      {
        question: 'What major Landmarks are in close proximity to Havilah City?',
        answer: 'Ita Oshin Motor Parks, Oke Ata Housing Estate, Federal Neuropsychiatric Hospital Aro, Lafenwa Market, Old Brewery Abeokuta, Olumo Rock, Crescent University.'
      },
      {
        question: 'Is there any document/title on the land?',
        answer: 'The title on the land is Registered Survey / C of O in view.'
      },
      {
        question: 'What is the price for cornerpiece?',
        answer: 'A Corner piece land attracts ₦400,000.'
      },
      {
        question: 'What are the residential prices & payment plans?',
        answer: '300 SQMS: 0-6 Months (Interest Free) ₦900,000 | 6-9 Months ₦1,200,000 | 9-12 Months ₦1,500,000 (Initial Deposit: ₦300,000). 500 SQMS: 0-6 Months (Interest Free) ₦1,500,000 | 6-9 Months ₦2,000,000 | 9-12 Months ₦2,300,000 (Initial Deposit: ₦300,000). 1 Acre (3,000 SQMS): 0-6 Months ₦8,700,000 | 6-9 Months ₦9,300,000 | 9-12 Months ₦9,700,000 (Initial Deposit: ₦1,000,000). 5% discount on one-off payment!'
      },
      {
        question: 'What are the commercial plot sizes & affordable payment plans?',
        answer: '500 SQMS Commercial: 0-3 Months ₦2,500,000 | 3-6 Months ₦3,000,000 | 6-9 Months ₦3,300,000 | 9-12 Months ₦3,600,000 (Initial Deposit: ₦500,000). 1000 SQMS Commercial: 0-3 Months ₦4,500,000 | 3-6 Months ₦5,000,000 | 6-9 Months ₦5,500,000 | 9-12 Months ₦6,000,000 (Initial Deposit: ₦1,000,000).'
      },
      {
        question: 'What other payments do I make apart from the payment for the land?',
        answer: 'Statutory Charges (Includes Development Levy, Provisional Survey, and legal documentation): ₦600,000 (300 SQM), ₦800,000 (500 SQM), ₦4,000,000 (1 Acre).'
      },
      {
        question: 'What will the development levy be used for?',
        answer: 'Motorable and Accessible Road, Beautification of Estate, Estate Gate House, and Perimeter Fencing.'
      },
      {
        question: 'What do I get after completion of payments for the land?',
        answer: 'A duly executed receipt of purchase, Contract of Sale, Copy of Survey plan, Deed of Assignment.'
      },
      {
        question: 'Can I pay a deposit and pay the balance any time within the duration of the tenure chosen?',
        answer: 'After payment of the initial deposit, you are expected to pay the balance monthly as nonpayment as at when due will be treated as a breach of contract which can either result to termination or revocation of the contract.'
      },
      {
        question: 'What are the Statutory Fee Undertakings?',
        answer: 'Development Fee: In the event of default, the development fee shall be charged at the prevailing market value or cost. Payment of Statutory Fees: All statutory fees must be paid within three (3) months after the completion of your payment plan. Failure to comply may result in forfeiture.'
      },
      {
        question: 'Reselling or change of ownership policy?',
        answer: 'A subscriber who has fully paid for their plot(s) and wishes to resell or transfer ownership must notify the company and pay a change-of-ownership fee of ₦100,000. The subscriber must submit the original copies of relevant documents; the new subscriber will be responsible for the cost of processing the Deed of Assignment and Survey Plan required for transfer.'
      },
      {
        question: 'When is physical allocation and construction commencement?',
        answer: 'Physical allocation communicated upon full payment of plot(s) of land, Deed of Assignment, Survey Plan, and Development Levy. Construction may commence provided applicable Development Levy has been fully paid.'
      },
      {
        question: 'Where do I make payments?',
        answer: 'Cash payments/transfers should be deposited into our official account: FCMB (Account Name: OASIS RAY DEVELOPMENTS LTD, Account Number: 2008892202). We accept no liability for cash payment to any person or group of persons.'
      }
    ],
    mapCoordinates: {
      lat: 7.1852,
      lng: 3.3150,
      label: 'Havilah City, Ibara Orile, Ita Oshin Axis, Abeokuta, Ogun State'
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
