// src/routes/index.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import AuthLayout from '../layouts/AuthLayout'

// Auth Pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

// Protected Components
import ProtectedRoute from '../components/ProtectedRoute'

// Dashboard (placeholder pour maintenant)
import DashboardPage from '../pages/dashboard/DashboardPage'

/**
 * 🛣️ ROUTES CONFIGURATION - FINAPP HAITI
 * 
 * Structure:
 * - / → Redirect to /dashboard ou /login selon auth
 * - /login → LoginPage (public)
 * - /register → RegisterPage (public)
 * - /dashboard → DashboardPage (protected)
 * - /forgot-password → ForgotPasswordPage (à venir)
 * - /reset-password → ResetPasswordPage (à venir)
 */

export const router = createBrowserRouter([
  // ===================================================================
  // ROOT - REDIRECT SELON AUTH STATUS
  // ===================================================================
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  
  // ===================================================================
  // AUTH ROUTES (PUBLIC)
  // ===================================================================
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      // TODO: Ajouter forgot-password et reset-password
      // {
      //   path: 'forgot-password',
      //   element: <ForgotPasswordPage />,
      // },
      // {
      //   path: 'reset-password',
      //   element: <ResetPasswordPage />,
      // },
    ],
  },
  
  // ===================================================================
  // PROTECTED ROUTES (AUTHENTICATION REQUISE)
  // ===================================================================
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  
  // TODO: Ajouter autres routes protégées
  // {
  //   path: '/accounts',
  //   element: (
  //     <ProtectedRoute>
  //       <AccountsPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/transactions',
  //   element: (
  //     <ProtectedRoute>
  //       <TransactionsPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/budgets',
  //   element: (
  //     <ProtectedRoute>
  //       <BudgetsPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/sols',
  //   element: (
  //     <ProtectedRoute>
  //       <SolsPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/profile',
  //   element: (
  //     <ProtectedRoute>
  //       <ProfilePage />
  //     </ProtectedRoute>
  //   ),
  // },
  
  // ===================================================================
  // 404 NOT FOUND
  // ===================================================================
  {
    path: '*',
    element: (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#1a1625',
        color: 'white',
        fontSize: '24px',
        fontWeight: '700',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ fontSize: '80px' }}>404</div>
        <div>Page non trouvée</div>
        <a 
          href="/dashboard" 
          style={{ 
            color: '#8b5cf6', 
            textDecoration: 'none',
            fontSize: '16px' 
          }}
        >
          Retour au dashboard →
        </a>
      </div>
    ),
  },
])

export default router