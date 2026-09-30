export interface LoginFormData {
  email: string;
  password: string;
  acceptedTerms: boolean;
}

export interface ProfileFormData {
  profileImage: string | null; // Base64 data URL or local object URL
  interests: string[];
}

export type Gender = 'Male' | 'Female' | '';

export interface PersonalDetailsFormData {
  name: string;
  gender: Gender;
  dob: string;
  bloodGroup: string;
  country: string;
  address: string;
}

export interface BoatSelectionData {
  selectedIndexes: number[];
}

export interface GameState {
  login: LoginFormData;
  profile: ProfileFormData;
  personal: PersonalDetailsFormData;
  boats: BoatSelectionData;
}

export interface GameContextType {
  state: GameState;
  setLoginData: (data: Partial<LoginFormData>) => void;
  setProfileData: (data: Partial<ProfileFormData>) => void;
  setPersonalData: (data: Partial<PersonalDetailsFormData>) => void;
  toggleBoatSelection: (index: number) => void;
  resetAllState: () => void;
}
