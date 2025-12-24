import { Checkbox as TamaguiCheckbox, styled, YStack, XStack, Text } from 'tamagui'
import { Check } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'

/**
 * ☑️ CHECKBOX COMPONENT
 * 
 * Case à cocher avec label optionnel
 * Utilise le Checkbox natif de Tamagui avec styled()
 * 
 * @example
 * <Checkbox 
 *   checked={checked}
 *   onCheckedChange={setChecked}
 *   label="J'accepte les conditions"
 * />
 */

export const StyledCheckbox = styled(TamaguiCheckbox, {
  name: 'Checkbox',
  
  // Base styles
  borderWidth: 2,
  borderColor: '$borderColor',
  backgroundColor: '$background',
  borderRadius: '$2',
  
  // Hover
  hoverStyle: {
    borderColor: '$borderColorHover',
    backgroundColor: '$backgroundHover',
  },
  
  // Press
  pressStyle: {
    borderColor: '$primary',
    scale: 0.95,
  },
  
  variants: {
    checked: {
      true: {
        backgroundColor: '$primary',
        borderColor: '$primary',
        
        hoverStyle: {
          backgroundColor: '$primaryHover',
          borderColor: '$primaryHover',
        },
      },
    },
    
    error: {
      true: {
        borderColor: '$error',
        
        hoverStyle: {
          borderColor: '$error',
        },
      },
    },
    
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        
        hoverStyle: {
          borderColor: '$borderColor',
          backgroundColor: '$background',
        },
      },
    },
  },
})

export const StyledCheckboxIndicator = styled(TamaguiCheckbox.Indicator, {
  name: 'CheckboxIndicator',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Checkbox = forwardRef(
  (
    {
      label,
      error,
      helperText,
      checked,
      disabled,
      size = '$4',
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const hasError = !!error

    // Si pas de label, retourne juste le checkbox
    if (!label) {
      return (
        <YStack gap="$2">
          <StyledCheckbox
            ref={ref}
            size={size}
            checked={checked}
            error={hasError}
            disabled={disabled}
            onCheckedChange={disabled ? undefined : onCheckedChange}
            {...props}
          >
            <StyledCheckboxIndicator>
              <Check size={16} color="white" strokeWidth={3} />
            </StyledCheckboxIndicator>
          </StyledCheckbox>

          {/* Helper text ou error */}
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

    // Avec label
    return (
      <YStack gap="$2">
        <XStack gap="$3" alignItems="center">
          <StyledCheckbox
            ref={ref}
            size={size}
            checked={checked}
            error={hasError}
            disabled={disabled}
            onCheckedChange={disabled ? undefined : onCheckedChange}
            {...props}
          >
            <StyledCheckboxIndicator>
              <Check size={16} color="white" strokeWidth={3} />
            </StyledCheckboxIndicator>
          </StyledCheckbox>

          <Text
            fontSize={14}
            color={disabled ? '$colorMuted' : '$color'}
            cursor={disabled ? 'not-allowed' : 'pointer'}
            userSelect="none"
            onPress={disabled ? undefined : () => onCheckedChange?.(!checked)}
          >
            {label}
          </Text>
        </XStack>

        {/* Helper text ou error */}
        {(helperText || error) && (
          <Text
            fontSize={13}
            color={hasError ? '$error' : '$colorMuted'}
            marginLeft="$10"
          >
            {error || helperText}
          </Text>
        )}
      </YStack>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox