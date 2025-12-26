// src/components/dashboard/BalanceOverview.jsx
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text, Button } from 'tamagui'
import { Wallet } from 'lucide-react'

/**
 * 💰 BALANCE OVERVIEW RESPONSIVE - FINAPP HAITI
 * 
 * Desktop: 48px title, padding $6
 * Tablet: 40px title, padding $5
 * Mobile: 32px title, padding $4
 */

export function BalanceOverview({ balanceHTG = 125450, balanceUSD = 1234.50 }) {
  const ref = useRef(null)
  
  // 🔍 Logger les dimensions
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.log('💰 BalanceOverview:', {
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
  
  return (
    <YStack
      ref={ref}
      backgroundColor="$glass"
      borderWidth={1}
      borderColor="$glassBorder"
      borderRadius="$5"
      padding="$6"      // Desktop: 24px
      gap="$4"          // Desktop: 16px
      $lg={{            // Tablet
        padding: '$5',  // 20px
        gap: '$3.5',
      }}
      $sm={{            // Mobile
        padding: '$4',  // 16px
        gap: '$3',      // 12px
      }}
      style={{
        backdropFilter: 'blur(12px)',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
      }}
    >
      {/* Title */}
      <XStack gap="$2" alignItems="center">
        <Wallet
          size={20}
          color="#8b5cf6"
          strokeWidth={2}
          $sm={{ size: 18 }}  // Mobile: smaller icon
        />
        <Text
          fontSize={14}
          fontWeight="600"
          color="$colorMuted"
          $sm={{ fontSize: 13 }}
        >
          Solde Total
        </Text>
      </XStack>
      
      {/* Amount HTG */}
      <Text
        fontSize={48}        // Desktop: 48px
        fontWeight="700"
        color="$color"
        lineHeight={56}
        $lg={{               // Tablet
          fontSize: 40,
          lineHeight: 48,
        }}
        $sm={{               // Mobile
          fontSize: 32,
          lineHeight: 40,
        }}
      >
        HTG {balanceHTG.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
      </Text>
      
      {/* Currency Tabs */}
      <XStack
        gap="$3"
        $sm={{
          gap: '$2',  // Mobile: less gap
        }}
      >
        <Button
          size="$4"
          backgroundColor="$primary"
          color="white"
          borderRadius="$2"
          fontSize={13}
          fontWeight="600"
          paddingHorizontal="$6"
          paddingVertical="$5"
          $sm={{
            fontSize: 12,
            paddingHorizontal: '$3',
          }}
        >
          HTG
        </Button>
        <Button
          size="$4"
          backgroundColor="$backgroundSoft"
          borderWidth={1}
          borderColor="$borderColor"
          color="$colorMuted"
          borderRadius="$2"
          fontSize={13}
          fontWeight="600"
          paddingHorizontal="$6"
          paddingVertical="$5"
          $sm={{
            fontSize: 12,
            paddingHorizontal: '$3',
          }}
          hoverStyle={{
            backgroundColor: '$backgroundHover',
          }}
        >
          USD ${balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Button>
      </XStack>
    </YStack>
  )
}

export default BalanceOverview