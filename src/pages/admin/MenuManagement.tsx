
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { MenuCategory } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMenuItemsByCategory, deleteMenuItem } from '@/services/menu-service';
import { toast } from 'sonner';

const MenuManagement = () => {
  const [filter, setFilter] = useState<MenuCategory | ''>('');
  const queryClient = useQueryClient();
  
  // Fetch menu items using React Query
  const { data: menuItems = [], isLoading, error } = useQuery({
    queryKey: ['menuItems', 'admin', filter],
    queryFn: () => getMenuItemsByCategory(filter || 'all'),
  });
  
  const categories: { value: MenuCategory | ''; label: string }[] = [
    { value: '', label: 'كل الفئات' },
    { value: 'starters', label: 'المقبلات' },
    { value: 'main', label: 'الأطباق الرئيسية' },
    { value: 'drinks', label: 'المشروبات' },
    { value: 'desserts', label: 'الحلويات' },
  ];

  // Function to handle menu item deletion
  const handleDeleteItem = async (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا العنصر؟')) {
      try {
        const success = await deleteMenuItem(id);
        if (success) {
          toast.success('تم حذف العنصر بنجاح');
          queryClient.invalidateQueries({ queryKey: ['menuItems'] });
        } else {
          toast.error('فشل حذف العنصر');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('حدث خطأ أثناء محاولة حذف العنصر');
      }
    }
  };

  return (
    <div dir="rtl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-restaurant-secondary">إدارة القائمة</h1>
          <p className="text-gray-500">إضافة وتعديل وإزالة عناصر القائمة</p>
        </div>
        
        <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90 mt-2 sm:mt-0">
          <Plus size={18} className="ml-2" />
          إضافة عنصر جديد
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
            placeholder="ابحث في عناصر القائمة..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
          />
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">جاري تحميل عناصر القائمة...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-12 text-red-500">
          <p>حدث خطأ أثناء تحميل عناصر القائمة. يرجى المحاولة مرة أخرى.</p>
          <Button variant="outline" className="mt-4" onClick={() => queryClient.invalidateQueries({ queryKey: ['menuItems'] })}>
            إعادة المحاولة
          </Button>
        </div>
      )}
      
      {/* Menu Items Table */}
      {!isLoading && !error && (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العنصر
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السعر
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuItems.map(item => (
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
                        <div className="mr-4">
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
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {menuItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">لا توجد عناصر في القائمة تطابق المعايير المحددة.</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default MenuManagement;
