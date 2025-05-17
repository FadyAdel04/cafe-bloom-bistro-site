import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-restaurant-secondary text-white pt-16 pb-8" dir="rtl">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="text-2xl font-heading font-bold mb-4 inline-block">
              مقهى بلوم
            </Link>
            <p className="text-gray-300 mt-4">
              نقدم ألذ الأطعمة ونخلق تجارب تناول طعام لا تنسى منذ عام 2010.
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

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-semibold mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  القائمة
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-restaurant-primary transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* ساعات العمل */}
          <div>
            <h3 className="text-lg font-semibold mb-6">ساعات العمل</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-300">الإثنين - الجمعة</span>
                <span>9:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">السبت</span>
                <span>11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">الأحد</span>
                <span>11:00 - 22:00</span>
              </li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-lg font-semibold mb-6">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={18} className="ml-2 text-restaurant-primary" />
                <span className="text-gray-300">شارع المطاعم 123، المدينة</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2 text-restaurant-primary" />
                <span className="text-gray-300">123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="ml-2 text-restaurant-primary" />
                <span className="text-gray-300">info@cafebloom.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} مقهى بلوم. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
