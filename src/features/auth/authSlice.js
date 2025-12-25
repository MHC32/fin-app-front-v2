// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../lib/api'

/**
 * 🔐 AUTH SLICE - FINAPP HAITI
 * 
 * Gestion complète authentification:
 * - Login / Register / Logout
 * - Token management (access + refresh)
 * - Session tracking (15min expiration)
 * - Token expiration detection (pour modal)
 * - Auto-refresh avant expiration
 */

// ===================================================================
// ÉTAT INITIAL
// ===================================================================

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
  
  // Session tracking
  session: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    sessionId: null,
    deviceId: null,
    expiresAt: null, // Timestamp expiration
    lastActivity: null,
  },
  
  // Token expiration warning (pour modal)
  tokenExpiringSoon: false, // true si < 2 minutes avant expiration
  
  // Login/register tracking
  lastLoginAt: null,
}

// ===================================================================
// ASYNC THUNKS
// ===================================================================

/**
 * Login utilisateur
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ identifier, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await authService.login(identifier, password, rememberMe)
      
      // Sauvegarder tokens et user
      const { user, tokens, session } = response.data.data
      
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Calculer expiration (15 minutes = 900000ms)
      const expiresAt = Date.now() + 15 * 60 * 1000
      
      return {
        user,
        tokens,
        session,
        expiresAt,
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur de connexion'
      return rejectWithValue(message)
    }
  }
)

/**
 * Register nouvel utilisateur
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      
      // Sauvegarder tokens et user
      const { user, tokens, session } = response.data.data
      
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Calculer expiration
      const expiresAt = Date.now() + 15 * 60 * 1000
      
      return {
        user,
        tokens,
        session,
        expiresAt,
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur d\'inscription'
      return rejectWithValue(message)
    }
  }
)

/**
 * Refresh token (renouveler session)
 */
export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { session } = getState().auth
      const refreshTokenValue = session.refreshToken || localStorage.getItem('refreshToken')
      
      if (!refreshTokenValue) {
        throw new Error('No refresh token available')
      }
      
      const response = await authService.refresh(refreshTokenValue)
      
      // Mettre à jour tokens
      const { tokens, session: newSession } = response.data.data
      
      localStorage.setItem('accessToken', tokens.accessToken)
      
      // Calculer nouvelle expiration (15 minutes)
      const expiresAt = Date.now() + 15 * 60 * 1000
      
      return {
        tokens,
        session: newSession,
        expiresAt,
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur de renouvellement'
      return rejectWithValue(message)
    }
  }
)

/**
 * Logout utilisateur (session courante)
 */
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
      
      // Nettoyer localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      
      return true
    } catch (error) {
      // Même si erreur API, on déconnecte localement
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      
      return true
    }
  }
)

/**
 * Logout toutes sessions
 */
export const logoutAllSessions = createAsyncThunk(
  'auth/logoutAll',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logoutAll()
      
      // Nettoyer localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      
      return true
    } catch (error) {
      // Même si erreur API, on déconnecte localement
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      
      return true
    }
  }
)

/**
 * Vérifier token actuel
 */
export const verifyToken = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.verifyToken()
      
      return {
        valid: response.data.data.valid,
        tokenExpiringSoon: response.data.data.tokenExpiringSoon || false,
      }
    } catch (error) {
      return rejectWithValue('Token invalide')
    }
  }
)

// ===================================================================
// SLICE
// ===================================================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset error
    clearError: (state) => {
      state.error = null
    },
    
    // Mettre à jour tokenExpiringSoon (appelé par useSessionTimeout)
    setTokenExpiringSoon: (state, action) => {
      state.tokenExpiringSoon = action.payload
    },
    
    // Mettre à jour dernière activité
    updateLastActivity: (state) => {
      state.session.lastActivity = Date.now()
    },
    
    // Reset auth state (force logout)
    resetAuth: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.session = {
        accessToken: null,
        refreshToken: null,
        sessionId: null,
        deviceId: null,
        expiresAt: null,
        lastActivity: null,
      }
      state.tokenExpiringSoon = false
      state.error = null
      
      // Nettoyer localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },
  },
  
  extraReducers: (builder) => {
    // ===================================================================
    // LOGIN
    // ===================================================================
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.session = {
          accessToken: action.payload.tokens.accessToken,
          refreshToken: action.payload.tokens.refreshToken,
          sessionId: action.payload.session.sessionId,
          deviceId: action.payload.session.deviceId,
          expiresAt: action.payload.expiresAt,
          lastActivity: Date.now(),
        }
        state.lastLoginAt = Date.now()
        state.tokenExpiringSoon = false
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.user = null
      })
    
    // ===================================================================
    // REGISTER
    // ===================================================================
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.session = {
          accessToken: action.payload.tokens.accessToken,
          refreshToken: action.payload.tokens.refreshToken,
          sessionId: action.payload.session.sessionId,
          deviceId: action.payload.session.deviceId,
          expiresAt: action.payload.expiresAt,
          lastActivity: Date.now(),
        }
        state.lastLoginAt = Date.now()
        state.tokenExpiringSoon = false
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // ===================================================================
    // REFRESH TOKEN
    // ===================================================================
      .addCase(refreshToken.pending, (state) => {
        state.loading = true
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false
        state.session = {
          ...state.session,
          accessToken: action.payload.tokens.accessToken,
          expiresAt: action.payload.expiresAt,
          lastActivity: Date.now(),
        }
        state.tokenExpiringSoon = false
        state.error = null
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        // Si refresh fail, déconnecter
        state.user = null
        state.isAuthenticated = false
        state.session = {
          accessToken: null,
          refreshToken: null,
          sessionId: null,
          deviceId: null,
          expiresAt: null,
          lastActivity: null,
        }
      })
    
    // ===================================================================
    // LOGOUT
    // ===================================================================
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.session = {
          accessToken: null,
          refreshToken: null,
          sessionId: null,
          deviceId: null,
          expiresAt: null,
          lastActivity: null,
        }
        state.tokenExpiringSoon = false
        state.loading = false
        state.error = null
      })
    
    // ===================================================================
    // LOGOUT ALL
    // ===================================================================
      .addCase(logoutAllSessions.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.session = {
          accessToken: null,
          refreshToken: null,
          sessionId: null,
          deviceId: null,
          expiresAt: null,
          lastActivity: null,
        }
        state.tokenExpiringSoon = false
        state.loading = false
        state.error = null
      })
    
    // ===================================================================
    // VERIFY TOKEN
    // ===================================================================
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.tokenExpiringSoon = action.payload.tokenExpiringSoon
      })
      .addCase(verifyToken.rejected, (state) => {
        // Token invalide, déconnecter
        state.user = null
        state.isAuthenticated = false
        state.session = {
          accessToken: null,
          refreshToken: null,
          sessionId: null,
          deviceId: null,
          expiresAt: null,
          lastActivity: null,
        }
      })
  },
})

// ===================================================================
// EXPORTS
// ===================================================================

export const {
  clearError,
  setTokenExpiringSoon,
  updateLastActivity,
  resetAuth,
} = authSlice.actions

export default authSlice.reducer

// Selectors
export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error
export const selectSession = (state) => state.auth.session
export const selectTokenExpiringSoon = (state) => state.auth.tokenExpiringSoon