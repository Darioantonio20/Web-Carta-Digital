export const products = [
  // Helados
  {
    id: 'helado-vainilla',
    name: 'Helado de Vainilla',
    description: 'Cremoso helado de vainilla natural con trozos de vainilla auténtica',
    price: 259,
    category: 'helados',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 156,
    ingredients: ['Leche', 'Vainilla natural', 'Azúcar', 'Huevos'],
    available: true,
    featured: true
  },
  {
    id: 'helado-chocolate',
    name: 'Helado de Chocolate',
    description: 'Intenso helado de chocolate belga con cacao premium',
    price: 299,
    category: 'helados',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 203,
    ingredients: ['Chocolate belga', 'Leche', 'Cacao', 'Azúcar'],
    available: true,
    featured: true
  },
  {
    id: 'helado-fresa',
    name: 'Helado de Fresa',
    description: 'Refrescante helado de fresa con trozos de fruta natural',
    price: 279,
    category: 'helados',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 89,
    ingredients: ['Fresas naturales', 'Leche', 'Azúcar', 'Esencia de fresa'],
    available: true,
    featured: false
  },
  
  // Bebidas
  {
    id: 'smoothie-mango',
    name: 'Smoothie de Mango',
    description: 'Tropical smoothie de mango con yogurt griego y miel',
    price: 179,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 124,
    ingredients: ['Mango', 'Yogurt griego', 'Miel', 'Hielo'],
    available: true,
    featured: true
  },
  {
    id: 'limonada-natural',
    name: 'Limonada Natural',
    description: 'Refrescante limonada con limones frescos y menta',
    price: 139,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 78,
    ingredients: ['Limones frescos', 'Menta', 'Azúcar', 'Agua'],
    available: true,
    featured: false
  },
  {
    id: 'frappe-cafe',
    name: 'Frappé de Café',
    description: 'Frappé helado con café espresso y crema batida',
    price: 199,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 167,
    ingredients: ['Café espresso', 'Leche', 'Azúcar', 'Crema batida'],
    available: true,
    featured: true
  },
  
  // Postres
  {
    id: 'tiramisu',
    name: 'Tiramisú',
    description: 'Clásico tiramisú italiano con mascarpone y café',
    price: 339,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 234,
    ingredients: ['Mascarpone', 'Café', 'Cacao', 'Galletas savoiardi'],
    available: true,
    featured: true
  },
  {
    id: 'cheesecake-fresa',
    name: 'Cheesecake de Fresa',
    description: 'Cremoso cheesecake con cobertura de fresas frescas',
    price: 319,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 145,
    ingredients: ['Queso crema', 'Fresas', 'Galletas graham', 'Azúcar'],
    available: true,
    featured: false
  },
  
  // Snacks
  {
    id: 'granola-bowl',
    name: 'Bowl de Granola',
    description: 'Nutritivo bowl con granola casera, frutas y yogurt',
    price: 239,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 98,
    ingredients: ['Granola', 'Yogurt', 'Frutas mixtas', 'Miel'],
    available: true,
    featured: true
  },
  {
    id: 'tostadas-aguacate',
    name: 'Tostadas con Aguacate',
    description: 'Tostadas integrales con aguacate, tomate y huevo',
    price: 199,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 67,
    ingredients: ['Pan integral', 'Aguacate', 'Tomate', 'Huevo'],
    available: true,
    featured: false
  },
  
  // Café
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Café espresso italiano con granos premium',
    price: 99,
    category: 'cafe',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 189,
    ingredients: ['Granos de café premium'],
    available: true,
    featured: true
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Cappuccino con espuma de leche perfecta',
    price: 139,
    category: 'cafe',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 134,
    ingredients: ['Café espresso', 'Leche vaporizada', 'Espuma de leche'],
    available: true,
    featured: true
  },
  
  // Panadería
  {
    id: 'croissant-mantequilla',
    name: 'Croissant de Mantequilla',
    description: 'Croissant francés hojaldrado con mantequilla',
    price: 119,
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 76,
    ingredients: ['Harina', 'Mantequilla', 'Levadura', 'Sal'],
    available: true,
    featured: false
  },
  {
    id: 'muffin-arandanos',
    name: 'Muffin de Arándanos',
    description: 'Esponjoso muffin con arándanos frescos',
    price: 159,
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 52,
    ingredients: ['Harina', 'Arándanos', 'Azúcar', 'Huevos'],
    available: true,
    featured: true
  }
]; 