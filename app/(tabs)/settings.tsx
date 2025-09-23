import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert, ActionSheetIOS, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, Save, MapPin, Heart, Clock, HelpCircle, LogOut } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

import { useUserStore } from '@/hooks/use-user-store';
import { Colors } from '@/constants/colors';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { profile, setProfile, classroom, setClassroom } = useUserStore();
  const [name, setName] = useState<string>(profile?.name || '');
  const [email, setEmail] = useState<string>(profile?.email || '');
  const [studentNumber, setStudentNumber] = useState<string>(profile?.studentNumber || '');
  const [profileImage, setProfileImage] = useState<string>(profile?.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face');
  const [roomInput, setRoomInput] = useState<string>(classroom);

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      name,
      email,
      studentNumber: studentNumber || undefined,
      profileImage,
    };
    setProfile(updatedProfile);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleSaveClassroom = () => {
    setClassroom(roomInput);
    Alert.alert('Success', 'Classroom updated successfully!');
  };

  const showImagePickerOptions = () => {
    const options = ['Take Photo', 'Choose from Library', 'Cancel'];
    const cancelButtonIndex = 2;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            takePhoto();
          } else if (buttonIndex === 1) {
            pickImage();
          }
        }
      );
    } else {
      // For Android, we can show an alert with options
      Alert.alert(
        'Select Photo',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: takePhoto },
          { text: 'Choose from Library', onPress: pickImage },
          { text: 'Cancel', style: 'cancel' }
        ],
        { cancelable: true }
      );
    }
  };

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request permission to access camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera is required!');
      return;
    }
    
    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const menuItems = [
    { id: 'favorites', icon: Heart, label: 'Favorites', onPress: () => {} },
    { id: 'history', icon: Clock, label: 'Order History', onPress: () => {} },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', onPress: () => {} },
    { id: 'logout', icon: LogOut, label: 'Logout', onPress: () => {}, isDestructive: true },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={showImagePickerOptions} style={styles.profileImageContainer}>
            <Image 
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.cameraIconContainer}>
              <Camera size={20} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>{profile?.name || 'VU CAFE Member'}</Text>
          {!!profile?.email && <Text style={styles.profileEmail}>{profile.email}</Text>}
        </View>

        {/* Profile Settings Form */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Student Number (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2023-UG-00123"
              value={studentNumber}
              onChangeText={setStudentNumber}
            />
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Save size={16} color="white" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Classroom Settings */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Classroom</Text>
          <View style={styles.inputRow}>
            <View style={styles.flex1}>
              <Text style={styles.label}>Current Room</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. B3-204"
                value={roomInput}
                onChangeText={setRoomInput}
              />
            </View>
            <TouchableOpacity
              style={styles.setRoomButton}
              onPress={handleSaveClassroom}
            >
              <MapPin size={16} color="white" />
              <Text style={styles.setRoomText}>Set</Text>
            </TouchableOpacity>
          </View>
          {!!classroom && (
            <Text style={styles.currentRoomText}>Deliver to: {classroom}</Text>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              testID={`menu-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, item.isDestructive && styles.destructiveIcon]}>
                  <item.icon 
                    size={20} 
                    color={item.isDestructive ? '#FF6B6B' : '#666'} 
                  />
                </View>
                <Text style={[styles.menuItemText, item.isDestructive && styles.destructiveText]}>
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  tabBarVisible: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  formCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  setRoomButton: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  setRoomText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  currentRoomText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  destructiveIcon: {
    backgroundColor: '#FFE5E5',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  destructiveText: {
    color: '#FF6B6B',
  },
});