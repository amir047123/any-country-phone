import { parsePhoneNumberFromString, getCountryCallingCode } from 'libphonenumber-js';

export type FormatStyle = 'E164' | 'international' | 'national';

export type ValidateResult =
  | { valid: true; e164: string; country?: string }
  | { valid: false; reason: 'country_not_detected' | 'cannot_parse' | 'invalid_number' };

export function detectCountry(input: string): string | null {
  const s = input.trim();
  // Try by explicit + code first
  if (s.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(s);
    return parsed?.country ?? null;
  }
  // Without +, still try to parse (may infer from default/ambiguous)
  const p = parsePhoneNumberFromString(s);
  return p?.country ?? null;
}

export function validate(input: string, country?: string): ValidateResult {
  const s = input.trim();
  const parsed = country
    ? parsePhoneNumberFromString(s, country as any)
    : parsePhoneNumberFromString(s);

  if (!parsed) return { valid: false, reason: 'cannot_parse' };
  if (!parsed.country && !country) return { valid: false, reason: 'country_not_detected' };

  return parsed.isValid()
    ? { valid: true, e164: parsed.number, country: parsed.country }
    : { valid: false, reason: 'invalid_number' };
}

export function format(input: string, style: FormatStyle = 'international', country?: string): string {
  const parsed = country
    ? parsePhoneNumberFromString(input, country as any)
    : parsePhoneNumberFromString(input);
  if (!parsed) return input;

  switch (style) {
    case 'E164': return parsed.number; // +XXXXXXXX
    case 'international': return parsed.formatInternational();
    case 'national': return parsed.formatNational();
  }
}

export function parse(input: string) {
  const p = parsePhoneNumberFromString(input);
  if (!p) return null;
  return {
    country: p.country ?? null,
    e164: p.number,
    national: p.formatNational(),
    international: p.formatInternational(),
    type: p.getType?.() // mobile/fixed_line/etc (if available)
  };
}

/** Lightweight typing mask:
 *  - preserves leading '+'
 *  - inserts spaces for readability while typing
 *  - once a valid number is reached, prefer lib formatInternational()
 */
export function mask(raw: string): string {
  const str = raw.replace(/[^\d+]/g, '');
  // if already parsable, show pretty format
  const p = parsePhoneNumberFromString(str);
  if (p) return p.formatInternational();

  // naive spacing for partially typed input
  const plus = str.startsWith('+') ? '+' : '';
  const digits = str.replace(/\D/g, '');
  // group into chunks: +XXX XXX XXX XXXX …
  const groups: string[] = [];
  for (let i = 0; i < digits.length; i += 3) groups.push(digits.slice(i, i + 3));
  return plus + groups.join(' ');
}

export function getDialCode(countryIso2: string): string | null {
  try {
    const code = getCountryCallingCode(countryIso2 as any);
    return '+' + code;
  } catch {
    return null;
  }
}
