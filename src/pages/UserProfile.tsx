
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders } from '@/services/profile-service';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

const UserProfile = () => {
  const { user, profile, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);
  
  // Load profile data
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setPhone(profile.phone || '');
      setAddress(profile.address || '');
    }
  }, [profile]);
  
  // Load user orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        setLoadingOrders(true);
        const data = await getUserOrders(user.id);
        setOrders(data);
        setLoadingOrders(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSaving(true);
    
    const success = await updateProfile({
      name,
      phone,
      address
    });
    
    setIsSaving(false);
    
    if (success) {
      toast.success('تم تحديث الملف الشخصي بنجاح');
    } else {
      toast.error('فشل تحديث الملف الشخصي');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'preparing': return 'قيد التحضير';
      case 'completed': return 'مكتمل';
      default: return status;
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-10 bg-restaurant-accent" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-restaurant-secondary mb-8">الملف الشخصي</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">معلوماتي الشخصية</TabsTrigger>
            <TabsTrigger value="orders">طلباتي السابقة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">الاسم</label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                  <Input 
                    id="email"
                    value={user?.email || ''}
                    readOnly
                    className="bg-gray-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">لا يمكن تغيير البريد الإلكتروني</p>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">رقم الهاتف</label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">العنوان</label>
                  <Input 
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="أدخل عنوانك"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : 'حفظ التغييرات'}
                </Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">طلباتي السابقة</h2>
              
              {loadingOrders ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                  <p className="mt-4 text-gray-500">جاري تحميل الطلبات...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">طلب #{order.id.substring(0, 8)}</p>
                          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                        </div>
                        <Badge className={
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        } variant="outline">
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">العناصر:</h4>
                        <ul className="space-y-1">
                          {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                            <li key={idx} className="text-sm flex justify-between">
                              <span>{item.name} (×{item.quantity})</span>
                              <span className="font-medium">{(item.price * item.quantity).toFixed(2)} ريال</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-2 border-t flex justify-between">
                          <span className="font-medium">الإجمالي:</span>
                          <span className="font-bold">
                            {Array.isArray(order.items) ? 
                              order.items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0).toFixed(2) : 
                              '0.00'
                            } ريال
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">لا يوجد لديك طلبات سابقة.</p>
                  <Button 
                    className="mt-4 bg-restaurant-primary hover:bg-restaurant-primary/90"
                    onClick={() => navigate('/menu')}
                  >
                    تصفح القائمة
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
