import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outline' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  style,
  variant = 'elevated',
  size = 'md',
  ...props
}: CardProps) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    styles[size],
    style,
  ];

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
  },
  elevated: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outline: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  filled: {
    backgroundColor: '#f8f9fa',
  },
  sm: {
    padding: 12,
  },
  md: {
    padding: 16,
  },
  lg: {
    padding: 20,
  },
});