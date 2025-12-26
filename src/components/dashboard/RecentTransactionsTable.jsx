// src/components/dashboard/RecentTransactionsTable.jsx
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text, Card, Button, ScrollView } from 'tamagui'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  MoreVertical,
  Filter,
  Download,
} from 'lucide-react'

/**
 * 📋 RECENT TRANSACTIONS TABLE - FINAPP HAITI
 * 
 * Tableau transactions récentes
 * - Type (in/out/sol)
 * - Catégorie avec icon
 * - Montant coloré
 * - Date & Status
 * - Actions (voir détail)
 */

// Mock data - 10 dernières transactions
const transactions = [
  {
    id: 'TRX001',
    type: 'in',
    category: 'Salaire',
    description: 'Paiement salaire décembre',
    amount: 25000,
    currency: 'HTG',
    date: '2024-12-15',
    status: 'completed',
    account: 'BNC Compte Courant',
  },
  {
    id: 'TRX002',
    type: 'out',
    category: 'Logement',
    description: 'Loyer décembre',
    amount: -15000,
    currency: 'HTG',
    date: '2024-12-10',
    status: 'completed',
    account: 'BNC Compte Courant',
  },
  {
    id: 'TRX003',
    type: 'sol',
    category: 'Sol Famille',
    description: 'Contribution mensuelle',
    amount: -5000,
    currency: 'HTG',
    date: '2024-12-08',
    status: 'completed',
    account: 'Sol Famille',
  },
  {
    id: 'TRX004',
    type: 'out',
    category: 'Alimentation',
    description: 'Courses au marché',
    amount: -3500,
    currency: 'HTG',
    date: '2024-12-07',
    status: 'completed',
    account: 'Cash',
  },
  {
    id: 'TRX005',
    type: 'out',
    category: 'Transport',
    description: 'Essence voiture',
    amount: -2000,
    currency: 'HTG',
    date: '2024-12-06',
    status: 'completed',
    account: 'BNC Compte Courant',
  },
  {
    id: 'TRX006',
    type: 'in',
    category: 'Freelance',
    description: 'Projet web client X',
    amount: 8000,
    currency: 'HTG',
    date: '2024-12-05',
    status: 'pending',
    account: 'BNC Compte Courant',
  },
  {
    id: 'TRX007',
    type: 'out',
    category: 'Restaurants',
    description: 'Déjeuner restaurant',
    amount: -1200,
    currency: 'HTG',
    date: '2024-12-04',
    status: 'completed',
    account: 'Cash',
  },
  {
    id: 'TRX008',
    type: 'out',
    category: 'Santé',
    description: 'Consultation médecin',
    amount: -800,
    currency: 'HTG',
    date: '2024-12-03',
    status: 'completed',
    account: 'BNC Compte Courant',
  },
]

export function RecentTransactionsTable() {
  const ref = useRef(null)
  
  // 🔍 Logger les dimensions
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.log('📋 RecentTransactionsTable:', {
        width: Math.round(rect.width) + 'px',
        height: Math.round(rect.height) + 'px',
        padding: computed.padding,
        transactionsCount: transactions.length,
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
      gap="$4"
      style={{
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <XStack justifyContent="space-between" alignItems="center">
        <YStack gap="$1">
          <Text fontSize={18} fontWeight="700" color="$color">
            Transactions Récentes
          </Text>
          <Text fontSize={12} color="$colorMuted">
            {transactions.length} transactions
          </Text>
        </YStack>
        
        <XStack gap="$2">
          <Button
            size="$3"
            backgroundColor="$backgroundSoft"
            borderWidth={1}
            borderColor="$borderColor"
            icon={<Filter size={16} color="#a0aec0" />}
            paddingHorizontal="$3"
            borderRadius="$2"
            hoverStyle={{
              backgroundColor: '$backgroundHover',
            }}
          >
            <Text fontSize={12} color="$colorMuted">Filtrer</Text>
          </Button>
          <Button
            size="$3"
            backgroundColor="$backgroundSoft"
            borderWidth={1}
            borderColor="$borderColor"
            icon={<Download size={16} color="#a0aec0" />}
            paddingHorizontal="$3"
            borderRadius="$2"
            hoverStyle={{
              backgroundColor: '$backgroundHover',
            }}
          >
            <Text fontSize={12} color="$colorMuted">Export</Text>
          </Button>
        </XStack>
      </XStack>
      
      {/* Table */}
      <ScrollView
        maxHeight={500}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$2">
          {transactions.map((transaction, idx) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </YStack>
      </ScrollView>
      
      {/* Footer */}
      <XStack justifyContent="center" paddingTop="$3">
        <Button
          size="$3"
          backgroundColor="transparent"
          color="$primary"
          fontSize={13}
          fontWeight="600"
          hoverStyle={{
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
          }}
        >
          Voir toutes les transactions →
        </Button>
      </XStack>
    </Card>
  )
}

/**
 * Transaction Row Component
 */
function TransactionRow({ transaction }) {
  const isIncome = transaction.type === 'in'
  const isSol = transaction.type === 'sol'
  const isExpense = transaction.type === 'out'
  
  const amountColor = isIncome ? '$success' : isExpense ? '$error' : '$primary'
  const icon = isIncome ? ArrowUpRight : isSol ? Users : ArrowDownLeft
  const IconComponent = icon
  const iconBgColor = isIncome
    ? 'rgba(16, 185, 129, 0.15)'
    : isSol
    ? 'rgba(139, 92, 246, 0.15)'
    : 'rgba(239, 68, 68, 0.15)'
  const iconColor = isIncome ? '#10b981' : isSol ? '#8b5cf6' : '#ef4444'
  
  return (
    <XStack
      gap="$3"
      alignItems="center"
      padding="$3"
      backgroundColor="$backgroundSoft"
      borderRadius="$3"
      borderWidth={1}
      borderColor="transparent"
      hoverStyle={{
        backgroundColor: '$backgroundHover',
        borderColor: '$primary',
      }}
      pressStyle={{
        scale: 0.98,
      }}
      animation="quick"
    >
      {/* Icon */}
      <YStack
        width={44}
        height={44}
        backgroundColor={iconBgColor}
        borderRadius="$3"
        alignItems="center"
        justifyContent="center"
      >
        <IconComponent size={20} color={iconColor} strokeWidth={2} />
      </YStack>
      
      {/* Info */}
      <YStack flex={1} gap="$1">
        <Text fontSize={14} fontWeight="600" color="$color">
          {transaction.description}
        </Text>
        <XStack gap="$2" alignItems="center">
          <Text fontSize={11} color="$colorMuted">
            {transaction.category}
          </Text>
          <Text fontSize={11} color="$colorFaded">•</Text>
          <Text fontSize={11} color="$colorMuted">
            {new Date(transaction.date).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
            })}
          </Text>
          {transaction.status === 'pending' && (
            <>
              <Text fontSize={11} color="$colorFaded">•</Text>
              <XStack
                backgroundColor="rgba(245, 158, 11, 0.1)"
                paddingHorizontal="$2"
                paddingVertical="$0.5"
                borderRadius="$1"
              >
                <Text fontSize={10} fontWeight="600" color="$warning">
                  En attente
                </Text>
              </XStack>
            </>
          )}
        </XStack>
      </YStack>
      
      {/* Amount */}
      <YStack alignItems="flex-end" gap="$1">
        <Text fontSize={16} fontWeight="700" color={amountColor}>
          {isIncome ? '+' : ''}{transaction.amount.toLocaleString()} {transaction.currency}
        </Text>
        <Text fontSize={10} color="$colorMuted">
          {transaction.account}
        </Text>
      </YStack>
      
      {/* Actions */}
      <YStack
        width={32}
        height={32}
        alignItems="center"
        justifyContent="center"
        borderRadius="$2"
        hoverStyle={{
          backgroundColor: '$backgroundHover',
        }}
        pressStyle={{
          scale: 0.9,
        }}
      >
        <MoreVertical size={18} color="#718096" />
      </YStack>
    </XStack>
  )
}

export default RecentTransactionsTable