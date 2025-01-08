import React from 'react';
import { Seedling, FlaskConical, Bug, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <Seedling className="h-8 w-8" />,
    title: 'Crop Recommendation',
    description: 'Get personalized crop suggestions based on soil conditions, climate, and location.',
  },
  {
    icon: <FlaskConical className="h-8 w-8" />,
    title: 'Fertilizer Guide',
    description: 'Learn about optimal fertilizer usage and NPK calculations for your crops.',
  },
  {
    icon: <Bug className="h-8 w-8" />,
    title: 'Disease Detection',
    description: 'Identify plant diseases and get recommended treatments and preventive measures.',
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Agricultural Blog',
    description: 'Access educational resources and expert insights on modern farming practices.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-100" id="features">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-green-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}