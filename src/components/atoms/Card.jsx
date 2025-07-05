import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  shadow = 'md',
  className = '',
  onClick,
  ...props
}, ref) => {
  const baseClasses = 'bg-white rounded-2xl border transition-all duration-300';
  
  const variants = {
    default: 'border-gray-200',
    elevated: 'border-gray-100',
    outlined: 'border-gray-300',
    ghost: 'border-transparent bg-gray-50',
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:scale-105 cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const cardClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `.trim();
  
  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card; 