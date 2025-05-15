
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, getCurrentUser, signIn, signOut, signUp } from '@/services/auth-service';
import { getUserProfile, updateUserProfile } from '@/services/profile-service';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, userInfo: { name: string; phone?: string }) => Promise<{ success: boolean; error: string | null }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  login: async () => ({ success: false, error: 'Context not initialized' }),
  logout: async () => false,
  register: async () => ({ success: false, error: 'Context not initialized' }),
  updateProfile: async () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile when user changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userProfile = await getUserProfile(user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    // Check for user in localStorage on page load
    const savedUser = getCurrentUser();
    setUser(savedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.user) {
      setUser(result.user);
      return { success: true, error: null };
    }
    return { success: false, error: result.error };
  };

  const logout = async () => {
    const success = await signOut();
    if (success) {
      setUser(null);
      setProfile(null);
    }
    return success;
  };

  const register = async (email: string, password: string, userInfo: { name: string; phone?: string }) => {
    return await signUp(email, password, userInfo);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !profile) return false;
    
    const success = await updateUserProfile(user.id, data);
    if (success) {
      setProfile(prev => prev ? { ...prev, ...data } : null);
    }
    return success;
  };

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.is_admin || false,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
