import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'clear';
  children: React.ReactNode;
  icon?: 'next' | 'back' | 'restart' | 'none';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon = 'none',
  disabled,
  fullWidth = false,
  className = '',
  ...props
}) => {
  let baseStyles =
    'inline-flex min-h-[44px] items-center justify-center font-geist font-medium text-[16px] sm:text-[20px] uppercase transition-all duration-200 focus:outline-none shrink-0 cursor-pointer select-none';

  let variantStyles = '';

  if (variant === 'primary') {
    if (disabled) {
      variantStyles =
        'bg-[#7a1818] text-white/50 cursor-not-allowed opacity-60 rounded-[6px] px-[12px] py-[8px] gap-[12px]';
    } else {
      variantStyles =
        'bg-[#d11c1c] hover:bg-[#eb2323] active:scale-[0.98] text-white rounded-[6px] px-[12px] py-[8px] gap-[12px] shadow-lg shadow-[#d11c1c]/20';
    }
  } else if (variant === 'secondary') {
    if (disabled) {
      variantStyles =
        'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.2)] cursor-not-allowed rounded-[6px] px-[12px] py-[8px] gap-[12px]';
    } else {
      variantStyles =
        'bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.6)] hover:text-white hover:border-[rgba(255,255,255,0.3)] active:scale-[0.98] rounded-[6px] px-[12px] py-[8px] gap-[12px]';
    }
  } else if (variant === 'outline') {
    variantStyles =
      'border border-[#1f1f1f] bg-gradient-to-r from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)] hover:text-white hover:border-[rgba(255,255,255,0.3)] active:scale-[0.98] rounded-[6px] px-[12px] py-[8px] gap-[8px]';
  } else if (variant === 'clear') {
    variantStyles =
      'bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.6)] hover:text-white hover:border-[#d11c1c] active:scale-[0.98] rounded-[6px] px-[12px] py-[8px] gap-[8px] text-[16px]';
  }

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${widthClass} ${className}`}
      {...props}
    >
      {/* Icon before for Back */}
      {icon === 'back' && (
        <div className="flex items-center justify-center">
          <div className="aspect-square bg-white/20 rounded-[3px] p-[4px] flex items-center justify-center">
            {/* Pixelated Chevron Left */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180">
              <rect x="3" y="1" width="2" height="2" fill="currentColor" />
              <rect x="5" y="3" width="2" height="2" fill="currentColor" />
              <rect x="7" y="5" width="2" height="2" fill="currentColor" />
              <rect x="5" y="7" width="2" height="2" fill="currentColor" />
              <rect x="3" y="9" width="2" height="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}

      <span>{children}</span>

      {/* Icon after for Next */}
      {icon === 'next' && (
        <div className="flex items-center justify-center">
          <div className={`aspect-square rounded-[3px] p-[4px] flex items-center justify-center ${disabled ? 'bg-white/10 text-white/30' : 'bg-white text-black'}`}>
            {/* Pixelated Chevron Right */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="3" y="1" width="2" height="2" fill="currentColor" />
              <rect x="5" y="3" width="2" height="2" fill="currentColor" />
              <rect x="7" y="5" width="2" height="2" fill="currentColor" />
              <rect x="5" y="7" width="2" height="2" fill="currentColor" />
              <rect x="3" y="9" width="2" height="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}

      {/* Icon after for Restart */}
      {icon === 'restart' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
        </svg>
      )}
    </button>
  );
};
