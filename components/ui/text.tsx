import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface TextPropsUI extends TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const TextUI = ({
  children,
  style,
  size = 'md',
  ...props
}: TextPropsUI) => {
  const textStyles = [
    styles.base,
    styles[size],
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#666',
  },
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
});