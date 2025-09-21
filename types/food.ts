export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'healthy' | 'junk' | 'dessert';
  rating: number;
  isFavorite?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export type Category = 'all' | 'healthy' | 'junk' | 'dessert';