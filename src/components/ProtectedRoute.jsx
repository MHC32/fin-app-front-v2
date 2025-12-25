// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useIsAuthenticated } from '../app/hooks'

/**
 * 🔒 PROTECTED ROUTE - FINAPP HAITI
 * 
 * Composant wrapper pour routes protégées
 * Redirect vers /login si non authentifié
 * Sauvegarde l'URL demandée pour redirect après login
 */

export function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()
  
  if (!isAuthenticated) {
    // Sauvegarder URL demandée pour redirect après login
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

export default ProtectedRoute