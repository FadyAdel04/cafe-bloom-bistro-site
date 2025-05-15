
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/contexts/AuthContext";

// Get user profile by ID
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data as UserProfile;
  } catch (err) {
    console.error('Error in getUserProfile:', err);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in updateUserProfile:', err);
    return false;
  }
}

// Get user orders
export async function getUserOrders(userId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_info->>user_id', userId) // Fix for excessive type instantiation
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
    
    return data;
  } catch (err) {
    console.error('Error in getUserOrders:', err);
    return [];
  }
}
