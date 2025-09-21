'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Music, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  duration?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, filterStatus]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setBookings(bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status } : booking
        ));
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status });
        }
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
    }
  };

  const pendingCount = bookings.filter(booking => booking.status === 'pending').length;
  const confirmedCount = bookings.filter(booking => booking.status === 'confirmed').length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading bookings...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Studio Bookings</h1>
            <p className="text-gray-400">
              {bookings.length} total bookings, {pendingCount} pending, {confirmedCount} confirmed
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">{pendingCount}</div>
                <div className="text-gray-400">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">{confirmedCount}</div>
                <div className="text-gray-400">Confirmed</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <XCircle className="h-8 w-8 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </div>
                <div className="text-gray-400">Cancelled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending Only</option>
                <option value="confirmed">Confirmed Only</option>
                <option value="cancelled">Cancelled Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No bookings found</p>
              </div>
            ) : (
              filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-800 rounded-xl p-4 border cursor-pointer transition-all duration-300 hover:border-cyan-400 ${
                    selectedBooking?.id === booking.id ? 'ring-2 ring-cyan-400' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-white">{booking.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{booking.email}</p>
                      <p className="text-gray-400 text-sm flex items-center mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {booking.phone}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBooking(booking.id);
                      }}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Service</p>
                      <p className="text-white text-sm font-medium">{booking.service}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="text-white text-sm">{booking.duration || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {booking.time}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Booking Detail */}
          <div className="lg:sticky lg:top-6">
            {selectedBooking ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {selectedBooking.name}
                    </h2>
                    <div className="space-y-1">
                      <p className="text-gray-400 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {selectedBooking.email}
                      </p>
                      <p className="text-gray-400 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {selectedBooking.phone}
                      </p>
                      <p className="text-gray-400 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedBooking.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Service</h3>
                    <div className="bg-gray-700 rounded-lg p-3 flex items-center space-x-2">
                      <Music className="h-5 w-5 text-cyan-400" />
                      <span className="text-gray-300">{selectedBooking.service}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Duration</h3>
                    <div className="bg-gray-700 rounded-lg p-3 flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-cyan-400" />
                      <span className="text-gray-300">{selectedBooking.duration || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.message && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Additional Message</h3>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {selectedBooking.message}
                      </p>
                    </div>
                  </div>
                )}

                {/* Status Actions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Update Status</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                      className="flex-1 bg-green-500 hover:bg-green-400 text-white py-2 px-3 rounded-lg font-bold text-sm transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'pending')}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-3 rounded-lg font-bold text-sm transition-colors"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                      className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 px-3 rounded-lg font-bold text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${selectedBooking.email}?subject=Re: Studio Booking - ${selectedBooking.service}`}
                    className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black py-2 px-4 rounded-lg font-bold text-center transition-colors"
                  >
                    Email Client
                  </a>
                  <a
                    href={`tel:${selectedBooking.phone}`}
                    className="flex-1 bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-lg font-bold text-center transition-colors"
                  >
                    Call Client
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Select a booking to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}