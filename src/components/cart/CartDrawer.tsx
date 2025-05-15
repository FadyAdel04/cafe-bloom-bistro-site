
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    removeFromCart, 
    updateQuantity, 
    closeCart, 
    getTotalPrice, 
    clearCart 
  } = useCart();

  const handleCheckout = () => {
    // This will be replaced with Supabase integration to store the order
    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully.",
      duration: 3000,
    });
    
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        />
      )}
      
      {/* Cart Drawer */}
      <div 
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingCart className="mr-2" size={20} />
            Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingCart size={48} className="mb-4 opacity-30" />
              <p>Your cart is empty</p>
              <Button 
                className="mt-4 bg-restaurant-primary hover:bg-restaurant-primary/90"
                onClick={closeCart}
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex border-b pb-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
