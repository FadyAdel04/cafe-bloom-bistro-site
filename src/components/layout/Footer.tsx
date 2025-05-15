
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-restaurant-secondary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="text-2xl font-heading font-bold mb-4 inline-block">
              Café Bloom
            </Link>
            <p className="text-gray-300 mt-4">
              Serving delicious food and creating memorable dining experiences since 2010.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-restaurant-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-restaurant-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-restaurant-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span>9:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Saturday</span>
                <span>11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Sunday</span>
                <span>11:00 - 22:00</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-restaurant-primary" />
                <span className="text-gray-300">123 Restaurant Street, City</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-restaurant-primary" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-restaurant-primary" />
                <span className="text-gray-300">info@cafebloom.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Café Bloom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
