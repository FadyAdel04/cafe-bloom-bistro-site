
import React, { useState, useEffect } from 'react';
import CategoryFilter from '@/components/menu/CategoryFilter';
import MenuItem from '@/components/menu/MenuItem';
import { MenuCategory } from '@/types';
import { getMenuItemsByCategory } from '@/services/menu-service';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use React Query to fetch menu items
  const { data: menuItems = [], isLoading, error } = useQuery({
    queryKey: ['menuItems', activeCategory],
    queryFn: () => getMenuItemsByCategory(activeCategory),
  });
  
  // Filter menu items based on search query
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen" dir="rtl">
      {/* Menu Banner */}
      <div className="bg-restaurant-secondary text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">قائمتنا</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            استكشف مجموعتنا الكاملة من الأطباق والمشروبات، المُحضرة بحب وأجود المكونات
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="section-padding bg-restaurant-accent">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث في القائمة..."
                className="w-full pr-10 pl-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <CategoryFilter 
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <Skeleton className="h-48 w-full rounded-md mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">حدث خطأ أثناء تحميل القائمة. يرجى المحاولة مرة أخرى.</p>
              <button 
                className="mt-4 text-restaurant-primary hover:underline"
                onClick={() => window.location.reload()}
              >
                تحديث الصفحة
              </button>
            </div>
          )}

          {/* Menu Items Grid */}
          {!isLoading && !error && (
            <>
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map(item => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">لا توجد عناصر تطابق بحثك.</p>
                  <button 
                    className="mt-4 text-restaurant-primary hover:underline"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                  >
                    مسح البحث والمحاولة مرة أخرى
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
