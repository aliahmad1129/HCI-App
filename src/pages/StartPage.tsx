import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgPattern from '../assets/bg-pattern.png';

export const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center bg-[#0b0b0b] overflow-x-hidden overflow-y-auto p-[16px] sm:p-[20px]">
      {/* Background Image Layer */}
      <img
        src={bgPattern}
        alt="Background pattern"
        className="absolute inset-0 size-full object-cover pointer-events-none opacity-40 select-none"
      />

      {/* Main Centered Content */}
      <div className="relative z-10 flex flex-col gap-[28px] sm:gap-[40px] items-center text-center max-w-[712px] w-full animate-fadeIn py-[24px]">
        {/* Layered "UI" & "User Interface" Logo Group */}
        <div className="flex flex-col items-center select-none">
          <div className="font-manrope font-bold inline-grid grid-cols-1 grid-rows-1 text-[112px] sm:text-[140px] md:text-[187.8px] leading-none uppercase tracking-tight">
            <p className="col-start-1 row-start-1 text-[rgba(255,255,255,0.12)]">ui</p>
            <p className="col-start-1 row-start-1 text-[rgba(255,255,255,0.12)] ml-[8px]">ui</p>
            <p className="col-start-1 row-start-1 text-white ml-[16px]">ui</p>
          </div>
          <p className="font-syne font-medium text-[30px] sm:text-[36px] md:text-[52.17px] text-white leading-none mt-[-8px] sm:mt-[-10px]">
            User Interface
          </p>
        </div>

        {/* Text Details & CTA */}
        <div className="flex flex-col gap-[28px] sm:gap-[40px] items-center w-full">
          <div className="font-manrope font-normal text-[16px] sm:text-[18px] md:text-[20px] text-[rgba(255,255,255,0.8)] leading-[1.64] max-w-[600px] flex flex-col gap-[18px] sm:gap-[24px]">
            <p>
              Welcome to User Interface — a challenge designed to test how you interact with digital interfaces.
            </p>
            <p className="text-white font-medium">
              Complete 4 interaction challenges to finish the game.
            </p>
          </div>

          <div className="flex flex-col gap-[16px] items-center">
            {/* Start CTA Button - Slight background color change on hover, no white box animation */}
            <button
              onClick={() => navigate('/login')}
              className="bg-[#d11c1c] hover:bg-[#b81818] h-[48px] pl-[16px] pr-[8px] py-[16px] rounded-[8px] flex items-center justify-center gap-[16px] cursor-pointer select-none"
            >
              <span className="font-geist font-semibold text-[18px] sm:text-[24px] text-white uppercase whitespace-nowrap leading-none tracking-wide">
                Start the game
              </span>

              {/* White Pixel Chevron Box (Node 406:336) - No hover translation */}
              <div className="bg-white rounded-[5px] shrink-0 size-[32px] relative overflow-hidden">
                <div className="absolute bg-black left-[11.56px] size-[3.556px] top-[7.11px]" />
                <div className="absolute bg-black left-[15.11px] size-[3.556px] top-[10.67px]" />
                <div className="absolute bg-black left-[18.67px] size-[3.556px] top-[14.22px]" />
                <div className="absolute bg-black left-[15.11px] size-[3.556px] top-[17.78px]" />
                <div className="absolute bg-black left-[11.56px] size-[3.556px] top-[21.33px]" />
              </div>
            </button>

            <p className="font-manrope font-normal text-[18px] md:text-[20px] text-[rgba(255,255,255,0.4)]">
              Improved Version
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
