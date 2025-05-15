
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import CartDrawer from '@/components/cart/CartDrawer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminLayout from '@/components/admin/AdminLayout';

import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MenuManagement from "./pages/admin/MenuManagement";
import OrdersPage from "./pages/admin/OrdersPage";
import SettingsPage from "./pages/admin/SettingsPage";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center">جاري التحميل...</div>;
  
  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <main>
              <Index />
            </main>
            <CartDrawer />
            <Footer />
          </>
        }
      />
      <Route
        path="/menu"
        element={
          <>
            <Header />
            <main>
              <Menu />
            </main>
            <CartDrawer />
            <Footer />
          </>
        }
      />
      <Route
        path="/auth"
        element={
          <>
            <Header />
            <Auth />
            <Footer />
          </>
        }
      />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route index element={<AdminDashboard />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
