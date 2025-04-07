
import React from 'react';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';

export default function Feedback() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-food-oliveGreen">
        Send us your <span className="text-food-accentOrange">Feedback</span>
      </h1>
      <FeedbackForm />
    </div>
  );
}
