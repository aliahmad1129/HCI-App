import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { ModalContainer } from '../components/ui/ModalContainer';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import bgPattern from '../assets/bg-pattern.png';
import defaultAvatar from '../assets/default-avatar.png';

const ALL_INTERESTS: string[] = [
  'Football',
  'Painting',
  'Swimming',
  'Designing',
  'Writing',
  'Cooking',
  'Running',
  'Traveling',
  'Badminton',
  'Photography',
  'Reading',
];

export const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setProfileData } = useGameContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedInterests = state.profile.interests;
  const profileImage = state.profile.profileImage || defaultAvatar;
  const hasProfileImage = Boolean(state.profile.profileImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleInterest = (interest: string, checked: boolean) => {
    if (checked) {
      setProfileData({ interests: [...selectedInterests, interest] });
    } else {
      setProfileData({
        interests: selectedInterests.filter((i) => i !== interest),
      });
    }
  };

  const isFormValid = selectedInterests.length >= 3;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] overflow-hidden p-[20px]">
      <img
        src={bgPattern}
        alt="Background pattern"
        className="absolute inset-0 size-full object-cover pointer-events-none opacity-40 select-none"
      />

      <div className="relative z-10 w-full flex justify-center">
        <ModalContainer title="Complete your profile" stepNumber="02" widthClass="w-[540px]">
          <div className="flex flex-col w-full">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Profile Image Section */}
            <div className="flex gap-[16px] items-center p-[24px] border-b border-[rgba(255,255,255,0.06)]">
              <div className="relative size-[108px] rounded-[8px] overflow-hidden bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] shrink-0 flex items-center justify-center">
                <img
                  src={profileImage}
                  alt="Profile Avatar"
                  className="size-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-[12px] items-start justify-center flex-1">
                <p className="font-ibm font-medium text-[16px] text-[rgba(255,255,255,0.8)] tracking-[-0.54px] uppercase leading-[1.32]">
                  <span className="text-[#d11c1c]">// </span>
                  <span>please upload image to complete profile</span>
                </p>

                <Button
                  type="button"
                  variant="clear"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {hasProfileImage ? 'Change' : 'Upload'}
                </Button>
              </div>
            </div>

            {/* Interests Section */}
            <div className="flex flex-col gap-[16px] px-[24px] py-[24px]">
              <div className="flex items-center justify-between">
                <p className="font-ibm font-medium text-[16px] text-[rgba(255,255,255,0.8)] tracking-[-0.54px] uppercase">
                  <span className="text-[#d11c1c]">// </span>
                  <span>please choose 3 interests minimum</span>
                </p>

                <span className={`font-ibm text-[14px] ${selectedInterests.length >= 3 ? 'text-green-400' : 'text-[#d11c1c]'}`}>
                  ({selectedInterests.length}/3 selected)
                </span>
              </div>

              {/* 3 Column Grid */}
              <div className="grid grid-cols-3 gap-x-[12px] gap-y-[14px]">
                {ALL_INTERESTS.map((interest) => (
                  <Checkbox
                    key={interest}
                    checked={selectedInterests.includes(interest)}
                    onChange={(checked) => handleToggleInterest(interest, checked)}
                    label={interest}
                  />
                ))}
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-end gap-[12px] px-[24px] py-[20px] bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.06)]">
              <Button
                type="button"
                variant="secondary"
                icon="back"
                onClick={() => navigate('/login')}
              >
                Back
              </Button>

              <Button
                type="button"
                variant="primary"
                icon="next"
                disabled={!isFormValid}
                onClick={() => navigate('/details')}
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
