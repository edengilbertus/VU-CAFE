import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useFoodStore } from '@/hooks/use-food-store';
import { useUserStore } from '@/hooks/use-user-store';
import ProductCard from '@/components/ProductCard';
import CategoryTabs from '@/components/CategoryTabs';
import { Colors } from '@/constants/colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { 
    foods, 
    searchQuery, 
    selectedCategory, 
    setSearchQuery, 
    setSelectedCategory 
  } = useFoodStore();
  
  const { profile } = useUserStore();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to VU CAFE</Text>
          <Text style={styles.title}>Order from your classroom</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.mutedDark} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={Colors.mutedDark}
            value={searchQuery}
            onChangeText={setSearchQuery}
            testID="search-input"
          />
        </View>

        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <View style={styles.foodGrid}>
          {foods.map((food) => (
            <View key={food.id} style={styles.foodCardContainer}>
              <ProductCard food={food} />
            </View>
          ))}
        </View>

        {foods.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileButton: {
    position: 'relative',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: 'white',
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 34,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  foodCardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.mutedDark,
  },
});