import React from 'react';
import { Sprout, Navigation, Leaf, Flask, BookOpen } from 'lucide-react';

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
            <NavLink icon={<Flask />} text="Fertilizer Guide" href="#fertilizer" />
            <NavLink icon={<Leaf />} text="Disease Detection" href="#disease" />
            <NavLink icon={<BookOpen />} text="Blog" href="#blog" />
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-center space-x-2 hover:text-green-200 transition-colors duration-200"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}