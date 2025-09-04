'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-20 h-20 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            MESSAGE SENT!
          </h2>
          <p className="text-white mb-8 font-light">
            Thank you for contacting Studio Metavuz. We'll get back to you within 24 hours.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-3 rounded-full font-bold transition-all duration-300"
          >
            Send Another Message
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="text-white font-bold">
                CONTACT US
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed font-light">
              Get in touch with Studio Metavuz. We're here to help bring your musical vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your project or ask any questions..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-400/25 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Studio Location */}
              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-400/20 rounded-3xl p-8 border border-cyan-400/30">
                <h3 className="text-2xl font-bold text-white mb-6">Visit Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Studio Location</h4>
                      <p className="text-white">
                        Tulip Haven Estate, Gate 1,<br />
                        Chevron, Lagos State
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Phone / WhatsApp</h4>
                      <p className="text-white">+234 (0) 123 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Email</h4>
                      <p className="text-white">info@studiometavuz.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Operating Hours</h4>
                      <p className="text-white">Monday - Sunday: 9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Image */}
              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-400/20 rounded-3xl p-8 border border-cyan-400/30">
                <h3 className="text-xl font-bold text-white mb-4">Visit Our Studio</h3>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/images/Recording Studio Photos - Download Free High-Quality Pictures _ Freepik.jpeg"
                    alt="Studio Metavuz Exterior"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white font-semibold">Tulip Haven Estate, Gate 1</p>
                    <p className="text-sm text-gray-300">Chevron, Lagos</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-cyan-400 font-bold">
                WHY CONTACT US?
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-light">
              We're here to help you with all your music production needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Project Consultation",
                description: "Discuss your musical vision and get expert advice on the best approach for your project.",
                icon: "🎵"
              },
              {
                title: "Pricing Information",
                description: "Get detailed pricing information tailored to your specific project requirements.",
                icon: "💰"
              },
              {
                title: "Studio Tour",
                description: "Schedule a visit to see our facilities and equipment before booking your session.",
                icon: "🏢"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              READY TO GET STARTED?
            </h2>
            <p className="text-xl text-white mb-8 font-light">
              Don't wait - book your session today and let's create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
              >
                Book a Session
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-cyan-400 hover:bg-cyan-400/10 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300"
              >
                View Services
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
