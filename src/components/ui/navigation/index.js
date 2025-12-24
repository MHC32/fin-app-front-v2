/**
 * 🧭 NAVIGATION COMPONENTS - INDEX
 * 
 * Export de tous les composants Navigation pour FinApp Haiti
 * Utilisant Tamagui natif avec styled()
 * 
 * @module @components/ui/navigation
 */

// =============================================================================
// TABS
// =============================================================================

/**
 * Tabs - Onglets de navigation avec variants
 * @example
 * <Tabs defaultValue="tab1">
 *   <Tabs.List variant="underline">
 *     <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content</Tabs.Content>
 * </Tabs>
 */
export { default as Tabs } from './Tabs'

// =============================================================================
// BREADCRUMB
// =============================================================================

/**
 * Breadcrumb - Fil d'ariane pour navigation hiérarchique
 * @example
 * <Breadcrumb>
 *   <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
 *   <Breadcrumb.Item active>Page</Breadcrumb.Item>
 * </Breadcrumb>
 */
export { default as Breadcrumb } from './Breadcrumb'

// =============================================================================
// PAGINATION
// =============================================================================

/**
 * Pagination - Pagination pour listes avec page numbers
 * @example
 * <Pagination 
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={setPage}
 *   showFirstLast
 * />
 */
export { default as Pagination } from './Pagination'

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Tabs variants disponibles
 */
export const TABS_VARIANTS = {
  DEFAULT: 'default',
  UNDERLINE: 'underline',
  PILLS: 'pills',
}

/**
 * Tabs orientations
 */
export const TABS_ORIENTATIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
}

/**
 * Pagination sizes
 */
export const PAGINATION_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
}