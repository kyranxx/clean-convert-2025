export type SupportedFormat = 
  | 'jpeg' 
  | 'png' 
  | 'webp' 
  | 'gif' 
  | 'tiff' 
  | 'avif'
  | 'heif';

export const supportedFormats: SupportedFormat[] = [
  'jpeg',
  'png',
  'webp',
  'gif',
  'tiff',
  'avif',
  'heif'
];

export const mimeTypes: Record<string, SupportedFormat> = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/tiff': 'tiff',
  'image/avif': 'avif',
  'image/heif': 'heif'
};

export function isFormatSupported(format: string): format is SupportedFormat {
  return supportedFormats.includes(format as SupportedFormat);
}

export function getFormatFromMimeType(mimeType: string): SupportedFormat | null {
  return mimeTypes[mimeType] || null;
}

import { ConversionStatus, CreditType } from '@prisma/client';

export interface Conversion {
  id: string;
  userId: string;
  originalName: string;
  originalSize: number;
  convertedSize: number;
  fromFormat: string;
  toFormat: string;
  status: ConversionStatus;
  createdAt: string;
  completedAt: string | null;
  error: string | null;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: CreditType;
  createdAt: string;
}

export interface CreditPackage {
  credits: number;
  price: number;
  popular?: boolean;
}

export const creditPackages: CreditPackage[] = [
  { credits: 10, price: 5, popular: false },
  { credits: 50, price: 20, popular: true },
  { credits: 100, price: 35, popular: false }
];
