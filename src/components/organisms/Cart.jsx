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
      
      {/* Cart Panel - Responsive width */}
      <div className="absolute right-0 top-0 h-full w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl sm:text-3xl">🛒</span>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                Tu carrito
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 sm:p-3 hover:bg-gray-100 rounded-full"
          >
            <span className="text-lg sm:text-xl">✕</span>
          </Button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 lg:p-12 text-center">
              <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">🛒</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Tu carrito está vacío
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md">
                Agrega algunos productos deliciosos para empezar a comprar
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={onClose}
                className="text-sm sm:text-base lg:text-lg px-6 py-3 sm:px-8 sm:py-4"
              >
                <span className="mr-2">🍽️</span>
                Continuar comprando
              </Button>
            </div>
          ) : (
            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
              
              {/* Clear cart button */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm sm:text-base px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="mr-2">🗑️</span>
                  Vaciar carrito
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 bg-gray-50">
            {/* Subtotal Summary */}
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-200">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between text-sm sm:text-base text-gray-600">
                  <span>Subtotal ({cartCount} productos):</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm sm:text-base text-gray-600">
                  <span>Envío:</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="border-t pt-2 sm:pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-semibold text-gray-900">
                      Total:
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#1A203D]">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              {/* Checkout Button */}
              <Button
                variant="gradient"
                size="lg"
                fullWidth
                onClick={handleCheckout}
                className="text-sm sm:text-base lg:text-lg py-3 sm:py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">💳</span>
                Proceder al pago
              </Button>
              
              {/* Continue Shopping */}
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={onClose}
                className="text-sm sm:text-base py-2 sm:py-3"
              >
                <span className="mr-2">🛍️</span>
                Continuar comprando
              </Button>
            </div>
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