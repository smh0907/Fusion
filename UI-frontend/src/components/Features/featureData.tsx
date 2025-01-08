import React from 'react';
import { Sprout, Beaker, Bug, BookOpen } from 'lucide-react';

export const features = [
  {
    icon: <Sprout className="h-8 w-8" />,
    title: 'Crop Recommendation',
    description: 'Get personalized crop suggestions based on soil conditions, climate, and location.',
  },
  {
    icon: <Beaker className="h-8 w-8" />,
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