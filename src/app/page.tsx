'use client';

import { motion } from 'framer-motion';
import { Play, Music, Headphones, Mic, Facebook, Twitter, Instagram} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [imageLoading, setImageLoading] = useState(true);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
          )}
        <Image
            src="/images/IMG_4846.jpg" 
            alt="Studio Metavuz - Professional Music Production Studio" 
            fill
          priority
            className={`object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            sizes="100vw"
            quality={90}
            onLoad={() => setImageLoading(false)}
          />
          <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-right pr-20">
                      <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-tight">
            <span className="block text-white drop-shadow-2xl tracking-wider">STUDIO</span>
            <span className="block text-cyan-400 drop-shadow-2xl tracking-wider">METAVUZ</span>
            </h1>
          <div className="flex justify-end mt-8">
            <div className="h-px w-32 bg-cyan-400 mt-4"></div>
          </div>
            </div>
        
        {/* Social Media Icons - Bottom Left */}
        <div className="absolute bottom-16 left-16 flex flex-col space-y-12">
          <a href="https://facebook.com/Metavuz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">
            <Facebook size={28} />
          </a>
          <a href="https://twitter.com/Metavuz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">
            <Twitter size={28} />
          </a>
          <a href="https://instagram.com/Studiometavuz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">
            <Instagram size={28} />
          </a>
          </div>
          
          {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-10 flex items-center space-x-2">
          <div className="w-px h-8 bg-cyan-400 animate-pulse"></div>
            <button 
              onClick={() => scrollToSection('about')}
            className="text-gray-400 text-sm font-light tracking-[0.15em] transform rotate-90 origin-center whitespace-nowrap hover:text-cyan-400 transition-all duration-300 cursor-pointer"
            >
            SCROLL DOWN
            </button>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-wide">
              <span className="text-cyan-400 font-bold tracking-wide">
                OUR SERVICES
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-light">
              Professional recording, mixing, and mastering services for artists who take their sound seriously.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Music className="h-12 w-12" />,
                title: "Beat Production",
                description: "Custom instrumentals across Afrobeat, Hip-Hop, RnB, Trap, Drill, and Dancehall.",
                color: "from-cyan-500 to-cyan-400"
              },
              {
                icon: <Mic className="h-12 w-12" />,
                title: "Recording Sessions",
                description: "High-quality vocal and live recording in a professional setup.",
                color: "from-cyan-500 to-cyan-400"
              },
              {
                icon: <Mic className="h-12 w-12" />,
                title: "Mixing & Mastering",
                description: "Get a radio-ready and streaming-ready sound that cuts through.",
                color: "from-cyan-500 to-cyan-400"
              },
              {
                icon: <Headphones className="h-12 w-12" />,
                title: "Beat Remakes",
                description: "Industry beats recreated from scratch – 100% original and tailored for you.",
                color: "from-cyan-500 to-cyan-400"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 group shadow-lg hover:shadow-cyan-400/20"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white group-hover:text-gray-200 transition-colors duration-300 font-light">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
              >
                View All Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Studio Gallery Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-wide">
              <span className="text-white font-bold tracking-wide">
                OUR STUDIO
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-light">
              Take a look at our professional recording space and state-of-the-art equipment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/images/IMG_4839.jpg', alt: 'Studio Control Room' },
              { src: '/images/IMG_4840.jpg', alt: 'Recording Booth' },
              { src: '/images/IMG_4841.jpg', alt: 'Mixing Console' },
              { src: '/images/IMG_4843.jpg', alt: 'Studio Equipment' },
              { src: '/images/IMG_4844.jpg', alt: 'Professional Setup' },
              { src: '/images/IMG_4845.jpg', alt: 'Studio Environment' }
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl aspect-square"
        >
          <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-wide text-white">
              READY TO CREATE SOMETHING AMAZING?
            </h2>
            <p className="text-xl text-white mb-8 font-light">
              Book your session today and let's bring your musical vision to life.
            </p>
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-400 hover:bg-cyan-300 text-black px-12 py-4 rounded-full text-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
              >
                Book Your Session Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}