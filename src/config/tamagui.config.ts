// src/config/tamagui.config.js
import { createTamagui, createTokens } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { createMedia } from '@tamagui/react-native-media-driver'

/**
 * 🎨 CONFIGURATION TAMAGUI - FINAPP HAITI
 * 
 * Couleurs et tokens basés sur le wireframe HTML
 * Design: Purple/Pink gradient + Dark mode par défaut
 */

// ===================================================================
// COULEURS DU WIREFRAME
// ===================================================================

const colors = {
  // Primary Purple/Pink
  primaryPurple: '#8b5cf6',
  primaryPurpleLight: '#a78bfa',
  secondaryPink: '#ec4899',
  secondaryPinkLight: '#f472b6',
  purpleDark: '#6d28d9',
  
  // Dark Mode (Default)
  bgPrimary: '#1a1625',
  bgSecondary: '#2d2438',
  bgTertiary: '#3d3349',
  bgHover: '#4a3f5a',
  
  // Glass Effect
  glassBg: 'rgba(139, 92, 246, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  
  // Text
  textPrimary: '#ffffff',
  textSecondary: '#a0aec0',
  textMuted: '#718096',
  
  // Status Colors
  success: '#10b981',
  successLight: '#34d399',
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  error: '#ef4444',
  errorLight: '#f87171',
  info: '#3b82f6',
  infoLight: '#60a5fa',
  
  // Light Mode
  lightBgPrimary: '#f8f9fa',
  lightBgSecondary: '#ffffff',
  lightBgTertiary: '#f1f3f5',
  lightBgHover: '#e9ecef',
  lightTextPrimary: '#1a202c',
  lightTextSecondary: '#4a5568',
  lightTextMuted: '#718096',
  lightGlassBg: 'rgba(139, 92, 246, 0.05)',
  lightGlassBorder: 'rgba(139, 92, 246, 0.15)',
  
  // Gradients (as strings for linear-gradient)
  gradientPurple: 'linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%)',
  gradientPurplePink: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  gradientBalance: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  
  // Transparents
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
}

// ===================================================================
// TOKENS
// ===================================================================

const tokens = createTokens({
  // Colors
  color: {
    // Primary
    primary: colors.primaryPurple,
    primaryLight: colors.primaryPurpleLight,
    primaryDark: colors.purpleDark,
    secondary: colors.secondaryPink,
    secondaryLight: colors.secondaryPinkLight,
    
    // Backgrounds
    background: colors.bgPrimary,
    backgroundStrong: colors.bgSecondary,
    backgroundSoft: colors.bgTertiary,
    backgroundHover: colors.bgHover,
    
    // Glass
    glass: colors.glassBg,
    glassBorder: colors.glassBorder,
    
    // Text
    color: colors.textPrimary,
    colorMuted: colors.textSecondary,
    colorFaded: colors.textMuted,
    
    // Status
    success: colors.success,
    successLight: colors.successLight,
    warning: colors.warning,
    warningLight: colors.warningLight,
    error: colors.error,
    errorLight: colors.errorLight,
    info: colors.info,
    infoLight: colors.infoLight,
    
    // Light mode
    lightBackground: colors.lightBgPrimary,
    lightBackgroundStrong: colors.lightBgSecondary,
    lightBackgroundSoft: colors.lightBgTertiary,
    lightBackgroundHover: colors.lightBgHover,
    lightColor: colors.lightTextPrimary,
    lightColorMuted: colors.lightTextSecondary,
    lightGlass: colors.lightGlassBg,
    lightGlassBorder: colors.lightGlassBorder,
    
    // Utils
    transparent: colors.transparent,
    white: colors.white,
    black: colors.black,
  },
  
  // Space (padding, margin, gap)
  space: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    true: 16, // Default size ($4 = 16px)
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256,
  },
  
  // Size (width, height)
  size: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    true: 16, // Default size ($4 = 16px)
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256,
    80: 320, // Right sidebar width
    full: '100%',
    half: '50%',
  },
  
  // Radius (border radius)
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    round: 999,
    full: '100%',
  },
  
  // Z-index
  zIndex: {
    0: 0,
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
    modal: 1000,
    toast: 2000,
    tooltip: 3000,
  },
})

// ===================================================================
// THEMES
// ===================================================================

const darkTheme = {
  // Backgrounds
  background: colors.bgPrimary,
  backgroundStrong: colors.bgSecondary,
  backgroundSoft: colors.bgTertiary,
  backgroundHover: colors.bgHover,
  backgroundPress: colors.bgHover,
  backgroundFocus: colors.bgTertiary,
  backgroundTransparent: colors.glassBg,
  
  // Text
  color: colors.textPrimary,
  colorHover: colors.textPrimary,
  colorPress: colors.textPrimary,
  colorFocus: colors.textPrimary,
  colorMuted: colors.textSecondary,
  colorFaded: colors.textMuted,
  
  // Primary
  primary: colors.primaryPurple,
  primaryHover: colors.primaryPurpleLight,
  primaryPress: colors.purpleDark,
  primaryFocus: colors.primaryPurpleLight,
  
  // Secondary
  secondary: colors.secondaryPink,
  secondaryHover: colors.secondaryPinkLight,
  secondaryPress: colors.secondaryPink,
  
  // Status
  success: colors.success,
  successHover: colors.successLight,
  warning: colors.warning,
  warningHover: colors.warningLight,
  error: colors.error,
  errorHover: colors.errorLight,
  info: colors.info,
  infoHover: colors.infoLight,
  
  // Borders
  borderColor: colors.glassBorder,
  borderColorHover: colors.glassBorder,
  borderColorPress: colors.glassBorder,
  borderColorFocus: colors.primaryPurple,
  
  // Shadows
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowColorHover: 'rgba(0, 0, 0, 0.5)',
  shadowColorPress: 'rgba(0, 0, 0, 0.6)',
}

const lightTheme = {
  // Backgrounds
  background: colors.lightBgPrimary,
  backgroundStrong: colors.lightBgSecondary,
  backgroundSoft: colors.lightBgTertiary,
  backgroundHover: colors.lightBgHover,
  backgroundPress: colors.lightBgHover,
  backgroundFocus: colors.lightBgTertiary,
  backgroundTransparent: colors.lightGlassBg,
  
  // Text
  color: colors.lightTextPrimary,
  colorHover: colors.lightTextPrimary,
  colorPress: colors.lightTextPrimary,
  colorFocus: colors.lightTextPrimary,
  colorMuted: colors.lightTextSecondary,
  colorFaded: colors.lightTextMuted,
  
  // Primary
  primary: colors.primaryPurple,
  primaryHover: colors.primaryPurpleLight,
  primaryPress: colors.purpleDark,
  primaryFocus: colors.primaryPurpleLight,
  
  // Secondary
  secondary: colors.secondaryPink,
  secondaryHover: colors.secondaryPinkLight,
  secondaryPress: colors.secondaryPink,
  
  // Status
  success: colors.success,
  successHover: colors.successLight,
  warning: colors.warning,
  warningHover: colors.warningLight,
  error: colors.error,
  errorHover: colors.errorLight,
  info: colors.info,
  infoHover: colors.infoLight,
  
  // Borders
  borderColor: colors.lightGlassBorder,
  borderColorHover: colors.lightGlassBorder,
  borderColorPress: colors.lightGlassBorder,
  borderColorFocus: colors.primaryPurple,
  
  // Shadows
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowColorHover: 'rgba(0, 0, 0, 0.15)',
  shadowColorPress: 'rgba(0, 0, 0, 0.2)',
}

// ===================================================================
// MEDIA QUERIES
// ===================================================================

const media = createMedia({
  xs: { maxWidth: 660 },
  sm: { maxWidth: 800 },
  md: { maxWidth: 1020 },
  lg: { maxWidth: 1280 },
  xl: { maxWidth: 1420 },
  xxl: { maxWidth: 1600 },
  gtXs: { minWidth: 660 + 1 },
  gtSm: { minWidth: 800 + 1 },
  gtMd: { minWidth: 1020 + 1 },
  gtLg: { minWidth: 1280 + 1 },
  short: { maxHeight: 820 },
  tall: { minHeight: 820 },
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
})

// ===================================================================
// CONFIGURATION FINALE
// ===================================================================

const config = createTamagui({
  tokens,
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
  defaultTheme: 'dark', // Dark mode par défaut comme le wireframe
  shorthands,
  media,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config