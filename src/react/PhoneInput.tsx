import * as React from 'react';
import { detectCountry, validate, mask, format, getDialCode } from '../core';

export type PhoneInputProps = {
  value?: string;
  country?: string;                 // lock to a country (e.g., "BD", "IT", "US") — optional
  onChange?: (val: string) => void;
  onValidChange?: (valid: boolean, e164?: string, country?: string) => void;
  placeholder?: string;
  className?: string;
  showHint?: boolean;
};

export default function PhoneInput({
  value = '',
  country,
  onChange,
  onValidChange,
  placeholder = 'Enter phone number',
  className,
  showHint = true
}: PhoneInputProps) {
  const [val, setVal] = React.useState(value);
  const [iso, setIso] = React.useState(country);

  React.useEffect(() => {
    const detected = country ?? detectCountry(val) ?? undefined;
    setIso(detected);
    const res = validate(val, detected);
    onValidChange?.(res.valid, res.valid ? res.e164 : undefined, res.valid ? res.country : undefined);
  }, [val, country]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const masked = mask(raw);
    setVal(masked);
    onChange?.(masked);
  }

  const hint = (() => {
    const detected = iso;
    const res = validate(val, detected);
    if (!res.valid) return '';
    try { return format(val, 'international', detected); } catch { return ''; }
  })();

  const dial = iso ? getDialCode(iso) : '';

  return (
    <div className={className} style={{ display: 'grid', gap: 6 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={val}
          onChange={handleInput}
          placeholder={placeholder}
          inputMode="tel"
          aria-label="Phone number"
          style={{ flex: 1, border: '1px solid #ccc', borderRadius: 6, padding: '8px 10px' }}
        />
        <div aria-label="Detected dial code" style={{ minWidth: 70, textAlign: 'center', padding: '8px 10px', border: '1px solid #eee', borderRadius: 6 }}>
          {dial ?? ''}
        </div>
      </div>
      {showHint && <small style={{ minHeight: 18, color: '#666' }}>{hint}</small>}
    </div>
  );
}
