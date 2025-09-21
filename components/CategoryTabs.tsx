import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Category } from '@/types/food';

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'healthy', label: 'Healthy food' },
  { key: 'junk', label: 'Junk food' },
  { key: 'dessert', label: 'Dessert' },
];

export default function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={[
            styles.tab,
            selectedCategory === category.key && styles.activeTab
          ]}
          onPress={() => onCategoryChange(category.key)}
          testID={`category-${category.key}`}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === category.key && styles.activeTabText
            ]}
          >
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
});