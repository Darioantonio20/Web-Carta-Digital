import React from 'react';
import { useApp, VIEWS } from '../context/AppContext';
import { formatPrice } from '../utils';
import Button from '../components/atoms/Button';

const AdminDashboard = () => {
  const { orders, updateOrderStatus, setAdminLoggedIn, navigateToView } = useApp();

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    navigateToView(VIEWS.HOME);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <span className="text-xl">⏳</span>;
      case 'preparing':
        return <span className="text-xl">👨‍🍳</span>;
      case 'ready':
        return <span className="text-xl">✅</span>;
      default:
        return <span className="text-xl">⏳</span>;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'preparing':
        return 'Preparando';
      case 'ready':
        return 'Listo para Entregar';
      default:
        return 'Desconocido';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'preparing':
        return 'bg-[#1A203D]/10 text-[#1A203D]';
      case 'ready':
        return 'bg-[#1A203D]/10 text-[#1A203D]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xl sm:text-3xl">📊</span>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Panel Administrativo</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Gestión de pedidos y órdenes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-center bg-[#1A203D]/10 text-[#1A203D] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
              </div>
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <span className="text-xs sm:text-sm">🚪</span>
                <span className="text-xs sm:text-sm">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <span className="text-6xl sm:text-8xl text-gray-300 block mb-4 sm:mb-6">📋</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              No hay pedidos aún
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg mb-6 sm:mb-8 px-4">
              Los pedidos aparecerán aquí cuando los clientes realicen compras
            </p>
            <Button
              onClick={() => navigateToView(VIEWS.HOME)}
              variant="primary"
              size="lg"
              className="inline-flex items-center space-x-2"
            >
              <span className="text-sm sm:text-lg">🏠</span>
              <span className="text-sm sm:text-base">Volver al Inicio</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        {getStatusIcon(order.status)}
                        <span className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        <span className="font-medium">Pedido #{order.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                      <span className="text-xs sm:text-sm">📅</span>
                      <span className="text-xs sm:text-sm">{new Date(order.createdAt).toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-4 sm:p-6">
                  {/* Customer Info - Enhanced UI/UX */}
                  <div className="mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-[#1A203D]/5 to-[#1A203D]/10 rounded-xl p-4 sm:p-6 border border-[#1A203D]/20 shadow-sm">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="bg-[#1A203D] rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                          <span className="text-white text-sm sm:text-lg">👤</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Información del Cliente</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        {/* Nombre */}
                        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-[#1A203D]/20">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#1A203D]/10 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                              <span className="text-[#1A203D] text-xs sm:text-sm font-bold">N</span>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Nombre Completo</span>
                          </div>
                          <p className="text-sm sm:text-lg font-semibold text-gray-800 ml-8 sm:ml-11">{order.customerInfo.name}</p>
                        </div>

                        {/* Teléfono */}
                        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-[#1A203D]/20">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#1A203D]/10 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                              <span className="text-[#1A203D] text-xs sm:text-sm">📞</span>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Teléfono de Contacto</span>
                          </div>
                          <p className="text-sm sm:text-lg font-semibold text-gray-800 ml-8 sm:ml-11">
                            <a href={`tel:${order.customerInfo.phone}`} className="text-[#1A203D] hover:text-[#2D3748] transition-colors">
                              {order.customerInfo.phone}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {order.customerInfo.notes && (
                      <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-amber-200 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="bg-amber-500 rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                            <span className="text-white text-sm sm:text-lg">📝</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-800">Notas Especiales</h3>
                        </div>
                        <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-100">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">"{order.customerInfo.notes}"</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items - Enhanced UI */}
                  <div className="mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-500 rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                          <span className="text-white text-sm sm:text-lg">🛍️</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Productos del Pedido</h3>
                        <span className="ml-auto text-center bg-purple-100 text-purple-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                          {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                        </span>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4">
                        {order.items.map((item, index) => (
                          <div key={item.id} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                              <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="relative flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg border-2 border-purple-100"
                                  />
                                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold">
                                    {index + 1}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-900 text-sm sm:text-lg">{item.name}</h4>
                                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    <span className="bg-[#1A203D]/10 text-[#1A203D] px-2 py-1 rounded-full text-xs font-medium">
                                      Cantidad: {item.quantity}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">
                                      {formatPrice(item.price)} c/u
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right sm:text-right sm:ml-4">
                                <p className="text-lg sm:text-2xl font-bold text-purple-600">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">Subtotal</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Order Total - Enhanced */}
                  <div className="bg-gradient-to-r from-[#1A203D] to-yellow-600 text-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white bg-opacity-20 rounded-full p-1.5 sm:p-2">
                          <span className="text-white text-lg sm:text-xl">💰</span>
                        </div>
                        <div>
                          <span className="text-white text-xs sm:text-sm font-medium uppercase tracking-wide">Total del Pedido</span>
                          <p className="text-white text-xl sm:text-2xl font-bold">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-black bg-opacity-20 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
                          <span className="text-yellow-200 text-xs sm:text-sm font-medium block">Estado</span>
                          <span className="text-white text-sm sm:text-base font-bold">{getStatusText(order.status)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-t-4 border-[#1A203D]">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Acciones del Pedido</h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {order.status === 'pending' && (
                        <Button
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                          variant="primary"
                          size="md"
                          className="flex items-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg transition-shadow text-xs sm:text-sm"
                        >
                          <span>👨‍🍳</span>
                          <span>Comenzar Preparación</span>
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button
                          onClick={() => handleStatusUpdate(order.id, 'ready')}
                          variant="success"
                          size="md"
                          className="flex items-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg transition-shadow text-xs sm:text-sm"
                        >
                          <span>✅</span>
                          <span>Marcar como Listo</span>
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <div className="flex items-center space-x-2 sm:space-x-3 bg-[#1A203D]/10 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-[#1A203D]/30">
                          <span className="text-[#1A203D] text-lg sm:text-xl">✅</span>
                          <div>
                            <span className="font-semibold text-[#1A203D] block text-sm sm:text-base">Pedido Listo para Entregar</span>
                            <span className="text-xs sm:text-sm text-[#1A203D]/70">El cliente puede recoger su pedido</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 