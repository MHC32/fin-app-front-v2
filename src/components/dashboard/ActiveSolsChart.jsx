// src/components/dashboard/ActiveSolsChart.jsx
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text, Card, Button } from 'tamagui'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Users, TrendingUp, Plus } from 'lucide-react'

/**
 * 🤝 ACTIVE SOLS CHART - FINAPP HAITI
 * 
 * Bar chart des Sols actifs
 * - Progression par Sol
 * - Couleurs par statut
 * - Tooltip avec détails
 * - Stats rapides
 */

// Mock data - Sols actifs
const data = [
  {
    name: 'Sol Famille',
    collected: 35000,
    target: 50000,
    members: 10,
    myPosition: 3,
    nextPayment: '2025-01-05',
    status: 'active',
  },
  {
    name: 'Sol Travail',
    collected: 48000,
    target: 60000,
    members: 12,
    myPosition: 7,
    nextPayment: '2025-01-10',
    status: 'active',
  },
  {
    name: 'Sol Quartier',
    collected: 22000,
    target: 30000,
    members: 6,
    myPosition: 2,
    nextPayment: '2025-01-15',
    status: 'active',
  },
]

export function ActiveSolsChart() {
  const ref = useRef(null)
  
  // Calculer stats
  const totalCollected = data.reduce((sum, sol) => sum + sol.collected, 0)
  const totalTarget = data.reduce((sum, sol) => sum + sol.target, 0)
  const progressPercentage = ((totalCollected / totalTarget) * 100).toFixed(1)
  const totalMembers = data.reduce((sum, sol) => sum + sol.members, 0)
  
  // 🔍 Logger les dimensions
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.log('🤝 ActiveSolsChart:', {
        width: Math.round(rect.width) + 'px',
        height: Math.round(rect.height) + 'px',
        padding: computed.padding,
        solsCount: data.length,
        totalProgress: progressPercentage + '%',
      })
    }
    
    setTimeout(measure, 150)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [progressPercentage])
  
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
          <XStack gap="$2" alignItems="center">
            <Users size={20} color="#8b5cf6" strokeWidth={2} />
            <Text fontSize={18} fontWeight="700" color="$color">
              Mes Sols Actifs
            </Text>
          </XStack>
          <Button
            size="$4"
            backgroundColor="$primary"
            color="white"
            icon={<Plus size={18} />}
            paddingHorizontal="$6"
            paddingVertical="$5"
            borderRadius="$2"
            fontSize={12}
            fontWeight="600"
            hoverStyle={{
              backgroundColor: '$primaryLight',
            }}
          >
            Nouveau Sol
          </Button>
        </XStack>
        
        {/* Stats Summary */}
        <XStack gap="$5">
          <YStack gap="$1">
            <Text fontSize={11} color="$colorMuted" fontWeight="600">
              Total collecté
            </Text>
            <Text fontSize={16} fontWeight="700" color="$primary">
              {totalCollected.toLocaleString()} HTG
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontSize={11} color="$colorMuted" fontWeight="600">
              Objectif total
            </Text>
            <Text fontSize={16} fontWeight="700" color="$color">
              {totalTarget.toLocaleString()} HTG
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontSize={11} color="$colorMuted" fontWeight="600">
              Progression
            </Text>
            <XStack gap="$1.5" alignItems="center">
              <Text fontSize={16} fontWeight="700" color="$success">
                {progressPercentage}%
              </Text>
              <TrendingUp size={14} color="#10b981" />
            </XStack>
          </YStack>
        </XStack>
      </YStack>
      
      {/* Chart */}
      <YStack height={240}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="name"
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
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const sol = payload[0].payload
                  const progress = ((sol.collected / sol.target) * 100).toFixed(1)
                  
                  return (
                    <YStack gap="$2" padding="$2">
                      <Text color="white" fontSize={14} fontWeight="700">
                        {sol.name}
                      </Text>
                      <YStack gap="$1">
                        <Text color="#a0aec0" fontSize={12}>
                          Collecté: {sol.collected.toLocaleString()} HTG
                        </Text>
                        <Text color="#a0aec0" fontSize={12}>
                          Objectif: {sol.target.toLocaleString()} HTG
                        </Text>
                        <Text color="#10b981" fontSize={12} fontWeight="600">
                          Progression: {progress}%
                        </Text>
                      </YStack>
                      <YStack gap="$0.5" marginTop="$1">
                        <Text color="#718096" fontSize={11}>
                          {sol.members} membres
                        </Text>
                        <Text color="#718096" fontSize={11}>
                          Ma position: #{sol.myPosition}
                        </Text>
                        <Text color="#718096" fontSize={11}>
                          Prochain paiement: {new Date(sol.nextPayment).toLocaleDateString('fr-FR')}
                        </Text>
                      </YStack>
                    </YStack>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="collected" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => {
                const progress = (entry.collected / entry.target) * 100
                const color = progress >= 80 ? '#10b981' : progress >= 50 ? '#8b5cf6' : '#f59e0b'
                return <Cell key={`cell-${index}`} fill={color} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </YStack>
      
      {/* Details List */}
      <YStack gap="$2">
        {data.map((sol, idx) => {
          const progress = ((sol.collected / sol.target) * 100).toFixed(0)
          const progressColor = progress >= 80 ? '$success' : progress >= 50 ? '$primary' : '$warning'
          
          return (
            <XStack
              key={idx}
              justifyContent="space-between"
              alignItems="center"
              padding="$3"
              backgroundColor="$backgroundSoft"
              borderRadius="$3"
              hoverStyle={{
                backgroundColor: '$backgroundHover',
              }}
            >
              <YStack gap="$1" flex={1}>
                <Text fontSize={13} fontWeight="600" color="$color">
                  {sol.name}
                </Text>
                <XStack gap="$2" alignItems="center">
                  <Text fontSize={11} color="$colorMuted">
                    {sol.members} membres
                  </Text>
                  <Text fontSize={11} color="$colorFaded">•</Text>
                  <Text fontSize={11} color="$colorMuted">
                    Position #{sol.myPosition}
                  </Text>
                </XStack>
              </YStack>
              
              <YStack alignItems="flex-end" gap="$1">
                <Text fontSize={14} fontWeight="700" color={progressColor}>
                  {progress}%
                </Text>
                <Text fontSize={10} color="$colorMuted">
                  {sol.collected.toLocaleString()} / {sol.target.toLocaleString()}
                </Text>
              </YStack>
            </XStack>
          )
        })}
      </YStack>
    </Card>
  )
}

export default ActiveSolsChart