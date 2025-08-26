import * as react_jsx_runtime from 'react/jsx-runtime';

type PhoneInputProps = {
    value?: string;
    country?: string;
    onChange?: (val: string) => void;
    onValidChange?: (valid: boolean, e164?: string, country?: string) => void;
    placeholder?: string;
    className?: string;
    showHint?: boolean;
};
declare function PhoneInput({ value, country, onChange, onValidChange, placeholder, className, showHint }: PhoneInputProps): react_jsx_runtime.JSX.Element;

export { type PhoneInputProps, PhoneInput as default };
