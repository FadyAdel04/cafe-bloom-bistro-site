
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus } from '@/services/order-service';
import { toast } from 'sonner';

const OrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  // Fetch orders using React Query
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  // Filter orders by status
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Function to handle order status update
  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    try {
      let newStatus: 'pending' | 'preparing' | 'completed';
      
      if (currentStatus === 'pending') {
        newStatus = 'preparing';
      } else if (currentStatus === 'preparing') {
        newStatus = 'completed';
      } else {
        return; // Already completed
      }
      
      const updatedOrder = await updateOrderStatus(id, newStatus);
      
      if (updatedOrder) {
        toast.success(`تم تحديث حالة الطلب إلى ${
          newStatus === 'preparing' ? 'قيد التحضير' : 
          newStatus === 'completed' ? 'مكتمل' : 'قيد الانتظار'
        }`);
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      } else {
        toast.error('فشل تحديث حالة الطلب');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('حدث خطأ أثناء تحديث حالة الطلب');
    }
  };

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-restaurant-secondary">الطلبات</h1>
        <p className="text-gray-500">إدارة طلبات العملاء</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <select 
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">جميع الطلبات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="preparing">قيد التحضير</option>
          <option value="completed">مكتملة</option>
        </select>
        
        <div className="flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="البحث بواسطة رقم الطلب..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
          />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">جاري تحميل الطلبات...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-12 text-red-500">
          <p>حدث خطأ أثناء تحميل الطلبات. يرجى المحاولة مرة أخرى.</p>
          <Button variant="outline" className="mt-4" onClick={() => queryClient.invalidateQueries({ queryKey: ['orders'] })}>
            إعادة المحاولة
          </Button>
        </div>
      )}

      {/* Orders List */}
      {!isLoading && !error && (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">طلب #{order.id.substring(0, 8)}</h3>
                  <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                </div>
                <Badge className={getStatusBadgeColor(order.status)} variant="outline">
                  {order.status === 'pending' ? 'قيد الانتظار' : 
                   order.status === 'preparing' ? 'قيد التحضير' : 'مكتمل'}
                </Badge>
              </div>

              <div className="border rounded-md overflow-hidden mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        العنصر
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        الكمية
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        السعر
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(order.items) && order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        الإجمالي:
                      </td>
                      <td className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                        ${Array.isArray(order.items) ? 
                          order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) : 
                          '0.00'
                        }
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-end space-x-2">
                {order.status !== 'completed' && (
                  <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium"
                    onClick={() => handleUpdateStatus(order.id, order.status)}
                  >
                    تغيير الحالة إلى {order.status === 'pending' ? 'قيد التحضير' : 'مكتمل'}
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium mr-2">
                  عرض التفاصيل
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !error && filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">لا توجد طلبات تطابق المعايير المحددة.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
