import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { ModalContainer } from '../components/ui/ModalContainer';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { SearchableSelect } from '../components/ui/SearchableSelect';
import { DatePicker } from '../components/ui/DatePicker';
import { Button } from '../components/ui/Button';
import { COUNTRIES } from '../data/countries';
import { validateDOB, isPersonalDetailsValid } from '../utils/validation';
import bgPattern from '../assets/bg-pattern.png';

const BLOOD_GROUPS: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const PersonalDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setPersonalData } = useGameContext();
  const [dobTouched, setDobTouched] = useState(false);

  const dobValidation = validateDOB(state.personal.dob);
  const isFormValid = isPersonalDetailsValid(state.personal);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/game');
    }
  };

  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center bg-[#0b0b0b] overflow-x-hidden overflow-y-auto p-[12px] sm:p-[20px]">
      <img
        src={bgPattern}
        alt="Background pattern"
        className="absolute inset-0 size-full object-cover pointer-events-none opacity-40 select-none"
      />

      <div className="relative z-10 w-full flex justify-center py-[12px] sm:py-0">
        <ModalContainer title="Please enter your Personal Details" stepNumber="03" widthClass="w-[664px]">
          <form onSubmit={handleNext} className="flex flex-col w-full">
            {/* 2 Column Layout Grid */}
            <div className="flex flex-col p-[16px] sm:p-[24px] gap-[18px] sm:gap-[20px]">
              {/* Row 1: Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[20px]">
                <Input
                  label="NAME"
                  placeholder="e.g: Ali"
                  value={state.personal.name}
                  onChange={(e) => setPersonalData({ name: e.target.value })}
                />

                {/* Gender Toggle */}
                <div className="flex flex-col gap-[8px] w-full">
                  <label className="font-ibm font-medium text-[18px] md:text-[20px] text-[rgba(255,255,255,0.8)] tracking-[-0.6px] uppercase flex items-center gap-[4px] select-none">
                    <span className="text-[#d11c1c] font-bold">//</span>
                    <span>GENDER</span>
                  </label>

                  <div className="flex gap-[12px] h-[40px] items-center">
                    <button
                      type="button"
                      onClick={() => setPersonalData({ gender: 'Male' })}
                      className={`h-full px-[20px] rounded-[6px] border font-geist font-medium text-[18px] uppercase transition-all cursor-pointer ${
                        state.personal.gender === 'Male'
                          ? 'bg-[#d11c1c] border-[#d11c1c] text-white shadow-md shadow-[#d11c1c]/20'
                          : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.4)] hover:text-white'
                      }`}
                    >
                      Male
                    </button>

                    <button
                      type="button"
                      onClick={() => setPersonalData({ gender: 'Female' })}
                      className={`h-full px-[20px] rounded-[6px] border font-geist font-medium text-[18px] uppercase transition-all cursor-pointer ${
                        state.personal.gender === 'Female'
                          ? 'bg-[#d11c1c] border-[#d11c1c] text-white shadow-md shadow-[#d11c1c]/20'
                          : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.4)] hover:text-white'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: DOB & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[20px]">
                <DatePicker
                  label="DOB"
                  placeholder="DD-MM-YYYY"
                  maxDate={new Date().toISOString().split('T')[0]}
                  value={state.personal.dob}
                  onChange={(val) => {
                    setPersonalData({ dob: val });
                    setDobTouched(true);
                  }}
                  error={dobTouched && !dobValidation.isValid ? dobValidation.error : undefined}
                />

                <Select
                  label="BLOOD GROUP"
                  placeholder="e.g: AB+"
                  options={BLOOD_GROUPS}
                  value={state.personal.bloodGroup}
                  onChange={(e) => setPersonalData({ bloodGroup: e.target.value })}
                />
              </div>

              {/* Row 3: Country & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[20px]">
                <SearchableSelect
                  label="COUNTRY"
                  placeholder="e.g: Pakistan"
                  options={COUNTRIES}
                  value={state.personal.country}
                  onChange={(val) => setPersonalData({ country: val })}
                />

                <Input
                  label="ADDRESS"
                  placeholder="Your present address"
                  value={state.personal.address}
                  onChange={(e) => setPersonalData({ address: e.target.value })}
                />
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-end gap-[8px] sm:gap-[12px] px-[16px] sm:px-[24px] py-[14px] sm:py-[20px] bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.06)]">
              <Button
                type="button"
                variant="secondary"
                icon="back"
                onClick={() => navigate('/profile')}
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="primary"
                icon="next"
                disabled={!isFormValid}
              >
                Next
              </Button>
            </div>
          </form>
        </ModalContainer>
      </div>
    </div>
  );
};
