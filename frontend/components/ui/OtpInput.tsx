'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';

export interface OtpInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

export interface OtpInputRef {
  focusFirst: () => void;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(function OtpInput(
  {
    length,
    value,
    onChange,
    disabled = false,
    className = '',
    inputClassName = '',
  },
  ref,
) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    focusFirst: () => inputRefs.current[0]?.focus(),
  }));

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return;
    const digit = inputValue.slice(-1);
    const next = [...value];
    next[index] = digit;
    onChange(next);
    if (digit && index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    const next = [...value];
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    onChange(next);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className={`flex justify-center ${className}`} onPaste={handlePaste}>
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          disabled={disabled}
          aria-label={`Kode OTP digit ${i + 1}`}
          className={`rounded-xl border-2 border-gray-200 text-center text-lg font-bold text-gray-900 outline-none transition-colors focus:border-black focus:ring-2 focus:ring-black/10 disabled:opacity-50 ${inputClassName}`}
        />
      ))}
    </div>
  );
});

export default OtpInput;
