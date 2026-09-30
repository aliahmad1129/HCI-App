import React from 'react';
import headerIconSvg from '../../assets/header-icon.svg';

export interface ModalContainerProps {
  title: string;
  stepNumber?: string; // e.g. "01", "02", "03", "04"
  widthClass?: string; // e.g. "w-[540px]" or "w-[664px]"
  children: React.ReactNode;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  stepNumber,
  widthClass = 'w-[540px]',
  children,
}) => {
  return (
    <div
      className={`bg-[#181818] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-[20px] shadow-[0px_294px_82px_0px_rgba(0,0,0,0.01),0px_188px_75px_0px_rgba(0,0,0,0.06),0px_106px_63px_0px_rgba(0,0,0,0.21),0px_47px_47px_0px_rgba(0,0,0,0.35),0px_12px_26px_0px_rgba(0,0,0,0.4)] flex flex-col gap-[24px] max-w-full ${widthClass} mx-auto transition-all duration-300 animate-fadeIn relative z-10`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[12px]">
          <div className="size-[48px] md:size-[64px] flex items-center justify-center shrink-0">
            <img src={headerIconSvg} alt="Header icon" className="size-full object-contain" />
          </div>
          <h2 className="font-manrope font-semibold text-[18px] md:text-[20px] text-white leading-tight">
            {title}
          </h2>
        </div>

        {stepNumber && (
          <div className="font-ibm font-medium text-[20px] tracking-[-0.6px] uppercase whitespace-nowrap">
            <span className="text-[#d11c1c]">{stepNumber}</span>
            <span className="text-[rgba(255,255,255,0.8)]">/04</span>
          </div>
        )}
      </div>

      {/* Inner Black Box (Relative overflow-visible so dropdowns/datepickers render outside cleanly) */}
      <div className="bg-black rounded-[8px] w-full flex flex-col relative z-20">
        {children}
      </div>
    </div>
  );
};
