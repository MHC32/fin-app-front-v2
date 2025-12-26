// src/components/layout/MobileOverlay.jsx
import { YStack } from 'tamagui'

/**
 * 🌑 MOBILE OVERLAY - FINAPP HAITI
 * 
 * Overlay noir quand sidebar mobile ouvert
 * - Fixed full screen
 * - Semi-transparent black
 * - Click to close sidebar
 */

export function MobileOverlay({ isOpen, onClose }) {
  if (!isOpen) return null
  
  return (
    <YStack
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex={99}
      onPress={onClose}
      display="none"
      $sm={{
        display: isOpen ? 'flex' : 'none',
      }}
    />
  )
}

export default MobileOverlay