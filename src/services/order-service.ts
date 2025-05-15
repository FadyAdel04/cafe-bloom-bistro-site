
import { supabase } from "@/integrations/supabase/client";
import { Order, CartItem } from "@/types";

// Function to create a new order
export async function createOrder(items: CartItem[], userInfo?: Order['user_info']): Promise<Order | undefined> {
  const newOrder = {
    items: items,
    status: 'pending' as const,
    user_info: userInfo
  };

  const { data, error } = await supabase
    .from('orders')
    .insert(newOrder)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating order:", error);
    return undefined;
  }
  
  return data as Order;
}

// Function to get all orders
export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  
  return data as Order[];
}

// Function to get an order by id
export async function getOrderById(id: string): Promise<Order | undefined> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching order:", error);
    return undefined;
  }
  
  return data as Order;
}

// Function to update an order status
export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order | undefined> {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating order status:", error);
    return undefined;
  }
  
  return data as Order;
}
