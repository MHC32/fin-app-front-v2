// src/pages/auth/LoginPage.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { YStack, XStack, Text, Button, Input, Card, Checkbox } from 'tamagui'
import { useAppDispatch, useAuthLoading, useAuthError } from '../../app/hooks'
import { loginUser, clearError } from '../../features/auth/authSlice'

/**
 * 🔐 LOGIN PAGE - FINAPP HAITI
 * 
 * Design wireframe:
 * - Glass card centered
 * - Purple/Pink gradient accents
 * - Form validation
 * - Remember me checkbox
 * - Error messages
 * - Links to register/forgot password
 */

export function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loading = useAuthLoading()
  const error = useAuthError()
  
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  })
  
  const [formErrors, setFormErrors] = useState({})
  
  /**
   * Handler: Input change
   */
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }))
    }
    
    // Clear global error
    if (error) {
      dispatch(clearError())
    }
  }
  
  /**
   * Validation du formulaire
   */
  const validateForm = () => {
    const errors = {}
    
    if (!formData.identifier.trim()) {
      errors.identifier = 'Email ou téléphone requis'
    }
    
    if (!formData.password) {
      errors.password = 'Mot de passe requis'
    } else if (formData.password.length < 8) {
      errors.password = 'Mot de passe trop court'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  /**
   * Handler: Submit login
   */
  const handleSubmit = async (e) => {
    e?.preventDefault()
    
    // Validation
    if (!validateForm()) {
      return
    }
    
    try {
      await dispatch(loginUser(formData)).unwrap()
      
      // Success → Redirect to dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error('Login failed:', err)
      // Error already in Redux state
    }
  }
  
  /**
   * Handler: Enter key
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      alignItems="center"
      justifyContent="center"
      padding="$6"
    >
      {/* Glass Card */}
      <Card
        width={480}
        maxWidth="95%"
        backgroundColor="$glass"
        borderWidth={1}
        borderColor="$glassBorder"
        borderRadius="$5"
        padding="$8"
        gap="$6"
        animation="quick"
        enterStyle={{
          opacity: 0,
          y: -20,
          scale: 0.9,
        }}
        style={{
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <YStack gap="$3" alignItems="center">
          {/* Logo/Icon */}
          <YStack
            width={80}
            height={80}
            backgroundColor="$primary"
            borderRadius="$round"
            alignItems="center"
            justifyContent="center"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            }}
          >
            <Text fontSize={40} fontWeight="700" color="white">
              F
            </Text>
          </YStack>
          
          <YStack gap="$2" alignItems="center">
            <Text fontSize={32} fontWeight="700" color="$color">
              Connexion
            </Text>
            <Text fontSize={16} color="$colorMuted" textAlign="center">
              Bienvenue sur FinApp Haiti 🇭🇹
            </Text>
          </YStack>
        </YStack>
        
        {/* Form */}
        <YStack gap="$5">
          {/* Email/Phone Input */}
          <YStack gap="$2">
            <Text color="$color" fontSize={14} fontWeight="600">
              Email ou Téléphone
            </Text>
            <Input
              placeholder="example@email.com ou +50932123456"
              value={formData.identifier}
              onChangeText={(val) => handleChange('identifier', val)}
              onKeyPress={handleKeyPress}
              backgroundColor="$backgroundSoft"
              borderWidth={1}
              borderColor={formErrors.identifier ? '$error' : '$borderColor'}
              focusStyle={{
                borderColor: '$primary',
              }}
              color="$color"
              placeholderTextColor="$colorFaded"
              paddingVertical="$3.5"
              paddingHorizontal="$4"
              borderRadius="$3"
              fontSize={16}
              disabled={loading}
            />
            {formErrors.identifier && (
              <Text color="$error" fontSize={12}>
                {formErrors.identifier}
              </Text>
            )}
          </YStack>
          
          {/* Password Input */}
          <YStack gap="$2">
            <XStack justifyContent="space-between" alignItems="center">
              <Text color="$color" fontSize={14} fontWeight="600">
                Mot de passe
              </Text>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                <Text color="$primary" fontSize={12} fontWeight="600">
                  Mot de passe oublié ?
                </Text>
              </Link>
            </XStack>
            <Input
              placeholder="••••••••"
              value={formData.password}
              onChangeText={(val) => handleChange('password', val)}
              onKeyPress={handleKeyPress}
              secureTextEntry
              backgroundColor="$backgroundSoft"
              borderWidth={1}
              borderColor={formErrors.password ? '$error' : '$borderColor'}
              focusStyle={{
                borderColor: '$primary',
              }}
              color="$color"
              placeholderTextColor="$colorFaded"
              paddingVertical="$3.5"
              paddingHorizontal="$4"
              borderRadius="$3"
              fontSize={16}
              disabled={loading}
            />
            {formErrors.password && (
              <Text color="$error" fontSize={12}>
                {formErrors.password}
              </Text>
            )}
          </YStack>
          
          {/* Remember Me */}
          <XStack gap="$3" alignItems="center">
            <Checkbox
              checked={formData.rememberMe}
              onCheckedChange={(checked) => handleChange('rememberMe', checked)}
              size="$5"
              disabled={loading}
            >
              <Checkbox.Indicator>
                <Text>✓</Text>
              </Checkbox.Indicator>
            </Checkbox>
            <Text color="$colorMuted" fontSize={14}>
              Se souvenir de moi (7 jours)
            </Text>
          </XStack>
          
          {/* Global Error */}
          {error && (
            <Card
              backgroundColor="rgba(239, 68, 68, 0.1)"
              borderWidth={1}
              borderColor="rgba(239, 68, 68, 0.3)"
              padding="$3"
              borderRadius="$3"
            >
              <Text color="$error" fontSize={14} textAlign="center">
                {error}
              </Text>
            </Card>
          )}
          
          {/* Submit Button */}
          <Button
            backgroundColor="$primary"
            color="white"
            paddingVertical="$4"
            borderRadius="$3"
            fontSize={16}
            fontWeight="600"
            onPress={handleSubmit}
            disabled={loading}
            opacity={loading ? 0.6 : 1}
            hoverStyle={{
              backgroundColor: '$primaryLight',
              scale: 1.02,
            }}
            pressStyle={{
              scale: 0.98,
            }}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </YStack>
        
        {/* Footer */}
        <YStack gap="$3">
          {/* Divider */}
          <XStack alignItems="center" gap="$3">
            <YStack flex={1} height={1} backgroundColor="$borderColor" />
            <Text color="$colorMuted" fontSize={12}>
              OU
            </Text>
            <YStack flex={1} height={1} backgroundColor="$borderColor" />
          </XStack>
          
          {/* Register Link */}
          <XStack justifyContent="center" gap="$2">
            <Text color="$colorMuted" fontSize={14}>
              Pas encore de compte ?
            </Text>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Text color="$primary" fontSize={14} fontWeight="600">
                S'inscrire
              </Text>
            </Link>
          </XStack>
        </YStack>
      </Card>
      
      {/* Footer Info */}
      <YStack marginTop="$6" alignItems="center" gap="$2">
        <Text color="$colorFaded" fontSize={12} textAlign="center">
          FinApp Haiti - Gestion financière adaptée au contexte haïtien
        </Text>
        <XStack gap="$4">
          <Text color="$colorFaded" fontSize={11}>
            Aide
          </Text>
          <Text color="$colorFaded" fontSize={11}>
            •
          </Text>
          <Text color="$colorFaded" fontSize={11}>
            Confidentialité
          </Text>
          <Text color="$colorFaded" fontSize={11}>
            •
          </Text>
          <Text color="$colorFaded" fontSize={11}>
            Conditions
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}

export default LoginPage