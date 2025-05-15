import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { MenuCategory } from '@/types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getMenuItemsByCategory, deleteMenuItem, addMenuItem, updateMenuItem } from '@/services/menu-service';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from '@/components/admin/ImageUpload';

const MenuManagement = () => {
  const [filter, setFilter] = useState<MenuCategory | ''>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<MenuCategory>('main');
  const [imageUrl, setImageUrl] = useState('');
  
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

  // Add mutation
  const addMutation = useMutation({
    mutationFn: (newItem: { name: string; description: string; price: number; category: MenuCategory; image_url: string }) => 
      addMenuItem(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('تم إضافة العنصر بنجاح');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error adding item:', error);
      toast.error('فشل إضافة العنصر');
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, item }: { id: string; item: { name: string; description: string; price: number; category: MenuCategory; image_url: string } }) => 
      updateMenuItem(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('تم تحديث العنصر بنجاح');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error updating item:', error);
      toast.error('فشل تحديث العنصر');
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('تم حذف العنصر بنجاح');
    },
    onError: (error) => {
      console.error('Error deleting item:', error);
      toast.error('فشل حذف العنصر');
    }
  });

  // Function to handle menu item deletion
  const handleDeleteItem = (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا العنصر؟')) {
      deleteMutation.mutate(id);
    }
  };

  // Function to open dialog for editing
  const handleEditItem = (item: any) => {
    setIsEditing(true);
    setCurrentItemId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setCategory(item.category as MenuCategory);
    setImageUrl(item.image_url);
    setIsDialogOpen(true);
  };

  // Function to open dialog for adding
  const handleAddItem = () => {
    resetForm();
    setIsEditing(false);
    setCurrentItemId(null);
    setIsDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('main');
    setImageUrl('');
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemData = {
      name,
      description,
      price: parseFloat(price),
      category,
      image_url: imageUrl || '/images/menu/placeholder.jpg'
    };

    if (isEditing && currentItemId) {
      updateMutation.mutate({ id: currentItemId, item: itemData });
    } else {
      addMutation.mutate(itemData);
    }
  };

  return (
    <div dir="rtl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-restaurant-secondary">إدارة القائمة</h1>
          <p className="text-gray-500">إضافة وتعديل وإزالة عناصر القائمة</p>
        </div>
        
        <Button 
          className="bg-restaurant-primary hover:bg-restaurant-primary/90 mt-2 sm:mt-0"
          onClick={handleAddItem}
        >
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
          <Input
            type="text" 
            placeholder="ابحث في عناصر القائمة..."
            className="w-full"
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
                        {categories.find(cat => cat.value === item.category)?.label || item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.price.toFixed(2)} ريال
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEditItem(item)}
                      >
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'تعديل عنصر القائمة' : 'إضافة عنصر جديد'}</DialogTitle>
            <DialogDescription>
              أدخل معلومات العنصر الجديد هنا. اضغط حفظ عند الانتهاء.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم العنصر</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="أدخل اسم العنصر"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="أدخل وصف العنصر"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">السعر</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">الفئة</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MenuCategory)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="starters">المقبلات</option>
                  <option value="main">الأطباق الرئيسية</option>
                  <option value="drinks">المشروبات</option>
                  <option value="desserts">الحلويات</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUpload">صورة العنصر</Label>
              <ImageUpload 
                value={imageUrl} 
                onChange={setImageUrl}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending}>
                {(addMutation.isPending || updateMutation.isPending) ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>{isEditing ? 'تحديث' : 'إضافة'}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManagement;
