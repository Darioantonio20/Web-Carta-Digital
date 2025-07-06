import { useState, useEffect } from 'react';
import Button from './Button';

const Toast = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    
    // Auto-close after duration
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, id]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.(id);
    }, 300);
  };

  const variants = {
    success: {
      bg: 'bg-blue-50 border-blue-700',
      text: 'text-blue-800',
      title: 'text-blue-900',
      icon: '✅',
      iconBg: 'bg-blue-800',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      title: 'text-red-900',
      icon: '❌',
      iconBg: 'bg-red-500',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      title: 'text-yellow-900',
      icon: '⚠️',
      iconBg: 'bg-yellow-500',
    },
    info: {
      bg: 'bg-blue-50 border-blue-700',
      text: 'text-blue-800',
      title: 'text-blue-900',
      icon: 'ℹ️',
      iconBg: 'bg-blue-800',
    },
  };

  const variant = variants[type] || variants.info;

  return (
    <div
      className={`
        relative w-full max-w-sm
        transform transition-all duration-300 ease-out
        ${isVisible && !isClosing ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${className}
      `}
      {...props}
    >
      <div
        className={`
          ${variant.bg}
          border rounded-2xl shadow-lg backdrop-blur-sm
          p-4 flex items-start space-x-3
          hover:shadow-xl transition-shadow duration-300
        `}
      >
        {/* Icon */}
        <div className={`
          ${variant.iconBg} 
          w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
          flex-shrink-0
        `}>
          {variant.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`
              ${variant.title} 
              font-semibold text-sm mb-1
            `}>
              {title}
            </h4>
          )}
          <p className={`
            ${variant.text} 
            text-sm leading-relaxed
          `}>
            {message}
          </p>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className={`
            ${variant.text} 
            hover:bg-black/10 p-1 rounded-full w-6 h-6
            flex-shrink-0
          `}
        >
          <span className="text-xs">✕</span>
        </Button>
      </div>
    </div>
  );
};

export default Toast; 