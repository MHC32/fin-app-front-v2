// src/components/layout/Avatar.jsx
import { YStack, Text } from 'tamagui'

/**
 * 👤 AVATAR - FINAPP HAITI
 * 
 * Avatar utilisateur avec initiales
 * - Gradient purple/pink
 * - Initiales first + last name
 * - Circle
 */

export function Avatar({ firstName = 'User', lastName = '', size = 40 }) {
  // Générer initiales
  const initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  
  return (
    <YStack
      width={size}
      height={size}
      borderRadius="$round"
      backgroundColor="$primary"
      alignItems="center"
      justifyContent="center"
      style={{
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      }}
      cursor="pointer"
      hoverStyle={{
        scale: 1.05,
      }}
      pressStyle={{
        scale: 0.95,
      }}
      animation="quick"
    >
      <Text
        fontSize={size / 2.5}
        fontWeight="700"
        color="white"
      >
        {initials}
      </Text>
    </YStack>
  )
}

export default Avatar