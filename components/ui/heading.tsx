import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface HeadingProps extends TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Heading = ({
  children,
  style,
  size = 'md',
  ...props
}: HeadingProps) => {
  const headingStyles = [
    styles.base,
    styles[size],
    style,
  ];

  return (
    <Text style={headingStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontWeight: '700',
    color: '#333',
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
  xl: {
    fontSize: 20,
  },
  '2xl': {
    fontSize: 24,
  },
  '3xl': {
    fontSize: 30,
  },
  '4xl': {
    fontSize: 36,
  },
});