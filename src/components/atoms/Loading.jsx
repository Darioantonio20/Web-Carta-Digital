import { forwardRef } from 'react';

const Loading = forwardRef(({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  className = '',
  ...props
}, ref) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  const colors = {
    primary: 'text-blue-800',
    secondary: 'text-yellow-600',
    gray: 'text-gray-600',
    white: 'text-white',
  };
  
  const Spinner = () => (
    <div
      ref={ref}
      className={`animate-spin ${sizes[size]} ${colors[color]} ${className}`}
      {...props}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
  
  const Dots = () => (
    <div
      ref={ref}
      className={`flex space-x-1 ${className}`}
      {...props}
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
  
  const Pulse = () => (
    <div
      ref={ref}
      className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse ${className}`}
      {...props}
    />
  );
  
  const Bars = () => (
    <div
      ref={ref}
      className={`flex space-x-1 ${className}`}
      {...props}
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`w-1 ${sizes[size]} ${colors[color]} rounded-full animate-bounce`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
  
  const variants = {
    spinner: Spinner,
    dots: Dots,
    pulse: Pulse,
    bars: Bars,
  };
  
  const LoadingComponent = variants[variant];
  
  return <LoadingComponent />;
});

Loading.displayName = 'Loading';

export default Loading; 