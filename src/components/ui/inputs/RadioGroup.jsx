import { RadioGroup as TamaguiRadioGroup, styled, YStack, XStack, Text, Label } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🔘 RADIOGROUP COMPONENT
 * 
 * Groupe de boutons radio pour sélection unique
 * Utilise le RadioGroup natif de Tamagui avec styled()
 * 
 * @example
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroup.Item value="option1" label="Option 1" />
 *   <RadioGroup.Item value="option2" label="Option 2" />
 * </RadioGroup>
 */

export const StyledRadioGroup = styled(TamaguiRadioGroup, {
  name: 'RadioGroup',
  gap: '$3',
})

export const StyledRadioGroupItem = styled(TamaguiRadioGroup.Item, {
  name: 'RadioGroupItem',
  
  // Base styles
  borderWidth: 2,
  borderColor: '$borderColor',
  backgroundColor: '$background',
  
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
        borderColor: '$primary',
        borderWidth: 2,
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

export const StyledRadioGroupIndicator = styled(TamaguiRadioGroup.Indicator, {
  name: 'RadioGroupIndicator',
  backgroundColor: '$primary',
  borderRadius: '$round',
  width: '60%',
  height: '60%',
})

// Composant RadioGroup principal
export const RadioGroup = forwardRef(
  (
    {
      children,
      error,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error

    return (
      <YStack gap="$2">
        <StyledRadioGroup
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {children}
        </StyledRadioGroup>

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
)

RadioGroup.displayName = 'RadioGroup'

// RadioGroup.Item avec label intégré
const RadioGroupItem = forwardRef(
  (
    {
      value,
      label,
      id,
      disabled,
      size = '$4',
      ...props
    },
    ref
  ) => {
    const itemId = id || `radio-${value}`

    // Si pas de label, retourne juste le radio
    if (!label) {
      return (
        <StyledRadioGroupItem
          ref={ref}
          value={value}
          id={itemId}
          size={size}
          disabled={disabled}
          {...props}
        >
          <StyledRadioGroupIndicator />
        </StyledRadioGroupItem>
      )
    }

    // Avec label
    return (
      <XStack gap="$3" alignItems="center">
        <StyledRadioGroupItem
          ref={ref}
          value={value}
          id={itemId}
          size={size}
          disabled={disabled}
          {...props}
        >
          <StyledRadioGroupIndicator />
        </StyledRadioGroupItem>

        <Label
          htmlFor={itemId}
          fontSize={14}
          color={disabled ? '$colorMuted' : '$color'}
          cursor={disabled ? 'not-allowed' : 'pointer'}
          userSelect="none"
        >
          {label}
        </Label>
      </XStack>
    )
  }
)

RadioGroupItem.displayName = 'RadioGroupItem'

// Attacher Item à RadioGroup
RadioGroup.Item = RadioGroupItem

export default RadioGroup