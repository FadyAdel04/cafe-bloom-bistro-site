
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuCategory } from '@/types';

interface CategoryFilterProps {
  activeCategory: MenuCategory;
  onChange: (category: MenuCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onChange }) => {
  const categories: { value: MenuCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'starters', label: 'Starters' },
    { value: 'main', label: 'Main Dishes' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'desserts', label: 'Desserts' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map(category => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? "default" : "outline"}
          onClick={() => onChange(category.value)}
          className={activeCategory === category.value 
            ? "bg-restaurant-primary hover:bg-restaurant-primary/90" 
            : "border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary/10"}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
