import React, { useState, useRef, useEffect } from 'react';

export interface SearchableSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Search country...',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (value) {
          setSearchTerm(value);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (opt: string) => {
    onChange(opt);
    setSearchTerm(opt);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[8px] w-full relative" ref={containerRef}>
      {/* Label */}
      <label className="font-ibm font-medium text-[18px] md:text-[20px] text-[rgba(255,255,255,0.8)] tracking-[-0.6px] uppercase flex items-center gap-[4px] select-none">
        <span className="text-[#d11c1c] font-bold">//</span>
        <span>{label}</span>
      </label>

      {/* Input Box Header */}
      <div
        className={`relative bg-[rgba(255,255,255,0.08)] rounded-[6px] h-[40px] px-[16px] flex items-center justify-between overflow-hidden border transition-colors cursor-pointer ${
          error ? 'border-[#d11c1c]' : isOpen ? 'border-[rgba(255,255,255,0.4)]' : 'border-transparent hover:border-[rgba(255,255,255,0.2)]'
        }`}
        onClick={toggleOpen}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            if (!isOpen) setIsOpen(true);
          }}
          onClick={(e) => {
            // Prevent input click from re-toggling if already open
            e.stopPropagation();
            if (!isOpen) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-white font-manrope text-[16px] placeholder-[rgba(255,255,255,0.32)] focus:outline-none pr-[30px]"
        />

        {/* Dropdown Down Arrow Button (Toggle on click) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleOpen();
          }}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 size-[24px] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-white cursor-pointer transition-colors"
          title="Toggle dropdown"
        >
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
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => {
              const isLast = index === filteredOptions.length - 1;
              const isSelected = value === opt;
              return (
                <div
                  key={opt}
                  onClick={() => handleSelect(opt)}
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
            })
          ) : (
            <div className="bg-[rgba(255,255,255,0.08)] px-[16px] py-[10px] text-[14px] font-manrope text-[rgba(255,255,255,0.4)] italic">
              No matching country found
            </div>
          )}
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
