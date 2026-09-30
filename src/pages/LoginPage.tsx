import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { ModalContainer } from '../components/ui/ModalContainer';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import { validateEmail, validatePassword, isLoginFormValid } from '../utils/validation';
import bgPattern from '../assets/bg-pattern.png';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setLoginData } = useGameContext();

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailValidation = validateEmail(state.login.email);
  const passwordValidation = validatePassword(state.login.password);

  const isFormValid = isLoginFormValid(state.login);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/profile');
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
        <ModalContainer title="Enter Email & Password" stepNumber="01" widthClass="w-[540px]">
          <form onSubmit={handleNext} className="flex flex-col w-full">
            {/* Field 1: Email */}
            <div className="flex flex-col gap-[12px] pt-[24px] pb-[12px] px-[24px] border-b border-[rgba(255,255,255,0.06)]">
              <Input
                label="EMAIL"
                type="email"
                placeholder="xyz@gmail.com"
                value={state.login.email}
                onChange={(e) => setLoginData({ email: e.target.value })}
                onBlur={() => setEmailTouched(true)}
                error={emailTouched && !emailValidation.isValid ? emailValidation.error : undefined}
                autoComplete="email"
              />
            </div>

            {/* Field 2: Password with Eye Toggle */}
            <div className="flex flex-col gap-[12px] py-[12px] px-[24px] border-b border-[rgba(255,255,255,0.06)]">
              <Input
                label="PASSWORD"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={state.login.password}
                onChange={(e) => setLoginData({ password: e.target.value })}
                onBlur={() => setPasswordTouched(true)}
                error={passwordTouched && !passwordValidation.isValid ? passwordValidation.error : undefined}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors cursor-pointer p-[2px] focus:outline-none"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      /* Eye Off Icon */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      /* Eye Open Icon */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                }
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-[16px] px-[24px] py-[16px]">
              <Checkbox
                checked={state.login.acceptedTerms}
                onChange={(checked) => setLoginData({ acceptedTerms: checked })}
                label={
                  <span>
                    I accept <span className="font-medium text-[rgba(255,255,255,0.9)]">all the terms & conditions.</span>
                  </span>
                }
              />
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-end gap-[12px] px-[24px] py-[20px] bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.06)]">
              <Button
                type="button"
                variant="secondary"
                icon="back"
                onClick={() => navigate('/')}
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
