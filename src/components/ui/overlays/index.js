/**
 * 📑 OVERLAYS COMPONENTS - INDEX
 * 
 * Export de tous les composants Overlays pour FinApp Haiti
 * Utilisant Tamagui natif avec styled()
 * 
 * @module @components/ui/overlays
 */

// =============================================================================
// MODAL
// =============================================================================

/**
 * Modal - Dialog modal pour confirmations et formulaires
 * @example
 * <Modal open={open} onOpenChange={setOpen}>
 *   <Modal.Trigger><Button>Open</Button></Modal.Trigger>
 *   <Modal.Content>
 *     <Modal.Header>
 *       <Modal.Title>Titre</Modal.Title>
 *     </Modal.Header>
 *     <Modal.Body>Contenu</Modal.Body>
 *     <Modal.Footer>
 *       <Button>Confirmer</Button>
 *     </Modal.Footer>
 *   </Modal.Content>
 * </Modal>
 */
export { default as Modal } from './Modal'

// =============================================================================
// DRAWER
// =============================================================================

/**
 * Drawer - Panneau latéral pour navigation ou contenu
 * @example
 * <Drawer open={open} onOpenChange={setOpen} position="right">
 *   <Drawer.Trigger><Button>Open</Button></Drawer.Trigger>
 *   <Drawer.Content>
 *     <Drawer.Header>
 *       <Drawer.Title>Menu</Drawer.Title>
 *     </Drawer.Header>
 *     <Drawer.Body>Contenu</Drawer.Body>
 *   </Drawer.Content>
 * </Drawer>
 */
export { default as Drawer } from './Drawer'

// =============================================================================
// DROPDOWN
// =============================================================================

/**
 * Dropdown - Menu dropdown pour actions et sélections
 * @example
 * <Dropdown>
 *   <Dropdown.Trigger><Button>Menu</Button></Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Item onPress={() => {}}>Item 1</Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item variant="danger">Delete</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown>
 */
export { default as Dropdown } from './Dropdown'

// =============================================================================
// TOOLTIP
// =============================================================================

/**
 * Tooltip - Info-bulle au survol
 * @example
 * <Tooltip content="Info-bulle" placement="top">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */
export { default as Tooltip } from './Tooltip'

// =============================================================================
// POPOVER
// =============================================================================

/**
 * Popover - Popover contextuel pour contenu riche
 * @example
 * <Popover>
 *   <Popover.Trigger><Button>Open</Button></Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Header>
 *       <Popover.Title>Titre</Popover.Title>
 *     </Popover.Header>
 *     <Popover.Body>Contenu</Popover.Body>
 *   </Popover.Content>
 * </Popover>
 */
export { default as Popover } from './Popover'

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Modal sizes
 */
export const MODAL_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  XLARGE: 'xl',
  FULL: 'full',
}

/**
 * Drawer positions
 */
export const DRAWER_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
}

/**
 * Tooltip/Popover placements
 */
export const PLACEMENTS = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
}

/**
 * Tooltip variants
 */
export const TOOLTIP_VARIANTS = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light',
  PRIMARY: 'primary',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
}