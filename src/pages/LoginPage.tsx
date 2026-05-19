import React, { useState } from 'react';
import { Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';
import { authUtils } from '../utils/authUtils';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (!email || !password || !businessName) {
        setError('Please fill all fields');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      const success = authUtils.signup(email, password, businessName);
      if (!success) {
        setError('Email already registered');
        return;
      }
    } else {
      if (!email || !password) {
        setError('Please fill all fields');
        return;
      }
      const success = authUtils.login(email, password);
      if (!success) {
        setError('Invalid email or password');
        return;
      }
    }
    onLoginSuccess();
  };

  const handleGoogleLogin = () => {
    const user = {
      id: Date.now().toString(),
      email: `user_${Date.now()}@gmail.com`,
      password: 'google_oauth',
      businessName: 'My Gym',
      currency: 'INR',
    };
    localStorage.setItem('flextrack_currentUser', JSON.stringify(user));
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">💪</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FlexTrack</h1>
          <p className="text-gray-400">Gym Membership Management</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isSignup ? 'Create Account' : 'Sign In'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full mb-4 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth flex items-center justify-center gap-2"
          >
            <span>🔍</span>
            <span>Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="My Gym"
                    className="input-field pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="text-purple-600 font-medium hover:text-purple-700 ml-1"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
