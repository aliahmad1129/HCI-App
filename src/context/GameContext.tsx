import React, { createContext, useContext, useState } from 'react';
import type { GameContextType, GameState, LoginFormData, PersonalDetailsFormData, ProfileFormData } from '../types';

const initialGameState: GameState = {
  login: {
    email: '',
    password: '',
    acceptedTerms: false,
  },
  profile: {
    profileImage: null,
    interests: [],
  },
  personal: {
    name: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    country: '',
    address: '',
  },
  boats: {
    selectedIndexes: [],
  },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(initialGameState);

  const setLoginData = (data: Partial<LoginFormData>) => {
    setState((prev) => ({
      ...prev,
      login: { ...prev.login, ...data },
    }));
  };

  const setProfileData = (data: Partial<ProfileFormData>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...data },
    }));
  };

  const setPersonalData = (data: Partial<PersonalDetailsFormData>) => {
    setState((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...data },
    }));
  };

  const toggleBoatSelection = (index: number) => {
    setState((prev) => {
      const current = prev.boats.selectedIndexes;
      const updated = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];

      return {
        ...prev,
        boats: { selectedIndexes: updated },
      };
    });
  };

  const resetAllState = () => {
    setState(initialGameState);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        setLoginData,
        setProfileData,
        setPersonalData,
        toggleBoatSelection,
        resetAllState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
