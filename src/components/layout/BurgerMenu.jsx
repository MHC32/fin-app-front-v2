// src/components/layout/BurgerMenu.jsx
import { YStack } from 'tamagui'
import { Menu } from 'lucide-react'

/**
 * 🍔 BURGER MENU - FINAPP HAITI
 * 
 * Menu hamburger pour mobile
 * - Visible seulement < 768px
 * - Fixed top-left
 * - Toggle sidebar
 */

export function BurgerMenu({ onToggle }) {
  return (
    <YStack
      position="fixed"
      top={20}
      left={20}
      width={45}
      height={45}
      backgroundColor="$primary"
      borderRadius="$3"
      alignItems="center"
      justifyContent="center"
      zIndex={200}
      cursor="pointer"
      display="none"
      pressStyle={{
        scale: 0.95,
      }}
      hoverStyle={{
        backgroundColor: '$primaryLight',
      }}
      animation="quick"
      onPress={onToggle}
      // Show on mobile only
      $sm={{
        display: 'flex',
      }}
    >
      <Menu size={24} color="white" strokeWidth={2} />
    </YStack>
  )
}

export default BurgerMenu