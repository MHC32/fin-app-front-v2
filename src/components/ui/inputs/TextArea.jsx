import { TextArea as TamaguiTextArea, styled, YStack, Text } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 📄 TEXTAREA COMPONENT
 * 
 * Champ de saisie multi-lignes
 * Utilise le TextArea natif de Tamagui avec styled()
 * 
 * @example
 * <TextArea 
 *   placeholder="Description..."
 *   numberOfLines={4}
 *   error="Texte trop court"
 * />
 */

export const StyledTextArea = styled(TamaguiTextArea, {
  name: 'TextArea',
  
  // Base styles
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  backgroundColor: '$background',
  color: '$color',
  placeholderTextColor: '$placeholderColor',
  minHeight: 100,
  textAlignVertical: 'top',
  
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
    
    resizable: {
      true: {
        resize: 'vertical',
      },
      false: {
        resize: 'none',
      },
    },
  },
  
  defaultVariants: {
    resizable: true,
  },
})

export const TextArea = forwardRef(
  (
    {
      error,
      success,
      helperText,
      numberOfLines = 4,
      ...props
    },
    ref
  ) => {
    const hasError = !!error
    const hasSuccess = !!success
    
    return (
      <YStack gap="$2" width="100%">
        <StyledTextArea
          ref={ref}
          error={hasError}
          success={hasSuccess && !hasError}
          numberOfLines={numberOfLines}
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

TextArea.displayName = 'TextArea'

export default TextArea