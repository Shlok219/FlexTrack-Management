import React, { useState, useEffect } from 'react';
import { DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { storageUtils } from '../utils/storageUtils';
import { DashboardStats } from '../types';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activePlans: 0,
    expiredPlans: 0,
    totalRevenue: 0,
    pausedPlans: 0,
    extendedPlans: 0,
  });

  useEffect(() => {
    setStats(storageUtils.getStats());
    const interval = setInterval(() => {
      setStats(storageUtils.getStats());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const revenueData = [
    { month: 'Dec', revenue: 2400 },
    { month: 'Jan', revenue: 3000 },
    { month: 'Feb', revenue: 1000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
  ];

  const planStatusData = [
    { name: 'Active', value: stats.activePlans, fill: '#10b981' },
    { name: 'Expired', value: stats.expiredPlans, fill: '#ef4444' },
    { name: 'Paused', value: stats.pausedPlans, fill: '#f97316' },
    { name: 'Extended', value: stats.extendedPlans, fill: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back to FlexTrack</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalMembers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Plans</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activePlans}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Expired Plans</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.expiredPlans}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Plan Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
