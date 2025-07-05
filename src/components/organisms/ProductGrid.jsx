import { useMemo } from 'react';
import { ProductCard } from '../molecules';
import { Loading } from '../atoms';
import { useApp } from '../../context';
import { filterProductsByCategory, searchProducts, sortProducts } from '../../utils';

const ProductGrid = ({ onProductClick, sortBy = 'featured' }) => {
  const { 
    products, 
    loading, 
    searchTerm, 
    selectedCategory, 
    addToCart,
    addToRecentlyViewed 
  } = useApp();
  
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory) {
      filtered = filterProductsByCategory(filtered, selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = searchProducts(filtered, searchTerm);
    }
    
    // Sort products
    filtered = sortProducts(filtered, sortBy);
    
    return filtered;
  }, [products, selectedCategory, searchTerm, sortBy]);
  
  const handleProductClick = (product) => {
    addToRecentlyViewed(product.id);
    onProductClick?.(product);
  };
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-12">
        <div className="text-center">
          <Loading size="lg" />
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }
  
  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-12 px-4 max-w-md mx-auto">
          <div className="text-4xl md:text-6xl mb-4">🔍</div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            No encontramos productos
          </h3>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            {searchTerm 
              ? `No hay productos que coincidan con "${searchTerm}"`
              : selectedCategory
              ? `No hay productos en la categoría "${selectedCategory}"`
              : 'No hay productos disponibles'
            }
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            Intenta con otros términos de búsqueda o categorías
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Results info */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {selectedCategory 
              ? `Productos en ${selectedCategory}`
              : searchTerm 
              ? `Resultados para "${searchTerm}"`
              : 'Todos los productos'
            }
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard
                product={product}
                onViewDetails={handleProductClick}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
        
        {/* Load more section */}
        {filteredProducts.length > 0 && filteredProducts.length >= 20 && (
          <div className="text-center mt-8 md:mt-12">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                ¿Buscas más productos?
              </h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Explora más categorías o ajusta tu búsqueda
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base">
                Explorar más categorías
              </button>
            </div>
          </div>
        )}
        
        {/* Mobile floating action */}
        <div className="fixed bottom-6 right-6 md:hidden z-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid; 