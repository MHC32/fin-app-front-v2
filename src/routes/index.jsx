// src/routes/index.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'

// Auth Pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

// Protected Components
import ProtectedRoute from '../components/ProtectedRoute'

// Dashboard
import DashboardPage from '../pages/dashboard/DashboardPage'

/**
 * 🛣️ ROUTES CONFIGURATION - FINAPP HAITI
 * 
 * Structure:
 * - / → Redirect to /dashboard ou /login selon auth
 * - /login, /register → AuthLayout (public)
 * - /dashboard, /accounts, etc. → MainLayout (protected)
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
    ],
  },
  
  // ===================================================================
  // PROTECTED ROUTES (AVEC MAIN LAYOUT 3 COLONNES)
  // ===================================================================
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      // TODO: Ajouter autres pages
      {
        path: 'accounts',
        element: (
          <div style={{ padding: '40px', color: 'white' }}>
            <h1>Comptes (à venir)</h1>
          </div>
        ),
      },
      {
        path: 'transactions',
        element: (
          <div style={{ padding: '40px', color: 'white' }}>
            <h1>Transactions (à venir)</h1>
          </div>
        ),
      },
      {
        path: 'budgets',
        element: (
          <div style={{ padding: '40px', color: 'white' }}>
            <h1>Budgets (à venir)</h1>
          </div>
        ),
      },
      {
        path: 'sols',
        element: (
          <div style={{ padding: '40px', color: 'white' }}>
            <h1>Sols (à venir)</h1>
          </div>
        ),
      },
      {
        path: 'investments',
        element: (
          <div style={{ padding: '40px', color: 'white' }}>
            <h1>Investissements (à venir)</h1>
          </div>
        ),
      },
      {
        path: 'debts',
        element: (
          <div style={{ padding: '40px', color: 'white' }}>
            <h1>Dettes (à venir)</h1>
          </div>
        ),
      },
      {
        path: 'profile',
        element: (
          <div style={{ padding: '40px', color: 'white' }}>
            <h1>Profil (à venir)</h1>
          </div>
        ),
      },
    ],
  },
  
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