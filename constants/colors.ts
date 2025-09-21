export const Colors = {
  primary: '#3472B5',
  primaryLight: '#8AACD1',
  primaryDark: '#2A5B92',
  secondary: '#DB2A2D',
  accent: '#5B3514',
  background: '#FDFEFE',
  surface: '#FDFEFE',
  border: '#CED5DD',
  muted: '#BEBEBF',
  mutedDark: '#9E9E9F',
  mutedDarker: '#8E8F8F',
  text: '#2D1C29',
  success: '#3AA76D',
  warning: '#E2D4D2',
} as const;

export type AppColors = typeof Colors;
