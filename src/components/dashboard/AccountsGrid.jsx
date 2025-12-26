// src/components/dashboard/AccountsGrid.jsx - VERSION FINALE
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text, Card, ScrollView, Button } from 'tamagui'
import { Plus, MoreVertical, Landmark, Banknote, Smartphone, Coins, Building2 } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/**
 * 💳 ACCOUNTS GRID - FINAPP HAITI
 * 
 * Desktop (>1200px): Flex wrap grid
 * Tablet/Mobile (<1200px): Horizontal scroll
 */

const MOCK_ACCOUNTS = [
  {
    id: 'acc1',
    name: 'Unibank',
    iconType: 'bank',
    balance: 45000,
    progress: 65,
    type: 'bank',
  },
  {
    id: 'acc2',
    name: 'Cash',
    iconType: 'cash',
    balance: 12500,
    progress: 45,
    type: 'cash',
  },
  {
    id: 'acc3',
    name: 'MonCash',
    iconType: 'mobile',
    balance: 2300,
    progress: 30,
    type: 'mobile',
  },
  {
    id: 'acc4',
    name: 'BNC Épargne',
    iconType: 'bank',
    balance: 28500,
    progress: 55,
    type: 'savings',
  },
  {
    id: 'acc5',
    name: 'Sogebank USD',
    iconType: 'coins',
    balance: 1200,
    progress: 40,
    type: 'bank',
    currency: 'USD',
  },
]

// Map icon types to Lucide icons
const ICON_MAP = {
  bank: Landmark,
  cash: Banknote,
  mobile: Smartphone,
  coins: Coins,
  building: Building2,
}

export function AccountsGrid({ accounts = MOCK_ACCOUNTS }) {
  const { isMobile, isTablet } = useMediaQuery()
  const ref = useRef(null)
  
  const shouldScroll = isMobile || isTablet
  
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.log('💳 AccountsGrid:', {
        width: Math.round(rect.width) + 'px',
        scrollMode: shouldScroll ? 'horizontal' : 'flex-wrap',
        isMobile,
        isTablet,
        gap: computed.gap,
      })
    }
    
    setTimeout(measure, 150)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isMobile, isTablet, shouldScroll])
  
  return (
    <YStack ref={ref} gap="$4" $sm={{ gap: '$3' }}>
      {/* Header */}
      <XStack justifyContent="space-between" alignItems="center" $sm={{ flexWrap: 'wrap', gap: '$2' }}>
        <YStack gap="$1">
          <Text fontSize={20} fontWeight="700" color="$color" $sm={{ fontSize: 18 }}>
            Mes Comptes
          </Text>
          <Text fontSize={13} color="$colorMuted" $sm={{ fontSize: 12 }}>
            {accounts.length} comptes actifs
          </Text>
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
          $sm={{ fontSize: 12, paddingHorizontal: '$3' }}
          hoverStyle={{ backgroundColor: '$primaryLight' }}
        >
          Ajouter un compte
        </Button>
      </XStack>
      
      {/* Cards Container */}
      {shouldScroll ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingRight: 16 }}
        >
          <XStack gap="$4" $sm={{ gap: '$3' }}>
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </XStack>
        </ScrollView>
      ) : (
        <XStack gap="$4" flexWrap="wrap">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </XStack>
      )}
    </YStack>
  )
}

function AccountCard({ account }) {
  const IconComponent = ICON_MAP[account.iconType] || Landmark
  
  return (
    <Card
      width={240}
      minWidth={240}
      $lg={{ width: 220, minWidth: 220 }}
      $sm={{ width: 200, minWidth: 200 }}
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$4"
      padding="$5"
      gap="$3"
      $sm={{ padding: '$4', gap: '$2.5' }}
      hoverStyle={{ borderColor: '$primary', scale: 1.02 }}
      pressStyle={{ scale: 0.98 }}
      animation="quick"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Header: Icon + Menu */}
      <XStack justifyContent="space-between" alignItems="center">
        <YStack
          width={50}
          height={50}
          $sm={{ width: 44, height: 44 }}
          backgroundColor="$backgroundSoft"
          borderRadius="$3"
          alignItems="center"
          justifyContent="center"
        >
          <IconComponent size={28} color="#8b5cf6" strokeWidth={2} />
        </YStack>
        <YStack
          width={32}
          height={32}
          $sm={{ width: 28, height: 28 }}
          alignItems="center"
          justifyContent="center"
          borderRadius="$2"
          hoverStyle={{ backgroundColor: '$backgroundHover' }}
          pressStyle={{ scale: 0.9 }}
          cursor="pointer"
        >
          <MoreVertical size={18} color="#a0aec0" />
        </YStack>
      </XStack>
      
      {/* Account Name */}
      <Text fontSize={15} fontWeight="600" color="$color" $sm={{ fontSize: 14 }}>
        {account.name}
      </Text>
      
      {/* Balance */}
      <Text fontSize={24} fontWeight="700" color="$color" $sm={{ fontSize: 20 }}>
        {account.currency === 'USD' ? '$' : 'HTG '}{account.balance.toLocaleString()}
      </Text>
      
      {/* Progress Bar */}
      <YStack gap="$1">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={11} color="$colorMuted" $sm={{ fontSize: 10 }}>
            Utilisation
          </Text>
          <Text fontSize={11} fontWeight="600" color="$color" $sm={{ fontSize: 10 }}>
            {account.progress}%
          </Text>
        </XStack>
        <YStack
          width="100%"
          height={6}
          $sm={{ height: 5 }}
          backgroundColor="$backgroundSoft"
          borderRadius="$round"
          overflow="hidden"
        >
          <YStack
            width={`${account.progress}%`}
            height="100%"
            backgroundColor={account.progress >= 70 ? '$success' : account.progress >= 40 ? '$primary' : '$warning'}
            borderRadius="$round"
          />
        </YStack>
      </YStack>
    </Card>
  )
}

export default AccountsGrid