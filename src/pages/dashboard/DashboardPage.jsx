// src/pages/dashboard/DashboardPage.jsx
import { YStack, XStack, Text, Button, Card } from 'tamagui'
import { useAppDispatch, useAuth } from '../../app/hooks'
import { logoutUser } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

/**
 * 📊 DASHBOARD PAGE - FINAPP HAITI
 * 
 * Page principale après login
 * TODO: Implémenter layout 3 colonnes + composants dashboard
 */

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }
  
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      padding="$6"
      gap="$6"
    >
      {/* Header temporaire */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="$6"
        paddingVertical="$4"
        backgroundColor="$backgroundStrong"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <YStack gap="$1">
          <Text fontSize={28} fontWeight="700" color="$color">
            Bienvenue {auth.user?.firstName || 'Utilisateur'} ! 👋
          </Text>
          <Text fontSize={14} color="$colorMuted">
            Dashboard FinApp Haiti 🇭🇹
          </Text>
        </YStack>
        
        <Button
          backgroundColor="$error"
          color="white"
          paddingHorizontal="$5"
          paddingVertical="$2.5"
          borderRadius="$3"
          fontSize={14}
          fontWeight="600"
          onPress={handleLogout}
          hoverStyle={{
            backgroundColor: '$errorLight',
          }}
          pressStyle={{
            scale: 0.98,
          }}
        >
          Déconnexion
        </Button>
      </XStack>
      
      {/* Content Grid */}
      <YStack gap="$5">
        {/* Info Card */}
        <Card
          backgroundColor="$glass"
          borderWidth={1}
          borderColor="$glassBorder"
          borderRadius="$4"
          padding="$6"
          gap="$4"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <Text fontSize={20} fontWeight="700" color="$color">
            🎉 Étape 4 Complétée !
          </Text>
          
          <YStack gap="$3">
            <InfoRow label="Authentification" status="✅ Fonctionnel" color="$success" />
            <InfoRow label="Session Management" status="✅ Actif (15min)" color="$success" />
            <InfoRow label="Login/Register Pages" status="✅ Créées" color="$success" />
            <InfoRow label="Protected Routes" status="✅ Configurées" color="$success" />
            <InfoRow label="Layout 3 colonnes" status="⏳ Prochaine étape" color="$warning" />
          </YStack>
        </Card>
        
        {/* Session Info */}
        <Card
          backgroundColor="$backgroundStrong"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$4"
          padding="$5"
          gap="$4"
        >
          <Text fontSize={18} fontWeight="700" color="$color">
            📊 Informations Session
          </Text>
          
          <YStack gap="$3">
            <InfoRow label="Email" value={auth.user?.email} />
            <InfoRow label="Nom complet" value={`${auth.user?.firstName} ${auth.user?.lastName}`} />
            <InfoRow label="Région" value={auth.user?.region} />
            <InfoRow label="Ville" value={auth.user?.city} />
            <InfoRow label="Session ID" value={auth.session?.sessionId?.slice(0, 8) + '...'} />
            <InfoRow 
              label="Status" 
              value={
                <Text 
                  color={auth.tokenExpiringSoon ? '$warning' : '$success'}
                  fontWeight="600"
                >
                  {auth.tokenExpiringSoon ? '⚠️ Expire bientôt' : '✅ Active'}
                </Text>
              }
            />
          </YStack>
        </Card>
        
        {/* Next Steps */}
        <Card
          backgroundColor="rgba(139, 92, 246, 0.1)"
          borderWidth={1}
          borderColor="rgba(139, 92, 246, 0.3)"
          padding="$5"
          borderRadius="$3"
        >
          <Text fontSize={16} fontWeight="700" color="$primary" marginBottom="$3">
            🚀 Prochaines Étapes
          </Text>
          <YStack gap="$2">
            <Text color="$color" fontSize={14}>• Étape 5: Layout 3 colonnes (sidebar + content + widgets)</Text>
            <Text color="$color" fontSize={14}>• Étape 6: Composants Dashboard (cartes, graphiques)</Text>
            <Text color="$color" fontSize={14}>• Étape 7: Pages principales (Comptes, Transactions, Budgets)</Text>
            <Text color="$color" fontSize={14}>• Étape 8: Features avancées (Sols, IA, Notifications)</Text>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  )
}

/**
 * Helper component: Info Row
 */
function InfoRow({ label, value, status, color }) {
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <Text color="$colorMuted" fontSize={14}>
        {label}:
      </Text>
      {status ? (
        <Text color={color} fontSize={14} fontWeight="600">
          {status}
        </Text>
      ) : typeof value === 'string' ? (
        <Text color="$color" fontSize={14} fontWeight="600">
          {value}
        </Text>
      ) : (
        value
      )}
    </XStack>
  )
}

export default DashboardPage