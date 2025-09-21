import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Minus, Plus, Star } from 'lucide-react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useFoodStore } from '@/hooks/use-food-store';
import { FOOD_ITEMS } from '@/constants/food';

import { formatUGX } from '@/utils/currency';

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useFoodStore();
  const [quantity, setQuantity] = useState<number>(1);

  const food = FOOD_ITEMS.find(item => item.id === id);

  if (!food) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Food item not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(food, quantity);
    router.back();
  };

  const handleOrderNow = () => {
    addToCart(food, quantity);
    router.push('/cart');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          testID="back-button"
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        
        <Link href="/(tabs)/settings" asChild>
          <TouchableOpacity style={styles.profileButton} testID="profile-button">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: food.image }} style={styles.foodImage} />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.foodName}>{food.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{formatUGX(food.price)}</Text>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Choice quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}
                testID="decrease-quantity"
              >
                <Minus size={20} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(1)}
                testID="increase-quantity"
              >
                <Plus size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFA500" fill="#FFA500" />
                <Text style={styles.rating}>{food.rating}</Text>
              </View>
            </View>
            <Text style={styles.description}>{food.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.orderButton} 
          onPress={handleOrderNow}
          testID="order-now-button"
        >
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={handleAddToCart}
          testID="add-to-cart-button"
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  profileButton: {
    position: 'relative',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: 'white',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 32,
  },
  foodImage: {
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  foodName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
    lineHeight: 40,
  },
  priceContainer: {
    marginBottom: 32,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  quantitySection: {
    marginBottom: 40,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 32,
    minWidth: 30,
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 120,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFA500',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    gap: 16,
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
});