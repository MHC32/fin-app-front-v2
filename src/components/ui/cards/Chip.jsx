import { styled, XStack, Text } from 'tamagui'
import { X } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'

/**
 * 🏷️ CHIP COMPONENT
 * 
 * Chip pour tags avec icône et bouton delete
 * Similaire à Badge mais plus interactif
 * 
 * @example
 * <Chip 
 *   label="React"
 *   onDelete={() => {}}
 *   icon={<Code />}
 * />
 */

export const StyledChip = styled(XStack, {
  name: 'Chip',
  
  // Base styles
  alignItems: 'center',
  gap: '$2',
  paddingLeft: '$3',
  paddingRight: '$3',
  paddingVertical: '$1.5',
  borderRadius: '$round',
  backgroundColor: '$backgroundStrong',
  borderWidth: 1,
  borderColor: '$borderColor',
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$gray3',
        borderColor: '$gray6',
      },
      
      primary: {
        backgroundColor: '$blue3',
        borderColor: '$blue6',
      },
      
      success: {
        backgroundColor: '$green3',
        borderColor: '$green6',
      },
      
      warning: {
        backgroundColor: '$orange3',
        borderColor: '$orange6',
      },
      
      error: {
        backgroundColor: '$red3',
        borderColor: '$red6',
      },
      
      info: {
        backgroundColor: '$blue3',
        borderColor: '$blue6',
      },
    },
    
    outlined: {
      true: {
        backgroundColor: 'transparent',
      },
    },
    
    clickable: {
      true: {
        cursor: 'pointer',
        
        hoverStyle: {
          backgroundColor: '$backgroundHover',
          borderColor: '$borderColorHover',
        },
        
        pressStyle: {
          scale: 0.95,
        },
      },
    },
    
    size: {
      sm: {
        paddingLeft: '$2',
        paddingRight: '$2',
        paddingVertical: '$1',
        gap: '$1.5',
      },
      
      md: {
        paddingLeft: '$3',
        paddingRight: '$3',
        paddingVertical: '$1.5',
        gap: '$2',
      },
      
      lg: {
        paddingLeft: '$4',
        paddingRight: '$4',
        paddingVertical: '$2',
        gap: '$2.5',
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
    outlined: false,
    clickable: false,
    size: 'md',
  },
})

const StyledDeleteButton = styled(XStack, {
  name: 'ChipDeleteButton',
  
  alignItems: 'center',
  justifyContent: 'center',
  width: 18,
  height: 18,
  borderRadius: '$round',
  cursor: 'pointer',
  marginLeft: '$1',
  marginRight: -4,
  
  hoverStyle: {
    backgroundColor: '$backgroundPress',
  },
  
  pressStyle: {
    scale: 0.9,
  },
})

const getTextColor = (variant) => {
  const colors = {
    default: '$gray11',
    primary: '$blue11',
    success: '$green11',
    warning: '$orange11',
    error: '$red11',
    info: '$blue11',
  }
  return colors[variant] || '$color'
}

const getIconSize = (size) => {
  const sizes = {
    sm: 14,
    md: 16,
    lg: 18,
  }
  return sizes[size] || 16
}

const getFontSize = (size) => {
  const sizes = {
    sm: 12,
    md: 13,
    lg: 14,
  }
  return sizes[size] || 13
}

export const Chip = forwardRef(
  (
    {
      label,
      icon,
      onDelete,
      onClick,
      variant = 'default',
      outlined = false,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const textColor = getTextColor(variant)
    const iconSize = getIconSize(size)
    const fontSize = getFontSize(size)
    const hasDelete = !!onDelete
    const hasClick = !!onClick

    return (
      <StyledChip
        ref={ref}
        variant={variant}
        outlined={outlined}
        clickable={hasClick}
        size={size}
        onPress={hasClick ? onClick : undefined}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <XStack>
            {icon}
          </XStack>
        )}

        {/* Label */}
        <Text
          fontSize={fontSize}
          fontWeight="500"
          color={textColor}
        >
          {label}
        </Text>

        {/* Delete Button */}
        {hasDelete && (
          <StyledDeleteButton
            onPress={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <X size={iconSize - 2} color={textColor} strokeWidth={2} />
          </StyledDeleteButton>
        )}
      </StyledChip>
    )
  }
)

Chip.displayName = 'Chip'

export default Chip