import React from 'react';
import { Sprout, Navigation, Leaf, Beaker, BookOpen } from 'lucide-react';
import NavLink from './NavLink';

export default function Header() {
  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Fusion</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink icon={<Navigation />} text="Crop Recommendation" href="#crop" />
            <NavLink icon={<Beaker />} text="Fertilizer Guide" href="#fertilizer" />
            <NavLink icon={<Leaf />} text="Disease Detection" href="#disease" />
            <NavLink icon={<BookOpen />} text="Blog" href="#blog" />
          </nav>
        </div>
      </div>
    </header>
  );
}