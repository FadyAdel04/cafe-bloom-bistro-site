
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OrdersPage = () => {
  // Mock data for orders
  const mockOrders = [
    {
      id: '1001',
      items: [
        { name: 'Grilled Chicken Pasta', quantity: 2, price: 15.99 },
        { name: 'Fresh Orange Juice', quantity: 2, price: 3.99 }
      ],
      status: 'pending',
      created_at: '2023-06-10T12:30:00Z',
      total: 39.96
    },
    {
      id: '1002',
      items: [
        { name: 'Classic Cheeseburger', quantity: 1, price: 14.49 },
        { name: 'Tiramisu', quantity: 1, price: 8.49 }
      ],
      status: 'preparing',
      created_at: '2023-06-10T13:15:00Z',
      total: 22.98
    },
    {
      id: '1003',
      items: [
        { name: 'Mediterranean Salad', quantity: 1, price: 10.99 },
        { name: 'Cappuccino', quantity: 1, price: 4.99 }
      ],
      status: 'completed',
      created_at: '2023-06-10T10:45:00Z',
      total: 15.98
    }
  ];

  const [orders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState('all');

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
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-restaurant-secondary">Orders</h1>
        <p className="text-gray-500">Manage customer orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <select 
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="completed">Completed</option>
        </select>
        
        <div className="flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Search by order ID..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map(order => (
          <Card key={order.id} className="p-6">
            <div className="flex flex-wrap justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
              </div>
              <Badge className={getStatusBadgeColor(order.status)} variant="outline">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>

            <div className="border rounded-md overflow-hidden mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Total:
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end space-x-2">
              {order.status !== 'completed' && (
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium">
                  Mark as {order.status === 'pending' ? 'Preparing' : 'Completed'}
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium">
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
