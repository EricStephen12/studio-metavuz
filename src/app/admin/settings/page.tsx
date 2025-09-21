'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Mail, Key, Database, Trash2, Download } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    studioEmail: 'Studiometavuz@gmail.com',
    adminUsername: 'admin',
    adminPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      // Validate password change if provided
      if (settings.newPassword) {
        if (settings.newPassword !== settings.confirmPassword) {
          setMessage('New passwords do not match');
          setSaving(false);
          return;
        }
        if (settings.newPassword.length < 6) {
          setMessage('Password must be at least 6 characters long');
          setSaving(false);
          return;
        }
      }

      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('Settings saved successfully');
        setSettings(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const exportData = async (type: 'contacts' | 'bookings') => {
    try {
      const response = await fetch(`/api/admin/export/${type}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error(`Failed to export ${type}:`, error);
    }
  };

  const clearData = async (type: 'contacts' | 'bookings') => {
    if (!confirm(`Are you sure you want to delete all ${type}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/clear/${type}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage(`All ${type} have been deleted`);
      } else {
        setMessage(`Failed to delete ${type}`);
      }
    } catch (error) {
      setMessage(`Failed to delete ${type}`);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your admin panel configuration</p>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-500/20 text-green-400 border border-green-500' 
                : 'bg-red-500/20 text-red-400 border border-red-500'
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="h-6 w-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">General Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Studio Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={settings.studioEmail}
                    onChange={(e) => setSettings({ ...settings, studioEmail: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="studio@example.com"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email address where contact forms and bookings will be sent
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={settings.adminUsername}
                  onChange={(e) => setSettings({ ...settings, adminUsername: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="admin"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-6">
              <Key className="h-6 w-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Security Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={settings.newPassword}
                  onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="Leave empty to keep current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={settings.confirmPassword}
                  onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="Confirm new password"
                />
              </div>

              <p className="text-xs text-gray-500">
                Password must be at least 6 characters long
              </p>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Data Management</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacts Data */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Contact Messages</h3>
              <p className="text-gray-400 text-sm mb-4">
                Export or clear all contact form submissions
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportData('contacts')}
                  className="flex-1 bg-blue-500 hover:bg-blue-400 text-white py-2 px-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => clearData('contacts')}
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 px-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Bookings Data */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Booking Requests</h3>
              <p className="text-gray-400 text-sm mb-4">
                Export or clear all booking submissions
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportData('bookings')}
                  className="flex-1 bg-blue-500 hover:bg-blue-400 text-white py-2 px-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => clearData('bookings')}
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 px-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-3 rounded-lg font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </motion.button>
        </div>
      </div>
    </AdminLayout>
  );
}