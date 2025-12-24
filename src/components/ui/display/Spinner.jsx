import { styled, YStack, XStack, Spinner as TamaguiSpinner } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 💫 SPINNER COMPONENT
 * 
 * Loading spinner avec 3 variants
 * Utilise le Spinner natif de Tamagui avec styled()
 * 
 * @example
 * <Spinner size="large" />
 * <Spinner variant="dots" color="$primary" />
 * <Spinner variant="pulse" />
 */

// Circle Spinner (défaut - natif Tamagui)
export const StyledSpinner = styled(TamaguiSpinner, {
  name: 'Spinner',
  
  variants: {
    size: {
      small: {
        width: 16,
        height: 16,
      },
      
      medium: {
        width: 24,
        height: 24,
      },
      
      large: {
        width: 32,
        height: 32,
      },
      
      xlarge: {
        width: 48,
        height: 48,
      },
    },
  },
  
  defaultVariants: {
    size: 'medium',
  },
})

// Dots Spinner
export const DotsSpinner = styled(XStack, {
  name: 'DotsSpinner',
  gap: '$2',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Dot = styled(YStack, {
  name: 'Dot',
  borderRadius: '$round',
  backgroundColor: '$primary',
  
  animation: 'quick',
  
  variants: {
    size: {
      small: {
        width: 6,
        height: 6,
      },
      
      medium: {
        width: 8,
        height: 8,
      },
      
      large: {
        width: 10,
        height: 10,
      },
      
      xlarge: {
        width: 14,
        height: 14,
      },
    },
  },
})

// Pulse Spinner
export const PulseSpinner = styled(YStack, {
  name: 'PulseSpinner',
  
  borderRadius: '$round',
  backgroundColor: '$primary',
  
  animation: 'quick',
  
  variants: {
    size: {
      small: {
        width: 24,
        height: 24,
      },
      
      medium: {
        width: 32,
        height: 32,
      },
      
      large: {
        width: 48,
        height: 48,
      },
      
      xlarge: {
        width: 64,
        height: 64,
      },
    },
  },
})

export const Spinner = forwardRef(
  (
    {
      variant = 'circle',
      size = 'medium',
      color = '$primary',
      ...props
    },
    ref
  ) => {
    // Circle variant (natif Tamagui)
    if (variant === 'circle') {
      return (
        <StyledSpinner
          ref={ref}
          size={size}
          color={color}
          {...props}
        />
      )
    }

    // Dots variant
    if (variant === 'dots') {
      return (
        <DotsSpinner ref={ref} {...props}>
          <Dot
            size={size}
            backgroundColor={color}
            animation="quick"
            opacity={0.4}
            $theme-dark={{
              opacity: 0.6,
            }}
          />
          <Dot
            size={size}
            backgroundColor={color}
            animation="quick"
            opacity={0.7}
            animationDelay="0.1s"
            $theme-dark={{
              opacity: 0.8,
            }}
          />
          <Dot
            size={size}
            backgroundColor={color}
            animation="quick"
            opacity={1}
            animationDelay="0.2s"
          />
        </DotsSpinner>
      )
    }

    // Pulse variant
    if (variant === 'pulse') {
      return (
        <PulseSpinner
          ref={ref}
          size={size}
          backgroundColor={color}
          animation="quick"
          opacity={0.6}
          scale={0.8}
          {...props}
        />
      )
    }

    // Fallback
    return <StyledSpinner ref={ref} size={size} color={color} {...props} />
  }
)

Spinner.displayName = 'Spinner'

export default Spinner