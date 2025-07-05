import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { storage, calculateTotal } from '../utils';
import { STORAGE_KEYS } from '../constants';

// Create context
const AppContext = createContext();

// Action types
const ACTION_TYPES = {
  // Cart actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  
  // UI actions
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_SHOW_ALL_PRODUCTS: 'SET_SHOW_ALL_PRODUCTS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  
  // Product actions
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  
  // Favorites
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  
  // Recently viewed
  ADD_TO_RECENTLY_VIEWED: 'ADD_TO_RECENTLY_VIEWED',
  
  // Notifications
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  
  // Initialize from localStorage
  INITIALIZE_FROM_STORAGE: 'INITIALIZE_FROM_STORAGE',
};

// Initial state
const initialState = {
  // Cart state
  cart: [],
  cartTotal: 0,
  cartCount: 0,
  
  // UI state
  searchTerm: '',
  selectedCategory: null,
  showAllProducts: false,
  loading: false,
  error: null,
  
  // Data state
  products: [],
  categories: [],
  
  // User preferences
  favorites: [],
  recentlyViewed: [],
  
  // Notifications
  notifications: [],
  
  // Initialization flag
  isInitialized: false,
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INITIALIZE_FROM_STORAGE: {
      const { cart, favorites, recentlyViewed } = action.payload;
      return {
        ...state,
        cart: cart || [],
        cartTotal: calculateTotal(cart || []),
        cartCount: (cart || []).reduce((total, item) => total + item.quantity, 0),
        favorites: favorites || [],
        recentlyViewed: recentlyViewed || [],
        isInitialized: true,
      };
    }
    
    case ACTION_TYPES.ADD_TO_CART: {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      let newCart;
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      
      return {
        ...state,
        cart: newCart,
        cartTotal: calculateTotal(newCart),
        cartCount: newCart.reduce((total, item) => total + item.quantity, 0),
      };
    }
    
    case ACTION_TYPES.REMOVE_FROM_CART: {
      const newCart = state.cart.filter(item => item.id !== action.payload);
      return {
        ...state,
        cart: newCart,
        cartTotal: calculateTotal(newCart),
        cartCount: newCart.reduce((total, item) => total + item.quantity, 0),
      };
    }
    
    case ACTION_TYPES.UPDATE_QUANTITY: {
      const newCart = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        cart: newCart,
        cartTotal: calculateTotal(newCart),
        cartCount: newCart.reduce((total, item) => total + item.quantity, 0),
      };
    }
    
    case ACTION_TYPES.CLEAR_CART: {
      return {
        ...state,
        cart: [],
        cartTotal: 0,
        cartCount: 0,
      };
    }
    
    case ACTION_TYPES.SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.payload,
        showAllProducts: false,
        selectedCategory: null,
      };
    }
    
    case ACTION_TYPES.SET_SELECTED_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.payload,
        showAllProducts: false,
        searchTerm: '',
      };
    }
    
    case ACTION_TYPES.SET_SHOW_ALL_PRODUCTS: {
      return {
        ...state,
        showAllProducts: action.payload,
        selectedCategory: null,
        searchTerm: '',
      };
    }
    
    case ACTION_TYPES.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    
    case ACTION_TYPES.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    
    case ACTION_TYPES.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    
    case ACTION_TYPES.SET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    
    case ACTION_TYPES.TOGGLE_FAVORITE: {
      const productId = action.payload;
      const isFavorite = state.favorites.includes(productId);
      
      const newFavorites = isFavorite
        ? state.favorites.filter(id => id !== productId)
        : [...state.favorites, productId];
      
      return {
        ...state,
        favorites: newFavorites,
      };
    }
    
    case ACTION_TYPES.ADD_TO_RECENTLY_VIEWED: {
      const productId = action.payload;
      const newRecentlyViewed = [
        productId,
        ...state.recentlyViewed.filter(id => id !== productId)
      ].slice(0, 10); // Keep only last 10 items
      
      return {
        ...state,
        recentlyViewed: newRecentlyViewed,
      };
    }
    
    case ACTION_TYPES.ADD_NOTIFICATION: {
      const newNotification = {
        id: Date.now(),
        ...action.payload,
      };
      
      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };
    }
    
    case ACTION_TYPES.REMOVE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
      };
    }
    
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Initialize from localStorage only once on mount
  useEffect(() => {
    const savedCart = storage.get(STORAGE_KEYS.cart);
    const savedFavorites = storage.get(STORAGE_KEYS.favorites);
    const savedRecentlyViewed = storage.get(STORAGE_KEYS.recentlyViewed);
    
    dispatch({
      type: ACTION_TYPES.INITIALIZE_FROM_STORAGE,
      payload: {
        cart: savedCart,
        favorites: savedFavorites,
        recentlyViewed: savedRecentlyViewed,
      }
    });
  }, []); // Empty dependency array - only run once
  
  // Save to localStorage only when data changes and app is initialized
  useEffect(() => {
    if (state.isInitialized) {
      storage.set(STORAGE_KEYS.cart, state.cart);
    }
  }, [state.cart, state.isInitialized]);
  
  useEffect(() => {
    if (state.isInitialized) {
      storage.set(STORAGE_KEYS.favorites, state.favorites);
    }
  }, [state.favorites, state.isInitialized]);
  
  useEffect(() => {
    if (state.isInitialized) {
      storage.set(STORAGE_KEYS.recentlyViewed, state.recentlyViewed);
    }
  }, [state.recentlyViewed, state.isInitialized]);
  
  // Memoized actions to prevent re-renders
  const actions = useMemo(() => ({
    // Cart actions
    addToCart: (product) => {
      dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: product });
      // Add notification
      dispatch({ 
        type: ACTION_TYPES.ADD_NOTIFICATION, 
        payload: {
          type: 'success',
          title: 'Producto agregado',
          message: `${product.name} se agregó al carrito`,
          duration: 3000,
        }
      });
    },
    removeFromCart: (productId) => dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART, payload: productId }),
    updateQuantity: (productId, quantity) => dispatch({ type: ACTION_TYPES.UPDATE_QUANTITY, payload: { id: productId, quantity } }),
    clearCart: () => dispatch({ type: ACTION_TYPES.CLEAR_CART }),
    
    // UI actions
    setSearchTerm: (term) => dispatch({ type: ACTION_TYPES.SET_SEARCH_TERM, payload: term }),
    setSelectedCategory: (category) => dispatch({ type: ACTION_TYPES.SET_SELECTED_CATEGORY, payload: category }),
    setShowAllProducts: (show) => dispatch({ type: ACTION_TYPES.SET_SHOW_ALL_PRODUCTS, payload: show }),
    setLoading: (loading) => dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error }),
    
    // Product actions
    setProducts: (products) => dispatch({ type: ACTION_TYPES.SET_PRODUCTS, payload: products }),
    setCategories: (categories) => dispatch({ type: ACTION_TYPES.SET_CATEGORIES, payload: categories }),
    
    // Favorites
    toggleFavorite: (productId) => dispatch({ type: ACTION_TYPES.TOGGLE_FAVORITE, payload: productId }),
    
    // Recently viewed
    addToRecentlyViewed: (productId) => dispatch({ type: ACTION_TYPES.ADD_TO_RECENTLY_VIEWED, payload: productId }),
    
    // Notifications
    addNotification: (notification) => dispatch({ type: ACTION_TYPES.ADD_NOTIFICATION, payload: notification }),
    removeNotification: (id) => dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: id }),
  }), []); // Empty dependency array because dispatch is stable
  
  // Memoized context value
  const value = useMemo(() => ({
    ...state,
    ...actions,
  }), [state, actions]);
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 