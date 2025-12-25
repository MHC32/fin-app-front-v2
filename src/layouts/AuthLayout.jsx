// src/layouts/AuthLayout.jsx
import { Outlet, Navigate } from 'react-router-dom'
import { YStack } from 'tamagui'
import { useIsAuthenticated } from '../app/hooks'

/**
 * 🎨 AUTH LAYOUT - FINAPP HAITI
 * 
 * Layout wrapper pour pages d'authentification:
 * - Login
 * - Register
 * - Forgot Password
 * - Reset Password
 * 
 * Features:
 * - Redirect to dashboard if already authenticated
 * - Full-screen background
 * - Centered content
 */

export function AuthLayout() {
  const isAuthenticated = useIsAuthenticated()
  
  // Si déjà connecté, redirect vers dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      minHeight="100vh"
      position="relative"
    >
      {/* Background Pattern (optionnel) */}
      <YStack
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8b5cf6 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      
      {/* Content */}
      <Outlet />
    </YStack>
  )
}

export default AuthLayout