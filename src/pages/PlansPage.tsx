import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Plan } from '../types';
import { storageUtils } from '../utils/storageUtils';

export const PlansPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'monthly' as 'monthly' | 'quarterly' | 'annual',
    price: 0,
    description: '',
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    setPlans(storageUtils.getPlans());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingId) {
      storageUtils.updatePlan(editingId, formData);
      setEditingId(null);
    } else {
      const newPlan: Plan = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        price: formData.price,
        description: formData.description,
      };
      storageUtils.addPlan(newPlan);
    }

    setFormData({ name: '', type: 'monthly', price: 0, description: '' });
    setShowForm(false);
    loadPlans();
  };

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setFormData({
      name: plan.name,
      type: plan.type,
      price: plan.price,
      description: plan.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure?')) {
      storageUtils.deletePlan(id);
      loadPlans();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plans</h1>
          <p className="text-gray-600 mt-2">Manage your gym membership plans</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', type: 'monthly', price: 0, description: '' });
            setShowForm(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> New Plan
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">{editingId ? 'Edit Plan' : 'Create New Plan'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Monthly Basic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'monthly' | 'quarterly' | 'annual' })}
                  className="input-field"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="input-field"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field resize-none h-20"
                placeholder="Plan details..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Plan' : 'Create Plan'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map(plan => (
          <div key={plan.id} className="card border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{plan.name}</h3>
                <p className="text-sm text-gray-500 capitalize mt-1">{plan.type}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="p-2 hover:bg-blue-100 rounded transition-smooth"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 hover:bg-red-100 rounded transition-smooth"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-3">₹{plan.price}</div>
            {plan.description && (
              <p className="text-sm text-gray-600">{plan.description}</p>
            )}
          </div>
        ))}
      </div>

      {plans.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-4">No plans yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};
