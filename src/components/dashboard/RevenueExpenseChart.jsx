// src/components/dashboard/RevenueExpenseChart.jsx
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text, Card } from 'tamagui'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * 📈 REVENUE/EXPENSE CHART - FINAPP HAITI
 * 
 * Graphique revenus vs dépenses mensuel
 * - Line chart avec 2 lignes
 * - Gradient areas
 * - Tooltip customisé
 * - Responsive
 */

// Mock data - 6 derniers mois
const data = [
  { month: 'Juillet', revenus: 42000, depenses: 35000 },
  { month: 'Août', revenus: 38000, depenses: 32000 },
  { month: 'Septembre', revenus: 45000, depenses: 38000 },
  { month: 'Octobre', revenus: 48000, depenses: 36000 },
  { month: 'Novembre', revenus: 43000, depenses: 34000 },
  { month: 'Décembre', revenus: 45250, depenses: 32100 },
]

export function RevenueExpenseChart() {
  const ref = useRef(null)
  
  // 🔍 Logger les dimensions
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.log('📈 RevenueExpenseChart:', {
        width: Math.round(rect.width) + 'px',
        height: Math.round(rect.height) + 'px',
        padding: computed.padding,
        gap: computed.gap,
      })
    }
    
    setTimeout(measure, 150)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  
  // Calculer totaux
  const totalRevenus = data.reduce((sum, item) => sum + item.revenus, 0)
  const totalDepenses = data.reduce((sum, item) => sum + item.depenses, 0)
  const netIncome = totalRevenus - totalDepenses
  const avgRevenus = Math.round(totalRevenus / data.length)
  const avgDepenses = Math.round(totalDepenses / data.length)
  
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
      <YStack gap="$3">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={18} fontWeight="700" color="$color">
            Revenus vs Dépenses
          </Text>
          <XStack gap="$2">
            <XStack
              backgroundColor="rgba(16, 185, 129, 0.1)"
              paddingHorizontal="$3"
              paddingVertical="$1.5"
              borderRadius="$2"
              gap="$1.5"
              alignItems="center"
            >
              <TrendingUp size={14} color="#10b981" />
              <Text fontSize={12} fontWeight="600" color="$success">
                {((netIncome / totalRevenus) * 100).toFixed(1)}%
              </Text>
            </XStack>
          </XStack>
        </XStack>
        
        {/* Stats Summary */}
        <XStack gap="$5">
          <YStack gap="$1">
            <Text fontSize={11} color="$colorMuted" fontWeight="600">
              Revenus moyens
            </Text>
            <Text fontSize={16} fontWeight="700" color="$success">
              {avgRevenus.toLocaleString()} HTG
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontSize={11} color="$colorMuted" fontWeight="600">
              Dépenses moyennes
            </Text>
            <Text fontSize={16} fontWeight="700" color="$error">
              {avgDepenses.toLocaleString()} HTG
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontSize={11} color="$colorMuted" fontWeight="600">
              Net (6 mois)
            </Text>
            <Text fontSize={16} fontWeight="700" color="$primary">
              {netIncome.toLocaleString()} HTG
            </Text>
          </YStack>
        </XStack>
      </YStack>
      
      {/* Chart */}
      <YStack height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDepenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="month"
              stroke="#a0aec0"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis
              stroke="#a0aec0"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(45, 36, 56, 0.95)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                padding: '12px',
                backdropFilter: 'blur(12px)',
              }}
              labelStyle={{ color: '#ffffff', fontWeight: '600', marginBottom: '8px' }}
              itemStyle={{ color: '#ffffff', fontSize: '13px' }}
              formatter={(value, name) => [
                `${value.toLocaleString()} HTG`,
                name === 'revenus' ? 'Revenus' : 'Dépenses'
              ]}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: '#a0aec0', fontSize: '13px', fontWeight: '600' }}>
                  {value === 'revenus' ? 'Revenus' : 'Dépenses'}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="revenus"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorRevenus)"
              activeDot={{ r: 6, fill: '#10b981' }}
            />
            <Area
              type="monotone"
              dataKey="depenses"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#colorDepenses)"
              activeDot={{ r: 6, fill: '#ef4444' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </YStack>
    </Card>
  )
}

export default RevenueExpenseChart