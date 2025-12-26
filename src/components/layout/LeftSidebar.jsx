// src/components/layout/LeftSidebar.jsx - VERSION FINALE
import { YStack } from 'tamagui'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import {
  Home,
  CreditCard,
  Receipt,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  PieChart,
} from 'lucide-react'

/**
 * 🎨 LEFT SIDEBAR - FINAPP HAITI
 * 
 * FIXED à gauche, pas de scroll
 * - Position: fixed
 * - Width: 80px
 * - Height: 100vh
 * - Overflow: visible (pas de scroll)
 */

const NAV_ITEMS = [
  { id: 'dashboard', path: '/dashboard', icon: Home, label: 'Dashboard' },
  { id: 'accounts', path: '/accounts', icon: CreditCard, label: 'Comptes' },
  { id: 'transactions', path: '/transactions', icon: Receipt, label: 'Transactions' },
  { id: 'sols', path: '/sols', icon: Users, label: 'Sols' },
  { id: 'analytics', path: '/analytics', icon: PieChart, label: 'Analyses' },
  { id: 'budget', path: '/budget', icon: TrendingUp, label: 'Budget' },
]

export function LeftSidebar({ mobileOpen, onClose }) {
  const { isMobile } = useMediaQuery()
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleNavigate = (path) => {
    navigate(path)
    if (isMobile && onClose) {
      onClose()
    }
  }
  
  return (
    <YStack
      width={isMobile ? 0 : 80}
      height="100vh"
      position={isMobile ? 'fixed' : 'fixed'}
      top={0}
      left={0}
      zIndex={isMobile ? 100 : 10}
      style={{
        background: 'linear-gradient(180deg, #8b5cf6 0%, #6d28d9 50%, #5b21b6 100%)',
        width: isMobile ? '80px' : undefined,
        transform: isMobile ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <YStack
        flex={1}
        paddingVertical="$5"
        gap="$4"
        alignItems="center"
      >
        {/* Logo */}
        <YStack
          width={50}
          height={50}
          backgroundColor="rgba(255, 255, 255, 0.2)"
          borderRadius="$3"
          alignItems="center"
          justifyContent="center"
          marginBottom="$4"
          hoverStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            scale: 1.05,
          }}
          pressStyle={{ scale: 0.95 }}
          cursor="pointer"
        >
          <YStack fontSize={24} fontWeight="900" color="white">
            💰
          </YStack>
        </YStack>
        
        {/* Navigation Items */}
        <YStack gap="$3" flex={1} width="100%" alignItems="center">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <YStack
                key={item.id}
                width={56}
                height={56}
                backgroundColor={isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'}
                borderRadius="$3"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                hoverStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  scale: 1.05,
                }}
                pressStyle={{ scale: 0.95 }}
                animation="quick"
                onPress={() => handleNavigate(item.path)}
                position="relative"
              >
                {/* Active Indicator */}
                {isActive && (
                  <YStack
                    position="absolute"
                    left={-4}
                    width={4}
                    height={32}
                    backgroundColor="white"
                    borderRadius="$2"
                  />
                )}
                
                <Icon
                  size={24}
                  color={isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </YStack>
            )
          })}
        </YStack>
        
        {/* Bottom Actions */}
        <YStack gap="$3" width="100%" alignItems="center">
          {/* Settings */}
          <YStack
            width={56}
            height={56}
            backgroundColor="transparent"
            borderRadius="$3"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            hoverStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              scale: 1.05,
            }}
            pressStyle={{ scale: 0.95 }}
            animation="quick"
          >
            <Settings size={22} color="rgba(255, 255, 255, 0.7)" strokeWidth={2} />
          </YStack>
          
          {/* Logout */}
          <YStack
            width={56}
            height={56}
            backgroundColor="rgba(239, 68, 68, 0.2)"
            borderRadius="$3"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            hoverStyle={{
              backgroundColor: 'rgba(239, 68, 68, 0.3)',
              scale: 1.05,
            }}
            pressStyle={{ scale: 0.95 }}
            animation="quick"
          >
            <LogOut size={22} color="white" strokeWidth={2} />
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  )
}

export default LeftSidebar