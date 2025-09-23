import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import AnimatedTabBar from '@/components/AnimatedTabBar';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.svg')} style={styles.logo} />
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
    height: 60,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});
