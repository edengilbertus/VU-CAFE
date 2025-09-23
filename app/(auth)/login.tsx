import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  HStack,
} from '@/components/ui';
import { Colors } from '@/constants/colors';
import { useUserStore } from '@/hooks/use-user-store';
import { Link, Redirect } from 'expo-router';
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const { login, profile } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (profile) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg={Colors.background}>
      <VStack width="80%" space="lg">
        <Image
          source={require('@/assets/images/logo.png')}
          alt="logo"
          width={100}
          height={100}
          alignSelf="center"
        />
        <Heading alignSelf="center">Welcome Back!</Heading>
        <Text alignSelf="center" color={Colors.mutedDark}>
          Sign in to your account
        </Text>

        <VStack space="md" mt="lg">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 5,
              padding: 10,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 5,
              padding: 10,
            }}
          />
        </VStack>

        <TouchableOpacity
          onPress={() => login(email, password)}
          style={{
            backgroundColor: Colors.primary,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text color="#fff" fontWeight="bold">
            Login
          </Text>
        </TouchableOpacity>

        <HStack justifyContent="center" mt="md">
          <Text>Don't have an account? </Text>
          <Link href="/(auth)/signup">
            <Text color={Colors.primary}>Sign up</Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
