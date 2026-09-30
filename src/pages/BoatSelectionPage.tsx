import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { ModalContainer } from '../components/ui/ModalContainer';
import { Button } from '../components/ui/Button';
import { BOAT_IMAGES, CORRECT_BOAT_INDEXES } from '../data/boatImages';
import bgPattern from '../assets/bg-pattern.png';

export const BoatSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, toggleBoatSelection } = useGameContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedIndexes = state.boats.selectedIndexes;

  const handleVerify = () => {
    // Check if selected indexes exactly match CORRECT_BOAT_INDEXES
    const isExactMatch =
      selectedIndexes.length === CORRECT_BOAT_INDEXES.length &&
      selectedIndexes.every((index) => CORRECT_BOAT_INDEXES.includes(index));

    if (isExactMatch) {
      setErrorMessage(null);
      navigate('/success');
    } else {
      setErrorMessage('// Verification failed. Please select all images containing a boat.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] overflow-hidden p-[20px]">
      <img
        src={bgPattern}
        alt="Background pattern"
        className="absolute inset-0 size-full object-cover pointer-events-none opacity-40 select-none"
      />

      <div className="relative z-10 w-full flex justify-center">
        <ModalContainer
          title="Almost there! We need to verify that you are human."
          stepNumber="04"
          widthClass="w-[564px]"
        >
          <div className="flex flex-col w-full">
            {/* Header prompt */}
            <div className="flex flex-col gap-[16px] pb-[12px] pt-[24px] px-[24px]">
              <p className="font-ibm font-medium text-[18px] md:text-[20px] tracking-[-0.6px] uppercase leading-none">
                <span className="text-[#d11c1c]">// </span>
                <span className="text-[rgba(255,255,255,0.4)]">select all images with</span>
                <span className="text-white font-bold"> boat</span>
              </p>

              {/* 3x3 Image Grid Container */}
              <div className="bg-white p-[4px] gap-[4px] grid grid-cols-3 grid-rows-3 h-[320px] rounded-[4px] overflow-hidden">
                {BOAT_IMAGES.map((item) => {
                  const isSelected = selectedIndexes.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        toggleBoatSelection(item.id);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="relative size-full overflow-hidden cursor-pointer group select-none"
                    >
                      {/* Image */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        className={`size-full object-cover transition-transform duration-200 ${
                          isSelected ? 'scale-[1.03]' : 'group-hover:scale-[1.02]'
                        }`}
                      />

                      {/* Selection Overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#d11c1c]/25 backdrop-blur-[1px] transition-all" />
                      )}

                      {/* Bottom Left Checkbox Badge */}
                      <div
                        className={`absolute bottom-[8px] left-[8px] size-[18px] rounded-[2.37px] border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#d11c1c] border-[#d11c1c]'
                            : 'bg-black/40 backdrop-blur-[2px] border-black/64 group-hover:border-white/60'
                        }`}
                      >
                        {isSelected && (
                          <svg width="12" height="10" viewBox="0 0 10 8" fill="none" className="text-white">
                            <path
                              d="M1.5 4L3.83333 6.5L8.5 1.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="bg-[#d11c1c]/10 border border-[#d11c1c]/40 rounded-[6px] p-[10px] mt-[4px] animate-shake">
                  <p className="font-ibm text-[#d11c1c] text-[14px] md:text-[15px] tracking-[-0.3px]">
                    {errorMessage}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-end gap-[12px] px-[24px] py-[20px] bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.06)] mt-[8px]">
              <Button
                type="button"
                variant="secondary"
                icon="back"
                onClick={() => navigate('/details')}
              >
                Back
              </Button>

              <Button
                type="button"
                variant="primary"
                icon="next"
                onClick={handleVerify}
                disabled={selectedIndexes.length === 0}
              >
                Next
              </Button>
            </div>
          </div>
        </ModalContainer>
      </div>
    </div>
  );
};
