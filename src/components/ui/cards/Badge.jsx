import { styled, Text } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🏷️ BADGE COMPONENT
 * 
 * Badge pour afficher des statuts, labels ou compteurs
 * Petit composant avec couleurs thématiques
 * 
 * @example
 * <Badge variant="success">Actif</Badge>
 * <Badge variant="error" dot>3</Badge>
 */

export const StyledBadge = styled(Text, {
  name: 'Badge',
  
  // Base styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  borderRadius: '$2',
  fontSize: 12,
  fontWeight: '600',
  whiteSpace: 'nowrap',
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$gray4',
        color: '$gray11',
      },
      
      primary: {
        backgroundColor: '$blue4',
        color: '$blue11',
      },
      
      success: {
        backgroundColor: '$green4',
        color: '$green11',
      },
      
      warning: {
        backgroundColor: '$orange4',
        color: '$orange11',
      },
      
      error: {
        backgroundColor: '$red4',
        color: '$red11',
      },
      
      info: {
        backgroundColor: '$blue4',
        color: '$blue11',
      },
      
      purple: {
        backgroundColor: '$purple4',
        color: '$purple11',
      },
    },
    
    outlined: {
      true: {
        backgroundColor: 'transparent',
        borderWidth: 1,
      },
    },
    
    dot: {
      true: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: 20,
        height: 20,
        borderRadius: '$round',
      },
    },
    
    size: {
      sm: {
        fontSize: 10,
        paddingHorizontal: '$1.5',
        paddingVertical: '$0.5',
      },
      
      md: {
        fontSize: 12,
        paddingHorizontal: '$2',
        paddingVertical: '$1',
      },
      
      lg: {
        fontSize: 14,
        paddingHorizontal: '$3',
        paddingVertical: '$1.5',
      },
    },
  },
  
  // Combinaisons de variants
  compoundVariants: [
    {
      variant: 'default',
      outlined: true,
      style: {
        borderColor: '$gray7',
        color: '$gray11',
      },
    },
    {
      variant: 'primary',
      outlined: true,
      style: {
        borderColor: '$blue7',
        color: '$blue11',
      },
    },
    {
      variant: 'success',
      outlined: true,
      style: {
        borderColor: '$green7',
        color: '$green11',
      },
    },
    {
      variant: 'warning',
      outlined: true,
      style: {
        borderColor: '$orange7',
        color: '$orange11',
      },
    },
    {
      variant: 'error',
      outlined: true,
      style: {
        borderColor: '$red7',
        color: '$red11',
      },
    },
    {
      variant: 'info',
      outlined: true,
      style: {
        borderColor: '$blue7',
        color: '$blue11',
      },
    },
    {
      variant: 'purple',
      outlined: true,
      style: {
        borderColor: '$purple7',
        color: '$purple11',
      },
    },
  ],
  
  defaultVariants: {
    variant: 'default',
    outlined: false,
    dot: false,
    size: 'md',
  },
})

export const Badge = forwardRef(
  (
    {
      children,
      variant = 'default',
      outlined = false,
      dot = false,
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <StyledBadge
        ref={ref}
        variant={variant}
        outlined={outlined}
        dot={dot}
        size={size}
        {...props}
      >
        {children}
      </StyledBadge>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge