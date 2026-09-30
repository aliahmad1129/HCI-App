import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  rightElement,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-[8px] w-full">
      {/* Label with // prefix */}
      <label htmlFor={inputId} className="font-ibm font-medium text-[18px] md:text-[20px] text-[rgba(255,255,255,0.8)] tracking-[-0.6px] uppercase flex items-center gap-[4px] select-none">
        <span className="text-[#d11c1c] font-bold">//</span>
        <span>{label}</span>
      </label>

      {/* Input container */}
      <div className={`relative bg-[rgba(255,255,255,0.08)] rounded-[6px] h-[40px] px-[16px] flex items-center justify-between overflow-hidden border transition-colors ${
        error ? 'border-[#d11c1c]' : 'border-transparent focus-within:border-[rgba(255,255,255,0.3)]'
      }`}>
        <input
          id={inputId}
          className={`w-full bg-transparent text-white font-manrope text-[16px] placeholder-[rgba(255,255,255,0.32)] focus:outline-none ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="ml-[12px] flex items-center justify-center shrink-0">
            {rightElement}
          </div>
        )}
      </div>

      {/* Error Message in IBM Plex Mono & Red color */}
      {error && (
        <p className="font-ibm text-[#d11c1c] text-[13px] tracking-[-0.3px] mt-[2px] animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};
