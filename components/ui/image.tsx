import React from 'react';
import { Image, StyleSheet, ImageProps } from 'react-native';

export const ImageUI = (props: ImageProps) => {
  return (
    <Image
      {...props}
      style={[styles.base, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    resizeMode: 'cover',
  },
});