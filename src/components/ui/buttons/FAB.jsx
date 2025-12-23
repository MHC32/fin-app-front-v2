import { Button, styled, XStack } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🎈 FAB COMPONENT (Floating Action Button)
 * 
 * Bouton flottant pour l'action principale
 * Utilise Button natif Tamagui avec position fixed
 * 
 * @example
 * <FAB variant="primary" position="bottom-right">
 *   <Plus />
 * </FAB>
 * 
 * <FAB variant="primary" extended label="Ajouter">
 *   <Plus />
 * </FAB>
 */

export const StyledFAB = styled(Button, {
  name: 'FAB',
  
  // Base styles
  position: 'fixed',
  circular: true,
  padding: 0,
  borderWidth: 0,
  zIndex: '$5',
  
  // Enhanced shadow
  shadowColor: '$shadowColorHover',
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$primaryHover',
          scale: 1.1,
          shadowRadius: 30,
          shadowOpacity: 0.7,
        },
        
        pressStyle: {
          backgroundColor: '$primaryPress',
          scale: 0.95,
        },
      },
      
      secondary: {
        backgroundColor: '$secondary',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$secondaryHover',
          scale: 1.1,
          shadowRadius: 30,
          shadowOpacity: 0.7,
        },
        
        pressStyle: {
          backgroundColor: '$secondaryPress',
          scale: 0.95,
        },
      },
      
      success: {
        backgroundColor: '$success',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$successHover',
          scale: 1.1,
          shadowRadius: 30,
          shadowOpacity: 0.7,
        },
        
        pressStyle: {
          scale: 0.95,
        },
      },
    },
    
    position: {
      'bottom-right': {
        bottom: '$8',
        right: '$8',
      },
      'bottom-left': {
        bottom: '$8',
        left: '$8',
      },
      'top-right': {
        top: '$8',
        right: '$8',
      },
      'top-left': {
        top: '$8',
        left: '$8',
      },
    },
    
    extended: {
      true: {
        circular: false,
        borderRadius: '$round',
        paddingHorizontal: '$6',
      },
    },
  },
  
  defaultVariants: {
    variant: 'primary',
    position: 'bottom-right',
  },
})

export const FAB = forwardRef(
  (
    {
      variant = 'primary',
      position = 'bottom-right',
      extended = false,
      label,
      children,
      size = extended ? '$6' : '$14',
      ...props
    },
    ref
  ) => {
    // Si extended avec label, on utilise XStack wrapper
    if (extended && label) {
      return (
        <StyledFAB
          ref={ref}
          variant={variant}
          position={position}
          extended={extended}
          size={size}
          {...props}
        >
          <XStack gap="$2" alignItems="center">
            {children}
            {label}
          </XStack>
        </StyledFAB>
      )
    }
    
    // FAB normal avec icon
    return (
      <StyledFAB
        ref={ref}
        variant={variant}
        position={position}
        extended={extended}
        size={size}
        icon={children}
        scaleIcon={1.5}
        {...props}
      />
    )
  }
)

FAB.displayName = 'FAB'

export default FAB