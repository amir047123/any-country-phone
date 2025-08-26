// src/core.ts
import { parsePhoneNumberFromString, getCountryCallingCode } from "libphonenumber-js";
function detectCountry(input) {
  const s = input.trim();
  if (s.startsWith("+")) {
    const parsed = parsePhoneNumberFromString(s);
    return parsed?.country ?? null;
  }
  const p = parsePhoneNumberFromString(s);
  return p?.country ?? null;
}
function validate(input, country) {
  const s = input.trim();
  const parsed = country ? parsePhoneNumberFromString(s, country) : parsePhoneNumberFromString(s);
  if (!parsed) return { valid: false, reason: "cannot_parse" };
  if (!parsed.country && !country) return { valid: false, reason: "country_not_detected" };
  return parsed.isValid() ? { valid: true, e164: parsed.number, country: parsed.country } : { valid: false, reason: "invalid_number" };
}
function format(input, style = "international", country) {
  const parsed = country ? parsePhoneNumberFromString(input, country) : parsePhoneNumberFromString(input);
  if (!parsed) return input;
  switch (style) {
    case "E164":
      return parsed.number;
    // +XXXXXXXX
    case "international":
      return parsed.formatInternational();
    case "national":
      return parsed.formatNational();
  }
}
function parse(input) {
  const p = parsePhoneNumberFromString(input);
  if (!p) return null;
  return {
    country: p.country ?? null,
    e164: p.number,
    national: p.formatNational(),
    international: p.formatInternational(),
    type: p.getType?.()
    // mobile/fixed_line/etc (if available)
  };
}
function mask(raw) {
  const str = raw.replace(/[^\d+]/g, "");
  const p = parsePhoneNumberFromString(str);
  if (p) return p.formatInternational();
  const plus = str.startsWith("+") ? "+" : "";
  const digits = str.replace(/\D/g, "");
  const groups = [];
  for (let i = 0; i < digits.length; i += 3) groups.push(digits.slice(i, i + 3));
  return plus + groups.join(" ");
}
function getDialCode(countryIso2) {
  try {
    const code = getCountryCallingCode(countryIso2);
    return "+" + code;
  } catch {
    return null;
  }
}
export {
  detectCountry,
  format,
  getDialCode,
  mask,
  parse,
  validate
};
//# sourceMappingURL=index.js.map