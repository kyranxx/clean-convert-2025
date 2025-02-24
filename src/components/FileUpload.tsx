'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { SupportedFormat, isFormatSupported, getFormatFromMimeType, supportedFormats } from '@/lib/types';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import LoadingSpinner from './LoadingSpinner';

interface FileUploadProps {
  onFileSelect: (file: File, format: SupportedFormat) => Promise<void>;
  isConverting?: boolean;
}

type ErrorMessage = string | null;

interface FileWithPreview {
  file: File;
  preview: string;
  size: string;
  format: SupportedFormat;
}

export default function FileUpload({ onFileSelect, isConverting = false }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<SupportedFormat>('jpeg');
  const [error, setError] = useState<ErrorMessage>(null);
  const [hasMixedFormats, setHasMixedFormats] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearFiles();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearFiles = () => {
    selectedFiles.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });
    setSelectedFiles([]);
    setError(null);
    setHasMixedFormats(false);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      
      // Check for mixed formats in remaining files
      const formats = new Set(newFiles.map(f => f.format));
      setHasMixedFormats(formats.size > 1);
      
      return newFiles;
    });
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/tiff', 'image/heif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload valid image files');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return false;
    }
    return true;
  };

  const addFiles = (files: FileList) => {
    setIsProcessing(true);
    const newFiles: FileWithPreview[] = [];
    
    Array.from(files).forEach(file => {
      if (validateFile(file)) {
        const format = getFormatFromMimeType(file.type) || 'jpeg';
        newFiles.push({
          file,
          preview: URL.createObjectURL(file),
          size: formatFileSize(file.size),
          format
        });
      }
    });

    if (!session?.user && newFiles.length > 1) {
      setError('Please sign in to convert multiple images');
      setIsProcessing(false);
      return;
    }

    if (session?.user && session.user.credits < newFiles.length) {
      setError(`Insufficient credits. You need ${newFiles.length} credits to convert these images.`);
      setIsProcessing(false);
      return;
    }

    setSelectedFiles(prev => {
      const allFiles = [...prev, ...newFiles];
      const formats = new Set(allFiles.map(f => f.format));
      setHasMixedFormats(formats.size > 1);
      return allFiles;
    });
    setIsProcessing(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  }, [session?.user]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      addFiles(files);
    }
  }, [session?.user]);

  const handleFormatChange = useCallback((format: string) => {
    if (isFormatSupported(format)) {
      setSelectedFormat(format);
    }
  }, []);

  const handleChooseFile = () => {
    if (!isConverting && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleConvert = useCallback(async () => {
    if (selectedFiles.length === 0 || !isFormatSupported(selectedFormat)) return;
    
    if (!session?.user && selectedFiles.length > 1) {
      toast.error('Please sign in to convert multiple images');
      return;
    }

    if (session?.user && session.user.credits < selectedFiles.length) {
      toast.error(`Insufficient credits. You need ${selectedFiles.length} credits to convert these images.`);
      return;
    }

    try {
      for (const { file } of selectedFiles) {
        await onFileSelect(file, selectedFormat);
      }
      clearFiles();
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('An error occurred during conversion');
    }
  }, [selectedFiles, selectedFormat, onFileSelect, session?.user]);

  // Get available formats (exclude current format if single file)
  const availableFormats = supportedFormats.filter(format => {
    if (selectedFiles.length === 0) return true;
    if (hasMixedFormats) return true;
    return format !== selectedFiles[0].format;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 dark:bg-accent-dark/10 rounded-full">
          <svg className="w-5 h-5 text-accent dark:text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm font-medium text-accent dark:text-accent-light">
            Free Conversion - No Credit Card Required
          </p>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-content-light dark:text-content-dark/60">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Supports All Major Formats</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% Private & Secure</span>
          </div>
        </div>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-250
          ${dragActive ? 'border-primary bg-primary/5 scale-[1.02] shadow-lg' : 'border-dark-grey-300'}
          ${isConverting || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-background-light hover:shadow-medium group'}
          before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-dashed before:border-transparent
          before:transition-all before:duration-250 hover:before:border-primary/30 hover:before:scale-105`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
          disabled={isConverting || isProcessing}
          id="file-upload"
          multiple
        />
        
        {isProcessing ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-dark-grey-800/80 rounded-xl z-10">
            <LoadingSpinner size="md" />
          </div>
        ) : null}

        <div className="space-y-6">
          {selectedFiles.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-medium">
                      <img
                        src={file.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-250 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-250 opacity-0 group-hover:opacity-100"
                        title="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                        <p className="text-xs text-white truncate">
                          {file.file.name}
                        </p>
                        <p className="text-xs text-white/70">{file.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={handleChooseFile}
                  className="border-2 border-dashed border-dark-grey-200 dark:border-dark-grey-700 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-primary transition-all duration-250 group/add hover:scale-105"
                >
                  <div className="text-content-light group-hover/add:text-primary transition-colors duration-250">
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 transition-transform duration-250 group-hover/add:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover/add:scale-100 transition-transform duration-250" />
                    </div>
                    <span className="text-sm font-medium">Add More</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-content-light space-y-4">
                <div className="relative inline-block">
                  <svg className="w-20 h-20 mx-auto text-accent/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0-16l-4 4m4-4l4 4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-medium mb-2">Drop your images here</p>
                  <p className="text-sm text-content-light/70 mb-4">or</p>
                </div>
                <button 
                  onClick={handleChooseFile}
                  className="btn-primary px-8 hover:scale-105 transition-transform duration-250" 
                  disabled={isConverting || isProcessing}
                >
                  Choose Files
                </button>
                <p className="text-xs text-content-light/60 mt-4">
                  Supported formats: JPEG, PNG, WEBP, GIF, TIFF, HEIF
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-content">Output Format</h3>
              {hasMixedFormats && (
                <p className="text-sm text-accent dark:text-accent-light flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mixed formats - All images will be converted to the selected format
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableFormats.map((format) => (
                <button
                  key={format}
                  onClick={() => handleFormatChange(format)}
                  className={`format-btn ${selectedFormat === format ? 'active' : ''}`}
                  disabled={isConverting || isProcessing}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleConvert}
            disabled={isConverting || isProcessing || selectedFiles.length === 0}
            className={`btn-primary w-full ${
              isConverting || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isConverting ? (
              <span className="inline-flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Converting...
              </span>
            ) : (
              `Convert ${selectedFiles.length > 1 ? `${selectedFiles.length} Images` : 'Image'}`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
