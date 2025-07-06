import { useState } from 'react';
import { Card, Image, Button } from '../atoms';
import { formatPrice } from '../../utils';

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  className = '',
  ...props
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity?.(item.id, newQuantity);
  };
  
  const handleRemove = () => {
    onRemove?.(item.id);
  };
  
  const totalPrice = item.price * quantity;
  
  return (
    <Card
      padding="md"
      className={`hover:shadow-md transition-shadow duration-200 ${className}`}
      {...props}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Product Image & Info */}
        <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover border border-gray-200 shadow-sm"
              rounded="lg"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 line-clamp-2 mb-1 sm:mb-2">
              {item.name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3">
              {item.description}
            </p>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <p className="text-sm sm:text-base font-medium text-[#1A203D]">
                {formatPrice(item.price)}
              </p>
              <span className="text-xs sm:text-sm text-gray-500">c/u</span>
            </div>
          </div>
        </div>
        
        {/* Controls & Price Section */}
        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-between sm:min-w-0">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-lg p-1 sm:p-2">
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0 flex items-center justify-center text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-sm transition-all"
            >
              -
            </Button>
            
            <span className="w-8 sm:w-10 text-center text-sm sm:text-base font-semibold text-gray-900">
              {quantity}
            </span>
            
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0 flex items-center justify-center text-sm sm:text-base font-bold hover:bg-white hover:shadow-sm transition-all"
            >
              +
            </Button>
          </div>
          
          {/* Total Price */}
          <div className="text-right sm:mt-2 lg:mt-3">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {formatPrice(totalPrice)}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Total
            </p>
          </div>
        </div>
      </div>
      
      {/* Remove Button */}
      <div className="flex justify-end mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors"
        >
          <span className="mr-1 sm:mr-2">🗑️</span>
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default CartItem; 