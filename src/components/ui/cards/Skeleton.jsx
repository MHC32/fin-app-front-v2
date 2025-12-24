import { styled, YStack } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 💀 SKELETON COMPONENT
 * 
 * Placeholder animé pour les états de chargement
 * Pulse animation pour meilleur UX
 * 
 * @example
 * <Skeleton width={200} height={20} />
 * <Skeleton circular width={50} height={50} />
 */

export const StyledSkeleton = styled(YStack, {
  name: 'Skeleton',
  
  // Base styles
  backgroundColor: '$backgroundStrong',
  borderRadius: '$3',
  overflow: 'hidden',
  position: 'relative',
  
  // Pulse animation
  animation: 'pulse',
  
  animateOnly: ['backgroundColor'],
  
  variants: {
    circular: {
      true: {
        borderRadius: '$round',
      },
    },
    
    variant: {
      default: {
        backgroundColor: '$gray4',
      },
      
      light: {
        backgroundColor: '$gray3',
      },
      
      dark: {
        backgroundColor: '$gray5',
      },
    },
    
    animated: {
      true: {
        animation: 'pulse',
      },
      false: {
        animation: 'none',
      },
    },
  },
  
  defaultVariants: {
    circular: false,
    variant: 'default',
    animated: true,
  },
})

export const Skeleton = forwardRef(
  (
    {
      width,
      height = 20,
      circular = false,
      variant = 'default',
      animated = true,
      ...props
    },
    ref
  ) => {
    return (
      <StyledSkeleton
        ref={ref}
        width={width}
        height={height}
        circular={circular}
        variant={variant}
        animated={animated}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Skeleton presets pour usage rapide
export const SkeletonText = forwardRef(
  (
    {
      lines = 3,
      lastLineWidth = '80%',
      gap = '$2',
      ...props
    },
    ref
  ) => {
    return (
      <YStack gap={gap} width="100%" ref={ref}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            width={i === lines - 1 ? lastLineWidth : '100%'}
            height={16}
            {...props}
          />
        ))}
      </YStack>
    )
  }
)

SkeletonText.displayName = 'SkeletonText'

export const SkeletonAvatar = forwardRef(
  (
    {
      size = 50,
      ...props
    },
    ref
  ) => {
    return (
      <Skeleton
        ref={ref}
        width={size}
        height={size}
        circular
        {...props}
      />
    )
  }
)

SkeletonAvatar.displayName = 'SkeletonAvatar'

export const SkeletonCard = forwardRef(
  (
    {
      showAvatar = false,
      lines = 3,
      ...props
    },
    ref
  ) => {
    return (
      <YStack gap="$3" width="100%" ref={ref} {...props}>
        {showAvatar && (
          <YStack gap="$3">
            <Skeleton width={50} height={50} circular />
            <YStack gap="$2" flex={1}>
              <Skeleton width="60%" height={20} />
              <Skeleton width="40%" height={16} />
            </YStack>
          </YStack>
        )}
        
        <SkeletonText lines={lines} />
        
        <Skeleton width="30%" height={36} />
      </YStack>
    )
  }
)

SkeletonCard.displayName = 'SkeletonCard'

export default Skeleton