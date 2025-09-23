import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native';

interface LogoProps {
  width?: number;
  height?: number;
  testID?: string;
}

function Logo({ width = 160, height = 64, testID }: LogoProps) {
  return (
    <View testID={testID} style={[styles.container, { width, height }]}>
       <Image
         source={require('../assets/images/logo.svg')}
         style={{ width: width, height: height }}
         resizeMode="contain"
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});

export default memo(Logo);