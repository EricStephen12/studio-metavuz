'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Trash2, Eye, Search, Filter } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, filterStatus]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by read status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(contact =>
        filterStatus === 'read' ? contact.read : !contact.read
      );
    }

    setFilteredContacts(filtered);
  };

  const markAsRead = async (contactId: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        setContacts(contacts.map(contact =>
          contact.id === contactId ? { ...contact, read: true } : contact
        ));
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const deleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== contactId));
        if (selectedContact?.id === contactId) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    if (!contact.read) {
      markAsRead(contact.id);
    }
  };

  const unreadCount = contacts.filter(contact => !contact.read).length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading contacts...</div>
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
            <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
            <p className="text-gray-400">
              {contacts.length} total messages, {unreadCount} unread
            </p>
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
                  placeholder="Search contacts..."
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
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
                className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contacts List */}
          <div className="space-y-4">
            {filteredContacts.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No contacts found</p>
              </div>
            ) : (
              filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-800 rounded-xl p-4 border cursor-pointer transition-all duration-300 hover:border-cyan-400 ${
                    contact.read ? 'border-gray-700' : 'border-yellow-500 bg-gray-800/80'
                  } ${selectedContact?.id === contact.id ? 'ring-2 ring-cyan-400' : ''}`}
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-white">{contact.name}</h3>
                        {!contact.read && (
                          <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                      {contact.phone && (
                        <p className="text-gray-400 text-sm flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {contact.phone}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteContact(contact.id);
                        }}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="font-medium text-white text-sm">{contact.subject}</p>
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {contact.message}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                    {new Date(contact.createdAt).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Contact Detail */}
          <div className="lg:sticky lg:top-6">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {selectedContact.name}
                    </h2>
                    <div className="space-y-1">
                      <p className="text-gray-400 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {selectedContact.email}
                      </p>
                      {selectedContact.phone && (
                        <p className="text-gray-400 flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {selectedContact.phone}
                        </p>
                      )}
                      <p className="text-gray-400 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(selectedContact.createdAt).toLocaleDateString()} at{' '}
                        {new Date(selectedContact.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteContact(selectedContact.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Subject</h3>
                  <p className="text-gray-300">{selectedContact.subject}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Message</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black py-2 px-4 rounded-lg font-bold text-center transition-colors"
                  >
                    Reply via Email
                  </a>
                  {selectedContact.phone && (
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="flex-1 bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-lg font-bold text-center transition-colors"
                    >
                      Call
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Select a contact to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}