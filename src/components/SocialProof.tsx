'use client';

import { useHoverEffect, useParallaxEffect } from '@/hooks/useHoverEffect';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

interface SocialProofProps {
  className?: string;
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { elementRef, style: parallaxStyle } = useParallaxEffect({
    intensity: 3,
    perspective: 1000,
  });

  const { hoverProps, isHovered } = useHoverEffect({
    scale: 1.02,
    duration: 200,
  });

  return (
    <div
      ref={elementRef}
      style={parallaxStyle}
      className="transform-gpu"
    >
      <div
        {...hoverProps}
        className={`bg-white dark:bg-dark-grey-800 rounded-2xl p-6 transition-all duration-200 ${
          isHovered
            ? 'shadow-xl dark:shadow-dark-grey-900/20'
            : 'shadow-lg dark:shadow-dark-grey-900/10'
        }`}
      >
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 transition-colors duration-200 ${
                i < testimonial.rating
                  ? isHovered
                    ? 'text-yellow-300'
                    : 'text-yellow-400'
                  : 'text-dark-grey-200 dark:text-dark-grey-700'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-content dark:text-content-dark mb-6 transition-colors duration-200">
          "{testimonial.content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          {testimonial.imageUrl ? (
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className={`w-12 h-12 rounded-full object-cover transition-transform duration-200 ${
                isHovered ? 'scale-110' : ''
              }`}
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-lg font-medium transition-transform duration-200 ${
                isHovered ? 'scale-110' : ''
              }`}
            >
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-medium text-content dark:text-content-dark">
              {testimonial.name}
            </div>
            <div className="text-sm text-content-light/70 dark:text-content-dark/60">
              {testimonial.role} at {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof({ className = '', testimonials }: SocialProofProps) {
  return (
    <div className={`py-16 ${className}`}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-content dark:text-content-dark mb-4">
          Trusted by creators worldwide
        </h2>
        <p className="text-lg text-content-light/70 dark:text-content-dark/60">
          Join thousands of satisfied users who trust our image conversion tools
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
