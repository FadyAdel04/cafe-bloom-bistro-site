
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, List, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Menu Management', path: '/admin/menu', icon: List },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for medium and larger screens */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg md:relative md:translate-x-0 transition-transform ease-in-out duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/admin" className="text-xl font-bold text-restaurant-secondary">
              Café Bloom Admin
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={closeSidebar}
            >
              <X size={20} />
            </Button>
          </div>

          {/* Sidebar links */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeSidebar}
                className={`flex items-center p-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-restaurant-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <link.icon size={18} className="mr-3" />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <Link
              to="/"
              className="flex items-center p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Back to Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu size={20} />
            </Button>
            <div className="md:hidden text-lg font-semibold">Admin Dashboard</div>
            <div className="flex items-center space-x-2">
              {/* We'll add profile/notification elements here later */}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          {/* Mobile sidebar backdrop */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
              onClick={closeSidebar}
            />
          )}
          
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
