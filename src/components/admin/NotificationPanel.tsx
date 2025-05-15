
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Bell, Check, Loader2 } from 'lucide-react';
import { getNotifications, markAsRead, Notification } from '@/services/notification-service';
import { Badge } from '@/components/ui/badge';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadNotifications();
    
    // Refresh notifications every minute
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const loadNotifications = async () => {
    setLoading(true);
    const data = await getNotifications();
    setNotifications(data);
    setLoading(false);
  };
  
  const handleMarkAsRead = async (id: string) => {
    const success = await markAsRead(id);
    if (success) {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
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
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-restaurant-primary" />
          <h3 className="text-lg font-semibold">الإشعارات</h3>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-restaurant-primary">{unreadCount} جديد</Badge>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-3 border ${!notification.read ? 'bg-blue-50 border-blue-100' : 'border-gray-200'} rounded-md`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.created_at)}</p>
                </div>
                
                {!notification.read && (
                  <button
                    className="text-green-600 hover:text-green-700 p-1"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          لا توجد إشعارات
        </div>
      )}
    </Card>
  );
};

export default NotificationPanel;
