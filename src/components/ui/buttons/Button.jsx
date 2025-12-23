import { Button as TamaguiButton, styled, Spinner } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🔘 BUTTON COMPONENT
 * 
 * Bouton principal utilisant le Button natif de Tamagui
 * Avec variants custom pour FinApp Haiti
 * 
 * @example
 * <Button variant="primary" size="$4">
 *   Enregistrer
 * </Button>
 * 
 * <Button variant="outline" icon={Plus} loading>
 *   Chargement...
 * </Button>
 */

// Styled Button avec variants
export const StyledButton = styled(TamaguiButton, {
  name: 'Button',
  
  // Styles de base
  borderRadius: '$3',
  fontWeight: '600',
  cursor: 'pointer',
  borderWidth: 0,
  
  // Variants
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
          scale: 0.98,
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
          scale: 0.98,
        },
      },
      
      success: {
        backgroundColor: '$success',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$successHover',
        },
        
        pressStyle: {
          scale: 0.98,
        },
      },
      
      warning: {
        backgroundColor: '$warning',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$warningHover',
        },
        
        pressStyle: {
          scale: 0.98,
        },
      },
      
      error: {
        backgroundColor: '$error',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$errorHover',
        },
        
        pressStyle: {
          scale: 0.98,
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
          scale: 0.98,
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
          scale: 0.98,
        },
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    
    loading: {
      true: {
        opacity: 0.7,
        cursor: 'not-allowed',
      },
    },
  },
  
  defaultVariants: {
    variant: 'primary',
  },
})

// Wrapper pour ajouter leftIcon, rightIcon, loading
export const Button = forwardRef(
  (
    {
      variant = 'primary',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        loading={loading}
        disabled={disabled || loading}
        icon={leftIcon}
        iconAfter={!loading ? rightIcon : undefined}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size="small" color="currentColor" />
            {children && <>{children}</>}
          </>
        ) : (
          children
        )}
      </StyledButton>
    )
  }
)

Button.displayName = 'Button'

export default Button