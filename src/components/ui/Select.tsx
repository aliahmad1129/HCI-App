import React, { useState, useRef, useEffect } from 'react';

export interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  placeholder?: string;
  error?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (opt: string) => {
    onChange({ target: { value: opt } });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-[8px] w-full relative" ref={containerRef}>
      {/* Label */}
      <label className="font-ibm font-medium text-[18px] md:text-[20px] text-[rgba(255,255,255,0.8)] tracking-[-0.6px] uppercase flex items-center gap-[4px] select-none">
        <span className="text-[#d11c1c] font-bold">//</span>
        <span>{label}</span>
      </label>

      {/* Select Input Field Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-[rgba(255,255,255,0.08)] rounded-[6px] h-[40px] px-[16px] flex items-center justify-between border transition-colors cursor-pointer select-none ${
          error ? 'border-[#d11c1c]' : isOpen ? 'border-[rgba(255,255,255,0.4)]' : 'border-transparent hover:border-[rgba(255,255,255,0.2)]'
        }`}
      >
        <span className={`font-manrope text-[16px] ${value ? 'text-white font-medium' : 'text-[rgba(255,255,255,0.32)]'}`}>
          {value || placeholder}
        </span>

        {/* Dropdown Chevron */}
        <div className="text-[rgba(255,255,255,0.4)]">
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Exact Figma Styled Dropdown Menu (Node 430:573) */}
      {isOpen && (
        <div className="absolute top-[76px] left-0 right-0 z-50 bg-black border border-[rgba(255,255,255,0.12)] border-solid rounded-[4px] overflow-hidden max-h-[220px] overflow-y-auto shadow-2xl animate-fadeIn">
          {options.map((opt, index) => {
            const isLast = index === options.length - 1;
            const isSelected = value === opt;
            return (
              <div
                key={opt}
                onClick={() => handleSelectOption(opt)}
                className={`bg-[rgba(255,255,255,0.08)] ${
                  !isLast ? 'border-b border-[rgba(255,255,255,0.08)] border-solid' : ''
                } flex items-center justify-between px-[16px] py-[8px] cursor-pointer transition-colors ${
                  isSelected
                    ? 'text-white bg-[rgba(255,255,255,0.18)] font-medium'
                    : 'text-[rgba(255,255,255,0.64)] hover:text-white hover:bg-[rgba(255,255,255,0.14)]'
                }`}
              >
                <p className="font-manrope text-[16px] leading-none whitespace-nowrap">
                  {opt}
                </p>
                {isSelected && (
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" className="text-[#d11c1c]">
                    <path d="M1.5 4L3.83333 6.5L8.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <p className="font-ibm text-[#d11c1c] text-[13px] tracking-[-0.3px] mt-[2px]">
          {error}
        </p>
      )}
    </div>
  );
};
