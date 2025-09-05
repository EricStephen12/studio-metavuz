import { motion } from 'framer-motion';

export const ImageSkeleton = () => (
  <div className="animate-pulse bg-gray-700 rounded-2xl aspect-square w-full h-full"></div>
);

export const TextSkeleton = ({ lines = 3, className = "" }: { lines?: number; className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-700 rounded mb-2 ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export const CardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
  >
    <div className="animate-pulse">
      <div className="w-16 h-16 bg-gray-700 rounded-2xl mb-6"></div>
      <div className="h-6 bg-gray-700 rounded mb-4"></div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
      <div className="h-10 bg-gray-700 rounded-full"></div>
    </div>
  </motion.div>
);

export const GallerySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="aspect-square">
        <ImageSkeleton />
      </div>
    ))}
  </div>
);
