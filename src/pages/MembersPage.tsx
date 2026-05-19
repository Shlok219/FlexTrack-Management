import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { Member } from '../types';
import { storageUtils } from '../utils/storageUtils';

export const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    setMembers(storageUtils.getMembers());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    if (editingId) {
      storageUtils.updateMember(editingId, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });
      setEditingId(null);
    } else {
      const newMember: Member = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        joinDate: new Date().toISOString(),
        profileImage: `https://ui-avatars.com/api/?name=${formData.name}`,
      };
      storageUtils.addMember(newMember);
    }

    setFormData({ name: '', phone: '', email: '' });
    setShowForm(false);
    loadMembers();
  };

  const handleEdit = (member: Member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      phone: member.phone,
      email: member.email,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure?')) {
      storageUtils.deleteMember(id);
      loadMembers();
    }
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-2">{members.length} total members</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', phone: '', email: '' });
            setShowForm(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Member
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {showForm && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">{editingId ? 'Edit Member' : 'Add New Member'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="Member name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="email@example.com"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Member' : 'Add Member'}
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

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Member</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={member.profileImage}
                    alt={member.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-900">{member.name}</span>
                </td>
                <td className="py-3 px-4 text-gray-600">{member.phone}</td>
                <td className="py-3 px-4 text-gray-600">{member.email}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(member.joinDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 hover:bg-blue-100 rounded transition-smooth"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 hover:bg-red-100 rounded transition-smooth"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMembers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {members.length === 0 ? 'No members yet. Add one to get started!' : 'No members match your search.'}
          </div>
        )}
      </div>
    </div>
  );
};
