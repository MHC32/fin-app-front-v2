import { Input as TamaguiInput, styled, YStack, Text } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 📝 INPUT COMPONENT
 * 
 * Champ de saisie texte basique
 * Utilise le Input natif de Tamagui avec styled()
 * 
 * @example
 * <Input 
 *   placeholder="Entrez votre email"
 *   size="$4"
 *   error="Email invalide"
 * />
 */

export const StyledInput = styled(TamaguiInput, {
  name: 'Input',
  
  // Base styles
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  backgroundColor: '$background',
  color: '$color',
  placeholderTextColor: '$placeholderColor',
  
  // Focus state
  focusStyle: {
    borderColor: '$primary',
    borderWidth: 2,
    outlineWidth: 0,
  },
  
  // Hover state
  hoverStyle: {
    borderColor: '$borderColorHover',
  },
  
  variants: {
    error: {
      true: {
        borderColor: '$error',
        
        focusStyle: {
          borderColor: '$error',
        },
      },
    },
    
    success: {
      true: {
        borderColor: '$success',
        
        focusStyle: {
          borderColor: '$success',
        },
      },
    },
    
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        backgroundColor: '$backgroundHover',
      },
    },
  },
})

export const Input = forwardRef(
  (
    {
      error,
      success,
      helperText,
      ...props
    },
    ref
  ) => {
    const hasError = !!error
    const hasSuccess = !!success
    
    return (
      <YStack gap="$2" width="100%">
        <StyledInput
          ref={ref}
          error={hasError}
          success={hasSuccess && !hasError}
          {...props}
        />
        
        {/* Helper text ou error message */}
        {(helperText || error) && (
          <Text
            fontSize={13}
            color={hasError ? '$error' : '$colorMuted'}
          >
            {error || helperText}
          </Text>
        )}
      </YStack>
    )
  }
)

Input.displayName = 'Input'

export default Input