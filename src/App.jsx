import { useState, useCallback } from 'react'
import { AppProvider } from './context'
import { Header, Cart } from './components/organisms'
import { Home } from './pages'
import './index.css'

function App() {
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
    <AppProvider>
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
      </div>
    </AppProvider>
  )
}

export default App
