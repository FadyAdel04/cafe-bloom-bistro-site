
import { supabase } from "@/integrations/supabase/client";
import { MenuItem, MenuCategory } from "@/types";

// Function to get menu items by category from Supabase
export async function getMenuItemsByCategory(category: string = 'all'): Promise<MenuItem[]> {
  const query = supabase.from('menu_items').select('*');
  
  if (category !== 'all') {
    query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
  
  return data as MenuItem[];
}

// Function to get a specific menu item by id
export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching menu item:", error);
    return undefined;
  }
  
  return data as MenuItem;
}

// Function to add a new menu item
export async function addMenuItem(menuItem: Omit<MenuItem, 'id' | 'created_at'>): Promise<MenuItem | undefined> {
  const { data, error } = await supabase
    .from('menu_items')
    .insert(menuItem)
    .select()
    .single();
  
  if (error) {
    console.error("Error adding menu item:", error);
    return undefined;
  }
  
  return data as MenuItem;
}

// Function to update a menu item
export async function updateMenuItem(id: string, menuItem: Partial<MenuItem>): Promise<MenuItem | undefined> {
  const { data, error } = await supabase
    .from('menu_items')
    .update(menuItem)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating menu item:", error);
    return undefined;
  }
  
  return data as MenuItem;
}

// Function to delete a menu item
export async function deleteMenuItem(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error("Error deleting menu item:", error);
    return false;
  }
  
  return true;
}
