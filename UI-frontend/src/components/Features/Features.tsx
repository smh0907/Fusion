import React from 'react';
import FeatureCard from './FeatureCard';
import { features } from './featureData';

export default function Features() {
  return (
    <section className="py-20 bg-gray-100" id="features">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}