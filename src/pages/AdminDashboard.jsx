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
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
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
            <div className="flex items-center space-x-4">
              <span className="text-3xl">📊</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
                <p className="text-sm text-gray-600">Gestión de pedidos y órdenes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
              </div>
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
                className="flex items-center space-x-2"
              >
                <span className="text-sm">🚪</span>
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-8xl text-gray-300 block mb-6">📋</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No hay pedidos aún
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Los pedidos aparecerán aquí cuando los clientes realicen compras
            </p>
            <Button
              onClick={() => navigateToView(VIEWS.HOME)}
              variant="primary"
              size="lg"
              className="inline-flex items-center space-x-2"
            >
              <span className="text-lg">🏠</span>
              <span>Volver al Inicio</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Pedido #{order.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="text-sm">📅</span>
                      <span>{new Date(order.createdAt).toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                                    {/* Customer Info - Enhanced UI/UX */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-500 rounded-full p-2 mr-3">
                          <span className="text-white text-lg">👤</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Información del Cliente</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 text-sm font-bold">N</span>
                            </div>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nombre Completo</span>
                          </div>
                          <p className="text-lg font-semibold text-gray-800 ml-11">{order.customerInfo.name}</p>
                        </div>

                        {/* Teléfono */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-600 text-sm">📞</span>
                            </div>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Teléfono de Contacto</span>
                          </div>
                          <p className="text-lg font-semibold text-gray-800 ml-11">
                            <a href={`tel:${order.customerInfo.phone}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                              {order.customerInfo.phone}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {order.customerInfo.notes && (
                      <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="bg-amber-500 rounded-full p-2 mr-3">
                            <span className="text-white text-lg">📝</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800">Notas Especiales</h3>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-amber-100">
                          <p className="text-gray-700 leading-relaxed italic">"{order.customerInfo.notes}"</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items - Enhanced UI */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-500 rounded-full p-2 mr-3">
                          <span className="text-white text-lg">🛍️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Productos del Pedido</h3>
                        <span className="ml-auto bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-16 w-16 object-cover rounded-lg border-2 border-purple-100"
                                  />
                                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                    {index + 1}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                  <div className="flex items-center space-x-3">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                      Cantidad: {item.quantity}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {formatPrice(item.price)} c/u
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-2xl font-bold text-purple-600">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                                <p className="text-sm text-gray-500">Subtotal</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Order Total - Enhanced */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-6 mb-8 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white bg-opacity-20 rounded-full p-2">
                          <span className="text-white text-xl">💰</span>
                        </div>
                        <div>
                          <span className="text-emerald-100 text-sm font-medium uppercase tracking-wide">Total del Pedido</span>
                          <p className="text-white text-2xl font-bold">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-black bg-opacity-20 rounded-lg px-4 py-2">
                          <span className="text-emerald-100 text-sm font-medium block">Estado</span>
                          <span className="text-white font-bold">{getStatusText(order.status)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="bg-gray-50 rounded-lg p-4 border-t-4 border-blue-500">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Acciones del Pedido</h4>
                    <div className="flex flex-wrap gap-3">
                      {order.status === 'pending' && (
                        <Button
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                          variant="primary"
                          size="md"
                          className="flex items-center space-x-2 shadow-md hover:shadow-lg transition-shadow"
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
                          className="flex items-center space-x-2 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <span>✅</span>
                          <span>Marcar como Listo</span>
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <div className="flex items-center space-x-3 bg-green-100 px-4 py-2 rounded-lg border border-green-300">
                          <span className="text-green-600 text-xl">✅</span>
                          <div>
                            <span className="font-semibold text-green-800 block">Pedido Listo para Entregar</span>
                            <span className="text-sm text-green-600">El cliente puede recoger su pedido</span>
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