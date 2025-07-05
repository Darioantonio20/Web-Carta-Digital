// App constants
export const APP_NAME = 'Carta Digital';
export const APP_DESCRIPTION = 'Tu carta digital favorita';

// Theme colors
export const COLORS = {
  primary: '#059669', // emerald-600
  secondary: '#0d9488', // teal-600
  accent: '#f59e0b', // amber-500
  success: '#10b981', // emerald-500
  warning: '#f59e0b', // amber-500
  error: '#ef4444', // red-500
  neutral: '#6b7280', // gray-500
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation durations
export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
};

// Local storage keys
export const STORAGE_KEYS = {
  cart: 'cart-items',
  favorites: 'favorite-products',
  recentlyViewed: 'recently-viewed',
};

// API endpoints (for future implementation)
export const API_ENDPOINTS = {
  products: '/api/products',
  categories: '/api/categories',
  cart: '/api/cart',
  orders: '/api/orders',
}; 