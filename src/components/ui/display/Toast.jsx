import { styled, XStack, YStack, Text } from 'tamagui'
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X 
} from '@tamagui/lucide-icons'
import { forwardRef } from 'react'
import { IconButton } from '../buttons'

/**
 * 🍞 TOAST COMPONENT
 * 
 * Toast notification individuel
 * Utilisé par ToastProvider
 * 
 * @example
 * // Ne pas utiliser directement, utiliser useToast() hook
 * const toast = useToast()
 * toast.success('Enregistré !')
 */

export const StyledToast = styled(XStack, {
  name: 'Toast',
  
  // Base styles
  minWidth: 300,
  maxWidth: 400,
  padding: '$4',
  borderRadius: '$3',
  borderWidth: 1,
  gap: '$3',
  alignItems: 'center',
  backgroundColor: '$background',
  pointerEvents: 'auto',
  
  // Shadow
  shadowColor: '$shadowColor',
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.3,
  
  // Animation
  animation: 'quick',
  enterStyle: {
    opacity: 0,
    scale: 0.9,
    y: -20,
  },
  exitStyle: {
    opacity: 0,
    scale: 0.9,
    y: -20,
  },
  
  variants: {
    variant: {
      success: {
        borderColor: '$green5',
        backgroundColor: '$green2',
      },
      
      error: {
        borderColor: '$red5',
        backgroundColor: '$red2',
      },
      
      warning: {
        borderColor: '$orange5',
        backgroundColor: '$orange2',
      },
      
      info: {
        borderColor: '$blue5',
        backgroundColor: '$blue2',
      },
    },
  },
  
  defaultVariants: {
    variant: 'info',
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

const getTextColor = (variant) => {
  const colors = {
    success: '$green11',
    error: '$red11',
    warning: '$orange11',
    info: '$blue11',
  }
  return colors[variant] || '$blue11'
}

export const Toast = forwardRef(
  (
    {
      variant = 'info',
      message,
      title,
      onDismiss,
      showIcon = true,
      dismissible = true,
      action,
      ...props
    },
    ref
  ) => {
    const Icon = getIcon(variant)
    const iconColor = getIconColor(variant)
    const textColor = getTextColor(variant)

    return (
      <StyledToast
        ref={ref}
        variant={variant}
        {...props}
      >
        {/* Icon */}
        {showIcon && (
          <XStack>
            <Icon size={20} color={iconColor} />
          </XStack>
        )}

        {/* Content */}
        <YStack flex={1} gap="$1">
          {title && (
            <Text
              fontSize={15}
              fontWeight="600"
              color={textColor}
            >
              {title}
            </Text>
          )}
          
          <Text
            fontSize={14}
            color={textColor}
            opacity={0.9}
          >
            {message}
          </Text>
        </YStack>

        {/* Action button (optionnel) */}
        {action && (
          <XStack>
            {action}
          </XStack>
        )}

        {/* Dismiss Button */}
        {dismissible && (
          <IconButton
            size="$3"
            variant="ghost"
            onPress={onDismiss}
            circular
          >
            <X size={16} color={iconColor} />
          </IconButton>
        )}
      </StyledToast>
    )
  }
)

Toast.displayName = 'Toast'

export default Toast