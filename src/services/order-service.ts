
import { supabase } from "@/integrations/supabase/client";
import { Order, CartItem } from "@/types";
import { Json } from "@/integrations/supabase/types";

// Function to create a new order
export async function createOrder(items: CartItem[], userInfo?: Order['user_info']): Promise<Order | undefined> {
  // Convert CartItem[] to a format that Supabase can store as JSON
  const newOrder = {
    items: items as unknown as Json,
    status: 'pending' as const,
    user_info: userInfo as unknown as Json
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
  
  // Convert the returned data back to our Order type
  return {
    ...data,
    items: data.items as unknown as CartItem[]
  } as Order;
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
  
  // Convert items from JSON to CartItem[]
  return data.map(order => ({
    ...order,
    items: order.items as unknown as CartItem[]
  })) as Order[];
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
  
  if (!data) return undefined;
  
  // Convert items from JSON to CartItem[]
  return {
    ...data,
    items: data.items as unknown as CartItem[]
  } as Order;
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
  
  // Convert items from JSON to CartItem[]
  return {
    ...data,
    items: data.items as unknown as CartItem[]
  } as Order;
}
