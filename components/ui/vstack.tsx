import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export const VStack = ({ children, style, ...props }: ViewProps) => {
  return (
    <View style={[styles.base, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'column',
  },
});