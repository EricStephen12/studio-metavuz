'use client';

import { motion } from 'framer-motion';
import { Music, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Studio Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">Studio Metavuz</span>
            </div>
            <p className="text-white font-light">
              Where your sound comes alive. Professional recording, mixing, and mastering in Lagos.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400" />
                <span className="text-white">
                  Tulip Haven Estate, Gate 1, Chevron, Lagos
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-400" />
                <span className="text-white">+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span className="text-white">info@studiometavuz.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400">Quick Links</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-white hover:text-cyan-400 transition-colors duration-200">
                About Us
              </a>
              <a href="/services" className="block text-white hover:text-cyan-400 transition-colors duration-200">
                Services
              </a>
              <a href="/booking" className="block text-white hover:text-cyan-400 transition-colors duration-200">
                Book a Session
              </a>
              <a href="/contact" className="block text-white hover:text-cyan-400 transition-colors duration-200">
                Contact
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-white">
            © 2024 Studio Metavuz. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
