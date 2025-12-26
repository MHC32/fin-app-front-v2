// src/pages/dashboard/DashboardPage.jsx
import { YStack, XStack, Text } from 'tamagui'
import { useAuth } from '../../app/hooks'
import { Sparkles } from 'lucide-react'

// Layout Components
import SearchBar from '../../components/layout/SearchBar'
import Avatar from '../../components/layout/Avatar'

// Dashboard Components
import BalanceOverview from '../../components/dashboard/BalanceOverview'
import MetricsGrid from '../../components/dashboard/MetricsGrid'
import AccountsGrid from '../../components/dashboard/AccountsGrid'
import RevenueExpenseChart from '../../components/dashboard/RevenueExpenseChart'
import ExpensesByCategoryChart from '../../components/dashboard/ExpensesByCategoryChart'
import RecentTransactionsTable from '../../components/dashboard/RecentTransactionsTable'
import ActiveSolsChart from '../../components/dashboard/ActiveSolsChart'

/**
 * 📊 DASHBOARD PAGE RESPONSIVE - FINAPP HAITI
 * 
 * Desktop (>1200px): 3 colonnes layout
 * Tablet (768-1200px): 2 colonnes, right sidebar caché
 * Mobile (<768px): 1 colonne, stack vertical
 */

export function DashboardPage() {
  const auth = useAuth()
  
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      padding="$8"      // Desktop: 32px
      gap="$6"          // Desktop: 24px
      $lg={{            // Tablet
        padding: '$6',  // 24px
        gap: '$5',      // 20px
      }}
      $sm={{            // Mobile
        padding: '$4',  // 16px
        gap: '$4',      // 16px
      }}
    >
      {/* Header avec SearchBar + Avatar */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        $sm={{
          flexDirection: 'column',  // Mobile: vertical stack
          alignItems: 'flex-start',
          gap: '$3',
        }}
      >
        {/* Title */}
        <YStack gap="$2">
          <XStack
            gap="$2"
            alignItems="center"
            $sm={{
              gap: '$1.5',
            }}
          >
            <Text
              fontSize={36}
              fontWeight="700"
              color="$color"
              $lg={{
                fontSize: 32,  // Tablet: smaller
              }}
              $sm={{
                fontSize: 28,  // Mobile: even smaller
              }}
            >
              Bonjour, {auth.user?.firstName || 'Utilisateur'} 👋
            </Text>
            <Sparkles
              size={32}
              color="#8b5cf6"
              $lg={{ size: 28 }}
              $sm={{ size: 24 }}
            />
          </XStack>
          <Text
            fontSize={14}
            color="$colorMuted"
            $sm={{ fontSize: 13 }}
          >
            Bienvenue dans votre espace financier
          </Text>
        </YStack>
        
        {/* SearchBar + Avatar */}
        <XStack
          gap="$4"
          alignItems="center"
          $sm={{
            width: '100%',  // Mobile: full width
            justifyContent: 'space-between',
          }}
        >
          <SearchBar placeholder="Rechercher..." />
          <Avatar 
            firstName={auth.user?.firstName || 'User'}
            lastName={auth.user?.lastName || ''}
            size={44}
            $sm={{ size: 40 }}  // Mobile: slightly smaller
          />
        </XStack>
      </XStack>
      
      {/* Balance Overview - Solde HTG/USD */}
      <BalanceOverview balanceHTG={125450} balanceUSD={1234.50} />
      
      {/* Metrics Grid - Revenus, Dépenses, Épargne */}
      <MetricsGrid />
      
      {/* Charts Section - 2 colonnes responsive */}
      <XStack
        gap="$5"
        flexWrap="wrap"
        $sm={{
          flexDirection: 'column',  // Mobile: stack vertical
          gap: '$4',
        }}
      >
        {/* Revenue/Expense Chart - 60% width */}
        <YStack
          flex={3}
          minWidth={500}
          $lg={{
            flex: 1,        // Tablet: equal width
            minWidth: 400,
          }}
          $sm={{
            minWidth: '100%',  // Mobile: full width
            flex: 'none',
          }}
        >
          <RevenueExpenseChart />
        </YStack>
        
        {/* Expenses by Category - 40% width */}
        <YStack
          flex={2}
          minWidth={400}
          $lg={{
            flex: 1,
            minWidth: 300,
          }}
          $sm={{
            minWidth: '100%',
            flex: 'none',
          }}
        >
          <ExpensesByCategoryChart />
        </YStack>
      </XStack>
      
      {/* Accounts Grid - Horizontal Scroll */}
      <AccountsGrid />
      
      {/* Sols Chart - Full width */}
      <ActiveSolsChart />
      
      {/* Recent Transactions Table - Full width */}
      <RecentTransactionsTable />
    </YStack>
  )
}

export default DashboardPage