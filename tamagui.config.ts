import { createTamagui, createTokens } from '@tamagui/core'
import { shorthands } from '@tamagui/shorthands'

// ============================================
// 🎨 TOKENS - VARIABLES STATIQUES
// ============================================
// Les tokens sont des variables STATIQUES qui ne changent JAMAIS
// Utilisés avec le prefix $ : $1, $2, $primary, etc.
// Auto-mapping intelligent :
// - size → width, height
// - space → margin, padding, gap
// - radius → borderRadius
// - color → color, backgroundColor, borderColor

const tokens = createTokens({
  // 📏 SIZE - Pour width, height, minWidth, maxWidth, etc.
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
    true: 16, // Valeur par défaut si juste $true
    full: '100%',
  },

  // 📐 SPACE - Pour margin, padding, gap
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
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    true: 16, // Valeur par défaut
  },

  // 🔲 RADIUS - Pour borderRadius
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    true: 12, // Valeur par défaut
    round: 9999,
  },

  // 🎨 COLOR - Toutes les couleurs de l'app
  color: {
    // Primary Purple Palette
    purple50: '#faf5ff',
    purple100: '#f3e8ff',
    purple200: '#e9d5ff',
    purple300: '#d8b4fe',
    purple400: '#c084fc',
    purple500: '#a855f7', // Base purple
    purple600: '#8b5cf6', // Main purple ✨
    purple700: '#7c3aed',
    purple800: '#6d28d9',
    purple900: '#5b21b6',

    // Secondary Pink Palette
    pink50: '#fdf2f8',
    pink100: '#fce7f3',
    pink200: '#fbcfe8',
    pink300: '#f9a8d4',
    pink400: '#f472b6',
    pink500: '#ec4899', // Base pink ✨
    pink600: '#db2777',
    pink700: '#be185d',
    pink800: '#9f1239',
    pink900: '#831843',

    // Success Green
    success50: '#ecfdf5',
    success100: '#d1fae5',
    success500: '#10b981', // Base ✨
    success600: '#059669',
    success700: '#047857',

    // Warning Orange
    warning50: '#fffbeb',
    warning100: '#fef3c7',
    warning500: '#f59e0b', // Base ✨
    warning600: '#d97706',
    warning700: '#b45309',

    // Error Red
    error50: '#fef2f2',
    error100: '#fee2e2',
    error500: '#ef4444', // Base ✨
    error600: '#dc2626',
    error700: '#b91c1c',

    // Info Blue
    info50: '#eff6ff',
    info100: '#dbeafe',
    info500: '#3b82f6', // Base ✨
    info600: '#1e40af',
    info700: '#1e3a8a',

    // Neutral Grays
    gray50: '#fafafa',
    gray100: '#f4f4f5',
    gray200: '#e4e4e7',
    gray300: '#d4d4d8',
    gray400: '#a1a1aa',
    gray500: '#71717a',
    gray600: '#52525b',
    gray700: '#3f3f46',
    gray800: '#27272a',
    gray900: '#18181b',

    // Backgrounds Dark
    darkBg1: '#1a1625', // Darkest
    darkBg2: '#2d2438',
    darkBg3: '#3d3349',
    darkBg4: '#4a3f5a', // Hover state
    darkBg5: '#5a4d6a',

    // Backgrounds Light
    lightBg1: '#ffffff', // Brightest
    lightBg2: '#f8f9fa',
    lightBg3: '#f1f3f5',
    lightBg4: '#e9ecef', // Hover state
    lightBg5: '#dee2e6',

    // Text Colors Dark Mode
    darkText1: '#ffffff',    // Primary text
    darkText2: '#a0aec0',    // Secondary text
    darkText3: '#718096',    // Muted text
    darkText4: '#4a5568',    // Disabled

    // Text Colors Light Mode
    lightText1: '#1a202c',   // Primary text
    lightText2: '#4a5568',   // Secondary text
    lightText3: '#718096',   // Muted text
    lightText4: '#a0aec0',   // Disabled

    // Special
    transparent: 'transparent',
    white: '#ffffff',
    black: '#000000',

    // Glass Effect (avec alpha)
    glassLight: 'rgba(139, 92, 246, 0.05)',
    glassMedium: 'rgba(139, 92, 246, 0.1)',
    glassStrong: 'rgba(139, 92, 246, 0.15)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassBorderLight: 'rgba(139, 92, 246, 0.15)',
  },

  // 📊 Z-INDEX - Pour la superposition
  zIndex: {
    0: 0,
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
    modal: 100,
    overlay: 200,
    tooltip: 300,
  },
})

// ============================================
// 🎭 THEMES - VARIABLES DYNAMIQUES
// ============================================
// Les themes sont des variables DYNAMIQUES qui peuvent changer dans l'arbre React
// Utilisés avec le prefix $ : $background, $color, $primary, etc.
// Sub-themes avec _ : dark_subtle, dark_Card, etc.

const themes = {
  // 🌙 DARK THEME (Par défaut)
  dark: {
    // Backgrounds
    background: tokens.color.darkBg1,
    backgroundHover: tokens.color.darkBg4,
    backgroundPress: tokens.color.darkBg3,
    backgroundFocus: tokens.color.darkBg2,
    backgroundStrong: tokens.color.darkBg3,
    backgroundTransparent: tokens.color.transparent,
    
    // Card backgrounds
    card: tokens.color.darkBg2,
    cardHover: tokens.color.darkBg3,
    
    // Text colors
    color: tokens.color.darkText1,
    colorHover: tokens.color.darkText1,
    colorPress: tokens.color.darkText1,
    colorFocus: tokens.color.darkText1,
    colorMuted: tokens.color.darkText3,
    colorSecondary: tokens.color.darkText2,
    colorDisabled: tokens.color.darkText4,
    
    // Border colors
    borderColor: tokens.color.glassBorder,
    borderColorHover: tokens.color.purple600,
    borderColorFocus: tokens.color.purple600,
    borderColorPress: tokens.color.purple800,
    
    // Brand colors
    primary: tokens.color.purple600,
    primaryHover: tokens.color.purple500,
    primaryPress: tokens.color.purple700,
    secondary: tokens.color.pink500,
    secondaryHover: tokens.color.pink400,
    secondaryPress: tokens.color.pink600,
    
    // Status colors
    success: tokens.color.success500,
    successHover: tokens.color.success600,
    warning: tokens.color.warning500,
    warningHover: tokens.color.warning600,
    error: tokens.color.error500,
    errorHover: tokens.color.error600,
    info: tokens.color.info500,
    infoHover: tokens.color.info600,
    
    // Input colors
    placeholderColor: tokens.color.darkText3,
    inputBackground: tokens.color.darkBg3,
    inputBorder: tokens.color.glassBorder,
    inputFocus: tokens.color.purple600,
    
    // Shadows (pour glassmorphism)
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowColorHover: 'rgba(139, 92, 246, 0.5)',
  },

  // ☀️ LIGHT THEME
  light: {
    // Backgrounds
    background: tokens.color.lightBg2,
    backgroundHover: tokens.color.lightBg4,
    backgroundPress: tokens.color.lightBg3,
    backgroundFocus: tokens.color.lightBg1,
    backgroundStrong: tokens.color.lightBg3,
    backgroundTransparent: tokens.color.transparent,
    
    // Card backgrounds
    card: tokens.color.lightBg1,
    cardHover: tokens.color.lightBg2,
    
    // Text colors
    color: tokens.color.lightText1,
    colorHover: tokens.color.lightText1,
    colorPress: tokens.color.lightText1,
    colorFocus: tokens.color.lightText1,
    colorMuted: tokens.color.lightText3,
    colorSecondary: tokens.color.lightText2,
    colorDisabled: tokens.color.lightText4,
    
    // Border colors
    borderColor: tokens.color.glassBorderLight,
    borderColorHover: tokens.color.purple600,
    borderColorFocus: tokens.color.purple600,
    borderColorPress: tokens.color.purple800,
    
    // Brand colors (same as dark)
    primary: tokens.color.purple600,
    primaryHover: tokens.color.purple500,
    primaryPress: tokens.color.purple700,
    secondary: tokens.color.pink500,
    secondaryHover: tokens.color.pink400,
    secondaryPress: tokens.color.pink600,
    
    // Status colors (same as dark)
    success: tokens.color.success500,
    successHover: tokens.color.success600,
    warning: tokens.color.warning500,
    warningHover: tokens.color.warning600,
    error: tokens.color.error500,
    errorHover: tokens.color.error600,
    info: tokens.color.info500,
    infoHover: tokens.color.info600,
    
    // Input colors
    placeholderColor: tokens.color.lightText3,
    inputBackground: tokens.color.lightBg1,
    inputBorder: tokens.color.glassBorderLight,
    inputFocus: tokens.color.purple600,
    
    // Shadows
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowColorHover: 'rgba(139, 92, 246, 0.3)',
  },

  // 🎨 SUB-THEMES - Component-specific themes
  // Usage: <Theme name="dark_Card">
  dark_Card: {
    background: tokens.color.glassLight,
    backgroundHover: tokens.color.glassMedium,
    borderColor: tokens.color.glassBorder,
  },

  light_Card: {
    background: tokens.color.white,
    backgroundHover: tokens.color.lightBg2,
    borderColor: tokens.color.glassBorderLight,
  },

  // Sidebar theme
  dark_Sidebar: {
    background: `linear-gradient(180deg, ${tokens.color.purple600} 0%, ${tokens.color.purple800} 100%)`,
  },

  light_Sidebar: {
    background: `linear-gradient(180deg, ${tokens.color.purple600} 0%, ${tokens.color.purple800} 100%)`,
  },
}

// ============================================
// ⚙️ MEDIA QUERIES
// ============================================
// Responsive breakpoints pour les différentes tailles d'écran
// Usage: $sm={{ padding: '$8' }}

const media = {
  // Max-width (mobile first)
  xs: { maxWidth: 660 },
  sm: { maxWidth: 800 },
  md: { maxWidth: 1020 },
  lg: { maxWidth: 1280 },
  xl: { maxWidth: 1420 },
  xxl: { maxWidth: 1600 },
  
  // Min-width (desktop first)
  gtXs: { minWidth: 661 },
  gtSm: { minWidth: 801 },
  gtMd: { minWidth: 1021 },
  gtLg: { minWidth: 1281 },
  gtXl: { minWidth: 1421 },
  
  // Height
  short: { maxHeight: 820 },
  tall: { minHeight: 821 },
  
  // Special
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
}

// ============================================
// 🚀 CONFIGURATION FINALE
// ============================================
const config = createTamagui({
  tokens,
  themes,
  shorthands,
  media,
  
  // Settings
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: true, // Auto dark/light selon OS
  themeClassNameOnRoot: true,
  
  // Performance
  disableSSR: false,
})

export default config

// Type exports pour TypeScript
export type Conf = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}