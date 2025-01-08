import React from 'react';

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export default function NavLink({ icon, text, href }: NavLinkProps) {
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