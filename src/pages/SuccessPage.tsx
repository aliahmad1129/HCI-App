import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import bgPattern from '../assets/bg-pattern.png';
import bullVectorSvg from '../assets/bull-vector.svg';
import checkmarkSvg from '../assets/checkmark.svg';

export const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetAllState } = useGameContext();

  const handleRestart = () => {
    resetAllState();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] overflow-hidden p-[20px]">
      <img
        src={bgPattern}
        alt="Background pattern"
        className="absolute inset-0 size-full object-cover pointer-events-none opacity-40 select-none"
      />

      <div className="relative z-10 w-full flex justify-center animate-fadeIn">
        {/* Modal Container */}
        <div className="bg-[#181818] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-[20px] shadow-[0px_294px_82px_0px_rgba(0,0,0,0.01),0px_188px_75px_0px_rgba(0,0,0,0.06),0px_106px_63px_0px_rgba(0,0,0,0.21),0px_47px_47px_0px_rgba(0,0,0,0.35),0px_12px_26px_0px_rgba(0,0,0,0.4)] flex flex-col gap-[24px] items-center w-[500px] max-w-full">
          {/* Header Row: DONE + Checkmark Icon */}
          <div className="flex items-center justify-center gap-[16px] p-[8px]">
            <h1 className="font-manrope font-bold text-[56px] md:text-[64px] text-white leading-[1.32] tracking-tight">
              DONE
            </h1>
            <div className="size-[48px] md:size-[56px] shrink-0">
              <img src={checkmarkSvg} alt="Checkmark icon" className="size-full object-contain" />
            </div>
          </div>

          {/* Inner Black Card */}
          <div className="bg-black rounded-[8px] p-[24px] w-full flex flex-col gap-[35px] items-center">
            {/* Bull Graphic & Text */}
            <div className="flex flex-col gap-[32px] items-center w-full">
              <div className="w-[280px] md:w-[320px] h-auto shrink-0 animate-pulse-slow">
                <img src={bullVectorSvg} alt="Legend Bull illustration" className="w-full h-auto object-contain" />
              </div>

              <p className="font-ibm font-medium text-[22px] md:text-[24px] text-center tracking-[-0.72px] uppercase">
                <span className="text-[#d11c1c]">// </span>
                <span className="text-white">you are legend.</span>
              </p>
            </div>

            {/* Restart Button */}
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.08)] border border-[#1f1f1f] hover:border-[rgba(255,255,255,0.3)] rounded-[6px] px-[16px] py-[8px] flex items-center justify-center gap-[8px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              <span className="font-geist font-medium text-[18px] md:text-[20px] text-[rgba(255,255,255,0.6)] group-hover:text-white uppercase">
                restart
              </span>

              {/* Refresh / Restart Circle Arrow Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[rgba(255,255,255,0.6)] group-hover:text-white group-hover:rotate-180 transition-all duration-300"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
