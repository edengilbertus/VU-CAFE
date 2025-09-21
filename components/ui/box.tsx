import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export const Box = ({ children, style, ...props }: ViewProps) => {
  return (
    <View style={[styles.base, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {},
});