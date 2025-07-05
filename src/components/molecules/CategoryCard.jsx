import { Card, Image } from '../atoms';

const CategoryCard = ({
  category,
  onSelect,
  className = '',
  ...props
}) => {
  const { id, name, description, image, icon } = category;
  
  const handleSelect = () => {
    onSelect?.(category);
  };
  
  return (
    <Card
      hover
      shadow="md"
      padding="none"
      className={`group overflow-hidden cursor-pointer ${className}`}
      onClick={handleSelect}
      {...props}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-32 sm:h-40 group-hover:scale-105 transition-transform duration-500"
          rounded="none"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Icon */}
        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard; 