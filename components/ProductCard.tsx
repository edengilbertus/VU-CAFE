import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart } from 'lucide-react-native';
import { FoodItem } from '@/types/food';
import { useFoodStore } from '@/hooks/use-food-store';
import { router } from 'expo-router';

import { formatUGX } from '@/utils/currency';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { ImageUI } from '@/components/ui/image';
import { Box } from '@/components/ui/box';

interface ProductCardProps {
  food: FoodItem;
}

export default function ProductCard({ food }: ProductCardProps) {
  const { toggleFavorite } = useFoodStore();
  const screenWidth = Dimensions.get('window').width;

  const handlePress = () => {
    router.push(`/food/${food.id}`);
  };

  const handleFavoritePress = () => {
    toggleFavorite(food.id);
  };

  return (
    <TouchableOpacity onPress={handlePress} testID={`product-card-${food.id}`} style={styles.cardContainer}>
      <Card size="md" variant="elevated" style={[styles.card, { width: (screenWidth - 60) / 2 }]}>
        <Box style={styles.imageContainer}>
          <ImageUI source={{ uri: food.image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={handleFavoritePress}
            testID={`favorite-${food.id}`}
          >
            <Heart 
              size={20} 
              color={food.isFavorite ? '#FF6B6B' : '#999'} 
              fill={food.isFavorite ? '#FF6B6B' : 'transparent'}
            />
          </TouchableOpacity>
        </Box>
        
        <VStack style={styles.content}>
          <Heading size="md" style={styles.name}>{food.name}</Heading>
          <Heading size="md" style={styles.price}>{formatUGX(food.price)}</Heading>
        </VStack>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    margin: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: 12,
  },
  name: {
    marginBottom: 4,
    fontSize: 16,
  },
  price: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
});