import { Card as TamaguiCard, styled, XStack, YStack, Text } from 'tamagui'
import { TrendingUp, TrendingDown, Minus } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'

/**
 * 📊 STATCARD COMPONENT
 * 
 * Carte pour afficher des statistiques
 * Avec label, valeur, changement (%) et icône
 * 
 * @example
 * <StatCard 
 *   label="Total des transactions"
 *   value="125,000 HTG"
 *   change={+12.5}
 *   icon={<DollarSign />}
 * />
 */

export const StyledStatCard = styled(TamaguiCard, {
  name: 'StatCard',
  
  // Base styles
  backgroundColor: '$background',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: '$4',
  
  variants: {
    elevated: {
      true: {
        shadowColor: '$shadowColor',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
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
      
      primary: {
        backgroundColor: '$blue2',
        borderColor: '$blue5',
      },
      
      success: {
        backgroundColor: '$green2',
        borderColor: '$green5',
      },
      
      warning: {
        backgroundColor: '$orange2',
        borderColor: '$orange5',
      },
      
      error: {
        backgroundColor: '$red2',
        borderColor: '$red5',
      },
    },
  },
  
  defaultVariants: {
    elevated: false,
    hoverable: false,
    variant: 'default',
  },
})

const getTrendIcon = (change) => {
  if (change > 0) return TrendingUp
  if (change < 0) return TrendingDown
  return Minus
}

const getTrendColor = (change) => {
  if (change > 0) return '$green10'
  if (change < 0) return '$red10'
  return '$gray10'
}

export const StatCard = forwardRef(
  (
    {
      label,
      value,
      change,
      icon,
      description,
      showTrend = true,
      ...props
    },
    ref
  ) => {
    const TrendIcon = change !== undefined ? getTrendIcon(change) : null
    const trendColor = change !== undefined ? getTrendColor(change) : '$gray10'
    const changeText = change !== undefined ? `${change > 0 ? '+' : ''}${change}%` : null

    return (
      <StyledStatCard ref={ref} {...props}>
        <YStack gap="$3">
          {/* Header avec Icon */}
          <XStack justifyContent="space-between" alignItems="flex-start">
            <YStack flex={1} gap="$1">
              {/* Label */}
              <Text
                fontSize={13}
                color="$colorMuted"
                fontWeight="500"
              >
                {label}
              </Text>

              {/* Value */}
              <Text
                fontSize={24}
                fontWeight="700"
                color="$color"
              >
                {value}
              </Text>
            </YStack>

            {/* Icon */}
            {icon && (
              <XStack
                backgroundColor="$backgroundHover"
                padding="$3"
                borderRadius="$3"
              >
                {icon}
              </XStack>
            )}
          </XStack>

          {/* Footer avec Trend */}
          {(showTrend && change !== undefined) || description ? (
            <XStack gap="$2" alignItems="center">
              {showTrend && change !== undefined && (
                <XStack gap="$1" alignItems="center">
                  {TrendIcon && <TrendIcon size={16} color={trendColor} />}
                  <Text
                    fontSize={13}
                    fontWeight="600"
                    color={trendColor}
                  >
                    {changeText}
                  </Text>
                </XStack>
              )}

              {description && (
                <Text
                  fontSize={13}
                  color="$colorMuted"
                >
                  {description}
                </Text>
              )}
            </XStack>
          ) : null}
        </YStack>
      </StyledStatCard>
    )
  }
)

StatCard.displayName = 'StatCard'

export default StatCard