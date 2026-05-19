import React, { useState, useEffect } from 'react';
import { Camera, Save } from 'lucide-react';
import { authUtils } from '../utils/authUtils';

export const SettingsPage: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = authUtils.getCurrentUser();
    if (user) {
      setBusinessName(user.businessName || '');
      setCurrency(user.currency || 'INR');
      setEmail(user.email || '');
    }
  }, []);

  const handleSave = () => {
    const user = authUtils.getCurrentUser();
    if (user) {
      user.businessName = businessName;
      user.currency = currency;
      localStorage.setItem('flextrack_currentUser', JSON.stringify(user));
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your gym business details</p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-6">Business Profile</h3>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-3xl">
              💪
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth">
              <Camera className="w-5 h-5" />
              Upload Logo
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="input-field"
            placeholder="Your Gym Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="input-field bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="input-field"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
};
