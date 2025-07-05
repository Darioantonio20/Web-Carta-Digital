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
      padding="sm"
      className={`flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 ${className}`}
      {...props}
    >
      {/* Mobile Layout */}
      <div className="flex items-start space-x-3 sm:flex-1 sm:space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
            rounded="lg"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">{item.name}</h4>
          <p className="text-xs sm:text-sm text-gray-500 truncate">{item.description}</p>
          <p className="text-xs sm:text-sm font-medium text-emerald-600 mt-1">
            {formatPrice(item.price)} c/u
          </p>
        </div>
        
        {/* Mobile Total Price */}
        <div className="flex flex-col items-end sm:hidden">
          <p className="text-sm font-bold text-gray-900">{formatPrice(totalPrice)}</p>
        </div>
      </div>
      
      {/* Controls Section */}
      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0 flex items-center justify-center text-xs sm:text-sm"
          >
            -
          </Button>
          
          <span className="w-6 sm:w-8 text-center text-sm font-medium">{quantity}</span>
          
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0 flex items-center justify-center text-xs sm:text-sm"
          >
            +
          </Button>
        </div>
        
        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
        >
          Eliminar
        </Button>
      </div>
      
      {/* Desktop Total Price */}
      <div className="hidden sm:flex flex-col items-end">
        <p className="font-bold text-gray-900">{formatPrice(totalPrice)}</p>
      </div>
    </Card>
  );
};

export default CartItem; 