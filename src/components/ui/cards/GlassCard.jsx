import { Card as TamaguiCard, styled } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🪟 GLASSCARD COMPONENT
 * 
 * Carte avec effet glassmorphism (verre dépoli)
 * Parfait pour les overlays et les designs modernes
 * 
 * @example
 * <GlassCard blur="strong">
 *   <H3>Glassmorphism</H3>
 *   <Text>Effet verre dépoli</Text>
 * </GlassCard>
 */

export const StyledGlassCard = styled(TamaguiCard, {
  name: 'GlassCard',
  
  // Base glassmorphism styles
  backgroundColor: '$backgroundTransparent',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderColorTransparent',
  overflow: 'hidden',
  
  // Backdrop filter (verre dépoli)
  backdropFilter: 'blur(10px)',
  
  variants: {
    padded: {
      true: {
        padding: '$4',
      },
      false: {
        padding: 0,
      },
    },
    
    blur: {
      light: {
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      
      medium: {
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      },
      
      strong: {
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    
    elevated: {
      true: {
        shadowColor: '$shadowColor',
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
      },
    },
    
    hoverable: {
      true: {
        cursor: 'pointer',
        
        hoverStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          scale: 1.02,
        },
        
        pressStyle: {
          scale: 0.98,
        },
      },
    },
    
    dark: {
      true: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      false: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  
  defaultVariants: {
    padded: true,
    blur: 'medium',
    elevated: true,
    hoverable: false,
    dark: false,
  },
})

export const GlassCard = forwardRef(
  (
    {
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledGlassCard ref={ref} {...props}>
        {children}
      </StyledGlassCard>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// GlassCard Header
export const GlassCardHeader = styled(TamaguiCard, {
  name: 'GlassCardHeader',
  padding: '$4',
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.1)',
})

// GlassCard Body
export const GlassCardBody = styled(TamaguiCard, {
  name: 'GlassCardBody',
  padding: '$4',
})

// GlassCard Footer
export const GlassCardFooter = styled(TamaguiCard, {
  name: 'GlassCardFooter',
  padding: '$4',
  borderTopWidth: 1,
  borderTopColor: 'rgba(255, 255, 255, 0.1)',
})

export default GlassCard