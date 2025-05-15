
import React from 'react';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Users, DollarSign, Coffee } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      title: 'Total Orders',
      value: '124',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Users',
      value: '45',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: '$1,240',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'Menu Items',
      value: '48',
      icon: Coffee,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-restaurant-secondary">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Orders and Menu Items (Placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Order #{1000 + i}</p>
                  <p className="text-sm text-gray-500">2 items • $24.99</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Preparing
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-restaurant-primary text-sm font-medium hover:underline">
            View all orders
          </button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Menu Items</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                  <div>
                    <p className="font-medium">Menu Item {i}</p>
                    <p className="text-sm text-gray-500">{20 - i * 3} orders</p>
                  </div>
                </div>
                <span className="font-medium">${(15 - i).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-restaurant-primary text-sm font-medium hover:underline">
            View all items
          </button>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
