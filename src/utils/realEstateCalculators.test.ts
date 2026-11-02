import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateInstallmentPlan,
  formatCurrencyNaira,
  validateLeadForm,
  generateWhatsAppLeadUrl
} from './realEstateCalculators';

test('calculateInstallmentPlan computes 30% deposit and 6-month payments accurately', () => {
  const result = calculateInstallmentPlan(6000000, 6, 30);
  assert.equal(result.totalPrice, 6000000);
  assert.equal(result.initialDepositPercent, 30);
  assert.equal(result.initialDepositAmount, 1800000);
  assert.equal(result.remainingBalance, 4200000);
  assert.equal(result.monthlyPayment, 700000);
});

test('calculateInstallmentPlan handles outright purchase (0 months)', () => {
  const result = calculateInstallmentPlan(5000000, 0, 100);
  assert.equal(result.totalPrice, 5000000);
  assert.equal(result.initialDepositAmount, 4500000); // capped at 90% in calculator or outright
  assert.equal(result.durationMonths, 0);
  assert.equal(result.monthlyPayment, 0);
});

test('formatCurrencyNaira formats numbers into Nigerian Naira', () => {
  const formatted = formatCurrencyNaira(3500000);
  assert.match(formatted, /3,500,000/);
  assert.match(formatted, /₦/);

  assert.equal(formatCurrencyNaira(0), 'Price on Application');
  assert.equal(formatCurrencyNaira(undefined), 'Price on Application');
  assert.equal(formatCurrencyNaira(null, 'To be announced'), 'To be announced');
});

test('validateLeadForm rejects empty name or invalid email/phone', () => {
  const invalid = validateLeadForm({
    fullName: '',
    email: 'bad-email',
    phone: '12',
    enquiryType: ''
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.enquiryType);
});

test('validateLeadForm accepts valid inputs', () => {
  const valid = validateLeadForm({
    fullName: 'Adeyemi Johnson',
    email: 'adeyemi@example.com',
    phone: '+2348031234567',
    enquiryType: 'Property Purchase'
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateWhatsAppLeadUrl creates a properly formatted wa.me link with encoded params', () => {
  const url = generateWhatsAppLeadUrl('+234 812 345 6789', {
    clientName: 'Babatunde Smith',
    developmentName: 'Christos Gardens',
    plotSize: '500 sqm',
    enquiryType: 'Site Inspection'
  });

  assert.ok(url.startsWith('https://wa.me/2348123456789?text='));
  assert.ok(url.includes('Christos%20Gardens'));
  assert.ok(url.includes('Babatunde%20Smith'));
  assert.ok(url.includes('500%20sqm'));
});
