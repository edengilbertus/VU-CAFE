import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Redirect, Link, useRouter } from 'expo-router';
import { useUserStore } from '@/hooks/use-user-store';

export default function ProfileScreen() {
  const { profile, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/login');
          }
        },
      ]
    );
  };

  // If user is not authenticated (no profile), redirect to login
  if (!profile) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {profile ? (
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{profile.name || 'Not provided'}</Text>
          
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email || 'Not provided'}</Text>
          
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{profile.studentNumber || 'Not provided'}</Text>
        </View>
      ) : (
        <Text style={styles.loading}>Loading profile...</Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Button title="Settings" onPress={() => router.push('/(tabs)/settings')} />
        <Button title="Home" onPress={() => router.push('/(tabs)/home')} />
        <Button title="Cart" onPress={() => router.push('/(tabs)/cart')} />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
      
      <View style={styles.navigationLinks}>
        <Link href="/(auth)/login" asChild>
          <Button title="Go to Login" />
        </Link>
        <Link href="/(auth)/signup" asChild>
          <Button title="Go to Signup" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileInfo: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  navigationLinks: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});