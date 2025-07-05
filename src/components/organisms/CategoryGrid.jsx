import { CategoryCard } from '../molecules';
import { useApp } from '../../context';

const CategoryGrid = ({ onCategorySelect }) => {
  const { categories, setSelectedCategory } = useApp();
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    onCategorySelect?.(category);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Explora nuestras categorías
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra amplia selección de productos organizados por categorías 
          para que encuentres exactamente lo que buscas
        </p>
      </div>
      
      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelect={handleCategorySelect}
            className="animate-fadeIn"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid; 