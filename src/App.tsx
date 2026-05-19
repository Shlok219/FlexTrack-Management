import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { MembersPage } from './pages/MembersPage';
import { PlansPage } from './pages/PlansPage';
import { SettingsPage } from './pages/SettingsPage';
import { Sidebar } from './components/Sidebar';
import { authUtils } from './utils/authUtils';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = authUtils.isAuthenticated();
    setIsAuthenticated(auth);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💪</span>
          </div>
          <p className="text-white text-lg">FlexTrack Loading...</p>
        </div>
      </div>
    );
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar onLogout={handleLogout} />
          <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
            <div className="p-8">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
