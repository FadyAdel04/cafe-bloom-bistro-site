
import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

// Get notifications for user
export async function getNotifications(): Promise<Notification[]> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
    
    return data as Notification[];
  } catch (err) {
    console.error('Error in getNotifications:', err);
    return [];
  }
}

// Mark notification as read
export async function markAsRead(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    
    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in markAsRead:', err);
    return false;
  }
}

// Get notification count
export async function getUnreadCount(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('id')
      .eq('read', false);
    
    if (error) {
      console.error('Error fetching notification count:', error);
      return 0;
    }
    
    return data.length;
  } catch (err) {
    console.error('Error in getUnreadCount:', err);
    return 0;
  }
}
