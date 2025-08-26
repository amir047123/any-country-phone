import { describe, it, expect } from 'vitest';
import { validate, detectCountry, format, parse, mask, getDialCode } from '../src/core';

describe('any-country-phone: core utils', () => {
  it('detects country from + code (BD)', () => {
    expect(detectCountry('+8801712345678')).toBe('BD');
  });

  it('validates an Italian number', () => {
    const res = validate('+393123456789');
    expect(res.valid).toBe(true);
    // country may be 'IT' if lib can infer
    expect(['IT', undefined]).toContain(res.country);
  });

  it('formats to international', () => {
    expect(format('+14155552671', 'international')).toMatch(/^\+1/);
  });

  it('parses number variants', () => {
    const info = parse('+14155552671');
    expect(info?.e164).toBe('+14155552671');
    expect(info?.international).toMatch(/^\+1/);
  });

  it('masks partial input nicely', () => {
    expect(mask('+39')).toBe('+39');
  });

  it('returns dial code for ISO2', () => {
    expect(getDialCode('IT')).toBe('+39');
  });
});
