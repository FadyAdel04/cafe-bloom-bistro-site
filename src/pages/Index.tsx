
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryFilter from '@/components/menu/CategoryFilter';
import MenuItem from '@/components/menu/MenuItem';
import { MenuCategory, MenuItem as MenuItemType } from '@/types';
import { getMenuItemsByCategory } from '@/services/menu-service';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [featuredItems, setFeaturedItems] = useState<MenuItemType[]>([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      const items = await getMenuItemsByCategory(activeCategory);
      setFeaturedItems(items.slice(0, 4));
    };
    
    fetchItems();
  }, [activeCategory]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" dir="rtl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="صورة الغلاف" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              تذوق السعادة، تلذذ بالحب
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              استمتع بالمزيج المثالي من النكهات والأجواء في كافيه بلوم، 
              حيث كل وجبة تروي قصة وكل رشفة تجلب الراحة.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
                onClick={() => scrollToSection('menu')}
                size="lg"
              >
                اطلب الآن
              </Button>
              <Link to="/menu">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-restaurant-secondary"
                  size="lg"
                >
                  تصفح القائمة كاملة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="section-padding bg-restaurant-accent" dir="rtl">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">قائمتنا المميزة</h2>
            <p className="section-subtitle">استكشف مأكولاتنا ومشروباتنا المختارة بعناية</p>
            <CategoryFilter 
              activeCategory={activeCategory} 
              onChange={setActiveCategory} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button 
                className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
                size="lg"
              >
                عرض القائمة كاملة <ArrowRight size={16} className="mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding" dir="rtl">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden h-[400px]">
              <img 
                src="/images/about.jpg" 
                alt="من نحن" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="section-title">قصتنا</h2>
              <p className="text-gray-600 mb-6">
                بدأ كافيه بلوم في عام 2010 مع رؤية بسيطة: إنشاء مكان يجمع الناس معًا من خلال الطعام.
                ما بدأ كمقهى صغير نما ليصبح مؤسسة محبوبة تحتفل بفن الطهي.
              </p>
              <p className="text-gray-600 mb-6">
                يجمع طهاتنا بين الوصفات التقليدية والتقنيات المبتكرة، باستخدام أفضل المكونات المحلية الطازجة
                لإنشاء أطباق تُسعد الحواس وتغذي الجسم.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <h4 className="font-semibold text-restaurant-secondary text-lg mb-2">الموقع</h4>
                  <p className="text-gray-600">123 شارع المطعم، المدينة</p>
                </div>
                <div>
                  <h4 className="font-semibold text-restaurant-secondary text-lg mb-2">ساعات العمل</h4>
                  <p className="text-gray-600">من الاثنين إلى الجمعة: 9 ص - 10 م</p>
                  <p className="text-gray-600">السبت والأحد: 11 ص - 11 م</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-restaurant-secondary text-white" dir="rtl">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">تواصل معنا</h2>
              <p className="mb-8 text-gray-300">
                يسعدنا سماع رأيك! أرسل لنا رسالة وسنرد في أقرب وقت ممكن.
              </p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">الاسم</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
                      placeholder="اسمك"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
                      placeholder="بريدك الإلكتروني"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">الرسالة</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
                    placeholder="رسالتك"
                  ></textarea>
                </div>
                
                <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-white">
                  إرسال الرسالة
                </Button>
              </form>
            </div>
            
            <div>
              <div className="h-[400px] rounded-lg overflow-hidden">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="font-medium mb-2">موقعنا على الخريطة</h3>
                    <p className="text-sm text-gray-300">
                      123 شارع المطعم، المدينة
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
