// src/components/modals/SessionTimeoutModal.jsx
import { useState, useEffect } from 'react'
import { YStack, XStack, Text, Button, Dialog } from 'tamagui'
import { useSessionTimeout } from '../../hooks/useSessionTimeout'

/**
 * ⏰ MODAL RENOUVELLEMENT SESSION - FINAPP HAITI
 * 
 * S'affiche quand tokenExpiringSoon = true (< 2 minutes)
 * Options:
 * - "Continuer" → Refresh token (nouvelle session 15min)
 * - "Se déconnecter" → Logout immédiat
 * - Countdown affiche temps restant
 * - Si pas de réponse → Logout auto
 */

export function SessionTimeoutModal() {
  const { tokenExpiringSoon, renewSession, cancelRenewal, timeRemaining } = useSessionTimeout()
  
  const [countdown, setCountdown] = useState(120) // 2 minutes en secondes
  const [isRenewing, setIsRenewing] = useState(false)
  
  // Update countdown
  useEffect(() => {
    if (!tokenExpiringSoon) {
      setCountdown(120)
      return
    }
    
    // Calculer secondes restantes
    const secondsRemaining = Math.max(0, Math.floor(timeRemaining / 1000))
    setCountdown(secondsRemaining)
    
    // Update chaque seconde
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [tokenExpiringSoon, timeRemaining])
  
  /**
   * Handler: Continuer la session
   */
  const handleContinue = async () => {
    setIsRenewing(true)
    await renewSession()
    setIsRenewing(false)
  }
  
  /**
   * Handler: Se déconnecter
   */
  const handleLogout = () => {
    cancelRenewal()
  }
  
  // Format countdown (MM:SS)
  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60
  const formattedCountdown = `${minutes}:${seconds.toString().padStart(2, '0')}`
  
  return (
    <Dialog modal open={tokenExpiringSoon}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.7}
          backgroundColor="black"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        
        {/* Content */}
        <Dialog.Content
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          width={500}
          maxWidth="90%"
          backgroundColor="$backgroundStrong"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          padding="$6"
          gap="$5"
        >
          {/* Icon + Titre */}
          <YStack gap="$3" alignItems="center">
            {/* Icon Clock */}
            <YStack
              width={60}
              height={60}
              backgroundColor="$warning"
              borderRadius="$round"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize={32}>⏰</Text>
            </YStack>
            
            <Dialog.Title fontSize={24} fontWeight="700" color="$color" textAlign="center">
              Session sur le point d'expirer
            </Dialog.Title>
          </YStack>
          
          {/* Description */}
          <Dialog.Description fontSize={16} color="$colorMuted" textAlign="center" lineHeight={24}>
            Votre session expire dans{' '}
            <Text fontWeight="700" color="$warning">
              {formattedCountdown}
            </Text>
            . Voulez-vous continuer ?
          </Dialog.Description>
          
          {/* Warning Box */}
          <YStack
            backgroundColor="rgba(245, 158, 11, 0.1)"
            borderWidth={1}
            borderColor="rgba(245, 158, 11, 0.3)"
            borderRadius="$3"
            padding="$4"
          >
            <Text fontSize={14} color="$colorMuted" textAlign="center">
              Si vous ne répondez pas, vous serez automatiquement déconnecté pour des raisons de sécurité.
            </Text>
          </YStack>
          
          {/* Buttons */}
          <XStack gap="$3" justifyContent="center">
            <Button
              flex={1}
              backgroundColor="$backgroundSoft"
              borderWidth={1}
              borderColor="$borderColor"
              color="$colorMuted"
              paddingVertical="$3.5"
              borderRadius="$3"
              fontSize={16}
              fontWeight="600"
              onPress={handleLogout}
              disabled={isRenewing}
              hoverStyle={{
                backgroundColor: '$backgroundHover',
                borderColor: '$error',
              }}
              pressStyle={{
                scale: 0.98,
              }}
            >
              Se déconnecter
            </Button>
            
            <Button
              flex={1}
              backgroundColor="$primary"
              color="white"
              paddingVertical="$3.5"
              borderRadius="$3"
              fontSize={16}
              fontWeight="600"
              onPress={handleContinue}
              disabled={isRenewing}
              hoverStyle={{
                backgroundColor: '$primaryLight',
                scale: 1.02,
              }}
              pressStyle={{
                scale: 0.98,
              }}
            >
              {isRenewing ? 'Renouvellement...' : 'Continuer ma session'}
            </Button>
          </XStack>
          
          {/* Countdown Progress Bar */}
          <YStack gap="$2">
            <XStack
              width="100%"
              height={6}
              backgroundColor="$backgroundSoft"
              borderRadius="$round"
              overflow="hidden"
            >
              <YStack
                width={`${(countdown / 120) * 100}%`}
                height="100%"
                backgroundColor={countdown > 60 ? '$warning' : '$error'}
                animation="quick"
              />
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default SessionTimeoutModal