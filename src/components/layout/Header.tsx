import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Menu,
  X,
  LogIn,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../../../public/images/logo.png";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-sm ${
        isScrolled ? "py-2 shadow-md" : "py-3"
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="p-2 md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Bloom Bistro"
              className="h-12 w-auto md:h-14 transition-all duration-300"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors"
          >
            الرئيسية
          </Link>
          <Link
            to="/menu"
            className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors"
          >
            القائمة
          </Link>
          <Link
            to="/#about"
            className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors"
          >
            من نحن
          </Link>
          <Link
            to="#/contact"
            className="font-medium text-restaurant-secondary hover:text-restaurant-primary transition-colors"
          >
            اتصل بنا
          </Link>
        </nav>

        <div className="flex items-center gap-2">
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

          {/* User Menu - Desktop */}
          <div className="hidden md:block">
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
                        <DropdownMenuItem onClick={() => navigate("/admin")}>
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
                  <DropdownMenuItem onClick={() => navigate("/auth")}>
                    <LogIn className="ml-2" size={16} />
                    تسجيل الدخول
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Icon - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => (user ? handleLogout() : navigate("/auth"))}
          >
            {user ? <LogOut size={20} /> : <LogIn size={20} />}
          </Button>

          {/* Admin Dashboard Link for Mobile */}
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => navigate("/admin")}
            >
              <LayoutDashboard size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[72px] right-0 w-full bg-white shadow-lg transform transition-transform duration-300 md:hidden z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        <div className="py-3 px-6 space-y-3 border-t">
          <Link
            to="/"
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2 border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            الرئيسية
          </Link>
          <Link
            to="/menu"
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2 border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            القائمة
          </Link>
          <Link
            to="/#about"
            className="block font-medium text-restaurant-secondary hover:text-restaurant-primary py-2 border-b border-gray-100"
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
