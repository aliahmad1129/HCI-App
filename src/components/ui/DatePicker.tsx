import React, { useState, useRef, useEffect } from 'react';

export interface DatePickerProps {
  label: string;
  value: string; // Expected format: YYYY-MM-DD
  onChange: (value: string) => void;
  maxDate?: string; // Format: YYYY-MM-DD
  error?: string;
  placeholder?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  maxDate,
  error,
  placeholder = 'DD-MM-YYYY',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial or selected date
  const parsedValue = value ? new Date(value) : null;
  const initialYear = parsedValue ? parsedValue.getFullYear() : 2000;
  const initialMonth = parsedValue ? parsedValue.getMonth() : 0;

  const [currentYear, setCurrentYear] = useState<number>(initialYear);
  const [currentMonth, setCurrentMonth] = useState<number>(initialMonth);

  // Format YYYY-MM-DD to DD-MM-YYYY for display
  const formatDisplayDate = (val: string) => {
    if (!val) return '';
    const parts = val.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return val;
  };

  // Sync internal state when value updates externally
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentYear(d.getFullYear());
        setCurrentMonth(d.getMonth());
      }
    }
  }, [value]);

  // Handle outside click to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const maxDateTime = maxDate ? new Date(maxDate).getTime() : new Date().getTime();

  // Calendar logic helpers
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const handleSelectDay = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

    const selectedTime = new Date(currentYear, currentMonth, day).getTime();
    if (selectedTime <= maxDateTime) {
      onChange(dateStr);
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Generate years list for quick year selector
  const currentActualYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentActualYear - i);

  return (
    <div className="flex flex-col gap-[8px] w-full relative select-none" ref={containerRef}>
      {/* Label */}
      <label className="font-ibm font-medium text-[18px] md:text-[20px] text-[rgba(255,255,255,0.8)] tracking-[-0.6px] uppercase flex items-center gap-[4px]">
        <span className="text-[#d11c1c] font-bold">//</span>
        <span>{label}</span>
      </label>

      {/* Trigger Input Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-[rgba(255,255,255,0.08)] rounded-[6px] h-[40px] px-[16px] flex items-center justify-between border transition-colors cursor-pointer ${
          error ? 'border-[#d11c1c]' : isOpen ? 'border-[rgba(255,255,255,0.4)]' : 'border-transparent hover:border-[rgba(255,255,255,0.2)]'
        }`}
      >
        <span className={`font-manrope text-[16px] ${value ? 'text-white font-medium' : 'text-[rgba(255,255,255,0.32)]'}`}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>

        {/* Calendar Icon */}
        <div className="text-[rgba(255,255,255,0.4)] flex items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      </div>

      {/* Custom Styled Calendar Popup matching exact width of date input field */}
      {isOpen && (
        <div className="absolute top-[76px] left-0 right-0 z-50 bg-black border border-[rgba(255,255,255,0.12)] border-solid rounded-[4px] p-[16px] w-full shadow-2xl animate-fadeIn">
          {/* Calendar Header Navigation */}
          <div className="flex items-center justify-between mb-[12px] pb-[8px] border-b border-[rgba(255,255,255,0.08)]">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="text-[rgba(255,255,255,0.6)] hover:text-white p-[4px] rounded hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180">
                <rect x="3" y="1" width="2" height="2" fill="currentColor" />
                <rect x="5" y="3" width="2" height="2" fill="currentColor" />
                <rect x="7" y="5" width="2" height="2" fill="currentColor" />
                <rect x="5" y="7" width="2" height="2" fill="currentColor" />
                <rect x="3" y="9" width="2" height="2" fill="currentColor" />
              </svg>
            </button>

            {/* Month & Year Selection */}
            <div className="flex items-center gap-[6px]">
              <span className="font-manrope text-[15px] font-semibold text-white">
                {MONTH_NAMES[currentMonth]}
              </span>

              {/* Year Select Dropdown */}
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="bg-[#181818] border border-[rgba(255,255,255,0.15)] text-white text-[13px] font-ibm rounded px-[4px] py-[2px] cursor-pointer focus:outline-none"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="bg-black text-white">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="text-[rgba(255,255,255,0.6)] hover:text-white p-[4px] rounded hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="3" y="1" width="2" height="2" fill="currentColor" />
                <rect x="5" y="3" width="2" height="2" fill="currentColor" />
                <rect x="7" y="5" width="2" height="2" fill="currentColor" />
                <rect x="5" y="7" width="2" height="2" fill="currentColor" />
                <rect x="3" y="9" width="2" height="2" fill="currentColor" />
              </svg>
            </button>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-[2px] mb-[8px] text-center">
            {DAYS_OF_WEEK.map((day) => (
              <span key={day} className="font-ibm text-[11px] uppercase text-[rgba(255,255,255,0.4)]">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid - Evenly Spaced Columns Across Full Width */}
          <div className="grid grid-cols-7 gap-[4px] text-center">
            {/* Empty slots for start offset */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="w-full aspect-square" />
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const cellTime = new Date(currentYear, currentMonth, dayNum).getTime();
              const isDisabled = cellTime > maxDateTime;

              const isSelectedDay =
                parsedValue &&
                parsedValue.getFullYear() === currentYear &&
                parsedValue.getMonth() === currentMonth &&
                parsedValue.getDate() === dayNum;

              return (
                <button
                  key={dayNum}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelectDay(dayNum)}
                  className={`w-full aspect-square rounded-[4px] font-manrope text-[14px] flex items-center justify-center transition-all ${
                    isSelectedDay
                      ? 'bg-[#d11c1c] text-white font-bold shadow-md shadow-[#d11c1c]/30'
                      : isDisabled
                      ? 'text-[rgba(255,255,255,0.15)] cursor-not-allowed'
                      : 'text-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,0.12)] hover:text-white cursor-pointer'
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
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
