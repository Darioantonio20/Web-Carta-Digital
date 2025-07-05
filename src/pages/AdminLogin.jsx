import React, { useState } from 'react';
import { useApp, VIEWS } from '../context/AppContext';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

const AdminLogin = () => {
  const { setAdminLoggedIn, navigateToView } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Sin validación real - cualquier email y contraseña funciona
    if (formData.email && formData.password) {
      setAdminLoggedIn(true);
      navigateToView(VIEWS.ADMIN_DASHBOARD);
      // Limpiar formulario
      setFormData({
        email: '',
        password: '',
      });
    }
  };

  const handleBackToHome = () => {
    navigateToView(VIEWS.HOME);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">🛡️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Panel Administrativo
          </h2>
          <p className="text-gray-600">
            Ingresa tus credenciales para acceder al sistema de gestión
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  <span className="text-lg mr-2">📧</span>
                  Correo Electrónico
                </span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@restaurante.com"
                required
                className="w-full h-12 text-base"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  <span className="text-lg mr-2">🔒</span>
                  Contraseña
                </span>
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                className="w-full h-12 text-base"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full h-12 text-lg"
              disabled={!formData.email || !formData.password}
            >
              <span className="text-lg mr-2">🔐</span>
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <span className="font-medium">Modo Demo:</span> Ingresa cualquier email y contraseña para acceder
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            size="md"
            className="text-blue-600 hover:text-blue-800"
          >
            <span className="text-lg mr-2">🏠</span>
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 