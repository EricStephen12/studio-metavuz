'use client';

import { motion } from 'framer-motion';
import { Music, Headphones, Mic, Award, Users, Clock, Star, Music2 } from 'lucide-react';

export default function About() {
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
                OUR STORY
              </span>
            </h1>
            <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed font-light">
              Studio Metavuz was built for artists who take their sound seriously. From recording and production to mixing and mastering, we give you a professional space with the right vibe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-cyan-400">
                OUR MISSION
              </h2>
              <p className="text-lg text-white mb-6 leading-relaxed font-light">
                Our mission is simple – help you create music that's ready for the world. We understand that every artist has a unique voice, and our job is to amplify that voice with the highest quality production possible.
              </p>
              <p className="text-lg text-white leading-relaxed font-light">
                Whether you're a seasoned professional or just starting your musical journey, Studio Metavuz provides the tools, expertise, and creative environment you need to bring your vision to life.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/images/IMG_4846.jpg"
                  alt="Studio Metavuz Interior"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Professional Studio Space</h3>
                  <p className="text-gray-200">State-of-the-art equipment in a comfortable environment</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white font-bold">
                WHY CHOOSE US
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-light">
              We combine technical expertise with creative passion to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="h-12 w-12" />,
                title: "Experienced Producer Behind the Boards",
                description: "Our producer brings years of industry experience and a deep understanding of various musical genres to every project.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Headphones className="h-12 w-12" />,
                title: "Industry-Standard Equipment",
                description: "We use only the finest professional equipment to ensure your recordings meet the highest quality standards.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Music className="h-12 w-12" />,
                title: "Comfortable, Private Space",
                description: "Our studio provides a comfortable, private environment where you can focus on your creativity without distractions.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Music2 className="h-12 w-12" />,
                title: "Professional Mixing & Mastering",
                description: "Get radio-ready and streaming-ready sound that cuts through with our professional mixing and mastering services.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: <Clock className="h-12 w-12" />,
                title: "Flexible Scheduling",
                description: "We work around your schedule to ensure you have the time you need to create your best work.",
                color: "from-pink-500 to-purple-500"
              },
              {
                icon: <Star className="h-12 w-12" />,
                title: "Personalized Approach",
                description: "Every project is unique, and we tailor our approach to match your specific needs and creative vision.",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 group shadow-lg hover:shadow-cyan-400/20"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-cyan-400 font-bold">
                STUDIO SHOWCASE
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-light">
              Take a closer look at our professional recording environment and equipment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl group"
            >
              <img
                src="/images/IMG_4847.jpg"
                alt="Studio Control Room"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Control Room</h3>
                <p className="text-gray-200">Professional mixing console and monitoring setup</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl group"
            >
              <img
                src="/images/recording.jpeg"
                alt="Recording Session"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Recording Space</h3>
                <p className="text-gray-200">Comfortable environment for artists to perform</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studio Location Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-cyan-400">
                LOCATED IN THE HEART OF LAGOS
              </h2>
              <p className="text-lg text-white mb-6 leading-relaxed font-light">
                Our studio is strategically located at Tulip Haven Estate, Gate 1, Chevron, Lagos – providing easy access while maintaining a peaceful, creative environment away from the city's hustle and bustle.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-white">Easy access from major Lagos areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-white">Secure and private location</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-white">Ample parking space</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-white">Peaceful environment for creativity</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-400/20 rounded-3xl p-8 border border-cyan-400/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Studio Location Map</h3>
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4!2d3.4!3d6.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d2c8c8c8c8d%3A0x8c8c8c8c8c8c8c8c!2sChevron%20Alternative%20Route%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Studio Metavuz Location - Tulip Haven Estate, Gate 1, Chevron, Lagos"
                    className="rounded-2xl"
                  ></iframe>
                </div>
                <p className="text-sm text-white mt-4 text-center font-light">
                  Tulip Haven Estate, Gate 1, Chevron, Lagos
                </p>
              </div>
            </motion.div>
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
              READY TO WORK WITH US?
            </h2>
            <p className="text-xl text-white mb-8 font-light">
              Let's discuss your project and bring your musical vision to life.
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
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
