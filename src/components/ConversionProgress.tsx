'use client';

import { useEffect, useState } from 'react';

interface ConversionProgressProps {
  totalFiles: number;
  currentFile: number;
  isConverting: boolean;
}

export default function ConversionProgress({ totalFiles, currentFile, isConverting }: ConversionProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isConverting) {
      const percentage = (currentFile / totalFiles) * 100;
      setProgress(percentage);
    } else {
      setProgress(0);
    }
  }, [currentFile, totalFiles, isConverting]);

  if (!isConverting) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-content-light dark:text-content-dark/60">
          Converting {currentFile} of {totalFiles}
        </span>
        <span className="font-medium text-accent dark:text-accent-light">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-dark-grey-200 dark:bg-dark-grey-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent dark:bg-accent-light transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
