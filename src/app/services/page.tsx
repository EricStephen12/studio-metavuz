'use client';

import { motion } from 'framer-motion';
import { Music, Mic, Headphones, Play, Download, Zap, Star, Music2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Services() {
  const services = [
    {
      icon: <Music className="h-16 w-16" />,
      title: "Beat Production",
      description: "Custom instrumentals across Afrobeat, Hip-Hop, RnB, Trap, Drill, and Dancehall.",
      features: [
        "Original compositions tailored to your style",
        "Professional arrangement and structure",
        "High-quality samples and sounds",
        "Multiple format delivery (WAV, MP3, stems)",
        "Unlimited revisions until satisfaction"
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-600/20 to-pink-600/20"
    },
    {
      icon: <Mic className="h-16 w-16" />,
      title: "Recording Sessions",
      description: "High-quality vocal and live recording in a professional setup.",
      features: [
        "Professional vocal booth setup",
        "Live instrument recording",
        "Multiple microphone options",
        "Real-time monitoring",
        "Professional engineer guidance"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-600/20 to-cyan-600/20"
    },
    {
      icon: <Music2 className="h-16 w-16" />,
      title: "Mixing & Mastering",
      description: "Get a radio-ready and streaming-ready sound that cuts through.",
      features: [
        "Professional mixing techniques",
        "Mastering for all platforms",
        "Loudness optimization",
        "EQ and dynamics processing",
        "Reference track comparison"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-600/20 to-emerald-600/20"
    },
    {
      icon: <Headphones className="h-16 w-16" />,
      title: "Beat Remakes",
      description: "Industry beats recreated from scratch – 100% original and tailored for you.",
      features: [
        "Exact recreation of reference tracks",
        "100% original composition",
        "Custom tempo and key adjustments",
        "Professional quality production",
        "Commercial use rights included"
      ],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-600/20 to-red-600/20"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="text-white font-bold">
                OUR SERVICES
              </span>
            </h1>
            <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed font-light">
              Professional recording, mixing, and mastering services designed to bring your musical vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-cyan-400 transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-cyan-400/20`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10">
                  {/* Service Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-lg text-white mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full flex-shrink-0`}></div>
                        <span className="text-white group-hover:text-gray-200 transition-colors duration-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href="/booking">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-cyan-400 font-bold">
                OUR PROCESS
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-light">
              We follow a structured approach to ensure your project meets the highest standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We discuss your vision, requirements, and goals for the project.",
                icon: <Play className="h-8 w-8" />
              },
              {
                step: "02",
                title: "Production",
                description: "We create, record, or mix your music using professional techniques.",
                icon: <Music className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Review",
                description: "You review the work and provide feedback for any adjustments.",
                icon: <Star className="h-8 w-8" />
              },
              {
                step: "04",
                title: "Delivery",
                description: "Final files are delivered in your preferred format and quality.",
                icon: <Download className="h-8 w-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-black">{step.step}</span>
                  </div>
                  <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-cyan-400 font-bold">
                PROFESSIONAL EQUIPMENT
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-light">
              State-of-the-art equipment for the highest quality production.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl group h-80"
            >
              <Image
                src="/images/mixer.jpeg"
                alt="Professional Mixing Console - Studio Equipment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Mixing Console</h3>
                <p className="text-gray-200">Professional mixing board for precise audio control</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl group h-80"
            >
              <Image
                src="/images/ZQ3mXhrV.jpeg"
                alt="Studio Equipment Setup - Professional Recording Environment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Studio Setup</h3>
                <p className="text-gray-200">Complete professional recording environment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-cyan-900/20 to-cyan-800/20 rounded-3xl p-8 border border-cyan-400/30"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-black" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              CUSTOM PRICING
            </h3>
            <p className="text-lg text-white mb-6 font-light">
              Every project is unique, and so is our pricing. We offer competitive rates tailored to your specific needs and budget.
            </p>
            <p className="text-white font-light">
              Contact us for a personalized quote based on your project requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              READY TO START YOUR PROJECT?
            </h2>
            <p className="text-xl text-white mb-8 font-light">
              Let's discuss your needs and create something amazing together.
            </p>
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-400 hover:bg-cyan-300 text-black px-12 py-4 rounded-full text-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
              >
                Book a Consultation
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
