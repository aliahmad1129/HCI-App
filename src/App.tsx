import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { StartPage } from './pages/StartPage';
import { LoginPage } from './pages/LoginPage';
import { ProfileSetupPage } from './pages/ProfileSetupPage';
import { PersonalDetailsPage } from './pages/PersonalDetailsPage';
import { BoatSelectionPage } from './pages/BoatSelectionPage';
import { SuccessPage } from './pages/SuccessPage';

export const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfileSetupPage />} />
          <Route path="/details" element={<PersonalDetailsPage />} />
          <Route path="/game" element={<BoatSelectionPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
