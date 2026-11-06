import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_DEVELOPMENTS, INITIAL_SETTINGS, INITIAL_TESTIMONIALS } from './src/data/initialData';
import { validateLeadForm } from './src/utils/realEstateCalculators';
import { generateLocalAdvisorResponse } from './src/utils/aiAdvisorEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json({ limit: '15mb' }));

// Initialize GoogleGenAI server-side client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

interface DatabaseSchema {
  developments: typeof INITIAL_DEVELOPMENTS;
  settings: typeof INITIAL_SETTINGS;
  testimonials: typeof INITIAL_TESTIMONIALS;
  enquiries: Array<{
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
    status: string;
    notes?: string;
    createdAt: string;
  }>;
}

function initDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DatabaseSchema = {
      developments: INITIAL_DEVELOPMENTS,
      settings: INITIAL_SETTINGS,
      testimonials: INITIAL_TESTIMONIALS,
      enquiries: [
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
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch {
    return {
      developments: INITIAL_DEVELOPMENTS,
      settings: INITIAL_SETTINGS,
      testimonials: INITIAL_TESTIMONIALS,
      enquiries: []
    };
  }
}

function saveDb(db: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write db.json:', err);
  }
}

let db = initDb();

// API Endpoints
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Dynamic XML Sitemap
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/developments', changefreq: 'daily', priority: '0.9' },
    { url: '/investment', changefreq: 'weekly', priority: '0.8' },
    { url: '/services', changefreq: 'weekly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.7' },
    { url: '/advisory', changefreq: 'weekly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.3' }
  ];

  const developmentUrls = db.developments.map((d) => ({
    url: `/developments/${d.slug || d.id}`,
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: d.updatedAt ? d.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...developmentUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p: any) => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${p.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemapXml);
});

// Robots.txt
app.get('/robots.txt', (req: Request, res: Response) => {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// Gemini AI Advisory Assistant Chat Endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, image, context, history } = req.body;

    if (!prompt && !image) {
      return res.status(400).json({ error: 'Prompt or image is required' });
    }

    const systemInstruction = `You are the official AI Senior Property Advisor and Customer Relations Desk for OASIS RAY DEVELOPMENTS LTD.

### CORPORATE IDENTITY & LEADERSHIP
- Company Name: OASIS RAY DEVELOPMENTS LTD.
- Managing Director & Chief Executive Officer (Founder): Oluwayemi James Damilare
- Tagline: "The Calm Side of Smart Investing."
- Head Office: 3rd Floor, Goldcrest Plaza, Ikota, Lekki, Lagos State, Nigeria.
- Regional Growth Corridors / Project Sites:
  • Mowe-Ofada Strategic Hub (Itakana Village, Obafemi Owode LGA, Ogun State)
  • Abeokuta Expressroad Axis (Ibara Orile, Ita Oshin, Abeokuta, Ogun State)
- Company Vision: "To establish a benchmark real estate institution whose master-planned developments become enduring vessels through which wealth, influence, and generational opportunity flow across every economic cycle."
- Company Mission: "To identify strategic opportunities, acquire and develop well positioned real estate assets, and create thoughtfully designed environments that connect people and capital to places with enduring potential."
- Site Inspection Days: Tuesdays and Saturdays (Complimentary inspection transport provided from coordination points in Ogun State).
- Official Advisory & Office Hours: Monday – Friday: 8:30 AM – 5:30 PM | Saturday (Inspections by Appointment): 10:00 AM – 3:00 PM.

### OFFICIAL CUSTOMER CARE & CONTACT CHANNELS
- Direct Investor & Customer Care Line: +234 817 173 1525
- Official WhatsApp Customer Care Desk: +2348171731525 (Direct WhatsApp link: https://wa.me/2348171731525)
- Official Correspondence Email: hello@oasisraydevelopments.com
- Head Office Address: 3rd Floor, Goldcrest Plaza, Ikota, Lekki, Lagos State, Nigeria.

### STRICT PORTFOLIO RULE: LAND ONLY (NO HOUSING PACKAGES)
- Oasis Ray Developments Ltd. sells VERIFIED ESTATE LAND PLOTS AND STRATEGIC LAND BANKING ACREAGE ONLY (300 SQM, 500 SQM, 1 Acre deals, and commercial frontage plots).
- The company does NOT sell pre-built turnkey housing, duplexes, or building construction packages.
- Subscribers acquire demarcated land plots with clear registered titles/surveys and build their own homes in accordance with the estate master-planning guidelines.

### VERIFIED CORPORATE BANK ACCOUNTS
CRITICAL FRAUD-PREVENTION PROTOCOL:
- All payments MUST be made exclusively to OASIS RAY DEVELOPMENTS LTD.
- Payments to any personal account or third party are strictly prohibited. The company accepts zero liability for cash given to any person.
- Official Accounts:
  1. FCMB (First City Monument Bank): Account Number 2008892202 | Account Name: OASIS RAY DEVELOPMENTS LTD
  2. WEMA BANK: Account Number 0128047846 | Account Name: OASIS RAY DEVELOPMENTS LTD

### 8 CORE ADVISORY & DEVELOPMENT SERVICES
1. Real Estate Development (Master planning, gated community infrastructure, residential layout execution).
2. Land Acquisition and Sales (Zero-encumbrance greenfield/brownfield vetted parcels with registered surveys).
3. Property Investment Opportunities (High-yield entry points with predictable capital appreciation horizons).
4. Land Banking (Strategic acreage acquisition ahead of civic master plans).
5. Master-Planned Land Parcellation & Plot Allocation (Survey-demarcated residential & commercial estate plots with boundary beacons).
6. Real Estate Consultancy (Cadastral zoning audits, title regularization, Ogun State land registry guidance).
7. Property Marketing and Brokerage (Transparent representation for verified institutional lands).
8. Real Estate Investment Advisory (Portfolio balancing, inflation-hedging property strategies, diaspora coordination).

---

### PORTFOLIO PROPERTY 1: CHRISTOS GARDENS
- Location: Itakana Village, Mowe Ofada Axis, Obafemi Owode Local Government Area, Ogun State.
- Title: Verifiable Certificate of Occupancy (C of O), Registered Survey Plan lodged and chartable at Ogun State Bureau of Lands, Deed of Assignment & Contract of Sale.
- Topography: 100% dry table land, solid soil mechanics, ready for immediate construction.
- Corner Piece Premium: Attracts an additional statutory fee of ₦1,000,000.
- Outright Payment Incentive: 5% discount on one-off payment!
- Plot Sizes & Payment Schedules:
  • 300 SQM (Starter Residential Plot):
    - 0–3 Months Outright: ₦4,500,000
    - 3–6 Months: ₦5,000,000 (Initial deposit: ₦1,000,000)
    - 6–9 Months: ₦5,500,000 (Initial deposit: ₦1,000,000)
    - 5% discount applies on one-off payment.
    - Suitable for: 3-bedroom luxury bungalow or semi-detached villa.
  • 500 SQM (Standard Residential Plot):
    - 0–3 Months Outright: ₦7,000,000
    - 3–6 Months: ₦7,500,000 (Initial deposit: ₦2,000,000)
    - 6–9 Months: ₦8,000,000 (Initial deposit: ₦2,000,000)
    - 5% discount applies on one-off payment.
    - Suitable for: Full standard residential estate land plot with registered survey and verifiable C of O.
- Key Landmarks (Within 3km Radius):
  • Royal Garden City
  • Nestle Foods Plc
  • Chrisland Millennium University
  • Obafemi Owode Local Government Headquarters
  • Olam Oil
- Infrastructure Provided by Developer:
  • Perimeter fencing and demarcated boundary survey beacons
  • Beautification of the Estate
  • Security gate house
  • Motorable and accessible tarred road network
  • Street lights along internal corridors
  • Engineered drainage system
  • 24/7 security patrols
- Statutory Charges (Ancillary Schedule - payable within 3 months post completion of land payments):
  • Survey Plan: ₦500,000
  • Legal Documentation (Deed of Assignment): ₦200,000
  • Developmental Fee: ₦600,000 (for 300 SQM) / ₦1,000,000 (for 500 SQM)
  • Developmental fee covers: Street lights, drainage system, security, estate gate house, tarred road.
- Building Restrictions & Covenants:
  • Residential houses must be erected in designated residential zones.
  • Commercial shops are strictly forbidden inside residential houses.
  • Tenement buildings ("Face Me I Face You") are strictly not permitted.
  • Construction can commence once plot allocation is finalized and development levy is paid.
- Documents Issued to Buyer:
  • Duly executed Receipt of Purchase, Contract of Sale, Copy of Registered Survey Plan, Deed of Assignment.

---

### PORTFOLIO PROPERTY 2: HAVILAH CITY
- Location: Along the Tarred Expressroad in Ibara Orile, Ita Oshin Axis, Abeokuta, Ogun State.
- Title: Registered Survey / C of O in view.
- Topography: Elevated hillside, excellent natural drainage, panoramic natural scenery.
- Corner Piece Premium: Attracts an additional statutory fee of ₦400,000.
- Outright Payment Incentive: 5% discount on one-off payment!
- Plot Sizes & Payment Schedules:
  • 300 SQM (Residential):
    - 0–6 Months (Interest-Free): ₦900,000
    - 6–9 Months: ₦1,200,000
    - 9–12 Months: ₦1,500,000
    - Initial deposit: ₦300,000
  • 500 SQM (Residential):
    - 0–6 Months (Interest-Free): ₦1,500,000
    - 6–9 Months: ₦2,000,000
    - 9–12 Months: ₦2,300,000
    - Initial deposit: ₦300,000
  • 1 Acre Deal / 3,000 SQMS (Acre Deal):
    - 0–6 Months (Interest-Free): ₦8,700,000
    - 6–9 Months: ₦9,300,000
    - 9–12 Months: ₦9,700,000
    - Initial deposit: ₦1,000,000 (5% discount on one-off payment)
  • 500 SQMS (Commercial Frontage):
    - 0–3 Months: ₦2,500,000 | 3–6 Months: ₦3,000,000 | 6–9 Months: ₦3,300,000 | 9–12 Months: ₦3,600,000 (Initial deposit: ₦500,000)
  • 1,000 SQMS (Commercial Frontage):
    - 0–3 Months: ₦4,500,000 | 3–6 Months: ₦5,000,000 | 6–9 Months: ₦5,500,000 | 9–12 Months: ₦6,000,000 (Initial deposit: ₦1,000,000)
- Key Landmarks:
  • Ita Oshin Motor Parks
  • Oke Ata Housing Estate
  • Federal Neuropsychiatric Hospital Aro
  • Lafenwa Market
  • Old Brewery Abeokuta
  • Olumo Rock
  • Crescent University
- Infrastructure Provided by Developer:
  • Estate Gate House
  • Perimeter Fencing with demarcated survey beacons
  • Motorable and accessible road network
  • Beautification of estate
  • Storm drainage system
- Statutory Charges (Ancillary Schedule - payable within 3 months post completion of land payments):
  • 300 SQM: ₦600,000
  • 500 SQM: ₦800,000
  • 1 Acre: ₦4,000,000
  • Covers: Development Levy, Provisional Survey, Legal Documentation.
- Policies & Undertakings:
  • Transfer / Resale Fee: ₦100,000 per plot.
  • Allocation upon complete payment.
  • Strict residential and commercial zoning; no shops in residential quarters; no tenement buildings ("Face Me I Face You").

---

### MANDATORY INTERACTION & CUSTOMER CARE PROTOCOL
1. CUSTOMER INFORMATION GATHERING:
   - When a user asks about:
     • Purchasing or reserving a plot
     • Scheduling a physical site inspection (Tuesdays or Saturdays)
     • Tailored installment spreads or diaspora payment transfers
     • Or asks ANY question not covered in the verified data above:
   - You MUST politely ask for their key contact details before or as part of providing the next step:
     "To ensure our senior advisory desk prepares your personalized documentation and reserves your allocation, may I kindly have:
      1. Your Full Name
      2. Your Phone Number or WhatsApp Contact (with country code if diaspora)
      3. Your Email Address
      4. Preferred Property (Christos Gardens or Havilah City) & Plot Size"

2. HANDLING UNLISTED / MISSING INFORMATION:
   - If a customer asks for information NOT PRESENT in this verified portfolio knowledge (such as custom architectural blueprints, specific deed registration numbers, bulk discount negotiations beyond 5%, private meetings with the Founder, or unlisted corridors):
   - DO NOT speculate, assume, or make up facts or numbers.
   - Explicitly inform the user:
     "This specific request requires direct verification by our Senior Investment Management & Customer Care Desk.
      You can contact our Customer Care Desk directly via:
      📞 Direct Phone / Customer Care: +234 817 173 1525
      💬 WhatsApp Advisory Desk: +2348171731525
      📧 Official Email: hello@oasisraydevelopments.com
      🏢 Corporate Head Office: 3rd Floor, Goldcrest Plaza, Ikota, Lekki, Lagos State, Nigeria"
   - And invite them: "If you share your Name, Phone Number, and Email here, I will immediately log your inquiry with our customer care team so an advisor can reach out to you within our advisory hours."

3. TONE & FORMATTING:
   - Speak with calm, sophisticated, institutional authority.
   - Format lists with clean bullet points and clear currency figures (₦).
   - If an image (land photo, survey plan, blueprint) is uploaded, analyze the visible boundaries, road frontage, topographical features, beacons, or cadastral stamp, and provide clear evaluation.
   - Always reassure investors of the zero-encumbrance, verifiable title guarantee of Oasis Ray Developments Ltd.`;

    const contents: Array<any> = [];

    // Append past conversation history if provided
    if (history && Array.isArray(history)) {
      for (const h of history) {
        if (h && h.text) {
          contents.push({
            role: h.role === 'ai' || h.role === 'model' ? 'model' : 'user',
            parts: [{ text: h.text }]
          });
        }
      }
    }

    const currentTurnParts: Array<any> = [];

    if (image && typeof image === 'string') {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

      currentTurnParts.push({
        inlineData: {
          mimeType,
          data: base64Data
        }
      });
    }

    let userPromptText = prompt || 'Please analyze this land photo / survey document and advise me.';
    if (context) {
      userPromptText = `[Property Context: ${context}]\n\n${userPromptText}`;
    }

    currentTurnParts.push({ text: userPromptText });
    contents.push({ role: 'user', parts: currentTurnParts });

    // Check if the user is providing their contact details (Name + Phone or Email) to auto-save as an enquiry
    const phoneMatch = userPromptText.match(/(\+?\d[\d\s-]{7,}\d)/);
    const emailMatch = userPromptText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (phoneMatch || emailMatch) {
      try {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const autoLead = {
          id: `enq-ai-${Date.now()}`,
          referenceCode: `ORD-AI-${randomSuffix}`,
          fullName: 'Valued Client (Via AI Desk)',
          email: emailMatch ? emailMatch[0].trim().toLowerCase() : '',
          phone: phoneMatch ? phoneMatch[0].trim() : '',
          interestedDevelopmentId: context?.includes('Christos') ? 'christos-gardens' : context?.includes('Havilah') ? 'havilah-city' : '',
          interestedDevelopmentName: context || 'General Portfolio Enquiry',
          plotSizePreference: 'Captured during consultation',
          enquiryType: 'AI Assistant Consultation',
          message: userPromptText,
          status: 'New',
          notes: 'Customer provided contact information during AI Advisory session. Awaiting customer care callback.',
          createdAt: new Date().toISOString()
        };
        db.enquiries.unshift(autoLead);
        saveDb(db);
      } catch (saveErr) {
        console.warn('Could not auto-log lead from chat:', saveErr);
      }
    }

    let reply = '';

    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction
          }
        });
        reply = response.text || '';
      } catch (geminiError) {
        console.warn('Gemini generateContent error; falling back to verified advisor engine:', geminiError);
      }
    }

    if (!reply) {
      const localAdvice = generateLocalAdvisorResponse(userPromptText, context);
      reply = localAdvice.text;
    }

    res.json({ reply });
  } catch (err: any) {
    console.error('Gemini Chat API Error:', err);
    const localAdvice = generateLocalAdvisorResponse(req.body?.prompt || '', req.body?.context);
    res.json({ reply: localAdvice.text });
  }
});

// Developments
app.get('/api/developments', (_req: Request, res: Response) => {
  res.json(db.developments);
});

app.get('/api/developments/:id', (req: Request, res: Response) => {
  const item = db.developments.find((d) => d.id === req.params.id || d.slug === req.params.id);
  if (!item) return res.status(404).json({ error: 'Development not found' });
  res.json(item);
});

app.post('/api/developments', (req: Request, res: Response) => {
  const item = req.body;
  if (!item || !item.name) {
    return res.status(400).json({ error: 'Development name is required' });
  }

  const index = db.developments.findIndex((d) => d.id === item.id);
  if (index >= 0) {
    db.developments[index] = { ...item, updatedAt: new Date().toISOString() };
  } else {
    db.developments.push({
      ...item,
      id: item.id || `dev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  saveDb(db);
  res.json({ success: true, development: item });
});

app.delete('/api/developments/:id', (req: Request, res: Response) => {
  db.developments = db.developments.filter((d) => d.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Enquiries / Leads
app.get('/api/enquiries', (_req: Request, res: Response) => {
  res.json(db.enquiries);
});

app.post('/api/enquiries', (req: Request, res: Response) => {
  const payload = req.body;
  const validation = validateLeadForm(payload);
  if (!validation.isValid) {
    return res.status(400).json({ error: 'Validation failed', errors: validation.errors });
  }

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newLead = {
    id: `enq-${Date.now()}`,
    referenceCode: `ORD-2026-${randomSuffix}`,
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    interestedDevelopmentId: payload.interestedDevelopmentId || '',
    interestedDevelopmentName: payload.interestedDevelopmentName || '',
    plotSizePreference: payload.plotSizePreference || '',
    enquiryType: payload.enquiryType,
    message: payload.message || '',
    status: 'New',
    createdAt: new Date().toISOString()
  };

  db.enquiries.unshift(newLead);
  saveDb(db);
  res.status(201).json({ success: true, lead: newLead });
});

app.put('/api/enquiries/:id', (req: Request, res: Response) => {
  const { status, notes } = req.body;
  const lead = db.enquiries.find((e) => e.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Enquiry not found' });

  if (status) lead.status = status;
  if (notes !== undefined) lead.notes = notes;
  saveDb(db);
  res.json({ success: true, lead });
});

// Settings
app.get('/api/settings', (_req: Request, res: Response) => {
  res.json(db.settings);
});

app.put('/api/settings', (req: Request, res: Response) => {
  db.settings = { ...db.settings, ...req.body };
  saveDb(db);
  res.json({ success: true, settings: db.settings });
});

// Testimonials
app.get('/api/testimonials', (_req: Request, res: Response) => {
  res.json(db.testimonials);
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  const item = req.body;
  const index = db.testimonials.findIndex((t) => t.id === item.id);
  if (index >= 0) {
    db.testimonials[index] = item;
  } else {
    db.testimonials.unshift({ ...item, id: item.id || `t-${Date.now()}` });
  }
  saveDb(db);
  res.json({ success: true, testimonial: item });
});

// Auth
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { passcode } = req.body;
  if (passcode === 'oasis2026' || passcode === 'OasisAdmin2026!') {
    res.json({ success: true, token: 'oasis-auth-token-valid' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid administrative passcode' });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OASIS RAY DEVELOPMENTS Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
