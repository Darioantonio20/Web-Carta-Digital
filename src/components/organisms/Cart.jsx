import React, { useState } from 'react';
import { Card, Button } from '../atoms';
import { CartItem } from '../molecules';
import { useApp } from '../../context';
import { formatPrice } from '../../utils';
import CheckoutForm from './CheckoutForm';

const Cart = ({ isOpen, onClose }) => {
  const { 
    cart, 
    cartTotal, 
    cartCount, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    addNotification 
  } = useApp();
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleClearCart = () => {
    clearCart();
  };
  
  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Tu carrito ({cartCount})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            ✕
          </Button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 mb-6">
                Agrega algunos productos para empezar a comprar
              </p>
              <Button
                variant="primary"
                onClick={onClose}
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
              
              {/* Clear cart button */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  Vaciar carrito
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-2xl font-bold text-emerald-600">
                {formatPrice(cartTotal)}
              </span>
            </div>
            
            {/* Checkout Button */}
            <Button
              variant="gradient"
              size="lg"
              fullWidth
              onClick={handleCheckout}
            >
              Proceder al pago
            </Button>
            
            {/* Continue Shopping */}
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={onClose}
            >
              Continuar comprando
            </Button>
          </div>
        )}
      </div>
      
      {/* Checkout Form */}
      <CheckoutForm 
        isOpen={showCheckoutForm}
        onClose={() => setShowCheckoutForm(false)}
      />
    </div>
  );
};

export default Cart; 