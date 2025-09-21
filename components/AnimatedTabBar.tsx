import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Home, ShoppingCart, Settings } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useFoodStore } from '@/hooks/use-food-store';

interface TabBarButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onPress: () => void;
}

function TabBarButton({ icon, label, active, onPress }: TabBarButtonProps) {
  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.tabContent}>
        {icon}
        <Text style={[styles.tabLabel, { color: active ? Colors.background : Colors.muted }]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function CartTabIcon({ color, focused }: { color: string; focused: boolean }) {
  const { cartItemsCount } = useFoodStore();
  
  return (
    <View style={styles.cartIconContainer}>
      <ShoppingCart color={color} size={24} />
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {cartItemsCount > 99 ? '99+' : cartItemsCount.toString()}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function AnimatedTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine which tab is currently active
  const getActiveTab = () => {
    if (pathname === '/(tabs)/home' || pathname === '/(tabs)') return 'home';
    if (pathname === '/(tabs)/cart') return 'cart';
    if (pathname === '/(tabs)/settings') return 'settings';
    return 'home';
  };

  const activeTab = getActiveTab();

  const handleTabPress = (tab: string) => {
    switch (tab) {
      case 'home':
        router.push('/(tabs)/home');
        break;
      case 'cart':
        router.push('/(tabs)/cart');
        break;
      case 'settings':
        router.push('/(tabs)/settings');
        break;
      default:
        router.push('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabBarButton
          icon={<Home color={activeTab === 'home' ? Colors.background : Colors.muted} size={24} />}
          label="Home"
          active={activeTab === 'home'}
          onPress={() => handleTabPress('home')}
        />
        <TabBarButton
          icon={<CartTabIcon color={activeTab === 'cart' ? Colors.background : Colors.muted} focused={activeTab === 'cart'} />}
          label="Cart"
          active={activeTab === 'cart'}
          onPress={() => handleTabPress('cart')}
        />
        <TabBarButton
          icon={<Settings color={activeTab === 'settings' ? Colors.background : Colors.muted} size={24} />}
          label="Settings"
          active={activeTab === 'settings'}
          onPress={() => handleTabPress('settings')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  cartIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});