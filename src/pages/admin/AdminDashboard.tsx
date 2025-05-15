
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Users, DollarSign, Coffee } from 'lucide-react';
import NotificationPanel from '@/components/admin/NotificationPanel';
import { getOrders } from '@/services/order-service';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (isAdmin) {
        const orders = await getOrders();
        setOrderCount(orders.length);
      }
      setLoading(false);
    };

    loadData();
  }, [isAdmin]);

  // Dashboard stats
  const stats = [
    {
      title: 'إجمالي الطلبات',
      value: loading ? '...' : orderCount.toString(),
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'المستخدمين النشطين',
      value: '45',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'الإيرادات',
      value: '1,240 ريال',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'عناصر القائمة',
      value: '48',
      icon: Coffee,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-restaurant-secondary">لوحة التحكم</h1>
        <p className="text-gray-500">مرحبا بكم في لوحة تحكم المدير</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Notifications and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationPanel />

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">آخر الطلبات</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">طلب #{1000 + i}</p>
                  <p className="text-sm text-gray-500">عناصر 2 • 24.99 ريال</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  قيد التحضير
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-restaurant-primary text-sm font-medium hover:underline">
            عرض كل الطلبات
          </button>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
