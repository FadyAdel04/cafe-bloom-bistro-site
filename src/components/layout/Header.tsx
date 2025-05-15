
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, LogIn, User, LogOut, LayoutDashboard } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { getTotalItems, toggleCart } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      dir="rtl"
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-bold text-restaurant-secondary">
          كافيه بلوم
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            الرئيسية
          </Link>
          <Link to="/menu" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            القائمة
          </Link>
          <Link to="/#about" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            من نحن
          </Link>
          <Link to="/#contact" className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors">
            اتصل بنا
          </Link>
          
          {/* Shopping Cart */}
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

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <div className="p-2 text-sm font-medium border-b">
                    مرحباً، {user.email}
                  </div>
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <LayoutDashboard className="ml-2" size={16} />
                        لوحة التحكم
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="ml-2" size={16} />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => navigate('/auth')}>
                  <LogIn className="ml-2" size={16} />
                  تسجيل الدخول
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Shopping Cart */}
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

          {/* User Icon for Mobile */}
          <Button 
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => user ? handleLogout() : navigate('/auth')}
          >
            {user ? <LogOut size={20} /> : <LogIn size={20} />}
          </Button>

          {/* Admin Dashboard Link for Mobile */}
          {isAdmin && (
            <Button 
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate('/admin')}
            >
              <LayoutDashboard size={20} />
            </Button>
          )}

          {/* Hamburger Menu */}
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-[60px] right-0 w-full bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        dir="rtl"
      >
        <div className="py-4 px-6 space-y-4">
          <Link 
            to="/" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            الرئيسية
          </Link>
          <Link 
            to="/menu" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            القائمة
          </Link>
          <Link 
            to="/#about" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            من نحن
          </Link>
          <Link 
            to="/#contact" 
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2"
            onClick={closeMobileMenu}
          >
            اتصل بنا
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
