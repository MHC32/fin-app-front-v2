// src/lib/api.js
import axios from 'axios'

/**
 * 🌐 API CLIENT - FINAPP HAITI
 * 
 * Configuration Axios:
 * - Base URL: http://localhost:3001/api
 * - Auto-ajout token dans headers
 * - Auto-refresh token si 401
 * - Retry logic
 * - Error handling centralisé
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// ===================================================================
// INSTANCE AXIOS PRINCIPALE
// ===================================================================

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 secondes
})

// ===================================================================
// REQUEST INTERCEPTOR (Ajouter token)
// ===================================================================

api.interceptors.request.use(
  (config) => {
    // Récupérer token depuis localStorage
    const token = localStorage.getItem('accessToken')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log en développement
    if (import.meta.env.DEV) {
      console.log('📤 API Request:', config.method?.toUpperCase(), config.url)
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// ===================================================================
// RESPONSE INTERCEPTOR (Gérer erreurs + auto-refresh)
// ===================================================================

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

api.interceptors.response.use(
  (response) => {
    // Log en développement
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', response.config.url, response.status)
    }
    
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Si 401 (Unauthorized) et pas déjà retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Si c'est déjà la route refresh qui fail, logout direct
      if (originalRequest.url?.includes('/auth/refresh')) {
        console.log('🚪 Refresh token expiré, déconnexion...')
        handleLogout()
        return Promise.reject(error)
      }
      
      // Si déjà en train de refresh, mettre en queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }
      
      originalRequest._retry = true
      isRefreshing = true
      
      try {
        // Tenter refresh token
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (!refreshToken) {
          throw new Error('No refresh token')
        }
        
        console.log('🔄 Refresh token en cours...')
        
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        })
        
        // Sauvegarder nouveaux tokens
        const newAccessToken = data.data.tokens.accessToken
        localStorage.setItem('accessToken', newAccessToken)
        
        // Mettre à jour header
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        
        // Processer queue
        processQueue(null, newAccessToken)
        
        console.log('✅ Token refreshed avec succès')
        
        // Retry requête originale
        return api(originalRequest)
        
      } catch (refreshError) {
        console.error('❌ Refresh token failed:', refreshError)
        processQueue(refreshError, null)
        handleLogout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    
    // Autres erreurs
    console.error('❌ API Error:', error.response?.status, error.config?.url)
    
    return Promise.reject(error)
  }
)

// ===================================================================
// HELPER: LOGOUT
// ===================================================================

const handleLogout = () => {
  // Nettoyer localStorage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
  
  // Rediriger vers login
  window.location.href = '/login'
}

// ===================================================================
// SERVICES API
// ===================================================================

export const authService = {
  // Login
  login: (identifier, password, rememberMe = false) =>
    api.post('/auth/login', { identifier, password, rememberMe }),
  
  // Register
  register: (userData) =>
    api.post('/auth/register', userData),
  
  // Refresh token
  refresh: (refreshToken) =>
    api.post('/auth/refresh', { refreshToken }),
  
  // Logout
  logout: () =>
    api.post('/auth/logout'),
  
  // Logout all sessions
  logoutAll: () =>
    api.post('/auth/logout-all'),
  
  // Get current user
  me: () =>
    api.get('/auth/me'),
  
  // Verify token
  verifyToken: () =>
    api.get('/auth/verify-token'),
  
  // Change password
  changePassword: (currentPassword, newPassword, confirmPassword) =>
    api.post('/auth/change-password', { currentPassword, newPassword, confirmPassword }),
  
  // Forgot password
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (resetToken, newPassword, confirmPassword) =>
    api.post('/auth/reset-password', { resetToken, newPassword, confirmPassword }),
}

export const userService = {
  // Get profile
  getProfile: () =>
    api.get('/users/profile'),
  
  // Update profile
  updateProfile: (profileData) =>
    api.put('/users/profile', profileData),
  
  // Update notification preferences
  updateNotificationPreferences: (preferences) =>
    api.put('/users/notification-preferences', preferences),
  
  // Delete account
  deleteAccount: (confirmDelete, reason) =>
    api.delete('/users/profile', { data: { confirmDelete, reason } }),
}

// Services à ajouter plus tard:
// export const accountsService = { ... }
// export const transactionsService = { ... }
// export const budgetsService = { ... }
// export const solsService = { ... }

export default api