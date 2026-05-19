import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Settings, LogOut } from 'lucide-react';
import { authUtils } from '../utils/authUtils';

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authUtils.logout();
    onLogout();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Members', path: '/members' },
    { icon: Package, label: 'Plans', path: '/plans' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-xl">
            💪
          </div>
          <div>
            <h1 className="font-bold text-lg">FlexTrack</h1>
            <p className="text-xs text-gray-400">Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-smooth"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
