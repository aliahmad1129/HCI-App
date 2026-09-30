import React from 'react';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  id,
  className = '',
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex min-h-[36px] items-center gap-[8px] cursor-pointer select-none group ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`size-[16px] rounded-[2.37px] border transition-all duration-150 flex items-center justify-center ${
            checked
              ? 'bg-[#d11c1c] border-[#d11c1c]'
              : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.12)] group-hover:border-[rgba(255,255,255,0.3)]'
          }`}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-white">
              <path
                d="M1.5 4L3.83333 6.5L8.5 1.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {label && (
        <span className="font-manrope text-[16px] text-[rgba(255,255,255,0.64)] group-hover:text-[rgba(255,255,255,0.9)] transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};
