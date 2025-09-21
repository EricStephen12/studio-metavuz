'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Images, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut,
  Users,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalImages: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const dashboardCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/contacts'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: <Calendar className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      href: '/admin/bookings'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: <Users className="h-8 w-8" />,
      color: 'from-yellow-500 to-yellow-600',
      href: '/admin/bookings?status=pending'
    },
    {
      title: 'Gallery Images',
      value: stats.totalImages,
      icon: <Images className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/gallery'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Gallery',
      description: 'Upload, edit, and organize studio images',
      icon: <Images className="h-6 w-6" />,
      href: '/admin/gallery',
      color: 'bg-cyan-500'
    },
    {
      title: 'View Contacts',
      description: 'Review and respond to contact form submissions',
      icon: <Mail className="h-6 w-6" />,
      href: '/admin/contacts',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Bookings',
      description: 'Review and manage studio booking requests',
      icon: <Calendar className="h-6 w-6" />,
      href: '/admin/bookings',
      color: 'bg-green-500'
    },
    {
      title: 'Site Settings',
      description: 'Configure website settings and preferences',
      icon: <Settings className="h-6 w-6" />,
      href: '/admin/settings',
      color: 'bg-gray-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome to Studio Metavuz Admin Panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = card.href}
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${card.color} mb-4`}>
                <div className="text-white">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
              <p className="text-gray-400 text-sm">{card.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = action.href}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <div className="text-white">
                      {action.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="text-center text-gray-400 py-8">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Activity tracking will be implemented here</p>
              <p className="text-sm mt-2">Recent contacts, bookings, and system changes</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}