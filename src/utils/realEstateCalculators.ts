/**
 * Real Estate Pure Calculation and Validation Utilities
 * OASIS RAY DEVELOPMENTS LTD.
 */

export interface InstallmentBreakdown {
  totalPrice: number;
  initialDepositPercent: number;
  initialDepositAmount: number;
  remainingBalance: number;
  durationMonths: number;
  monthlyPayment: number;
  planName: string;
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  developmentId?: string;
  plotSize?: string;
  enquiryType: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Calculates installment schedules for property purchases
 */
export function calculateInstallmentPlan(
  totalPrice: number,
  durationMonths: number,
  initialDepositPercent: number = 30
): InstallmentBreakdown {
  if (totalPrice <= 0 || isNaN(totalPrice)) {
    return {
      totalPrice: 0,
      initialDepositPercent: 0,
      initialDepositAmount: 0,
      remainingBalance: 0,
      durationMonths,
      monthlyPayment: 0,
      planName: durationMonths === 0 ? 'Outright Purchase' : `${durationMonths}-Month Installment`
    };
  }

  const depositRate = Math.min(Math.max(initialDepositPercent, 10), 90) / 100;
  const initialDepositAmount = Math.round(totalPrice * depositRate);
  const remainingBalance = totalPrice - initialDepositAmount;
  const validDuration = Math.max(1, durationMonths);
  const monthlyPayment = durationMonths === 0 ? 0 : Math.round(remainingBalance / validDuration);

  return {
    totalPrice,
    initialDepositPercent: Math.round(depositRate * 100),
    initialDepositAmount,
    remainingBalance,
    durationMonths,
    monthlyPayment,
    planName: durationMonths === 0 ? 'Outright Purchase' : `${durationMonths}-Month Flexible Plan`
  };
}

/**
 * Formats monetary amounts in Nigerian Naira (₦) with clean typography
 */
export function formatCurrencyNaira(amount?: number | null, fallbackText: string = 'Price on Application'): string {
  if (amount === undefined || amount === null || isNaN(amount) || amount <= 0) {
    return fallbackText;
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
}

/**
 * Validates lead generation form inputs with strict standards
 */
export function validateLeadForm(data: Partial<LeadFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.phone || data.phone.trim().length < 7) {
    errors.phone = 'Please enter a valid phone number.';
  } else {
    // Sanitized check: digits, plus, hyphens, parentheses, spaces
    const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
    if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
      errors.phone = 'Please provide a valid international or local phone number.';
    }
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.enquiryType || data.enquiryType.trim().length === 0) {
    errors.enquiryType = 'Please select an enquiry category.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Formats a clean prefilled WhatsApp URL for the investor consultation desk
 */
export function generateWhatsAppLeadUrl(
  phone: string,
  params: {
    clientName?: string;
    developmentName?: string;
    plotSize?: string;
    enquiryType?: string;
    referenceCode?: string;
  }
): string {
  const cleanNumber = phone.replace(/[^0-9]/g, '');
  const lines: string[] = [
    `Hello Oasis Ray Developments Ltd.`,
    `I am enquiring about investment opportunities.`
  ];

  if (params.clientName) {
    lines.push(`My Name: ${params.clientName}`);
  }
  if (params.developmentName) {
    lines.push(`Development of Interest: ${params.developmentName}`);
  }
  if (params.plotSize) {
    lines.push(`Preferred Plot Size: ${params.plotSize}`);
  }
  if (params.enquiryType) {
    lines.push(`Enquiry Focus: ${params.enquiryType}`);
  }
  if (params.referenceCode) {
    lines.push(`Ref ID: ${params.referenceCode}`);
  }
  lines.push(`I would like to speak with an investment advisor.`);

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanNumber}?text=${message}`;
}
