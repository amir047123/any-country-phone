"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/PhoneInput.tsx
var PhoneInput_exports = {};
__export(PhoneInput_exports, {
  default: () => PhoneInput
});
module.exports = __toCommonJS(PhoneInput_exports);
var React = __toESM(require("react"), 1);

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

// src/react/PhoneInput.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function PhoneInput({
  value = "",
  country,
  onChange,
  onValidChange,
  placeholder = "Enter phone number",
  className,
  showHint = true
}) {
  const [val, setVal] = React.useState(value);
  const [iso, setIso] = React.useState(country);
  React.useEffect(() => {
    const detected = country ?? detectCountry(val) ?? void 0;
    setIso(detected);
    const res = validate(val, detected);
    onValidChange?.(res.valid, res.valid ? res.e164 : void 0, res.valid ? res.country : void 0);
  }, [val, country]);
  function handleInput(e) {
    const raw = e.target.value;
    const masked = mask(raw);
    setVal(masked);
    onChange?.(masked);
  }
  const hint = (() => {
    const detected = iso;
    const res = validate(val, detected);
    if (!res.valid) return "";
    try {
      return format(val, "international", detected);
    } catch {
      return "";
    }
  })();
  const dial = iso ? getDialCode(iso) : "";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className, style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          value: val,
          onChange: handleInput,
          placeholder,
          inputMode: "tel",
          "aria-label": "Phone number",
          style: { flex: 1, border: "1px solid #ccc", borderRadius: 6, padding: "8px 10px" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-label": "Detected dial code", style: { minWidth: 70, textAlign: "center", padding: "8px 10px", border: "1px solid #eee", borderRadius: 6 }, children: dial ?? "" })
    ] }),
    showHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { style: { minHeight: 18, color: "#666" }, children: hint })
  ] });
}
//# sourceMappingURL=PhoneInput.cjs.map