// src/app/hooks.js
import { useDispatch, useSelector } from 'react-redux'

/**
 * 🪝 HOOKS REDUX TYPED - FINAPP HAITI
 * 
 * Hooks pré-configurés pour éviter de réimporter useDispatch/useSelector partout
 * Usage: import { useAppDispatch, useAppSelector } from '@/app/hooks'
 */

// Hook dispatch typé
export const useAppDispatch = () => useDispatch()

// Hook selector typé
export const useAppSelector = useSelector

// Shortcuts pour auth state (les plus utilisés)
export const useAuth = () => useAppSelector((state) => state.auth)
export const useUser = () => useAppSelector((state) => state.auth.user)
export const useIsAuthenticated = () => useAppSelector((state) => state.auth.isAuthenticated)
export const useAuthLoading = () => useAppSelector((state) => state.auth.loading)
export const useAuthError = () => useAppSelector((state) => state.auth.error)

// Shortcuts pour session (pour le timeout modal)
export const useSession = () => useAppSelector((state) => state.auth.session)
export const useTokenExpiringSoon = () => useAppSelector((state) => state.auth.tokenExpiringSoon)