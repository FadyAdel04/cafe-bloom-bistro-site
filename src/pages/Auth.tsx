
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          toast.success('تم تسجيل الدخول بنجاح');
          navigate('/');
        } else {
          toast.error(result.error || 'فشل تسجيل الدخول');
        }
      } else {
        if (!name.trim()) {
          toast.error('الرجاء إدخال الاسم');
          setLoading(false);
          return;
        }

        const result = await register(email, password, { name, phone });
        if (result.success) {
          toast.success('تم إنشاء الحساب بنجاح، يرجى تسجيل الدخول الآن');
          setIsLogin(true);
        } else {
          toast.error(result.error || 'فشل إنشاء الحساب');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('حدث خطأ غير متوقع');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-restaurant-accent flex items-center justify-center" dir="rtl">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-restaurant-secondary">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h1>
          <p className="text-gray-500 mt-2">
            {isLogin 
              ? 'أدخل بياناتك لتسجيل الدخول إلى حسابك' 
              : 'أدخل بياناتك لإنشاء حساب جديد'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  الاسم
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  رقم الهاتف (اختياري)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="أدخل رقم هاتفك"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              البريد الإلكتروني
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              كلمة المرور
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-restaurant-primary hover:underline text-sm"
          >
            {isLogin ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
          </button>
        </div>

        {/* Admin login hint */}
        <div className="mt-6 pt-4 border-t text-center text-xs text-gray-500">
          للدخول كمدير: admin@cafebloom.com / admin123
        </div>
      </Card>
    </div>
  );
};

export default Auth;
