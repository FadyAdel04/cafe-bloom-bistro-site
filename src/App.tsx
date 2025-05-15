
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from '@/contexts/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminLayout from '@/components/admin/AdminLayout';

import Index from "./pages/Index";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MenuManagement from "./pages/admin/MenuManagement";
import OrdersPage from "./pages/admin/OrdersPage";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
