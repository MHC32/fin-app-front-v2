// src/hooks/useSessionTimeout.js
import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setTokenExpiringSoon, refreshToken, logoutUser } from '../features/auth/authSlice'

/**
 * ⏰ HOOK SESSION TIMEOUT - FINAPP HAITI
 * 
 * Monitoring expiration token:
 * - Vérifie expiration toutes les 30 secondes
 * - Si < 2 minutes restantes → setTokenExpiringSoon(true) → Modal apparaît
 * - Si timeout sans action → Déconnexion auto
 * 
 * Usage: Appelé dans App.jsx ou layout principal
 */

const WARNING_THRESHOLD = 2 * 60 * 1000 // 2 minutes en ms
const CHECK_INTERVAL = 30 * 1000 // Vérifier toutes les 30 secondes
const LOGOUT_DELAY = 2 * 60 * 1000 // Déconnexion après 2 minutes d'inactivité

export const useSessionTimeout = () => {
  const dispatch = useAppDispatch()
  const { session, isAuthenticated, tokenExpiringSoon } = useAppSelector((state) => state.auth)
  
  const checkIntervalRef = useRef(null)
  const logoutTimeoutRef = useRef(null)
  
  /**
   * Vérifier si le token expire bientôt
   */
  const checkTokenExpiration = useCallback(() => {
    if (!isAuthenticated || !session.expiresAt) {
      return
    }
    
    const now = Date.now()
    const timeRemaining = session.expiresAt - now
    
    // Log pour debug
    if (import.meta.env.DEV) {
      const minutesRemaining = Math.floor(timeRemaining / 1000 / 60)
      const secondsRemaining = Math.floor((timeRemaining / 1000) % 60)
      console.log(`⏰ Session expires in: ${minutesRemaining}m ${secondsRemaining}s`)
    }
    
    // Si < 2 minutes restantes
    if (timeRemaining <= WARNING_THRESHOLD && timeRemaining > 0) {
      if (!tokenExpiringSoon) {
        console.warn('⚠️ Token expire bientôt ! Modal de renouvellement...')
        dispatch(setTokenExpiringSoon(true))
        
        // Démarrer timeout de déconnexion auto (2 minutes)
        logoutTimeoutRef.current = setTimeout(() => {
          console.log('⏰ Session expirée, déconnexion automatique...')
          dispatch(logoutUser())
        }, LOGOUT_DELAY)
      }
    }
    
    // Si déjà expiré
    if (timeRemaining <= 0) {
      console.log('⏰ Session expirée, déconnexion...')
      dispatch(logoutUser())
    }
  }, [isAuthenticated, session.expiresAt, tokenExpiringSoon, dispatch])
  
  /**
   * Renouveler la session (appelé quand user clique "Continuer")
   */
  const renewSession = useCallback(async () => {
    try {
      console.log('🔄 Renouvellement de session...')
      
      // Annuler timeout de déconnexion
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current)
        logoutTimeoutRef.current = null
      }
      
      // Refresh token
      await dispatch(refreshToken()).unwrap()
      
      console.log('✅ Session renouvelée avec succès !')
      
    } catch (error) {
      console.error('❌ Erreur renouvellement session:', error)
      dispatch(logoutUser())
    }
  }, [dispatch])
  
  /**
   * Annuler le renouvellement (appelé quand user clique "Non")
   */
  const cancelRenewal = useCallback(() => {
    console.log('❌ Renouvellement annulé, déconnexion...')
    
    // Annuler timeout si existe
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current)
      logoutTimeoutRef.current = null
    }
    
    // Déconnecter immédiatement
    dispatch(logoutUser())
  }, [dispatch])
  
  /**
   * Setup monitoring
   */
  useEffect(() => {
    if (!isAuthenticated) {
      // Nettoyer si déconnecté
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
        checkIntervalRef.current = null
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current)
        logoutTimeoutRef.current = null
      }
      return
    }
    
    // Vérifier immédiatement
    checkTokenExpiration()
    
    // Vérifier toutes les 30 secondes
    checkIntervalRef.current = setInterval(checkTokenExpiration, CHECK_INTERVAL)
    
    // Cleanup
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current)
      }
    }
  }, [isAuthenticated, checkTokenExpiration])
  
  return {
    tokenExpiringSoon,
    renewSession,
    cancelRenewal,
    timeRemaining: session.expiresAt ? session.expiresAt - Date.now() : 0,
  }
}

export default useSessionTimeout