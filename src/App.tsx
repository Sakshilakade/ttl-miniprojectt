/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import { Layout } from './components/Layout';

// Lazy loading pages or importing them normally
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Meals from './pages/Meals';
import WorkoutPage from './pages/Workout';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import BMICalculator from './pages/BMI';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { profile } = useApp();
  if (!profile) return <Navigate to="/login" replace />;
  if (!profile.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { profile } = useApp();
  if (profile && profile.onboardingComplete) return <Navigate to="/dashboard" replace />;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<AuthRoute><Landing /></AuthRoute>} />
            <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
            <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/meals" element={<ProtectedRoute><Meals /></ProtectedRoute>} />
            <Route path="/workout" element={<ProtectedRoute><WorkoutPage /></ProtectedRoute>} />
            <Route path="/bmi" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
