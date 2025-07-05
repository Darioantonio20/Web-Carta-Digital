import { useState, useCallback } from 'react'
import { AppProvider, useApp, VIEWS } from './context'
import { Header, Cart, ToastContainer } from './components/organisms'
import { Home, AdminLogin, AdminDashboard } from './pages'
import './index.css'

// Componente interno para acceder al contexto
const AppContent = () => {
  const { currentView } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  const handleCartToggle = useCallback(() => {
    setIsCartOpen(!isCartOpen)
  }, [isCartOpen])
  
  const handleCartClose = useCallback(() => {
    setIsCartOpen(false)
  }, [])
  
  const handleCategorySelect = useCallback((category) => {
    // Handle category selection
    console.log('Selected category:', category)
  }, [])
  
  const handleProductClick = useCallback((product) => {
    // Handle product click (could navigate to detail page)
    console.log('Clicked product:', product)
  }, [])

  // Función para renderizar la vista actual
  const renderCurrentView = () => {
    switch (currentView) {
      case VIEWS.HOME:
        return (
          <>
            <Header onCartClick={handleCartToggle} />
            <main>
              <Home 
                onCategorySelect={handleCategorySelect}
                onProductClick={handleProductClick}
              />
            </main>
            <Cart 
              isOpen={isCartOpen}
              onClose={handleCartClose}
            />
          </>
        );
      case VIEWS.ADMIN_LOGIN:
        return <AdminLogin />;
      case VIEWS.ADMIN_DASHBOARD:
        return <AdminDashboard />;
      default:
        return (
          <>
            <Header onCartClick={handleCartToggle} />
            <main>
              <Home 
                onCategorySelect={handleCategorySelect}
                onProductClick={handleProductClick}
              />
            </main>
            <Cart 
              isOpen={isCartOpen}
              onClose={handleCartClose}
            />
          </>
        );
    }
  };
  
  return (
    <div className="App min-h-screen bg-gray-50">
      {renderCurrentView()}
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
