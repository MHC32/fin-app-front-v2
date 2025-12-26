// src/components/dashboard/MetricsGrid.jsx
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text, Card } from 'tamagui'
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'

/**
 * 📊 METRICS GRID RESPONSIVE - FINAPP HAITI
 * 
 * Desktop (>1200px): 3 colonnes (flex wrap)
 * Tablet (768-1200px): 2 colonnes (minWidth force wrap)
 * Mobile (<768px): 1 colonne (stack vertical)
 */

const METRICS_DATA = [
  {
    id: 'revenues',
    icon: TrendingUp,
    iconColor: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.15)',
    label: 'Revenus',
    value: 45000,
    change: '+12.5%',
    changeType: 'positive',
  },
  {
    id: 'expenses',
    icon: TrendingDown,
    iconColor: '#ef4444',
    iconBg: 'rgba(239, 68, 68, 0.15)',
    label: 'Dépenses',
    value: 32550,
    change: '-8.3%',
    changeType: 'negative',
  },
  {
    id: 'savings',
    icon: PiggyBank,
    iconColor: '#8b5cf6',
    iconBg: 'rgba(139, 92, 246, 0.15)',
    label: 'Épargne',
    value: 12900,
    change: '+5.2%',
    changeType: 'positive',
  },
]

export function MetricsGrid() {
  const ref = useRef(null)
  
  // 🔍 Logger les dimensions
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.log('📊 MetricsGrid:', {
        width: Math.round(rect.width) + 'px',
        flexWrap: computed.flexWrap,
        gap: computed.gap,
        childrenCount: ref.current.children.length,
      })
    }
    
    setTimeout(measure, 150)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  
  return (
    <XStack
      ref={ref}
      gap="$4"           // Desktop: 16px
      flexWrap="wrap"    // Allow wrapping
      $lg={{             // Tablet
        gap: '$3.5',
      }}
      $sm={{             // Mobile: stack vertical
        flexDirection: 'column',
        gap: '$3',
        flexWrap: 'nowrap',
      }}
    >
      {METRICS_DATA.map((metric) => (
        <MetricCard key={metric.id} {...metric} />
      ))}
    </XStack>
  )
}

/**
 * Metric Card Component - Responsive
 */
function MetricCard({ icon: Icon, iconColor, iconBg, label, value, change, changeType }) {
  const changeColor = changeType === 'positive' ? '$success' : '$error'
  const arrow = changeType === 'positive' ? '↑' : '↓'
  
  return (
    <Card
      flex={1}
      minWidth={200}      // Desktop/Tablet: natural flex wrap
      $sm={{              // Mobile: full width, no flex
        minWidth: '100%',
        flex: 'none',
      }}
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$5"        // Desktop: 20px
      gap="$4"
      $lg={{              // Tablet
        padding: '$4',    // 16px
        gap: '$3.5',
      }}
      $sm={{              // Mobile
        padding: '$4',
        gap: '$3',
      }}
      hoverStyle={{
        borderColor: '$primary',
        scale: 1.02,
      }}
      animation="quick"
      style={{
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Icon */}
      <YStack
        width={50}
        height={50}
        backgroundColor={iconBg}
        borderRadius="$3"
        alignItems="center"
        justifyContent="center"
        $sm={{
          width: 44,
          height: 44,
        }}
      >
        <Icon
          size={28}
          color={iconColor}
          strokeWidth={2}
          $sm={{ size: 24 }}
        />
      </YStack>
      
      {/* Label */}
      <Text
        fontSize={14}
        fontWeight="600"
        color="$colorMuted"
        $sm={{ fontSize: 13 }}
      >
        {label}
      </Text>
      
      {/* Value */}
      <Text
        fontSize={28}
        fontWeight="700"
        color="$color"
        $lg={{
          fontSize: 24,    // Tablet: smaller
        }}
        $sm={{
          fontSize: 24,    // Mobile: smaller
        }}
      >
        HTG {value.toLocaleString()}
      </Text>
      
      {/* Change */}
      <XStack gap="$1.5" alignItems="center">
        <Text
          fontSize={13}
          fontWeight="600"
          color={changeColor}
          $sm={{ fontSize: 12 }}
        >
          {change}
        </Text>
        <Text fontSize={16} color={changeColor} $sm={{ fontSize: 14 }}>
          {arrow}
        </Text>
      </XStack>
    </Card>
  )
}

export default MetricsGrid