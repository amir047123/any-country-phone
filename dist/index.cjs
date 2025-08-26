"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  detectCountry: () => detectCountry,
  format: () => format,
  getDialCode: () => getDialCode,
  mask: () => mask,
  parse: () => parse,
  validate: () => validate
});
module.exports = __toCommonJS(index_exports);

// src/core.ts
var import_libphonenumber_js = require("libphonenumber-js");
function detectCountry(input) {
  const s = input.trim();
  if (s.startsWith("+")) {
    const parsed = (0, import_libphonenumber_js.parsePhoneNumberFromString)(s);
    return parsed?.country ?? null;
  }
  const p = (0, import_libphonenumber_js.parsePhoneNumberFromString)(s);
  return p?.country ?? null;
}
function validate(input, country) {
  const s = input.trim();
  const parsed = country ? (0, import_libphonenumber_js.parsePhoneNumberFromString)(s, country) : (0, import_libphonenumber_js.parsePhoneNumberFromString)(s);
  if (!parsed) return { valid: false, reason: "cannot_parse" };
  if (!parsed.country && !country) return { valid: false, reason: "country_not_detected" };
  return parsed.isValid() ? { valid: true, e164: parsed.number, country: parsed.country } : { valid: false, reason: "invalid_number" };
}
function format(input, style = "international", country) {
  const parsed = country ? (0, import_libphonenumber_js.parsePhoneNumberFromString)(input, country) : (0, import_libphonenumber_js.parsePhoneNumberFromString)(input);
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
  const p = (0, import_libphonenumber_js.parsePhoneNumberFromString)(input);
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
  const p = (0, import_libphonenumber_js.parsePhoneNumberFromString)(str);
  if (p) return p.formatInternational();
  const plus = str.startsWith("+") ? "+" : "";
  const digits = str.replace(/\D/g, "");
  const groups = [];
  for (let i = 0; i < digits.length; i += 3) groups.push(digits.slice(i, i + 3));
  return plus + groups.join(" ");
}
function getDialCode(countryIso2) {
  try {
    const code = (0, import_libphonenumber_js.getCountryCallingCode)(countryIso2);
    return "+" + code;
  } catch {
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectCountry,
  format,
  getDialCode,
  mask,
  parse,
  validate
});
//# sourceMappingURL=index.cjs.map