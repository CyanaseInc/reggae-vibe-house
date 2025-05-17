
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <> <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-reggae-black bg-opacity-95 shadow-md py-2' : 'bg-reggae-black py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-white font-heading text-2xl md:text-3xl"> <img
            className="w-[1px] sm:w-[40px] md:w-[80px] lg:w-[50px] h-auto mb-4"
            src="logo.jpg"
            alt="House of Reggae Logo"
          /></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>


          <NavLink to="/about">About</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/marketplace" className="bg-reggae-red px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200">
            Shop
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-reggae-black bg-opacity-95">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</MobileNavLink>
            <MobileNavLink to="/team" onClick={() => setIsMenuOpen(false)}>Team</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
            <MobileNavLink to="/marketplace" onClick={() => setIsMenuOpen(false)} className="bg-reggae-red px-4 py-2 rounded-md text-center">
              Shop
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav><br></br>
    </>

  );
};

// Desktop NavLink Component
const NavLink = ({ to, children, className = "" }: { to: string, children: React.ReactNode, className?: string }) => (
  <Link
    to={to}
    className={`text-white hover:text-reggae-gold transition duration-200 ${className}`}
  >
    {children}
  </Link>
);

// Mobile NavLink Component
const MobileNavLink = ({ to, children, className = "", onClick }: { to: string, children: React.ReactNode, className?: string, onClick: () => void }) => (
  <Link
    to={to}
    className={`text-white hover:text-reggae-gold transition duration-200 block py-2 ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
