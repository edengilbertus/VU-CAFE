import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FoodItem, CartItem, Category } from '@/types/food';
import { FOOD_ITEMS } from '@/constants/food';

interface StorageProvider {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
}

const createStorage = (): StorageProvider => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      getItem: async (key: string) => localStorage.getItem(key),
      setItem: async (key: string, value: string) => localStorage.setItem(key, value),
    };
  }
  
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  return {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  };
};

export const [FoodStoreProvider, useFoodStore] = createContextHook(() => {
  const storage = createStorage();
  const [foods, setFoods] = useState<FoodItem[]>(FOOD_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  useEffect(() => {
    loadFavorites();
    loadCart();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await storage.getItem('favorites');
      if (stored) {
        const favIds = JSON.parse(stored);
        setFavorites(favIds);
        setFoods(prev => prev.map(food => ({
          ...food,
          isFavorite: favIds.includes(food.id)
        })));
      }
    } catch (error) {
      console.log('Error loading favorites:', error);
    }
  };

  const loadCart = async () => {
    try {
      const stored = await storage.getItem('cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading cart:', error);
    }
  };

  const saveFavorites = async (favIds: string[]) => {
    try {
      await storage.setItem('favorites', JSON.stringify(favIds));
    } catch (error) {
      console.log('Error saving favorites:', error);
    }
  };

  const saveCart = async (cartItems: CartItem[]) => {
    if (!cartItems || cartItems.length === 0) {
      try {
        await storage.setItem('cart', JSON.stringify([]));
      } catch (error) {
        console.log('Error saving empty cart:', error);
      }
      return;
    }

    const validatedItems = cartItems.filter(item => 
      item && 
      typeof item.id === 'string' && 
      item.id.trim().length > 0 &&
      typeof item.quantity === 'number' && 
      item.quantity > 0
    );

    try {
      await storage.setItem('cart', JSON.stringify(validatedItems));
    } catch (error) {
      console.log('Error saving cart:', error);
    }
  };

  const toggleFavorite = useCallback((foodId: string) => {
    const newFavorites = favorites.includes(foodId)
      ? favorites.filter(id => id !== foodId)
      : [...favorites, foodId];
    
    setFavorites(newFavorites);
    setFoods(prev => prev.map(food => ({
      ...food,
      isFavorite: food.id === foodId ? !food.isFavorite : food.isFavorite
    })));
    saveFavorites(newFavorites);
  }, [favorites]);

  const addToCart = useCallback((food: FoodItem, quantity: number = 1) => {
    const existingItem = cart.find(item => item.id === food.id);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...food, quantity }];
    }

    setCart(newCart);
    saveCart(newCart);
  }, [cart]);

  const updateCartQuantity = useCallback((foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }

    const newCart = cart.map(item =>
      item.id === foodId ? { ...item, quantity } : item
    );
    setCart(newCart);
    saveCart(newCart);
  }, [cart]);

  const removeFromCart = useCallback((foodId: string) => {
    const newCart = cart.filter(item => item.id !== foodId);
    setCart(newCart);
    saveCart(newCart);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
    saveCart([]);
  }, []);

  const filteredFoods = useMemo(() => {
    let filtered = foods;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [foods, selectedCategory, searchQuery]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return useMemo(() => ({
    foods: filteredFoods,
    cart,
    favorites,
    searchQuery,
    selectedCategory,
    cartTotal,
    cartItemsCount,
    setSearchQuery,
    setSelectedCategory,
    toggleFavorite,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  }), [
    filteredFoods,
    cart,
    favorites,
    searchQuery,
    selectedCategory,
    cartTotal,
    cartItemsCount,
    toggleFavorite,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  ]);
});