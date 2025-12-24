import { Avatar as TamaguiAvatar, styled, Text } from 'tamagui'
import { User } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'

/**
 * 👤 AVATAR COMPONENT
 * 
 * Avatar pour photos de profil avec fallback
 * Utilise le Avatar natif de Tamagui avec styled()
 * 
 * @example
 * <Avatar 
 *   src="https://..."
 *   fallback="JM"
 *   size="$6"
 * />
 */

export const StyledAvatar = styled(TamaguiAvatar, {
  name: 'Avatar',
  
  // Base styles
  borderRadius: '$round',
  backgroundColor: '$backgroundStrong',
  
  variants: {
    size: {
      '$2': {
        width: 24,
        height: 24,
      },
      '$3': {
        width: 32,
        height: 32,
      },
      '$4': {
        width: 40,
        height: 40,
      },
      '$5': {
        width: 48,
        height: 48,
      },
      '$6': {
        width: 64,
        height: 64,
      },
      '$7': {
        width: 80,
        height: 80,
      },
      '$8': {
        width: 96,
        height: 96,
      },
      '$9': {
        width: 128,
        height: 128,
      },
    },
    
    bordered: {
      true: {
        borderWidth: 2,
        borderColor: '$borderColor',
      },
    },
    
    circular: {
      true: {
        borderRadius: '$round',
      },
      false: {
        borderRadius: '$3',
      },
    },
    
    status: {
      online: {
        // Géré par StatusIndicator
      },
      offline: {},
      away: {},
      busy: {},
    },
  },
  
  defaultVariants: {
    size: '$6',
    circular: true,
    bordered: false,
  },
})

export const StyledAvatarImage = styled(TamaguiAvatar.Image, {
  name: 'AvatarImage',
  width: '100%',
  height: '100%',
})

export const StyledAvatarFallback = styled(TamaguiAvatar.Fallback, {
  name: 'AvatarFallback',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$blue5',
})

// Status indicator
const StatusIndicator = styled('div', {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '25%',
  height: '25%',
  borderRadius: '$round',
  borderWidth: 2,
  borderColor: '$background',
  
  variants: {
    status: {
      online: {
        backgroundColor: '$green9',
      },
      offline: {
        backgroundColor: '$gray9',
      },
      away: {
        backgroundColor: '$orange9',
      },
      busy: {
        backgroundColor: '$red9',
      },
    },
  },
})

const getFallbackText = (fallback, size) => {
  const sizeNum = parseInt(size?.replace('$', '') || '6')
  
  // Font sizes selon la taille de l'avatar
  const fontSizes = {
    2: 10,
    3: 12,
    4: 14,
    5: 16,
    6: 20,
    7: 24,
    8: 28,
    9: 36,
  }
  
  return {
    text: fallback?.substring(0, 2).toUpperCase() || '?',
    fontSize: fontSizes[sizeNum] || 20,
  }
}

export const Avatar = forwardRef(
  (
    {
      src,
      fallback,
      size = '$6',
      circular = true,
      bordered = false,
      status,
      showStatus = false,
      ...props
    },
    ref
  ) => {
    const { text, fontSize } = getFallbackText(fallback, size)

    return (
      <StyledAvatar
        ref={ref}
        size={size}
        circular={circular}
        bordered={bordered}
        position="relative"
        {...props}
      >
        {src && (
          <StyledAvatarImage
            src={src}
            alt={fallback || 'Avatar'}
          />
        )}
        
        <StyledAvatarFallback>
          {fallback ? (
            <Text
              fontSize={fontSize}
              fontWeight="600"
              color="white"
            >
              {text}
            </Text>
          ) : (
            <User size={fontSize} color="white" />
          )}
        </StyledAvatarFallback>

        {/* Status Indicator */}
        {showStatus && status && (
          <StatusIndicator status={status} />
        )}
      </StyledAvatar>
    )
  }
)

Avatar.displayName = 'Avatar'

// Avatar Group pour afficher plusieurs avatars
export const AvatarGroup = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  
  variants: {
    spacing: {
      overlapping: {
        '& > *:not(:first-child)': {
          marginLeft: -8,
        },
      },
      normal: {
        gap: '$2',
      },
      loose: {
        gap: '$3',
      },
    },
  },
  
  defaultVariants: {
    spacing: 'normal',
  },
})

export default Avatar