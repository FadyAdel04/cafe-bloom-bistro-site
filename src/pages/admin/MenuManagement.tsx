
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { menuItems } from '@/services/menu-service';
import { MenuCategory } from '@/types';

const MenuManagement = () => {
  const [filter, setFilter] = useState<MenuCategory | ''>('');
  
  const filteredItems = filter ? menuItems.filter(item => item.category === filter) : menuItems;
  
  const categories: { value: MenuCategory | ''; label: string }[] = [
    { value: '', label: 'All Categories' },
    { value: 'starters', label: 'Starters' },
    { value: 'main', label: 'Main Dishes' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'desserts', label: 'Desserts' },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-restaurant-secondary">Menu Management</h1>
          <p className="text-gray-500">Add, edit and remove menu items</p>
        </div>
        
        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90 mt-2 sm:mt-0">
          <Plus size={18} className="mr-2" />
          Add New Item
        </Button>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <select 
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
          value={filter}
          onChange={(e) => setFilter(e.target.value as MenuCategory | '')}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        
        <div className="flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Search menu items..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
          />
        </div>
      </div>
      
      {/* Menu Items Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MenuManagement;
