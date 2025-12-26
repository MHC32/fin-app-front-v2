// src/components/dashboard/ExpensesByCategoryChart.jsx
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text, Card } from 'tamagui'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import {
  Home,
  ShoppingCart,
  Car,
  Utensils,
  Heart,
  Zap,
} from 'lucide-react'

/**
 * 📊 EXPENSES BY CATEGORY CHART - FINAPP HAITI
 * 
 * Pie chart des dépenses par catégorie
 * - Couleurs par catégorie
 * - Icons Lucide
 * - Tooltip customisé
 * - Legend avec pourcentages
 */

// Mock data - Dépenses par catégorie
const data = [
  { 
    name: 'Logement', 
    value: 15000, 
    icon: Home, 
    color: '#8b5cf6',
    description: 'Loyer, électricité, eau'
  },
  { 
    name: 'Alimentation', 
    value: 8500, 
    icon: ShoppingCart, 
    color: '#10b981',
    description: 'Courses, marché'
  },
  { 
    name: 'Transport', 
    value: 4200, 
    icon: Car, 
    color: '#f59e0b',
    description: 'Essence, taxi, réparations'
  },
  { 
    name: 'Restaurants', 
    value: 2800, 
    icon: Utensils, 
    color: '#ec4899',
    description: 'Sorties, fast-food'
  },
  { 
    name: 'Santé', 
    value: 1300, 
    icon: Heart, 
    color: '#ef4444',
    description: 'Médicaments, consultations'
  },
  { 
    name: 'Services', 
    value: 300, 
    icon: Zap, 
    color: '#3b82f6',
    description: 'Internet, téléphone'
  },
]

// Calculer total
const total = data.reduce((sum, item) => sum + item.value, 0)

export function ExpensesByCategoryChart() {
  const ref = useRef(null)
  
  // 🔍 Logger les dimensions
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.log('📊 ExpensesByCategoryChart:', {
        width: Math.round(rect.width) + 'px',
        height: Math.round(rect.height) + 'px',
        padding: computed.padding,
        total: total.toLocaleString() + ' HTG',
        categoriesCount: data.length,
      })
    }
    
    setTimeout(measure, 150)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  
  return (
    <Card
      ref={ref}
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$6"
      gap="$5"
      style={{
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <YStack gap="$2">
        <Text fontSize={18} fontWeight="700" color="$color">
          Dépenses par Catégorie
        </Text>
        <Text fontSize={13} color="$colorMuted">
          Répartition mensuelle
        </Text>
      </YStack>
      
      {/* Chart */}
      <YStack height={280}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(45, 36, 56, 0.95)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                padding: '12px',
                backdropFilter: 'blur(12px)',
              }}
              formatter={(value, name, props) => {
                const percentage = ((value / total) * 100).toFixed(1)
                return [
                  <YStack key="tooltip" gap="$1">
                    <Text color="white" fontSize={13} fontWeight="600">
                      {value.toLocaleString()} HTG
                    </Text>
                    <Text color="#a0aec0" fontSize={11}>
                      {percentage}% du total
                    </Text>
                    <Text color="#718096" fontSize={10} marginTop="$1">
                      {props.payload.description}
                    </Text>
                  </YStack>
                ]
              }}
              labelFormatter={(label) => label}
            />
          </PieChart>
        </ResponsiveContainer>
      </YStack>
      
      {/* Legend Custom */}
      <YStack gap="$2">
        {data.map((category, idx) => {
          const percentage = ((category.value / total) * 100).toFixed(1)
          const IconComponent = category.icon
          
          return (
            <XStack
              key={idx}
              justifyContent="space-between"
              alignItems="center"
              paddingVertical="$2"
              borderBottomWidth={idx < data.length - 1 ? 1 : 0}
              borderBottomColor="rgba(255,255,255,0.05)"
            >
              <XStack gap="$3" alignItems="center" flex={1}>
                <YStack
                  width={36}
                  height={36}
                  backgroundColor={category.color + '20'}
                  borderRadius="$3"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconComponent size={18} color={category.color} strokeWidth={2} />
                </YStack>
                <YStack gap="$0.5">
                  <Text fontSize={13} fontWeight="600" color="$color">
                    {category.name}
                  </Text>
                  <Text fontSize={11} color="$colorMuted">
                    {percentage}%
                  </Text>
                </YStack>
              </XStack>
              <Text fontSize={14} fontWeight="700" color="$color">
                {category.value.toLocaleString()}
              </Text>
            </XStack>
          )
        })}
      </YStack>
      
      {/* Total */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingTop="$3"
        borderTopWidth={2}
        borderTopColor="rgba(139, 92, 246, 0.3)"
      >
        <Text fontSize={14} fontWeight="700" color="$colorMuted">
          Total
        </Text>
        <Text fontSize={18} fontWeight="700" color="$primary">
          {total.toLocaleString()} HTG
        </Text>
      </XStack>
    </Card>
  )
}

export default ExpensesByCategoryChart