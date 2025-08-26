# any-country-phone

📞 **any-country-phone** is a lightweight global phone-number utility library with an optional React input component.  
It provides parsing, validation, formatting, masking, and country detection powered by [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js).

[![npm version](https://img.shields.io/npm/v/any-country-phone)](https://www.npmjs.com/package/any-country-phone)
[![bundle size](https://img.shields.io/bundlephobia/minzip/any-country-phone)](https://bundlephobia.com/package/any-country-phone)
[![license](https://img.shields.io/npm/l/any-country-phone)](./LICENSE)

---

## ✨ Features

- ✅ Parse & validate phone numbers (all countries)  
- ✅ Format to **E164**, **international**, or **national** styles  
- ✅ Detect country from phone-number prefix  
- ✅ Lightweight typing mask for better input UX  
- ✅ Optional **React PhoneInput** component (`any-country-phone/react`)  
- ✅ Written in **TypeScript** with bundled type definitions  
- ✅ Tree-shakable exports

---

## 📦 Installation

```bash
npm install any-country-phone
# or
yarn add any-country-phone
# or
pnpm add any-country-phone

⚡ Quick Start – Utils

import {
  validate,
  format,
  parse,
  detectCountry,
  mask,
  getDialCode,
} from 'any-country-phone';

validate('+8801712345678');
// → { valid: true, e164: '+8801712345678', country: 'BD' }

format('+393123456789', 'international');
// → "+39 312 345 6789"

detectCountry('+14155552671');
// → "US"

mask('+4477');
// → "+44 77"

getDialCode('IT');
// → "+39"


⚛️ React Example

import { useState } from 'react';
import PhoneInput from 'any-country-phone/react';

export default function App() {
  const [val, setVal] = useState('');

  return (
    <div>
      <h1>Demo</h1>
      <PhoneInput
        value={val}
        onChange={setVal}
        onValidChange={(valid, e164, iso2) => {
          console.log({ valid, e164, iso2 });
        }}
      />
    </div>
  );
}
# any-country-phone
