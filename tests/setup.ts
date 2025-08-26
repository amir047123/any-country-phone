// tests/setup.ts
import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers'; // ⬅️ default নয়, namespace import
import { cleanup } from '@testing-library/react';

expect.extend(matchers as any);
afterEach(() => cleanup());
