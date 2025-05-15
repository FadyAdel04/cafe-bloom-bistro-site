
import { supabase } from "@/integrations/supabase/client";

// Simple admin credentials (in a real app, these would be in the database)
const ADMIN_EMAIL = "admin@cafebloom.com";
const ADMIN_PASSWORD = "admin123";

export interface AuthUser {
  id: string;
  email: string;
}

let currentUser: AuthUser | null = null;

// Sign in function that works for both regular users and admins
export async function signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    // For admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      currentUser = {
        id: 'admin-id',
        email: ADMIN_EMAIL
      };
      localStorage.setItem('authUser', JSON.stringify(currentUser));
      return { user: currentUser, error: null };
    }

    // For regular user login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (data.user) {
      currentUser = {
        id: data.user.id,
        email: data.user.email || ''
      };
      localStorage.setItem('authUser', JSON.stringify(currentUser));
      return { user: currentUser, error: null };
    }

    return { user: null, error: 'تعذر تسجيل الدخول' };
  } catch (err) {
    console.error('خطأ في تسجيل الدخول:', err);
    return { user: null, error: 'حدث خطأ أثناء محاولة تسجيل الدخول' };
  }
}

// Sign up function for regular users
export async function signUp(email: string, password: string, userInfo: { name: string; phone?: string }): Promise<{ success: boolean; error: string | null }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userInfo.name,
          phone: userInfo.phone
        }
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('خطأ في إنشاء حساب:', err);
    return { success: false, error: 'حدث خطأ أثناء محاولة إنشاء حساب' };
  }
}

// Sign out function
export async function signOut(): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('خطأ في تسجيل الخروج:', error);
      return false;
    }
    currentUser = null;
    localStorage.removeItem('authUser');
    return true;
  } catch (err) {
    console.error('خطأ في تسجيل الخروج:', err);
    return false;
  }
}

// Get current user from local storage on page load
export function getCurrentUser(): AuthUser | null {
  if (currentUser) return currentUser;
  
  const savedUser = localStorage.getItem('authUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    return currentUser;
  }
  
  return null;
}
