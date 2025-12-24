/**
 * 📊 DISPLAY COMPONENTS - INDEX
 * 
 * Export de tous les composants Display & Feedback pour FinApp Haiti
 * Utilisant Tamagui natif avec styled()
 * 
 * @module @components/ui/display
 */

// =============================================================================
// LOADING INDICATORS
// =============================================================================

/**
 * Spinner - Loading spinner avec 3 variants
 * @example
 * <Spinner size="large" />
 * <Spinner variant="dots" color="$primary" />
 */
export { default as Spinner } from './Spinner'

// =============================================================================
// NOTIFICATIONS
// =============================================================================

/**
 * Toast - Toast notification individuel (utilisé par Provider)
 * @example
 * const toast = useToast()
 * toast.success('Enregistré !')
 */
export { default as Toast } from './Toast'

/**
 * ToastProvider - Provider pour système de toast + hook useToast
 * @example
 * <ToastProvider><App /></ToastProvider>
 */
export { ToastProvider, useToast } from './ToastProvider'

/**
 * Alert - Alerte inline avec variants colorés
 * @example
 * <Alert variant="success" title="Succès">Message</Alert>
 */
export { default as Alert } from './Alert'

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Spinner variants disponibles
 */
export const SPINNER_VARIANTS = {
  CIRCLE: 'circle',
  DOTS: 'dots',
  PULSE: 'pulse',
}

/**
 * Spinner sizes
 */
export const SPINNER_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
}

/**
 * Alert/Toast variants
 */
export const ALERT_VARIANTS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

/**
 * Toast positions
 */
export const TOAST_POSITIONS = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
}