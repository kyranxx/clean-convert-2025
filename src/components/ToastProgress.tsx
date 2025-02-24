'use client';

import { Toaster, ToastBar, Toast, toast } from 'react-hot-toast';

interface ToastProgressProps {
  progress?: number;
}

interface CustomToast extends Toast {
  progress?: number;
}

export function ToastContainer() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: `
          !bg-surface/90 !text-content 
          dark:!bg-surface-dark/90 dark:!text-content-dark 
          !shadow-lg dark:!shadow-dark-lg 
          !backdrop-blur-sm !border !border-dark-grey-200/50 
          dark:!border-dark-grey-700/50 !rounded-xl
        `,
        duration: 4000,
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: 'white',
          },
          style: {
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
          style: {
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          },
        },
      }}
    >
      {(t: CustomToast) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex-shrink-0">
                {icon}
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-sm font-medium">
                  {message}
                </div>
                {t.type === 'loading' && t.progress !== undefined && (
                  <ToastProgress progress={t.progress} />
                )}
              </div>
              {t.type !== 'loading' && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-dark-grey-200/50 dark:hover:bg-dark-grey-700/50 transition-colors"
                >
                  <svg className="w-4 h-4 text-content-light dark:text-dark-grey-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default function ToastProgress({ progress = 0 }: ToastProgressProps) {
  return (
    <div className="w-full h-1 bg-dark-grey-200/50 dark:bg-dark-grey-700/50 rounded-full overflow-hidden mt-2">
      <div
        className="h-full bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] animate-gradient rounded-full transition-all duration-250 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
