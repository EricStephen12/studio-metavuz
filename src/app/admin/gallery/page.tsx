'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Edit, Plus, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  filename: string;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchImages(); // Refresh the gallery
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/gallery/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchImages(); // Refresh the gallery
      } else {
        alert('Delete failed. Please try again.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    }
  };

  const handleUpdateImage = async (imageId: string, newAlt: string) => {
    try {
      const response = await fetch(`/api/admin/gallery/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt: newAlt }),
      });

      if (response.ok) {
        fetchImages(); // Refresh the gallery
        setEditingImage(null);
      } else {
        alert('Update failed. Please try again.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Update failed. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gallery Management</h1>
            <p className="text-gray-400">Manage studio images and gallery content</p>
          </div>
          
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-lg font-bold flex items-center space-x-2 disabled:opacity-50"
              disabled={isUploading}
            >
              <Upload className="h-5 w-5" />
              <span>{isUploading ? 'Uploading...' : 'Upload Images'}</span>
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{images.length}</div>
              <div className="text-gray-400">Total Images</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {images.filter(img => img.alt && img.alt.trim()).length}
              </div>
              <div className="text-gray-400">With Descriptions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {images.filter(img => !img.alt || !img.alt.trim()).length}
              </div>
              <div className="text-gray-400">Need Descriptions</div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt || 'Studio image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="bg-cyan-400 text-black p-2 rounded-lg hover:bg-cyan-300 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingImage(image)}
                      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-white font-medium text-sm mb-1">{image.filename}</p>
                <p className="text-gray-400 text-xs">
                  {image.alt || 'No description'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Edit Image</h3>
                <button
                  onClick={() => setEditingImage(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description/Alt Text
                  </label>
                  <textarea
                    value={editingImage.alt || ''}
                    onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    rows={3}
                    placeholder="Enter image description..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdateImage(editingImage.id, editingImage.alt || '')}
                    className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black py-2 rounded-lg font-bold transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingImage(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg font-bold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-4xl max-h-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <X className="h-8 w-8" />
              </button>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || 'Studio image'}
                width={800}
                height={600}
                className="rounded-lg object-contain max-h-[80vh]"
              />
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}