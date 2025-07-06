import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
// Usando emojis en lugar de iconos para evitar dependencias adicionales

const CheckoutForm = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart, addOrder, addNotification } = useApp();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Crear pedido
    const order = {
      items: cart,
      total: cartTotal,
      customerInfo,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Agregar pedido al sistema
    addOrder(order);

    // Limpiar carrito
    clearCart();

    // Mostrar notificación
    addNotification({
      type: 'success',
      title: '¡Pedido Enviado!',
      message: 'Tu pedido se ha enviado a la sucursal para su preparación. Te contactaremos pronto.',
      duration: 5000,
    });

    // Resetear formulario
    setCustomerInfo({
      name: '',
      phone: '',
      notes: ''
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setCustomerInfo({
      name: '',
      phone: '',
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🛍️</span>
            <h2 className="text-xl font-bold text-gray-900">Información del Cliente</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-xl text-gray-500">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Resumen del Pedido</h3>
            <div className="space-y-2 mb-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-blue-900">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          {/* Customer Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-sm mr-1">👤</span>
                Nombre Completo *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={customerInfo.name}
                onChange={handleInputChange}
                placeholder="Ingresa tu nombre completo"
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-sm mr-1">📞</span>
                Teléfono *
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={handleInputChange}
                placeholder="Ej: +52 55 1234 5678"
                required
                className="w-full"
              />
            </div>



            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-sm mr-1">📝</span>
                Notas Adicionales (Opcional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={customerInfo.notes}
                onChange={handleInputChange}
                placeholder="Instrucciones especiales, referencias, alergias, etc."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full py-4"
                disabled={isSubmitting || !customerInfo.name || !customerInfo.phone}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    Confirmar Pedido
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Información importante:</strong> Tu pedido será enviado a nuestra sucursal para su preparación. 
              Nos pondremos en contacto contigo para confirmar los detalles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 