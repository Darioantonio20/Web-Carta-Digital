import { useEffect } from 'react';
import { CategoryGrid, ProductGrid } from '../components/organisms';
import { Button } from '../components/atoms';
import { useApp } from '../context';
import { formatPrice } from '../utils';
import { categories, products } from '../data';

const Home = ({ onCategorySelect, onProductClick }) => {
  const { 
    setCategories, 
    setProducts, 
    selectedCategory, 
    setSelectedCategory,
    searchTerm 
  } = useApp();
  
  useEffect(() => {
    // Load initial data only once on mount
    setCategories(categories);
    setProducts(products);
  }, []); // Empty dependency array - only run once on mount
  
  const handleCategorySelect = (category) => {
    onCategorySelect?.(category);
  };
  
  const handleProductClick = (product) => {
    onProductClick?.(product);
  };
  
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
  };
  
  // Show products if category is selected or search term is active
  const showProducts = selectedCategory || searchTerm;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {!showProducts && (
        <section className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fadeIn">
                Bienvenido a <br className="sm:hidden" />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                  Carta Digital
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-emerald-100 animate-fadeIn animation-delay-200 max-w-3xl mx-auto px-4">
                Descubre sabores únicos y productos de calidad premium seleccionados especialmente para ti
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fadeIn animation-delay-400 px-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleShowAllProducts}
                  className="bg-white text-emerald-600 hover:bg-emerald-50 w-full sm:w-auto text-sm md:text-base px-6 md:px-8"
                >
                  Ver todos los productos
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white hover:bg-white/10 w-full sm:w-auto text-sm md:text-base px-6 md:px-8"
                >
                  Conoce más sobre nosotros
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Featured Stats */}
      {!showProducts && (
        <section className="bg-white py-8 md:py-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { value: categories.length, label: 'Categorías', delay: 0 },
                { value: products.length, label: 'Productos', delay: 100 },
                { value: products.filter(p => p.featured).length, label: 'Destacados', delay: 200 },
                { value: '4.8★', label: 'Calificación', delay: 300 }
              ].map((stat, index) => (
                <div key={index} className="animate-fadeIn p-4" style={{ animationDelay: `${stat.delay}ms` }}>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-600 mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Main Content */}
      <main>
        {showProducts ? (
          <ProductGrid
            onProductClick={handleProductClick}
            sortBy="featured"
          />
        ) : (
          <CategoryGrid
            onCategorySelect={handleCategorySelect}
          />
        )}
      </main>
      
      {/* Featured Products Section */}
      {!showProducts && (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Productos <span className="text-emerald-600">destacados</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Prueba nuestros productos más populares y mejor valorados por nuestros clientes
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products
                .filter(product => product.featured)
                .slice(0, 4)
                .map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl mx-auto group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">★</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="text-base md:text-lg font-bold text-emerald-600">
                      {formatPrice(product.price)}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      ⭐ {product.rating} ({product.reviews} reseñas)
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="text-center mt-8 md:mt-12">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleShowAllProducts}
                className="text-sm md:text-base px-6 md:px-8"
              >
                Ver todos los productos
              </Button>
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter Section */}
      {!showProducts && (
        <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-500 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              ¿Quieres estar al día?
            </h3>
            <p className="text-emerald-100 mb-6 md:mb-8 text-sm md:text-base">
              Suscríbete a nuestro newsletter y recibe las últimas novedades y ofertas especiales
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none text-sm md:text-base"
              />
              <Button
                variant="secondary"
                size="md"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 text-sm md:text-base"
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 