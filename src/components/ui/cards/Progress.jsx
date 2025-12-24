import { Progress as TamaguiProgress, styled, YStack, XStack, Text } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 📊 PROGRESS COMPONENT
 * 
 * Barre de progression avec variants et label
 * Utilise le Progress natif de Tamagui avec styled()
 * 
 * @example
 * <Progress value={75} max={100} />
 * <Progress value={50} variant="success" showLabel />
 */

export const StyledProgress = styled(TamaguiProgress, {
  name: 'Progress',
  
  // Base styles
  height: 8,
  backgroundColor: '$backgroundStrong',
  borderRadius: '$round',
  overflow: 'hidden',
  
  variants: {
    variant: {
      default: {
        // L'indicateur sera coloré
      },
      
      primary: {},
      success: {},
      warning: {},
      error: {},
      info: {},
    },
    
    size: {
      sm: {
        height: 6,
      },
      
      md: {
        height: 8,
      },
      
      lg: {
        height: 12,
      },
      
      xl: {
        height: 16,
      },
    },
    
    striped: {
      true: {
        // Background pattern sera ajouté à l'indicateur
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
    size: 'md',
    striped: false,
  },
})

export const StyledProgressIndicator = styled(TamaguiProgress.Indicator, {
  name: 'ProgressIndicator',
  
  backgroundColor: '$blue9',
  height: '100%',
  borderRadius: '$round',
  
  // Smooth animation
  animation: 'smooth',
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$blue9',
      },
      
      primary: {
        backgroundColor: '$blue9',
      },
      
      success: {
        backgroundColor: '$green9',
      },
      
      warning: {
        backgroundColor: '$orange9',
      },
      
      error: {
        backgroundColor: '$red9',
      },
      
      info: {
        backgroundColor: '$blue9',
      },
    },
    
    striped: {
      true: {
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)',
        backgroundSize: '1rem 1rem',
      },
    },
    
    animated: {
      true: {
        animation: 'striped 1s linear infinite',
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
    striped: false,
    animated: false,
  },
})

const getPercentage = (value, max) => {
  return Math.min(100, Math.max(0, (value / max) * 100))
}

export const Progress = forwardRef(
  (
    {
      value = 0,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      label,
      striped = false,
      animated = false,
      ...props
    },
    ref
  ) => {
    const percentage = getPercentage(value, max)

    return (
      <YStack gap="$2" width="100%">
        {/* Label */}
        {(showLabel || label) && (
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={13} color="$color">
              {label || 'Progress'}
            </Text>
            <Text fontSize={13} fontWeight="600" color="$color">
              {Math.round(percentage)}%
            </Text>
          </XStack>
        )}

        {/* Progress bar */}
        <StyledProgress
          ref={ref}
          value={percentage}
          max={100}
          variant={variant}
          size={size}
          striped={striped}
          {...props}
        >
          <StyledProgressIndicator
            variant={variant}
            striped={striped}
            animated={animated && striped}
          />
        </StyledProgress>
      </YStack>
    )
  }
)

Progress.displayName = 'Progress'

// Circular Progress (bonus)
export const CircularProgress = styled(YStack, {
  name: 'CircularProgress',
  
  width: 60,
  height: 60,
  borderRadius: '$round',
  borderWidth: 4,
  borderColor: '$backgroundStrong',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  
  variants: {
    variant: {
      default: {
        borderColor: '$blue9',
      },
      primary: {
        borderColor: '$blue9',
      },
      success: {
        borderColor: '$green9',
      },
      warning: {
        borderColor: '$orange9',
      },
      error: {
        borderColor: '$red9',
      },
    },
    
    size: {
      sm: {
        width: 40,
        height: 40,
        borderWidth: 3,
      },
      md: {
        width: 60,
        height: 60,
        borderWidth: 4,
      },
      lg: {
        width: 80,
        height: 80,
        borderWidth: 5,
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export default Progress