import { Card as TamaguiCard, styled } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🎴 CARD COMPONENT
 * 
 * Carte basique pour afficher du contenu
 * Utilise le Card natif de Tamagui avec styled()
 * 
 * @example
 * <Card elevated padded>
 *   <H3>Titre</H3>
 *   <Text>Contenu de la carte</Text>
 * </Card>
 */

export const StyledCard = styled(TamaguiCard, {
  name: 'Card',
  
  // Base styles
  backgroundColor: '$background',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  overflow: 'hidden',
  
  variants: {
    padded: {
      true: {
        padding: '$4',
      },
      false: {
        padding: 0,
      },
    },
    
    elevated: {
      true: {
        shadowColor: '$shadowColor',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        borderWidth: 0,
      },
    },
    
    bordered: {
      true: {
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      false: {
        borderWidth: 0,
      },
    },
    
    hoverable: {
      true: {
        cursor: 'pointer',
        
        hoverStyle: {
          borderColor: '$borderColorHover',
          shadowRadius: 15,
          scale: 1.02,
        },
        
        pressStyle: {
          scale: 0.98,
        },
      },
    },
    
    variant: {
      default: {
        backgroundColor: '$background',
      },
      
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      
      filled: {
        backgroundColor: '$backgroundStrong',
        borderWidth: 0,
      },
    },
  },
  
  defaultVariants: {
    padded: true,
    elevated: false,
    bordered: true,
    hoverable: false,
    variant: 'default',
  },
})

export const Card = forwardRef(
  (
    {
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledCard ref={ref} {...props}>
        {children}
      </StyledCard>
    )
  }
)

Card.displayName = 'Card'

// Card Header
export const CardHeader = styled(TamaguiCard, {
  name: 'CardHeader',
  padding: '$4',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
})

// Card Body
export const CardBody = styled(TamaguiCard, {
  name: 'CardBody',
  padding: '$4',
})

// Card Footer
export const CardFooter = styled(TamaguiCard, {
  name: 'CardFooter',
  padding: '$4',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
})

export default Card