/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  RefreshCw, 
  Image as ImageIcon, 
  Sparkles, 
  Plus, 
  FileCheck,
  Compass
} from 'lucide-react';
import { DEFAULT_BLOUSES } from '../data';
import { DriveFileItem } from '../types';
import { 
  getOrCreateGalleryFolder, 
  listGalleryImages, 
  uploadGalleryImage 
} from '../services/googleWorkspace';

interface GallerySliderProps {
  accessToken: string | null;
  needsAuth: boolean;
  onLogin: () => void;
}

export default function GallerySlider({
  accessToken,
  needsAuth,
  onLogin
}: GallerySliderProps) {
  // Built-in showcase auto-scrolling sliders
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<(() => void) | null>(null);

  // Drive integration states
  const [driveFolderId, setDriveFolderId] = useState<string | null>(null);
  const [driveImages, setDriveImages] = useState<DriveFileItem[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manage auto-scrolling interval for built-in blouses
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === DEFAULT_BLOUSES.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? DEFAULT_BLOUSES.length - 1 : prev - 1));
  };

  autoPlayRef.current = nextSlide;

  useEffect(() => {
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };
    const interval = setInterval(play, 4000); // 4 seconds auto-scroll
    return () => clearInterval(interval);
  }, []);

  // Fetch Drive folder & images if accessToken is available
  const fetchDriveAssets = async (token: string) => {
    setIsLoadingDrive(true);
    setUploadError(null);
    try {
      const folderId = await getOrCreateGalleryFolder(token);
      setDriveFolderId(folderId);
      const files = await listGalleryImages(token, folderId);
      setDriveImages(files);
    } catch (err: any) {
      console.error(err);
      setUploadError('Failed to fetch from Google Drive. Please verify login privileges.');
    } finally {
      setIsLoadingDrive(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchDriveAssets(accessToken);
    } else {
      setDriveImages([]);
      setDriveFolderId(null);
    }
  }, [accessToken]);

  // Handle image upload trigger
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files (JPEG, PNG, WEBP) are supported.');
      return;
    }

    if (!accessToken || !driveFolderId) {
      setUploadError('Please log in and connect your Google Drive first.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    try {
      await uploadGalleryImage(accessToken, driveFolderId, file);
      // Immediately reload Drive items
      const updatedFiles = await listGalleryImages(accessToken, driveFolderId);
      setDriveImages(updatedFiles);
      setSelectedUploadFile(null);
    } catch (err: any) {
      console.error(err);
      setUploadError('Upload failed. Check if Drive permissions are accepted in Google authorization panel.');
    } finally {
      setIsUploading(false);
    }
  };

  // Drag-and-drop triggers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are permitted.');
      return;
    }

    if (!accessToken || !driveFolderId) {
      setUploadError('Establish Google Drive connection before uploading.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    try {
      await uploadGalleryImage(accessToken, driveFolderId, file);
      const updated = await listGalleryImages(accessToken, driveFolderId);
      setDriveImages(updated);
    } catch (err: any) {
      console.error(err);
      setUploadError('Upload failed. Try reconnecting OAuth scopes.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-stone-50 border-t border-b border-gold-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-display uppercase tracking-widest text-gold-600 font-semibold mb-2 block">Our Design Portfolio</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-950 mb-4">The Designer Blouse Showcase</h2>
          <div className="h-[2px] w-16 bg-gold-400 mx-auto mb-4"></div>
          <p className="text-stone-600 text-sm font-sans leading-relaxed">
            Take a look at our premier collection of custom fitted designer blouses, delicate hand-woven 
            Aari embroidery, and wedding designs. Our portfolio auto-scrolls through hand-selected favorites.
          </p>
        </div>

        {/* Dynamic Auto-scrolling Carousel */}
        <div className="relative mb-20 bg-stone-100 rounded-2xl overflow-hidden border border-gold-300 shadow-xl max-w-5xl mx-auto">
          <div className="absolute inset-0 tailor-pattern pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px] items-stretch relative z-10">
            {/* Image display side */}
            <div className="md:col-span-6 relative aspect-square md:aspect-auto overflow-hidden bg-stone-200 border-b md:border-b-0 md:border-r border-gold-300">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={DEFAULT_BLOUSES[activeIndex].imageUrl}
                  alt={DEFAULT_BLOUSES[activeIndex].name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover absolute inset-0 select-none"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {/* Carousel Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-50/80 hover:bg-white text-stone-800 p-2 rounded-full border border-gold-200 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-50/80 hover:bg-white text-stone-800 p-2 rounded-full border border-gold-200 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Floating index indicator */}
              <div className="absolute bottom-4 left-4 bg-stone-900/40 backdrop-blur-sm text-stone-50 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider">
                {activeIndex + 1} / {DEFAULT_BLOUSES.length}
              </div>
            </div>

            {/* Spec details specs side */}
            <div className="md:col-span-6 p-6 md:p-10 flex flex-col justify-center bg-stone-50">
              <span className="text-[10px] font-display tracking-widest text-gold-600 uppercase font-bold mb-1.5 block">
                {DEFAULT_BLOUSES[activeIndex].collection}
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4 tracking-tight">
                {DEFAULT_BLOUSES[activeIndex].name}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {DEFAULT_BLOUSES[activeIndex].description}
              </p>

              <div>
                <h4 className="text-[11px] font-display uppercase tracking-wider text-stone-400 font-bold mb-3">Stitching Specs & Fabric</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {DEFAULT_BLOUSES[activeIndex].specs.map((spec, i) => (
                    <li key={i} className="text-xs text-stone-700 flex items-center gap-1.5 font-display font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>


        {/* LIVE GOOGLE DRIVE GALLERY SYNCHRONIZER */}
        <div className="bg-stone-100 rounded-3xl border border-gold-200 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-200/20 rounded-full blur-3xl" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gold-200 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2.5 rounded-2xl border border-gold-300 text-amber-700">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                  Drive Gallery Center
                  <span className="text-[10px] font-display uppercase tracking-widest text-amber-800 bg-amber-200/50 px-2 py-0.5 rounded font-bold">
                    Direct Sync
                  </span>
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-0.5">
                  Store designs in Google Drive folder: <span className="font-serif italic font-semibold text-stone-700">"Abarnaa Tailoring Mart - Blouses"</span>
                </p>
              </div>
            </div>

            {/* Sync trigger button if connected */}
            {accessToken && (
              <button
                onClick={() => fetchDriveAssets(accessToken)}
                disabled={isLoadingDrive}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gold-300 bg-white rounded-full text-xs font-display font-bold text-stone-700 hover:bg-gold-50 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                Refresh Sync
              </button>
            )}
          </div>

          {/* Drive Authenticated UI Panel */}
          {accessToken ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Drag & Drop Upload Block */}
              <div className="lg:col-span-4 bg-white border border-dashed border-gold-400 p-6 rounded-2xl flex flex-col items-center justify-center text-center relative hover:bg-gold-50/20 transition-colors">
                <input
                  type="file"
                  id="drive-uploader-input"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="w-full py-8 flex flex-col items-center cursor-pointer group"
                  onClick={handleUploadClick}
                >
                  <div className="bg-gold-100 text-gold-600 p-4 rounded-full border border-gold-200 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-stone-800 text-sm mb-1">
                    Upload Design to Drive
                  </h4>
                  <p className="text-xs text-stone-500 max-w-[200px] leading-relaxed mb-4">
                    Drag and drop your blouses images here, or <span className="text-gold-600 underline font-semibold">browse files</span>.
                  </p>
                  
                  {isUploading ? (
                    <div className="flex items-center gap-2 text-xs text-gold-600 font-mono font-semibold">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Uploading to GDrive...
                    </div>
                  ) : (
                    <span className="text-[10px] bg-stone-100 text-stone-500 font-mono px-2 py-1 rounded border">
                      JPEG, PNG, WEBP max 10MB
                    </span>
                  )}
                </div>

                {uploadError && (
                  <p className="mt-4 text-xs font-display text-red-600 leading-normal bg-red-50 p-2.5 rounded border border-red-200">
                    ⚠️ {uploadError}
                  </p>
                )}
              </div>

              {/* Right Column: Dynamic Synced Images Grid */}
              <div className="lg:col-span-8">
                {isLoadingDrive ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <RefreshCw className="w-8 h-8 text-gold-500 animate-spin mb-3" />
                    <p className="text-xs text-stone-500 font-display font-medium">Scanning Google Drive for blouse files...</p>
                  </div>
                ) : driveImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {driveImages.map((img) => (
                      <div 
                        key={img.id}
                        className="group bg-white rounded-xl border border-gold-200 p-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
                      >
                        <div className="aspect-square bg-stone-50 rounded-lg overflow-hidden relative">
                          <img
                            src={img.thumbnailLink || img.webViewLink}
                            alt={img.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-[10px] font-mono text-stone-500 truncate" title={img.name}>
                            {img.name.substring(img.name.indexOf('-') + 1)}
                          </p>
                          <a
                            href={img.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-amber-700 hover:underline font-display tracking-wide uppercase font-bold mt-1.5 block"
                          >
                            View Original
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-dashed border-stone-300 bg-white/40 py-16 px-4 rounded-2xl text-center">
                    <ImageIcon className="w-8 h-8 text-stone-300 mb-3" />
                    <h5 className="font-serif font-bold text-stone-700 text-sm mb-1">Your Boutique folder is empty</h5>
                    <p className="text-xs text-stone-500 max-w-sm mb-4 leading-normal">
                      No blouse photos were found inside <span className="font-semibold text-stone-700">"Abarnaa Tailoring Mart - Blouses"</span> folder. Use the upload panel to insert your first catalog design!
                    </p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            // Drive Unauthenticated Panel Block
            <div className="flex flex-col items-center py-12 px-6 text-center bg-white border border-gold-200 rounded-3xl max-w-2xl mx-auto">
              <ImageIcon className="w-12 h-12 text-gold-300 mb-4" />
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">Are you the shop administrator?</h4>
              <p className="text-stone-500 text-xs font-sans leading-relaxed max-w-md mb-6">
                De-clutter your static assets. Connect your Google account using the button in the top header. 
                Our platform will auto-create a folder in your Google Drive, allowing you to load, delete, 
                and update custom boutique images dynamically directly on your website in real-time.
              </p>
              <button
                onClick={onLogin}
                className="px-6 py-3 border border-gold-400 text-gold-700 bg-gold-50/50 hover:bg-gold-50 font-display font-medium text-xs uppercase tracking-widest rounded-full transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Connect Google Account
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
