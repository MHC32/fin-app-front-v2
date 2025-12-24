import { Switch as TamaguiSwitch, styled, YStack, XStack, Text } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🔘 SWITCH COMPONENT
 * 
 * Interrupteur on/off avec label optionnel
 * Utilise le Switch natif de Tamagui avec styled()
 * 
 * @example
 * <Switch 
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 *   label="Notifications activées"
 * />
 */

export const StyledSwitch = styled(TamaguiSwitch, {
  name: 'Switch',
  
  // Base styles
  backgroundColor: '$backgroundStrong',
  borderWidth: 2,
  borderColor: 'transparent',
  
  // Checked state
  variants: {
    checked: {
      true: {
        backgroundColor: '$primary',
      },
    },
    
    error: {
      true: {
        borderColor: '$error',
      },
    },
    
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
})

export const StyledSwitchThumb = styled(TamaguiSwitch.Thumb, {
  name: 'SwitchThumb',
  backgroundColor: 'white',
  
  animation: 'quick',
  
  variants: {
    checked: {
      true: {
        // Position gérée par Tamagui
      },
    },
  },
})

export const Switch = forwardRef(
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

    // Si pas de label, retourne juste le switch
    if (!label) {
      return (
        <YStack gap="$2">
          <StyledSwitch
            ref={ref}
            size={size}
            checked={checked}
            error={hasError}
            disabled={disabled}
            onCheckedChange={disabled ? undefined : onCheckedChange}
            {...props}
          >
            <StyledSwitchThumb checked={checked} animation="bouncy" />
          </StyledSwitch>

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
        <XStack gap="$3" alignItems="center" justifyContent="space-between">
          <Text
            fontSize={14}
            color={disabled ? '$colorMuted' : '$color'}
            flex={1}
            userSelect="none"
          >
            {label}
          </Text>

          <StyledSwitch
            ref={ref}
            size={size}
            checked={checked}
            error={hasError}
            disabled={disabled}
            onCheckedChange={disabled ? undefined : onCheckedChange}
            {...props}
          >
            <StyledSwitchThumb checked={checked} animation="bouncy" />
          </StyledSwitch>
        </XStack>

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

Switch.displayName = 'Switch'

export default Switch