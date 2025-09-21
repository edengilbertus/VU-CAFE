import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import logoSvg from '../assets/images/logo.svg';

interface LogoProps {
  width?: number;
  height?: number;
  testID?: string;
}

function Logo({ width = 160, height = 64, testID }: LogoProps) {
  return (
    <View testID={testID} style={[styles.container, { width, height }]}>
      <SvgXml 
        width={width} 
        height={height} 
        xml={logoSvg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});

export default memo(Logo);