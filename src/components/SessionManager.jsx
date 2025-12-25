// src/components/SessionManager.jsx
import { useEffect } from 'react'
import { useSessionTimeout } from '../hooks/useSessionTimeout'
import SessionTimeoutModal from './modals/SessionTimeoutModal'
import { useAppSelector } from '../app/hooks'

/**
 * 🔐 SESSION MANAGER - FINAPP HAITI
 * 
 * Composant wrapper qui:
 * 1. Active le monitoring de session (useSessionTimeout)
 * 2. Affiche le modal de renouvellement si besoin
 * 
 * À inclure dans App.jsx pour monitoring global
 */

export function SessionManager({ children }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  
  // Active monitoring (le hook fait tout le travail)
  useSessionTimeout()
  
  useEffect(() => {
    if (isAuthenticated) {
      console.log('✅ Session monitoring activé')
    } else {
      console.log('⏸️ Session monitoring désactivé (pas connecté)')
    }
  }, [isAuthenticated])
  
  return (
    <>
      {children}
      
      {/* Modal de renouvellement (s'affiche auto si tokenExpiringSoon) */}
      {isAuthenticated && <SessionTimeoutModal />}
    </>
  )
}

export default SessionManager