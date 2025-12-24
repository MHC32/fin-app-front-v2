import { createContext, useContext, useState, useCallback } from 'react'
import { YStack, styled, AnimatePresence } from 'tamagui'
import Toast from './Toast'

/**
 * 🍞 TOAST PROVIDER & CONTEXT
 * 
 * Système de notifications toast global
 * Provider + Context + Hook
 * 
 * @example
 * // Dans App.jsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * 
 * // Dans un composant
 * const toast = useToast()
 * toast.success('Enregistré !')
 * toast.error('Erreur...')
 */

// Toast Context
const ToastContext = createContext(null)

// Container pour les toasts
const ToastContainer = styled(YStack, {
  name: 'ToastContainer',
  position: 'fixed',
  zIndex: '$10',
  gap: '$3',
  padding: '$4',
  pointerEvents: 'none',
  
  variants: {
    position: {
      'top-right': {
        top: 0,
        right: 0,
      },
      'top-left': {
        top: 0,
        left: 0,
      },
      'top-center': {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      },
      'bottom-right': {
        bottom: 0,
        right: 0,
      },
      'bottom-left': {
        bottom: 0,
        left: 0,
      },
      'bottom-center': {
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
  
  defaultVariants: {
    position: 'top-right',
  },
})

export function ToastProvider({ 
  children, 
  position = 'top-right',
  maxToasts = 5,
  defaultDuration = 3000,
}) {
  const [toasts, setToasts] = useState([])

  // Ajouter un toast
  const addToast = useCallback(
    (toast) => {
      const id = Date.now() + Math.random()
      const newToast = {
        id,
        duration: defaultDuration,
        ...toast,
      }

      setToasts((prev) => {
        // Limiter le nombre de toasts
        const updated = [newToast, ...prev]
        return updated.slice(0, maxToasts)
      })

      // Auto-dismiss
      if (newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, newToast.duration)
      }

      return id
    },
    [defaultDuration, maxToasts]
  )

  // Supprimer un toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Helpers pour variants
  const toast = useCallback(
    (message, options = {}) => {
      return addToast({ message, variant: 'info', ...options })
    },
    [addToast]
  )

  const success = useCallback(
    (message, options = {}) => {
      return addToast({ message, variant: 'success', ...options })
    },
    [addToast]
  )

  const error = useCallback(
    (message, options = {}) => {
      return addToast({ message, variant: 'error', ...options })
    },
    [addToast]
  )

  const warning = useCallback(
    (message, options = {}) => {
      return addToast({ message, variant: 'warning', ...options })
    },
    [addToast]
  )

  const info = useCallback(
    (message, options = {}) => {
      return addToast({ message, variant: 'info', ...options })
    },
    [addToast]
  )

  const value = {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    addToast,
    removeToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <ToastContainer position={position}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onDismiss={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  )
}

// Hook pour utiliser les toasts
export function useToast() {
  const context = useContext(ToastContext)
  
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  
  return context
}

export default ToastProvider