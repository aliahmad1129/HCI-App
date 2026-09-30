import type { LoginFormData, PersonalDetailsFormData } from '../types';

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. user@gmail.com).' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number.' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special symbol.' };
  }
  return { isValid: true };
};

export const isLoginFormValid = (login: LoginFormData): boolean => {
  return (
    validateEmail(login.email).isValid &&
    validatePassword(login.password).isValid &&
    login.acceptedTerms
  );
};

export const validateDOB = (dob: string): { isValid: boolean; error?: string } => {
  if (!dob) {
    return { isValid: false, error: 'Date of birth is required.' };
  }
  const selectedDate = new Date(dob);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Invalid date format.' };
  }
  if (selectedDate > today) {
    return { isValid: false, error: 'Future dates are not allowed.' };
  }
  return { isValid: true };
};

export const isPersonalDetailsValid = (details: PersonalDetailsFormData): boolean => {
  return (
    details.name.trim().length > 0 &&
    details.gender !== '' &&
    validateDOB(details.dob).isValid &&
    details.bloodGroup.trim().length > 0 &&
    details.country.trim().length > 0 &&
    details.address.trim().length > 0
  );
};
