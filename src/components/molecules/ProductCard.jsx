import { Card, Image, Badge, Button } from '../atoms';
import { formatPrice, formatRating } from '../../utils';

const ProductCard = ({
  product,
  onAddToCart,
  onViewDetails,
  className = '',
  ...props
}) => {
  const {
    id,
    name,
    description,
    price,
    image,
    rating,
    reviews,
    featured,
    available,
    category
  } = product;
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (available) {
      onAddToCart?.(product);
    }
  };
  
  const handleViewDetails = () => {
    onViewDetails?.(product);
  };
  
  return (
    <Card
      hover={available}
      shadow="md"
      padding="none"
      className={`group overflow-hidden h-full flex flex-col ${!available ? 'opacity-75' : ''} ${className}`}
      onClick={available ? handleViewDetails : undefined}
      {...props}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-40 sm:h-48 md:h-52 group-hover:scale-105 transition-transform duration-500"
          rounded="none"
          fallback={
            <div className="flex items-center justify-center h-40 sm:h-48 md:h-52 bg-gray-100">
              <span className="text-3xl text-gray-400">🍽️</span>
            </div>
          }
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {featured && (
            <Badge variant="gradient" size="sm" className="text-xs">
              ⭐ Destacado
            </Badge>
          )}
          {!available && (
            <Badge variant="danger" size="sm" className="text-xs">
              Agotado
            </Badge>
          )}
        </div>
        
        {/* Quick Actions */}
        {available && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="sm"
              className="backdrop-blur-sm bg-white/90 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                // Handle favorite toggle
              }}
            >
              <span className="text-sm">♡</span>
            </Button>
          </div>
        )}
        
        {/* Price overlay for mobile */}
        <div className="absolute bottom-2 right-2 sm:hidden">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-white font-bold text-sm">
              {formatPrice(price)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex-1 mb-3">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg mb-1 line-clamp-2 leading-tight">
            {name}
          </h3>
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-2 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400 text-xs md:text-sm">
              {'★'.repeat(Math.floor(rating))}
            </span>
            <span className="text-gray-300 text-xs md:text-sm">
              {'☆'.repeat(5 - Math.floor(rating))}
            </span>
          </div>
          <span className="text-gray-500 text-xs">
            ({reviews})
          </span>
        </div>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-auto">
          {/* Price - Hidden on mobile (shown in overlay) */}
          <div className="hidden sm:flex flex-col">
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          </div>
          
          {/* Add to Cart Button */}
          <Button
            variant={available ? "primary" : "tertiary"}
            size="sm"
            disabled={!available}
            onClick={handleAddToCart}
            className={`${available ? 'hover:scale-105' : ''} transition-transform duration-200 text-xs md:text-sm px-3 py-2 md:px-4 md:py-2`}
          >
            {available ? (
              <>
                <span className="hidden sm:inline">Agregar</span>
                <span className="sm:hidden">+</span>
              </>
            ) : (
              <span className="text-xs">Agotado</span>
            )}
          </Button>
        </div>
        
        {/* Mobile price row */}
        <div className="sm:hidden mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(price)}
            </span>
            <span className="text-xs text-gray-500">
              {available ? 'Disponible' : 'No disponible'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard; 