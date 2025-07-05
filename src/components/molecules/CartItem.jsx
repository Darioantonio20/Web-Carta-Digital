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
      className={`flex items-center space-x-4 ${className}`}
      {...props}
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover"
          rounded="lg"
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-sm text-gray-500 truncate">{item.description}</p>
        <p className="text-sm font-medium text-emerald-600 mt-1">
          {formatPrice(item.price)}
        </p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
        >
          -
        </Button>
        
        <span className="w-8 text-center font-medium">{quantity}</span>
        
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
        >
          +
        </Button>
      </div>
      
      {/* Total Price */}
      <div className="flex flex-col items-end">
        <p className="font-bold text-gray-900">{formatPrice(totalPrice)}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 mt-1"
        >
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default CartItem; 