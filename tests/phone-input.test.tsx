// @vitest-environment jsdom  // (যদি vitest.config.ts না দেন, তখনই দরকার)
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PhoneInput from '../src/react/PhoneInput';

describe('PhoneInput (React)', () => {
  it('renders and shows hint after typing', () => {
    render(<PhoneInput />);
    const input = screen.getByLabelText('Phone number') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '+393123456789' } });

    // exact text assert না করে: <small> উপস্থিত কিনা
    const hint = screen.getByText((_, node) => node?.tagName === 'SMALL');
    expect(hint).toBeTruthy();  // বা expect(hint).not.toBeNull()
  });
});
