import { forwardRef } from 'react';

const Badge = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-yellow-100 text-yellow-800',
    success: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    gradient: 'bg-gradient-to-r from-blue-500 to-yellow-600 text-white',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const badgeClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();
  
  return (
    <span
      ref={ref}
      className={badgeClasses}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge; 