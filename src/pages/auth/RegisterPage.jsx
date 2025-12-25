// src/pages/auth/RegisterPage.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { YStack, XStack, Text, Button, Input, Card, Checkbox, Select } from 'tamagui'
import { useAppDispatch, useAuthLoading, useAuthError } from '../../app/hooks'
import { registerUser, clearError } from '../../features/auth/authSlice'

/**
 * 📝 REGISTER PAGE - FINAPP HAITI
 * 
 * Formulaire d'inscription complet:
 * - Informations personnelles
 * - Email + Password avec validation
 * - Téléphone (optionnel)
 * - Région + Ville (Haiti)
 * - Acceptation conditions
 * - Validation côté client
 */

// Régions d'Haïti
const HAITI_REGIONS = [
  { value: 'ouest', label: 'Ouest' },
  { value: 'nord', label: 'Nord' },
  { value: 'sud', label: 'Sud' },
  { value: 'artibonite', label: 'Artibonite' },
  { value: 'centre', label: 'Centre' },
  { value: 'nord-est', label: 'Nord-Est' },
  { value: 'nord-ouest', label: 'Nord-Ouest' },
  { value: 'sud-est', label: 'Sud-Est' },
  { value: 'grande-anse', label: 'Grand\'Anse' },
  { value: 'nippes', label: 'Nippes' },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loading = useAuthLoading()
  const error = useAuthError()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    region: 'ouest',
    city: '',
    agreeToTerms: false,
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  
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
    
    // First Name
    if (!formData.firstName.trim()) {
      errors.firstName = 'Le prénom est requis'
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'Le prénom doit contenir au moins 2 caractères'
    }
    
    // Last Name
    if (!formData.lastName.trim()) {
      errors.lastName = 'Le nom est requis'
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Le nom doit contenir au moins 2 caractères'
    }
    
    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Format d\'email invalide'
    }
    
    // Password
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      errors.password = '1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial requis'
    }
    
    // Confirm Password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmez le mot de passe'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }
    
    // Phone (optionnel mais validation si rempli)
    if (formData.phone && !/^(\+509)?[0-9]{8}$/.test(formData.phone)) {
      errors.phone = 'Format téléphone haïtien invalide (ex: +50932123456)'
    }
    
    // City
    if (!formData.city.trim()) {
      errors.city = 'La ville est requise'
    }
    
    // Terms
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'Vous devez accepter les conditions d\'utilisation'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  /**
   * Handler: Submit register
   */
  const handleSubmit = async (e) => {
    e?.preventDefault()
    
    // Validation
    if (!validateForm()) {
      return
    }
    
    // Préparer données pour l'API
    const registerData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      phone: formData.phone.trim() || undefined,
      region: formData.region,
      city: formData.city.trim(),
      agreeToTerms: formData.agreeToTerms,
    }
    
    try {
      await dispatch(registerUser(registerData)).unwrap()
      
      // Success → Redirect to dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error('Register failed:', err)
      // Error already in Redux state
    }
  }
  
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      alignItems="center"
      justifyContent="center"
      padding="$6"
      paddingVertical="$10"
    >
      {/* Glass Card */}
      <Card
        width={560}
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
            width={70}
            height={70}
            backgroundColor="$primary"
            borderRadius="$round"
            alignItems="center"
            justifyContent="center"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            }}
          >
            <Text fontSize={36} fontWeight="700" color="white">
              F
            </Text>
          </YStack>
          
          <YStack gap="$2" alignItems="center">
            <Text fontSize={28} fontWeight="700" color="$color">
              Créer un compte
            </Text>
            <Text fontSize={14} color="$colorMuted" textAlign="center">
              Rejoignez FinApp Haiti 🇭🇹
            </Text>
          </YStack>
        </YStack>
        
        {/* Form */}
        <YStack gap="$4">
          {/* First Name + Last Name (Row) */}
          <XStack gap="$3">
            <YStack flex={1} gap="$2">
              <Text color="$color" fontSize={13} fontWeight="600">
                Prénom *
              </Text>
              <Input
                placeholder="Jean"
                value={formData.firstName}
                onChangeText={(val) => handleChange('firstName', val)}
                backgroundColor="$backgroundSoft"
                borderWidth={1}
                borderColor={formErrors.firstName ? '$error' : '$borderColor'}
                focusStyle={{ borderColor: '$primary' }}
                color="$color"
                paddingVertical="$3"
                paddingHorizontal="$3.5"
                borderRadius="$3"
                fontSize={15}
                disabled={loading}
              />
              {formErrors.firstName && (
                <Text color="$error" fontSize={11}>
                  {formErrors.firstName}
                </Text>
              )}
            </YStack>
            
            <YStack flex={1} gap="$2">
              <Text color="$color" fontSize={13} fontWeight="600">
                Nom *
              </Text>
              <Input
                placeholder="Baptiste"
                value={formData.lastName}
                onChangeText={(val) => handleChange('lastName', val)}
                backgroundColor="$backgroundSoft"
                borderWidth={1}
                borderColor={formErrors.lastName ? '$error' : '$borderColor'}
                focusStyle={{ borderColor: '$primary' }}
                color="$color"
                paddingVertical="$3"
                paddingHorizontal="$3.5"
                borderRadius="$3"
                fontSize={15}
                disabled={loading}
              />
              {formErrors.lastName && (
                <Text color="$error" fontSize={11}>
                  {formErrors.lastName}
                </Text>
              )}
            </YStack>
          </XStack>
          
          {/* Email */}
          <YStack gap="$2">
            <Text color="$color" fontSize={13} fontWeight="600">
              Email *
            </Text>
            <Input
              placeholder="jean.baptiste@example.com"
              value={formData.email}
              onChangeText={(val) => handleChange('email', val)}
              keyboardType="email-address"
              autoCapitalize="none"
              backgroundColor="$backgroundSoft"
              borderWidth={1}
              borderColor={formErrors.email ? '$error' : '$borderColor'}
              focusStyle={{ borderColor: '$primary' }}
              color="$color"
              paddingVertical="$3"
              paddingHorizontal="$3.5"
              borderRadius="$3"
              fontSize={15}
              disabled={loading}
            />
            {formErrors.email && (
              <Text color="$error" fontSize={11}>
                {formErrors.email}
              </Text>
            )}
          </YStack>
          
          {/* Phone (Optionnel) */}
          <YStack gap="$2">
            <Text color="$color" fontSize={13} fontWeight="600">
              Téléphone (optionnel)
            </Text>
            <Input
              placeholder="+50932123456"
              value={formData.phone}
              onChangeText={(val) => handleChange('phone', val)}
              keyboardType="phone-pad"
              backgroundColor="$backgroundSoft"
              borderWidth={1}
              borderColor={formErrors.phone ? '$error' : '$borderColor'}
              focusStyle={{ borderColor: '$primary' }}
              color="$color"
              paddingVertical="$3"
              paddingHorizontal="$3.5"
              borderRadius="$3"
              fontSize={15}
              disabled={loading}
            />
            {formErrors.phone && (
              <Text color="$error" fontSize={11}>
                {formErrors.phone}
              </Text>
            )}
          </YStack>
          
          {/* Password + Confirm (Row) */}
          <XStack gap="$3">
            <YStack flex={1} gap="$2">
              <Text color="$color" fontSize={13} fontWeight="600">
                Mot de passe *
              </Text>
              <Input
                placeholder="••••••••"
                value={formData.password}
                onChangeText={(val) => handleChange('password', val)}
                secureTextEntry={!showPassword}
                backgroundColor="$backgroundSoft"
                borderWidth={1}
                borderColor={formErrors.password ? '$error' : '$borderColor'}
                focusStyle={{ borderColor: '$primary' }}
                color="$color"
                paddingVertical="$3"
                paddingHorizontal="$3.5"
                borderRadius="$3"
                fontSize={15}
                disabled={loading}
              />
              {formErrors.password && (
                <Text color="$error" fontSize={10} lineHeight={12}>
                  {formErrors.password}
                </Text>
              )}
            </YStack>
            
            <YStack flex={1} gap="$2">
              <Text color="$color" fontSize={13} fontWeight="600">
                Confirmer *
              </Text>
              <Input
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChangeText={(val) => handleChange('confirmPassword', val)}
                secureTextEntry={!showPassword}
                backgroundColor="$backgroundSoft"
                borderWidth={1}
                borderColor={formErrors.confirmPassword ? '$error' : '$borderColor'}
                focusStyle={{ borderColor: '$primary' }}
                color="$color"
                paddingVertical="$3"
                paddingHorizontal="$3.5"
                borderRadius="$3"
                fontSize={15}
                disabled={loading}
              />
              {formErrors.confirmPassword && (
                <Text color="$error" fontSize={10}>
                  {formErrors.confirmPassword}
                </Text>
              )}
            </YStack>
          </XStack>
          
          {/* Show Password Toggle */}
          <XStack gap="$3" alignItems="center" marginTop="$-2">
            <Checkbox
              checked={showPassword}
              onCheckedChange={setShowPassword}
              size="$4"
              disabled={loading}
            >
              <Checkbox.Indicator>
                <Text fontSize={10}>✓</Text>
              </Checkbox.Indicator>
            </Checkbox>
            <Text color="$colorMuted" fontSize={12}>
              Afficher les mots de passe
            </Text>
          </XStack>
          
          {/* Region + City (Row) */}
          <XStack gap="$3">
            <YStack flex={1} gap="$2">
              <Text color="$color" fontSize={13} fontWeight="600">
                Région *
              </Text>
              <Select
                value={formData.region}
                onValueChange={(val) => handleChange('region', val)}
                disabled={loading}
              >
                <Select.Trigger
                  backgroundColor="$backgroundSoft"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$3"
                  paddingVertical="$3"
                  paddingHorizontal="$3.5"
                >
                  <Select.Value placeholder="Sélectionner..." />
                </Select.Trigger>
                
                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    {HAITI_REGIONS.map((region) => (
                      <Select.Item key={region.value} value={region.value}>
                        <Select.ItemText>{region.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select>
            </YStack>
            
            <YStack flex={1} gap="$2">
              <Text color="$color" fontSize={13} fontWeight="600">
                Ville *
              </Text>
              <Input
                placeholder="Port-au-Prince"
                value={formData.city}
                onChangeText={(val) => handleChange('city', val)}
                backgroundColor="$backgroundSoft"
                borderWidth={1}
                borderColor={formErrors.city ? '$error' : '$borderColor'}
                focusStyle={{ borderColor: '$primary' }}
                color="$color"
                paddingVertical="$3"
                paddingHorizontal="$3.5"
                borderRadius="$3"
                fontSize={15}
                disabled={loading}
              />
              {formErrors.city && (
                <Text color="$error" fontSize={11}>
                  {formErrors.city}
                </Text>
              )}
            </YStack>
          </XStack>
          
          {/* Terms Checkbox */}
          <XStack gap="$3" alignItems="flex-start">
            <Checkbox
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleChange('agreeToTerms', checked)}
              size="$5"
              disabled={loading}
              marginTop="$1"
            >
              <Checkbox.Indicator>
                <Text>✓</Text>
              </Checkbox.Indicator>
            </Checkbox>
            <YStack flex={1}>
              <Text color="$colorMuted" fontSize={13} lineHeight={18}>
                J'accepte les{' '}
                <Text color="$primary" fontWeight="600">
                  conditions d'utilisation
                </Text>
                {' '}et la{' '}
                <Text color="$primary" fontWeight="600">
                  politique de confidentialité
                </Text>
              </Text>
              {formErrors.agreeToTerms && (
                <Text color="$error" fontSize={11} marginTop="$1">
                  {formErrors.agreeToTerms}
                </Text>
              )}
            </YStack>
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
              <Text color="$error" fontSize={13} textAlign="center">
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
            marginTop="$2"
            hoverStyle={{
              backgroundColor: '$primaryLight',
              scale: 1.02,
            }}
            pressStyle={{
              scale: 0.98,
            }}
          >
            {loading ? 'Inscription en cours...' : 'Créer mon compte'}
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
          
          {/* Login Link */}
          <XStack justifyContent="center" gap="$2">
            <Text color="$colorMuted" fontSize={14}>
              Déjà un compte ?
            </Text>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Text color="$primary" fontSize={14} fontWeight="600">
                Se connecter
              </Text>
            </Link>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}

export default RegisterPage