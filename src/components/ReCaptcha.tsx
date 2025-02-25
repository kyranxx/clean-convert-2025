'use client';

import { useEffect, useCallback } from 'react';
import { useScript } from '@/hooks/useScript';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: string | HTMLElement, options: any) => number;
    };
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  action?: string;
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export default function ReCaptcha({ onVerify, action = 'convert' }: ReCaptchaProps) {
  const status = useScript(`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!window.grecaptcha) return;

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      onVerify(token);
    } catch (error) {
      console.error('reCAPTCHA verification failed:', error);
    }
  }, [action, onVerify]);

  useEffect(() => {
    if (status === 'ready' && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        handleReCaptchaVerify();
      });
    }
  }, [status, handleReCaptchaVerify]);

  return null; // reCAPTCHA v3 is invisible
}
