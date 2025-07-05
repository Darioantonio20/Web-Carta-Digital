import { useState } from 'react';
import { Button, Badge } from '../atoms';
import { SearchBar } from '../molecules';
import { useApp, VIEWS } from '../../context';
import { APP_NAME } from '../../constants';

const Header = ({ onCartClick, onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, setSearchTerm, selectedCategory, setSelectedCategory, isAdminLoggedIn, navigateToView } = useApp();
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.(!isMenuOpen);
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };
  
  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      navigateToView(VIEWS.ADMIN_DASHBOARD);
    } else {
      navigateToView(VIEWS.ADMIN_LOGIN);
    }
  };
  
  const categories = [
    { id: null, name: 'Todas', icon: '🍽️' },
    { id: 'helados', name: 'Helados', icon: '🍦' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
    { id: 'postres', name: 'Postres', icon: '🍰' },
    { id: 'snacks', name: 'Snacks', icon: '🥨' },
    { id: 'cafe', name: 'Café', icon: '☕' },
    { id: 'panaderia', name: 'Panadería', icon: '🥖' },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg backdrop-blur-sm bg-white/95 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm md:text-lg">🍽️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">{APP_NAME}</h1>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">Tu carta digital favorita</p>
            </div>
          </div>
          
          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Admin Button */}
            <Button
              variant={isAdminLoggedIn ? "primary" : "secondary"}
              size="md"
              onClick={handleAdminClick}
              className="relative p-2 md:p-3"
              title={isAdminLoggedIn ? "Panel de Administración" : "Iniciar sesión como administrador"}
            >
              <span className="text-lg md:text-xl">🛡️</span>
              {isAdminLoggedIn && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </Button>
            
            {/* Cart Button */}
            <Button
              variant="secondary"
              size="md"
              onClick={onCartClick}
              className="relative p-2 md:p-3"
            >
              <span className="text-lg md:text-xl">🛒</span>
              {cartCount > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] md:min-w-[20px] md:h-5 text-xs"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </Button>
            
            {/* Menu Button - Mobile & Tablet */}
            <Button
              variant="ghost"
              size="md"
              onClick={handleMenuToggle}
              className="lg:hidden p-2 md:p-3"
            >
              <span className="text-lg md:text-xl">
                {isMenuOpen ? '✕' : '☰'}
              </span>
            </Button>
          </div>
        </div>
        
        {/* Search Bar - Mobile & Tablet */}
        <div className="lg:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Category Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 pb-4 pt-2 border-t border-gray-100">
          {categories.map((category) => (
            <Button
              key={category.id || 'all'}
              variant={selectedCategory === category.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleCategorySelect(category.id)}
              className="text-xs xl:text-sm whitespace-nowrap"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </nav>
      </div>
      
      {/* Mobile & Tablet Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="py-4 space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id || 'all'}
                  variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                  size="md"
                  fullWidth
                  onClick={() => handleCategorySelect(category.id)}
                  className="justify-start text-left"
                >
                  <span className="mr-3 text-lg">{category.icon}</span>
                  {category.name}
                  {category.id === null && (
                    <span className="ml-auto text-xs text-gray-500">Ver todo</span>
                  )}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 