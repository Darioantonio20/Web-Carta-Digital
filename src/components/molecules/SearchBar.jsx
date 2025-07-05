import { useState, useCallback } from 'react';
import { Input, Button } from '../atoms';
import { debounce } from '../../utils';

const SearchBar = ({
  placeholder = "Buscar productos...",
  onSearch,
  className = '',
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce search to avoid excessive API calls
  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch?.(term);
    }, 300),
    [onSearch]
  );
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };
  
  const handleClear = () => {
    setSearchTerm('');
    onSearch?.('');
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`} {...props}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        icon="🔍"
        iconPosition="left"
        size="lg"
        fullWidth
        className="pr-20"
      />
      
      {/* Clear button */}
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      )}
      
      {/* Search button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        Buscar
      </Button>
    </form>
  );
};

export default SearchBar; 