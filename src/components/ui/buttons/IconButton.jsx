import { Button, styled } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🎯 ICON BUTTON COMPONENT
 * 
 * Bouton carré/rond avec icône seulement
 * Utilise le Button natif de Tamagui avec circular
 * 
 * @example
 * <IconButton variant="primary" size="$4" rounded>
 *   <Plus />
 * </IconButton>
 */

export const StyledIconButton = styled(Button, {
  name: 'IconButton',
  
  // Base styles - carré par défaut
  padding: 0,
  borderWidth: 0,
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$primaryHover',
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
        },
        
        pressStyle: {
          scale: 0.95,
        },
      },
      
      error: {
        backgroundColor: '$error',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$errorHover',
        },
        
        pressStyle: {
          scale: 0.95,
        },
      },
      
      ghost: {
        backgroundColor: 'transparent',
        color: '$color',
        
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
        
        pressStyle: {
          backgroundColor: '$backgroundPress',
          scale: 0.95,
        },
      },
      
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
        
        hoverStyle: {
          backgroundColor: '$backgroundHover',
          borderColor: '$borderColorHover',
        },
        
        pressStyle: {
          backgroundColor: '$backgroundPress',
          scale: 0.95,
        },
      },
    },
    
    rounded: {
      true: {
        circular: true,
      },
    },
  },
  
  defaultVariants: {
    variant: 'ghost',
  },
})

export const IconButton = forwardRef(
  (
    {
      variant = 'ghost',
      rounded = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledIconButton
        ref={ref}
        variant={variant}
        rounded={rounded}
        icon={children}
        scaleIcon={1.2}
        {...props}
      />
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton