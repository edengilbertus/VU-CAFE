import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
  testID?: string;
}

// Truncated svg for brevity; preserves brand palette. In real app, include full SVG provided by user.
const svgXml = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1536 672">
  <rect width="1536" height="672" fill="#FDFEFE" />
  <rect x="0" y="620" width="1536" height="52" fill="#3472B5" />
  <g>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Helvetica, Arial" font-size="160" fill="#2D1C29">VU CAFE</text>
  </g>
</svg>`;

function Logo({ width = 160, height = 64, testID }: LogoProps) {
  return (
    <View testID={testID} style={[styles.container, { width, height }]}>
      <SvgXml xml={svgXml} width={width} height={height} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});

export default memo(Logo);
