
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'completed';
  user_info?: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  created_at: string;
}

export type MenuCategory = 'all' | 'starters' | 'main' | 'drinks' | 'desserts';
