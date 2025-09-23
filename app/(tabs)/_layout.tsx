import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/colors';
import AnimatedTabBar from '@/components/AnimatedTabBar';
import { useUserStore } from '@/hooks/use-user-store';

export default function TabLayout() {
  const { profile } = useUserStore();
  
  const profileImageUrl = profile?.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';

  if (!profile) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/(tabs)/settings" asChild>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: profileImageUrl }}
              style={styles.profileImage}
            />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </Link>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
          }}
        />
      </Tabs>
      <AnimatedTabBar />
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
    height: 100,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 40,
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
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});