export const Colors = {
  primary: '#DB2A2D', // red from logo
  secondary: '#5B3514', // brown from logo
  accent: '#8AACD1', // blue-gray from logo
  background: '#FDFEFE', // almost white from logo
  surface: '#FDFEFE',
  border: '#CED5DD',
  muted: '#BEBEBF', // light gray from logo
  mutedDark: '#9E9E9F', // gray from logo
  mutedDarker: '#8E8F8F', // darker gray from logo
  text: '#0C0909', // almost black from logo
  dark: '#2D1C29', // dark purple/brown from logo
  success: '#3AA76D',
  warning: '#E2D4D2',
} as const;

export type AppColors = typeof Colors;