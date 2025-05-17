
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/types';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image_url} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-restaurant-secondary">{item.name}</h3>
          <span className="bg-restaurant-primary text-white px-2 py-1 rounded-full text-sm font-medium">
            E£{item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{item.description}</p>
        <div className="mt-4">
          <Button 
            onClick={() => addToCart(item)}
            className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
          >
            <ShoppingCart className="mr-2" size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
