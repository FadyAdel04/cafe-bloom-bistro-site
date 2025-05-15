
import { MenuItem } from "@/types";

// This is mock data that will be replaced with actual data from Supabase
export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Mediterranean Salad",
    description: "Fresh mixed greens, feta cheese, olives, tomatoes with balsamic dressing",
    price: 10.99,
    image_url: "/images/menu/salad.jpg",
    category: "starters",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Grilled Chicken Pasta",
    description: "Tender grilled chicken on a bed of fettuccine with creamy alfredo sauce",
    price: 15.99,
    image_url: "/images/menu/pasta.jpg",
    category: "main",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheddar cheese, lettuce, tomato on a brioche bun",
    price: 14.49,
    image_url: "/images/menu/burger.jpg",
    category: "main",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Cappuccino",
    description: "Espresso with steamed milk, topped with a layer of frothed milk",
    price: 4.99,
    image_url: "/images/menu/coffee.jpg",
    category: "drinks",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Chocolate Mousse",
    description: "Rich and creamy chocolate mousse topped with whipped cream",
    price: 7.99,
    image_url: "/images/menu/dessert.jpg",
    category: "desserts",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice, no added sugar",
    price: 3.99,
    image_url: "/images/menu/juice.jpg",
    category: "drinks",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Bruschetta",
    description: "Toasted bread topped with tomatoes, basil, garlic, and olive oil",
    price: 8.99,
    image_url: "/images/menu/bruschetta.jpg",
    category: "starters",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
    price: 8.49,
    image_url: "/images/menu/tiramisu.jpg",
    category: "desserts",
    created_at: new Date().toISOString(),
  }
];

// Function to get menu items by category
export function getMenuItemsByCategory(category: string = 'all'): MenuItem[] {
  if (category === 'all') {
    return menuItems;
  }
  
  return menuItems.filter(item => item.category === category);
}

// Function to get a specific menu item by id
export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}
