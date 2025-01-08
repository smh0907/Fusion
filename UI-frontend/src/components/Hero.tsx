import React from 'react';
import { Plane } from 'lucide-react';
import NavLink from './Header/NavLink';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-green-700 to-green-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Plane className="h-16 w-16 mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Agricultural Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Your comprehensive platform for smart farming decisions, crop management,
            and agricultural solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors duration-200">
              <NavLink text='Get Started' icon={undefined} href='#crop'/>
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-100"></div>
    </div>
  );
}