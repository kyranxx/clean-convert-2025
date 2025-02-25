'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import { SupportedFormat } from '@/lib/types';
import Logo from '@/components/Logo';
import PaymentLogos from '@/components/PaymentLogos';

interface FileWithPreview {
  file: File;
  preview: string;
  size: string;
  format: SupportedFormat;
}

export default function Home() {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string>('');
  const [quality, setQuality] = useState(80);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const handleConversion = async (files: FileWithPreview[], format: SupportedFormat, quality: number = 80) => {
    setIsConverting(true);
    setError('');

    try {
      setCurrentFileIndex(0);
      for (let i = 0; i < files.length; i++) {
        const { file } = files[i];
        setCurrentFileIndex(i);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', format);
        formData.append('quality', quality.toString());

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

        const originalName = file.name.replace(/\.[^/.]+$/, "");
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${originalName}_converted.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
      throw err;
    } finally {
      setIsConverting(false);
      setCurrentFileIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-grey-900">
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background pointer-events-none" />
        
        <section className="relative pt-8 pb-8 md:pt-12 md:pb-12">
          <div className="container-narrow text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-content dark:text-content-dark">
              Image Converter
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
              <span className="px-3 py-1 bg-accent/10 dark:bg-accent-dark/20 text-accent dark:text-accent-light rounded-full">JPEG</span>
              <span className="px-3 py-1 bg-accent/10 dark:bg-accent-dark/20 text-accent dark:text-accent-light rounded-full">PNG</span>
              <span className="px-3 py-1 bg-accent/10 dark:bg-accent-dark/20 text-accent dark:text-accent-light rounded-full">WebP</span>
              <span className="px-3 py-1 bg-accent/10 dark:bg-accent-dark/20 text-accent dark:text-accent-light rounded-full">GIF</span>
              <span className="px-3 py-1 bg-accent/10 dark:bg-accent-dark/20 text-accent dark:text-accent-light rounded-full">TIFF</span>
              <span className="px-3 py-1 bg-accent/10 dark:bg-accent-dark/20 text-accent dark:text-accent-light rounded-full">HEIF</span>
            </div>
            <p className="text-sm text-content-light dark:text-content-dark/80">
              First conversion free • No registration required
            </p>
          </div>
        </section>

        <section className="relative pb-8">
          <div className="container-narrow">
            <div className="bg-white/50 dark:bg-dark-grey-800/50 backdrop-blur-sm shadow-lg dark:shadow-dark-lg rounded-2xl border border-gray-100/50 dark:border-dark-grey-700/50">
              <FileUpload
                onFileSelect={(files, format) => handleConversion(files, format, quality)}
                isConverting={isConverting}
                onFilesChange={setSelectedFiles}
                selectedFiles={selectedFiles}
                currentFileIndex={currentFileIndex}
              />
              {error && (
                <div className="mx-6 mb-6 p-4 bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quality Slider */}
        {selectedFiles.length > 0 && (
          <section className="relative pb-8">
            <div className="container-narrow">
              <div className="bg-white/50 dark:bg-dark-grey-800/50 backdrop-blur-sm shadow-lg dark:shadow-dark-lg rounded-2xl border border-gray-100/50 dark:border-dark-grey-700/50 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-content dark:text-content-dark">Quality</h3>
                    <span className="text-sm font-medium text-content-light dark:text-content-dark/60">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-dark-grey-200 dark:bg-dark-grey-700 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm text-content-light dark:text-content-dark/60">
                    <span>Smaller file</span>
                    <span>Better quality</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Price Calculation */}
        {selectedFiles.length > 1 && (
          <section className="relative pb-8">
            <div className="container-narrow">
              <div className="bg-white/50 dark:bg-dark-grey-800/50 backdrop-blur-sm shadow-lg dark:shadow-dark-lg rounded-2xl border border-gray-100/50 dark:border-dark-grey-700/50 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-content dark:text-content-dark">Total Credits Required</h3>
                    <span className="text-lg font-medium text-accent dark:text-accent-light">{selectedFiles.length - 1}</span>
                  </div>
                  <p className="text-sm text-content-light dark:text-content-dark/60">
                    First conversion is free • Additional images require credits
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
