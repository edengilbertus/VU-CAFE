import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { FoodItem } from '@/types/food';
import { useFoodStore } from '@/hooks/use-food-store';
import { router } from 'expo-router';

import { formatUGX } from '@/utils/currency';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { TextUI } from '@/components/ui/text';
import { ImageUI } from '@/components/ui/image';
import { Box } from '@/components/ui/box';

interface FoodCardProps {
  food: FoodItem;
}

export default function FoodCard({ food }: FoodCardProps) {
  const { toggleFavorite } = useFoodStore();

  const handlePress = () => {
    router.push(`/food/${food.id}`);
  };

  const handleFavoritePress = () => {
    toggleFavorite(food.id);
  };

  return (
    <TouchableOpacity onPress={handlePress} testID={`food-card-${food.id}`}>
      <Card size="md" variant="elevated" style={styles.card}>
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
          <TextUI size="sm" style={styles.description}>{food.description}</TextUI>
          <Heading size="md" style={styles.price}>{formatUGX(food.price)}</Heading>
        </VStack>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
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
    padding: 16,
  },
  name: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    color: '#333',
  },
});