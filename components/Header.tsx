import React, { useState } from 'react';
import { Page } from '../types';
import { BrainIcon, MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  navigateTo: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, navigateTo, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => navigateTo(page)}
      className={`w-full text-left md:w-auto md:text-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-sky-600 text-white'
          : 'text-slate-700 hover:bg-sky-100'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink page="home" currentPage={currentPage} navigateTo={navigateTo}>Inicio</NavLink>
      <NavLink page="booking" currentPage={currentPage} navigateTo={navigateTo}>Agendar Cita</NavLink>
      <NavLink page="support" currentPage={currentPage} navigateTo={navigateTo}>Apoyo Académico</NavLink>
      <NavLink page="my-bookings" currentPage={currentPage} navigateTo={navigateTo}>Mis Reservas</NavLink>
    </>
  );


  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <BrainIcon className="h-8 w-8 text-sky-600" />
            <span className="text-xl font-bold text-slate-800">FormArte</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks}
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-600 hover:bg-slate-100">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4" onClick={() => setIsMenuOpen(false)}>
            <nav className="flex flex-col space-y-2">
                {navLinks}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;