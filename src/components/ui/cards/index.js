/**
 * 🎴 CARDS COMPONENTS - INDEX
 * 
 * Export de tous les composants Card pour FinApp Haiti
 * Utilisant Tamagui natif avec styled()
 * 
 * @module @components/ui/cards
 */

// =============================================================================
// GROUPE 1 - CARDS BASICS
// =============================================================================

/**
 * Card - Carte basique avec variants
 * @example
 * <Card elevated padded><Text>Content</Text></Card>
 */
export { default as Card, CardHeader, CardBody, CardFooter } from './Card'

/**
 * GlassCard - Carte avec effet glassmorphism
 * @example
 * <GlassCard blur="strong"><Text>Glass effect</Text></GlassCard>
 */
export { 
  default as GlassCard, 
  GlassCardHeader, 
  GlassCardBody, 
  GlassCardFooter 
} from './GlassCard'

/**
 * StatCard - Carte pour statistiques
 * @example
 * <StatCard label="Revenue" value="$1,234" change={+12.5} />
 */
export { default as StatCard } from './StatCard'

// =============================================================================
// GROUPE 2 - VISUAL ELEMENTS (À venir)
// =============================================================================

export { default as Avatar } from './Avatar'
export { default as Badge } from './Badge'
export { default as Chip } from './Chip'

// =============================================================================
// GROUPE 3 - DISPLAY (À venir)
// =============================================================================

export { default as Skeleton } from './Skeleton'
export { default as Progress } from './Progress'
export { default as Divider } from './Divider'

// =============================================================================
// TYPES & CONSTANTS
// =============================================================================

/**
 * Card variants disponibles
 */
export const CARD_VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
  FILLED: 'filled',
}

/**
 * Glass blur levels
 */
export const GLASS_BLUR_LEVELS = {
  LIGHT: 'light',
  MEDIUM: 'medium',
  STRONG: 'strong',
}