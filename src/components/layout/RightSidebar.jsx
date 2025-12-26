// src/components/layout/RightSidebar.jsx - VERSION FINALE COMPLÈTE
import { YStack, XStack, Text, Card, Button } from 'tamagui'
import { useAuth } from '../../app/hooks'
import {
  Wallet,
  Plus,
  Minus,
  ArrowLeftRight,
  BarChart3,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Home,
  Users,
  Check,
  Calendar,
} from 'lucide-react'

/**
 * 📱 RIGHT SIDEBAR - FINAPP HAITI
 * 
 * FIXED à droite avec scroll indépendant
 */

export function RightSidebar() {
  const auth = useAuth()
  
  return (
    <YStack
      width={320}
      height="100vh"
      position="fixed"
      right={0}
      top={0}
      backgroundColor="$bgSecondary"
      borderLeftWidth={1}
      borderLeftColor="$borderColor"
      zIndex={10}
      overflow="auto"
      display="flex"
      $lg={{ display: 'none' }}
      $sm={{ display: 'none' }}
    >
      <YStack padding="$6" gap="$5">
        <BalanceWidget />
        <QuickActionsWidget />
        <RecentActivityWidget />
        <SolSuggestionsWidget />
        <SummaryWidget />
      </YStack>
    </YStack>
  )
}

function BalanceWidget() {
  return (
    <Card
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$5"
      gap="$4"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={14} fontWeight="600" color="$colorMuted">
          Balance Totale
        </Text>
        <Wallet size={20} color="#a0aec0" />
      </XStack>
      
      <YStack gap="$2">
        <XStack alignItems="baseline" gap="$2">
          <Text fontSize={32} fontWeight="700" color="$color">45,250</Text>
          <Text fontSize={16} fontWeight="600" color="$colorMuted">HTG</Text>
        </XStack>
        <XStack gap="$2" alignItems="center">
          <TrendingUp size={14} color="#10b981" />
          <Text fontSize={12} color="$success">+2,500 HTG ce mois</Text>
        </XStack>
      </YStack>
      
      <YStack height={1} backgroundColor="$borderColor" />
      
      <YStack gap="$2">
        <XStack alignItems="baseline" gap="$2">
          <Text fontSize={24} fontWeight="700" color="$color">$382</Text>
          <Text fontSize={14} fontWeight="600" color="$colorMuted">USD</Text>
        </XStack>
        <Text fontSize={12} color="$colorMuted">≈ 50,260 HTG</Text>
      </YStack>
      
      <Button
        size="$4"
        backgroundColor="$primary"
        paddingHorizontal="$6"
        paddingVertical="$5"
        color="white"
        borderRadius="$2"
        fontSize={13}
        fontWeight="600"
        hoverStyle={{ backgroundColor: '$primaryLight' }}
      >
        Voir détails
      </Button>
    </Card>
  )
}

function SummaryWidget() {
  return (
    <Card
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$5"
      gap="$3"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={14} fontWeight="600" color="$colorMuted">Résumé</Text>
        <XStack gap="$1.5" alignItems="center">
          <Calendar size={14} color="#a0aec0" />
          <Text fontSize={12} color="$colorMuted">Ce mois</Text>
        </XStack>
      </XStack>
      
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={12} color="$colorMuted">Ce mois</Text>
        <Text fontSize={13} fontWeight="600" color="$color">Janvier 2024</Text>
      </XStack>
      
      <YStack height={1} backgroundColor="$borderColor" />
      
      <XStack justifyContent="space-between" alignItems="center">
        <XStack gap="$2" alignItems="center">
          <TrendingUp size={16} color="#10b981" />
          <Text fontSize={12} color="$colorMuted">Revenus</Text>
        </XStack>
        <Text fontSize={14} fontWeight="700" color="$success">+HTG 45,000</Text>
      </XStack>
      
      <XStack justifyContent="space-between" alignItems="center">
        <XStack gap="$2" alignItems="center">
          <TrendingDown size={16} color="#ef4444" />
          <Text fontSize={12} color="$colorMuted">Dépenses</Text>
        </XStack>
        <Text fontSize={14} fontWeight="700" color="$error">-HTG 32,550</Text>
      </XStack>
      
      <YStack height={1} backgroundColor="$borderColor" />
      
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={13} fontWeight="600" color="$color">Net</Text>
        <Text fontSize={16} fontWeight="700" color="$success">+HTG 12,450</Text>
      </XStack>
    </Card>
  )
}

function QuickActionsWidget() {
  const actions = [
    { icon: Plus, label: 'Ajouter' },
    { icon: Minus, label: 'Retirer' },
    { icon: ArrowLeftRight, label: 'Transfert' },
    { icon: BarChart3, label: 'Rapport' },
  ]
  
  return (
    <Card
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$5"
      gap="$4"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <Text fontSize={14} fontWeight="600" color="$colorMuted">Actions Rapides</Text>
      
      <XStack gap="$3" flexWrap="wrap">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <YStack
              key={idx}
              width="47%"
              backgroundColor="$backgroundSoft"
              borderRadius="$3"
              paddingVertical="$5"
              paddingHorizontal="$3"
              gap="$3"
              alignItems="center"
              justifyContent="center"
              hoverStyle={{ backgroundColor: '$backgroundHover', scale: 1.05 }}
              pressStyle={{ scale: 0.95 }}
              cursor="pointer"
              animation="quick"
            >
              <Icon size={28} color="#8b5cf6" strokeWidth={2} />
              <Text fontSize={13} fontWeight="600" color="$color">{action.label}</Text>
            </YStack>
          )
        })}
      </XStack>
    </Card>
  )
}

function RecentActivityWidget() {
  const activities = [
    { type: 'in', description: 'Salaire reçu', amount: '+25,000 HTG', time: 'Il y a 2h', icon: DollarSign, iconColor: '#10b981' },
    { type: 'out', description: 'Loyer', amount: '-15,000 HTG', time: 'Hier', icon: Home, iconColor: '#ef4444' },
    { type: 'sol', description: 'Sol mensuel', amount: '5,000 HTG', time: 'Il y a 3j', icon: Users, iconColor: '#8b5cf6' },
  ]
  
  return (
    <Card
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$5"
      gap="$4"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={14} fontWeight="600" color="$colorMuted">Activité Récente</Text>
        <Text fontSize={12} color="$primary" fontWeight="600" cursor="pointer">Tout voir →</Text>
      </XStack>
      
      <YStack gap="$3">
        {activities.map((activity, idx) => {
          const Icon = activity.icon
          return (
            <XStack
              key={idx}
              gap="$3"
              alignItems="center"
              paddingVertical="$2"
              borderBottomWidth={idx < activities.length - 1 ? 1 : 0}
              borderBottomColor="$borderColor"
            >
              <YStack width={40} height={40} backgroundColor="$backgroundSoft" borderRadius="$3" alignItems="center" justifyContent="center">
                <Icon size={20} color={activity.iconColor} strokeWidth={2} />
              </YStack>
              
              <YStack flex={1} gap="$1">
                <Text fontSize={13} fontWeight="600" color="$color">{activity.description}</Text>
                <Text fontSize={11} color="$colorMuted">{activity.time}</Text>
              </YStack>
              
              <Text fontSize={14} fontWeight="700" color={activity.type === 'in' ? '$success' : activity.type === 'out' ? '$error' : '$primary'}>
                {activity.amount}
              </Text>
            </XStack>
          )
        })}
      </YStack>
    </Card>
  )
}

function SolSuggestionsWidget() {
  return (
    <Card
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$5"
      gap="$4"
      style={{
        backdropFilter: 'blur(12px)',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
      }}
    >
      <XStack gap="$2" alignItems="center">
        <Users size={24} color="#8b5cf6" strokeWidth={2} />
        <Text fontSize={14} fontWeight="600" color="$color">Rejoindre un Sol</Text>
      </XStack>
      
      <YStack gap="$3">
        <Text fontSize={13} color="$colorMuted" lineHeight={18}>
          Les Sols vous permettent d'épargner collectivement avec vos proches.
        </Text>
        
        <YStack gap="$2">
          <XStack gap="$2" alignItems="center">
            <Check size={16} color="#10b981" strokeWidth={2} />
            <Text fontSize={12} color="$colorMuted">Épargne sécurisée</Text>
          </XStack>
          <XStack gap="$2" alignItems="center">
            <Check size={16} color="#10b981" strokeWidth={2} />
            <Text fontSize={12} color="$colorMuted">Versements automatiques</Text>
          </XStack>
          <XStack gap="$2" alignItems="center">
            <Check size={16} color="#10b981" strokeWidth={2} />
            <Text fontSize={12} color="$colorMuted">Groupe de confiance</Text>
          </XStack>
        </YStack>
        
        <Button
          size="$4"
          backgroundColor="$primary"
          color="white"
          borderRadius="$2"
          fontSize={13}
          fontWeight="600"
          paddingHorizontal="$6"
          paddingVertical="$5"
          hoverStyle={{ backgroundColor: '$primaryLight' }}
        >
          Créer un Sol
        </Button>
      </YStack>
    </Card>
  )
}

export default RightSidebar