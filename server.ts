import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DEVELOPMENTS, INITIAL_SETTINGS, INITIAL_TESTIMONIALS } from './src/data/initialData';
import { validateLeadForm } from './src/utils/realEstateCalculators';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json({ limit: '10mb' }));

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
