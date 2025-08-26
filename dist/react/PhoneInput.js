// src/react/PhoneInput.tsx
import * as React from "react";

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

// src/react/PhoneInput.tsx
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs("div", { className, style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx("div", { "aria-label": "Detected dial code", style: { minWidth: 70, textAlign: "center", padding: "8px 10px", border: "1px solid #eee", borderRadius: 6 }, children: dial ?? "" })
    ] }),
    showHint && /* @__PURE__ */ jsx("small", { style: { minHeight: 18, color: "#666" }, children: hint })
  ] });
}
export {
  PhoneInput as default
};
//# sourceMappingURL=PhoneInput.js.map