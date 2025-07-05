import { useState, useCallback } from 'react'
import { AppProvider } from './context'
import { Header, Cart, ToastContainer } from './components/organisms'
import { Home } from './pages'
import './index.css'

// Componente interno para acceder al contexto
const AppContent = () => {
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
  
  return (
    <div className="App min-h-screen bg-gray-50">
      <Header 
        onCartClick={handleCartToggle}
      />
      
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
