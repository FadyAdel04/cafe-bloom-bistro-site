
import React, { useState } from 'react';
import CategoryFilter from '@/components/menu/CategoryFilter';
import MenuItem from '@/components/menu/MenuItem';
import { MenuCategory } from '@/types';
import { getMenuItemsByCategory } from '@/services/menu-service';
import { Search } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = getMenuItemsByCategory(activeCategory).filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Menu Banner */}
      <div className="bg-restaurant-secondary text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Explore our full selection of dishes and beverages, prepared with love and the finest ingredients
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="section-padding bg-restaurant-accent">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
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

          {/* Menu Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No menu items found matching your search.</p>
              <button 
                className="mt-4 text-restaurant-primary hover:underline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
