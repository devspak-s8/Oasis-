import { INITIAL_DEVELOPMENTS, INITIAL_SETTINGS } from '../data/initialData';

export interface FormattedAiResponse {
  text: string;
  cardType?: 'christos' | 'havilah' | 'banks' | 'inspection' | 'customercare' | 'comparison';
  actionPrompt?: string;
}

export function generateLocalAdvisorResponse(query: string, context?: string): FormattedAiResponse {
  const q = query.toLowerCase();
  const ctx = (context || '').toLowerCase();

  // 1. Customer contact capture check
  const phoneMatch = query.match(/(\+?\d[\d\s-]{7,}\d)/);
  const emailMatch = query.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);

  if (phoneMatch || emailMatch) {
    const contactInfo = phoneMatch ? phoneMatch[0] : emailMatch ? emailMatch[0] : '';
    return {
      text: `### Thank You for Providing Your Contact Details\n\nI have logged your contact details (**${contactInfo}**) with our Senior Advisory Registry.\n\nAn Oasis Ray Senior Investment Consultant will review your inquiry and reach out to you directly during advisory hours (Mon–Fri 8:30 AM – 5:30 PM, Sat 10:00 AM – 3:00 PM).\n\nIf your request is urgent, you can also connect instantly with our Customer Care Desk below:`,
      cardType: 'customercare'
    };
  }

  // 2. Bank Accounts & Payment Details
  if (q.includes('bank') || q.includes('account') || q.includes('fcmb') || q.includes('wema') || q.includes('how to pay') || q.includes('transfer')) {
    return {
      text: `### Verified Corporate Bank Accounts (Oasis Ray Developments Ltd.)\n\n**Anti-Fraud Guarantee:** All property payments must be deposited strictly into our corporate bank accounts. The company accepts zero liability for cash given to any individual.\n\n• **FCMB (First City Monument Bank):**\n  - Account Number: **2008892202**\n  - Account Name: **OASIS RAY DEVELOPMENTS LTD**\n\n• **WEMA BANK:**\n  - Account Number: **0128047846**\n  - Account Name: **OASIS RAY DEVELOPMENTS LTD**\n\n*Zero personal accounts. Immediate official receipt and Contract of Sale issued upon payment verification.*`,
      cardType: 'banks'
    };
  }

  // 3. Christos Gardens Questions
  if (q.includes('christos') || ctx.includes('christos') || q.includes('mowe') || q.includes('ofada')) {
    if (q.includes('fee') || q.includes('statutory') || q.includes('developmental') || q.includes('survey')) {
      return {
        text: `### Christos Gardens — Statutory Fees Schedule\n\nIn accordance with Ogun State land administration standards, the ancillary charges for Christos Gardens (Mowe-Ofada) are payable within 3 months post-tenure:\n\n• **Survey Plan:** ₦500,000 (Registered and chartable at Ogun State Bureau of Lands)\n• **Legal Documentation (Deed of Assignment):** ₦200,000\n• **Developmental Fee:** ₦600,000 (for 300 SQM) | ₦1,000,000 (for 500 SQM)\n• *Developmental fee covers: Tarred roads, street lighting, perimeter fence, central drainage, estate gate house, and 24/7 security.*`,
        cardType: 'christos'
      };
    }

    return {
      text: `### Christos Gardens (Mowe-Ofada Axis, Ogun State)\n\n**Title:** Verifiable Certificate of Occupancy (**C of O**) & Registered Survey.\n**Topography:** 100% dry table land, ready for immediate construction.\n\n**Plot Sizes & Verified Pricing:**\n• **300 SQM (Starter Residential Plot):**\n  - 0–3 Months Outright: **₦4,500,000**\n  - 3–6 Months: **₦5,000,000** *(Initial Deposit: ₦1M)*\n  - 6–9 Months: **₦5,500,000** *(Initial Deposit: ₦1M)*\n• **500 SQM (Standard Residential Plot):**\n  - 0–3 Months Outright: **₦7,000,000**\n  - 3–6 Months: **₦7,500,000** *(Initial Deposit: ₦2M)*\n  - 6–9 Months: **₦8,000,000** *(Initial Deposit: ₦2M)*\n\n**Special Incentives:** 5% discount applies on one-off outright payment! Corner piece plots attract an additional ₦1,000,000 statutory premium.\n\n**Surrounding Landmarks (Within 3km):** Royal Garden City, Nestle Foods Plc, Chrisland Millennium University, Obafemi Owode Local Government, Olam Oil.`,
      cardType: 'christos'
    };
  }

  // 4. Havilah City Questions
  if (q.includes('havilah') || ctx.includes('havilah') || q.includes('abeokuta') || q.includes('ita oshin') || q.includes('acre')) {
    if (q.includes('fee') || q.includes('statutory') || q.includes('charges')) {
      return {
        text: `### Havilah City — Statutory Fees Schedule\n\nStatutory ancillary charges for Havilah City (Ibara Orile, Ita Oshin, Abeokuta) cover development levy, provisional survey, and legal documentation:\n\n• **300 SQM:** ₦600,000\n• **500 SQM:** ₦800,000\n• **1 Acre (3,000 SQMS):** ₦4,000,000\n• *Payable within 3 months post completion of land payments.*`,
        cardType: 'havilah'
      };
    }

    return {
      text: `### Havilah City (Ita Oshin Axis, Abeokuta, Ogun State)\n\n**Location:** Directly along the Tarred Expressroad in Ibara Orile, Ita Oshin, Abeokuta.\n**Title:** Registered Survey / C of O in view.\n**Topography:** Elevated panoramic hillside with natural drainage.\n\n**Plot Sizes & Pre-Launch Pricing:**\n• **300 SQM (Residential):** 0–6m: **₦900,000** | 6–9m: ₦1.2M | 9–12m: ₦1.5M *(Dep: ₦300K)*\n• **500 SQM (Residential):** 0–6m: **₦1,500,000** | 6–9m: ₦2.0M | 9–12m: ₦2.3M *(Dep: ₦300K)*\n• **1 Acre Deal (3,000 SQMS):** 0–6m: **₦8,700,000** | 6–9m: ₦9.3M | 9–12m: ₦9.7M *(Dep: ₦1M)*\n• **500 SQMS Commercial Frontage:** 0–3m: **₦2,500,000** | 3–6m: ₦3.0M | 6–9m: ₦3.3M | 9–12m: ₦3.6M *(Dep: ₦500K)*\n• **1,000 SQMS Commercial Frontage:** 0–3m: **₦4,500,000** | 3–6m: ₦5.0M | 6–9m: ₦5.5M | 9–12m: ₦6.0M *(Dep: ₦1M)*\n\n**Special Incentives:** 5% discount on one-off payment! Corner piece plots attract an additional ₦400,000 premium.\n\n**Landmarks:** Ita Oshin Motor Parks, Oke Ata Housing Estate, Neuropsychiatric Hospital Aro, Lafenwa Market, Crescent University.`,
      cardType: 'havilah'
    };
  }

  // 5. Site Inspections
  if (q.includes('inspect') || q.includes('visit') || q.includes('tour') || q.includes('see') || q.includes('tuesday') || q.includes('saturday')) {
    return {
      text: `### Physical Site Inspection Tour Schedule\n\nWe conduct organized physical site inspections every **Tuesday** and **Saturday** for both Christos Gardens (Mowe-Ofada) and Havilah City (Abeokuta).\n\n• **Inspection Days:** Tuesdays & Saturdays (10:00 AM & 1:00 PM batches)\n• **Logistics:** Complimentary inspection transport provided from our designated coordination point in Ogun State.\n• **What You Inspect:** Physical dry table land, graded access roads, demarcated boundary survey beacons, and neighboring landmarks.\n\n*Would you like to reserve a seat for the upcoming inspection? Please share your Name, Phone Number, and Preferred Date.*`,
      cardType: 'inspection'
    };
  }

  // 6. Customer Care & Office Address
  if (q.includes('contact') || q.includes('customer care') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('office') || q.includes('address')) {
    return {
      text: `### Official Customer Care & Corporate Desk\n\nOur client advisory desk is at your service for site inspections, title verifications, and tailored payment terms:\n\n• **Direct Investor & Customer Care Line:** +234 (0) 803 000 0000\n• **WhatsApp Advisory Desk:** +2348030000000\n• **Official Correspondence Email:** info@oasisraydevelopments.com\n• **Head Office:** 3rd Floor, Goldcrest Plaza, Ikota, Lekki, Lagos State, Nigeria\n• **Advisory Hours:** Monday – Friday: 8:30 AM – 5:30 PM | Saturday: 10:00 AM – 3:00 PM`,
      cardType: 'customercare'
    };
  }

  // 7. General Comparison / Default Overview
  return {
    text: `### OASIS RAY DEVELOPMENTS LTD. — Portfolio Overview\n\n*"The Calm Side of Smart Investing"*\n\nWe currently manage two strategic master-planned developments in Ogun State:\n\n1. **CHRISTOS GARDENS (Mowe-Ofada Axis)**\n   • **Title:** Verifiable Certificate of Occupancy (**C of O**)\n   • **Plot Sizes:** 300 SQM (From ₦4.5M) & 500 SQM (From ₦7.0M)\n   • **Location:** Near Lagos-Ibadan Expressway, Nestle Foods Plc, Royal Garden City.\n\n2. **HAVILAH CITY (Ita Oshin, Abeokuta)**\n   • **Title:** Registered Survey / C of O in view\n   • **Plot Sizes:** 300 SQM (From ₦900K), 500 SQM (From ₦1.5M), 1 Acre Deal (From ₦8.7M)\n   • **Location:** Along Tarred Expressroad in Ibara Orile, near Ita Oshin.\n\n*Both projects offer 5% discounts on one-off payment, flexible 3 to 12-month spreads, and physical beacon demarcation.*`,
    cardType: 'comparison'
  };
}
