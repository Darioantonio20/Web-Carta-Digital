import { forwardRef, useState } from 'react';

const Image = forwardRef(({
  src,
  alt,
  width,
  height,
  className = '',
  rounded = 'md',
  loading = 'lazy',
  objectFit = 'cover',
  fallback = null,
  onLoad,
  onError,
  ...props
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const baseClasses = 'transition-all duration-300';
  
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
  };
  
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };
  
  const imageClasses = `
    ${baseClasses}
    ${roundedClasses[rounded]}
    ${objectFitClasses[objectFit]}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    ${className}
  `.trim();
  
  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };
  
  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };
  
  if (hasError && fallback) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${roundedClasses[rounded]} ${className}`}>
        {fallback}
      </div>
    );
  }
  
  return (
    <div className="relative">
      {!isLoaded && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${roundedClasses[rounded]}`} />
      )}
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={imageClasses}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
});

Image.displayName = 'Image';

export default Image; 