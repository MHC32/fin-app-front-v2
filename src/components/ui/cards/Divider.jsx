import { Separator as TamaguiSeparator, styled, XStack, Text } from 'tamagui'
import { forwardRef } from 'react'

/**
 * ➖ DIVIDER COMPONENT
 * 
 * Séparateur horizontal ou vertical avec label optionnel
 * Utilise le Separator natif de Tamagui avec styled()
 * 
 * @example
 * <Divider />
 * <Divider vertical />
 * <Divider label="OU" />
 */

export const StyledDivider = styled(TamaguiSeparator, {
  name: 'Divider',
  
  // Base styles
  backgroundColor: '$borderColor',
  
  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
      },
      
      vertical: {
        width: 1,
        height: '100%',
        alignSelf: 'stretch',
      },
    },
    
    variant: {
      default: {
        backgroundColor: '$borderColor',
      },
      
      strong: {
        backgroundColor: '$borderColorHover',
      },
      
      light: {
        backgroundColor: '$gray4',
      },
      
      dashed: {
        borderStyle: 'dashed',
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: '$borderColor',
        height: 0,
      },
    },
    
    spacing: {
      none: {
        marginVertical: 0,
      },
      
      sm: {
        marginVertical: '$2',
      },
      
      md: {
        marginVertical: '$4',
      },
      
      lg: {
        marginVertical: '$6',
      },
    },
  },
  
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    spacing: 'md',
  },
})

export const Divider = forwardRef(
  (
    {
      label,
      orientation = 'horizontal',
      variant = 'default',
      spacing = 'md',
      vertical,
      ...props
    },
    ref
  ) => {
    // Vertical prop prend priorité sur orientation
    const finalOrientation = vertical ? 'vertical' : orientation

    // Si pas de label, retourne juste le divider
    if (!label) {
      return (
        <StyledDivider
          ref={ref}
          orientation={finalOrientation}
          variant={variant}
          spacing={spacing}
          {...props}
        />
      )
    }

    // Avec label (seulement horizontal)
    if (finalOrientation === 'vertical') {
      console.warn('Divider: label is only supported for horizontal orientation')
      return (
        <StyledDivider
          ref={ref}
          orientation="vertical"
          variant={variant}
          spacing={spacing}
          {...props}
        />
      )
    }

    return (
      <XStack
        alignItems="center"
        gap="$3"
        width="100%"
        marginVertical={spacing === 'none' ? 0 : spacing === 'sm' ? '$2' : spacing === 'md' ? '$4' : '$6'}
      >
        <StyledDivider
          flex={1}
          orientation="horizontal"
          variant={variant}
          spacing="none"
        />
        
        <Text
          fontSize={13}
          fontWeight="500"
          color="$colorMuted"
          whiteSpace="nowrap"
        >
          {label}
        </Text>
        
        <StyledDivider
          flex={1}
          orientation="horizontal"
          variant={variant}
          spacing="none"
        />
      </XStack>
    )
  }
)

Divider.displayName = 'Divider'

// Shorthand pour vertical divider
export const VerticalDivider = forwardRef((props, ref) => {
  return <Divider ref={ref} vertical {...props} />
})

VerticalDivider.displayName = 'VerticalDivider'

export default Divider