import { FoodItem } from '@/types/food';

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Easy Greek Salad',
    description: 'This Italian salad is full of all the right flavors and textures: crisp lettuce, crunchy garlic croutons, and zingy pepperoncini. It\'s covered in punchy, herby Italian vinaigrette that makes the flavors sing! It can play sidekick to just about anything.',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
    category: 'healthy',
    rating: 4.9,
    isFavorite: false
  },
  {
    id: '2',
    name: 'Eybisi Salad Mix',
    description: 'Mix vegetables ingredients',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    category: 'healthy',
    rating: 4.7,
    isFavorite: true
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Loves and Lemon',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop',
    category: 'healthy',
    rating: 4.8,
    isFavorite: false
  },
  {
    id: '4',
    name: 'Chicken Burger',
    description: 'Juicy grilled chicken with fresh lettuce and tomatoes',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    category: 'junk',
    rating: 4.5,
    isFavorite: false
  },
  {
    id: '5',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with creamy frosting',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    category: 'dessert',
    rating: 4.9,
    isFavorite: true
  },
  {
    id: '6',
    name: 'Pizza Margherita',
    description: 'Classic Italian pizza with fresh mozzarella and basil',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
    category: 'junk',
    rating: 4.6,
    isFavorite: false
  }
];