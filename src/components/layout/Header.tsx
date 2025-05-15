
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const { getTotalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-bold text-restaurant-secondary">
          Café Bloom
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            Home
          </Link>
          <Link to="/menu" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            Menu
          </Link>
          <Link to="/#about" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            About
          </Link>
          <Link to="/#contact" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            Contact
          </Link>
          <Button 
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
          >
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-restaurant-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost"
            size="icon"
            className="relative mr-2"
            onClick={toggleCart}
          >
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-restaurant-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getTotalItems()}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-[60px] left-0 w-full bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="py-4 px-6 space-y-4">
          <Link 
            to="/" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            Menu
          </Link>
          <Link 
            to="/#about" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link 
            to="/#contact" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
