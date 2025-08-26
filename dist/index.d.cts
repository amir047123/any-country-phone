import * as libphonenumber_js from 'libphonenumber-js';

type FormatStyle = 'E164' | 'international' | 'national';
type ValidateResult = {
    valid: true;
    e164: string;
    country?: string;
} | {
    valid: false;
    reason: 'country_not_detected' | 'cannot_parse' | 'invalid_number';
};
declare function detectCountry(input: string): string | null;
declare function validate(input: string, country?: string): ValidateResult;
declare function format(input: string, style?: FormatStyle, country?: string): string;
declare function parse(input: string): {
    country: libphonenumber_js.CountryCode | null;
    e164: libphonenumber_js.E164Number;
    national: string;
    international: string;
    type: libphonenumber_js.NumberType;
} | null;
/** Lightweight typing mask:
 *  - preserves leading '+'
 *  - inserts spaces for readability while typing
 *  - once a valid number is reached, prefer lib formatInternational()
 */
declare function mask(raw: string): string;
declare function getDialCode(countryIso2: string): string | null;

export { type FormatStyle, type ValidateResult, detectCountry, format, getDialCode, mask, parse, validate };
