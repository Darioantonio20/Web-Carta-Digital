import { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error = false,
  size = 'md',
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };
  
  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-800 focus:ring-blue-900';
  
  const inputClasses = `
    ${baseClasses}
    ${sizes[size]}
    ${stateClasses}
    ${fullWidth ? 'w-full' : ''}
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${className}
  `.trim();
  
  if (icon) {
    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
          <span className="text-gray-400 text-lg">{icon}</span>
        </div>
      </div>
    );
  }
  
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      className={inputClasses}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input; 