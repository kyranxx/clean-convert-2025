'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

interface AuthFormProps {
  mode: 'signin' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error creating account');
        }
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        const errorMessage = mode === 'register' ? 'Error signing in after registration' : 'Invalid email or password';
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success(mode === 'register' ? 'Account created successfully!' : 'Signed in successfully!');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-dark-grey-800 dark:text-dark-grey-200 mb-2">
        {mode === 'signin' ? 'Welcome back!' : 'Create your account'}
      </h2>
      <p className="text-sm text-dark-grey-600 dark:text-dark-grey-400">
        {mode === 'signin' 
          ? 'Sign in to your Clean Convert account'
          : 'Start converting multiple images'}
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="space-y-1">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            aria-label="Email address"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
          />
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm bg-red-50/50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-flex items-center">
              <LoadingSpinner size="sm" className="mr-2" />
              {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : (
            mode === 'signin' ? 'Sign in' : 'Create account'
          )}
        </button>

        <div className="text-sm">
          <span className="text-dark-grey-600 dark:text-dark-grey-400">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <Link 
            href={mode === 'signin' ? '/auth/register' : '/auth/signin'} 
            className="text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent transition-colors"
          >
            {mode === 'signin' ? 'Create one' : 'Sign in'}
          </Link>
        </div>
      </form>
    </div>
  );
}
