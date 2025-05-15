
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, getCurrentUser, signIn, signOut, signUp } from '@/services/auth-service';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, userInfo: { name: string; phone?: string }) => Promise<{ success: boolean; error: string | null }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => ({ success: false, error: 'Context not initialized' }),
  logout: async () => false,
  register: async () => ({ success: false, error: 'Context not initialized' })
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

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
    }
    return success;
  };

  const register = async (email: string, password: string, userInfo: { name: string; phone?: string }) => {
    return await signUp(email, password, userInfo);
  };

  const value = {
    user,
    loading,
    isAdmin: user?.isAdmin || false,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
