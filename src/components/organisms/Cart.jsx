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
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Tu carrito ({cartCount})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 sm:p-2"
          >
            <span className="text-lg sm:text-xl">✕</span>
          </Button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🛒</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Agrega algunos productos para empezar a comprar
              </p>
              <Button
                variant="primary"
                onClick={onClose}
                className="text-sm sm:text-base"
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
              
              {/* Clear cart button */}
              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Vaciar carrito
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                {formatPrice(cartTotal)}
              </span>
            </div>
            
            {/* Checkout Button */}
            <Button
              variant="gradient"
              size="lg"
              fullWidth
              onClick={handleCheckout}
              className="text-sm sm:text-base"
            >
              Proceder al pago
            </Button>
            
            {/* Continue Shopping */}
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={onClose}
              className="text-sm sm:text-base"
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