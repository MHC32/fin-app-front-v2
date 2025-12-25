// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

/**
 * 🏪 REDUX STORE - FINAPP HAITI
 * 
 * Configuration:
 * - Auth slice (user, tokens, session)
 * - DevTools enabled en développement
 * - Middleware par défaut (thunk, serializableCheck)
 */

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Autres slices à ajouter:
    // balance: balanceReducer,
    // transactions: transactionsReducer,
    // accounts: accountsReducer,
    // budgets: budgetsReducer,
    // sols: solsReducer,
    // theme: themeReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer ces actions pour dates non-sérialisables
        ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
        ignoredPaths: ['auth.session.lastActivity', 'auth.session.expiresAt'],
      },
    }),
  
  devTools: process.env.NODE_ENV !== 'production',
})

// Types pour TypeScript (optionnel)
export const getState = store.getState
export const dispatch = store.dispatch