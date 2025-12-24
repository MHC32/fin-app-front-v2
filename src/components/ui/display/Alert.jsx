import { styled, XStack, YStack, Text } from 'tamagui'
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X 
} from '@tamagui/lucide-icons'
import { forwardRef, useState } from 'react'
import { IconButton } from '../buttons'

/**
 * ⚠️ ALERT COMPONENT
 * 
 * Alerte inline avec variants colorés
 * Utilise styled() Tamagui avec Lucide icons
 * 
 * @example
 * <Alert variant="success" title="Succès">
 *   Votre compte a été créé avec succès !
 * </Alert>
 * 
 * <Alert variant="error" dismissible>
 *   Une erreur est survenue
 * </Alert>
 */

export const StyledAlert = styled(XStack, {
  name: 'Alert',
  
  // Base styles
  padding: '$4',
  borderRadius: '$3',
  borderWidth: 1,
  gap: '$3',
  alignItems: 'flex-start',
  
  variants: {
    variant: {
      success: {
        backgroundColor: '$green2',
        borderColor: '$green5',
      },
      
      error: {
        backgroundColor: '$red2',
        borderColor: '$red5',
      },
      
      warning: {
        backgroundColor: '$orange2',
        borderColor: '$orange5',
      },
      
      info: {
        backgroundColor: '$blue2',
        borderColor: '$blue5',
      },
    },
    
    elevated: {
      true: {
        shadowColor: '$shadowColor',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
      },
    },
  },
  
  defaultVariants: {
    variant: 'info',
    elevated: false,
  },
})

const getIcon = (variant) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }
  return icons[variant] || Info
}

const getIconColor = (variant) => {
  const colors = {
    success: '$green10',
    error: '$red10',
    warning: '$orange10',
    info: '$blue10',
  }
  return colors[variant] || '$blue10'
}

const getTitleColor = (variant) => {
  const colors = {
    success: '$green11',
    error: '$red11',
    warning: '$orange11',
    info: '$blue11',
  }
  return colors[variant] || '$blue11'
}

const getTextColor = (variant) => {
  const colors = {
    success: '$green11',
    error: '$red11',
    warning: '$orange11',
    info: '$blue11',
  }
  return colors[variant] || '$blue11'
}

export const Alert = forwardRef(
  (
    {
      variant = 'info',
      title,
      children,
      dismissible = false,
      onDismiss,
      showIcon = true,
      elevated = false,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true)

    const Icon = getIcon(variant)
    const iconColor = getIconColor(variant)
    const titleColor = getTitleColor(variant)
    const textColor = getTextColor(variant)

    const handleDismiss = () => {
      setVisible(false)
      onDismiss?.()
    }

    if (!visible) return null

    return (
      <StyledAlert
        ref={ref}
        variant={variant}
        elevated={elevated}
        {...props}
      >
        {/* Icon */}
        {showIcon && (
          <XStack marginTop={2}>
            <Icon size={20} color={iconColor} />
          </XStack>
        )}

        {/* Content */}
        <YStack flex={1} gap="$1">
          {title && (
            <Text
              fontSize={15}
              fontWeight="600"
              color={titleColor}
            >
              {title}
            </Text>
          )}
          
          {children && (
            <Text
              fontSize={14}
              color={textColor}
              opacity={0.9}
            >
              {children}
            </Text>
          )}
        </YStack>

        {/* Dismiss Button */}
        {dismissible && (
          <IconButton
            size="$3"
            variant="ghost"
            onPress={handleDismiss}
            circular
          >
            <X size={16} color={iconColor} />
          </IconButton>
        )}
      </StyledAlert>
    )
  }
)

Alert.displayName = 'Alert'

export default Alert