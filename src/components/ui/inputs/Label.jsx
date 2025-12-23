import { Label as TamaguiLabel, styled } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 🏷️ LABEL COMPONENT
 * 
 * Label pour les champs de formulaire
 * Utilise le Label natif de Tamagui avec styled()
 * 
 * @example
 * <Label htmlFor="email" required>
 *   Email
 * </Label>
 * <Input id="email" />
 */

export const StyledLabel = styled(TamaguiLabel, {
  name: 'Label',
  
  // Base styles
  fontSize: 14,
  fontWeight: '500',
  color: '$color',
  marginBottom: '$2',
  userSelect: 'none',
  
  variants: {
    required: {
      true: {
        // On ajoutera un astérisque via wrapper
      },
    },
    
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    
    error: {
      true: {
        color: '$error',
      },
    },
  },
})

export const Label = forwardRef(
  (
    {
      required = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledLabel
        ref={ref}
        required={required}
        {...props}
      >
        {children}
        {required && (
          <StyledLabel color="$error" marginLeft="$1">
            *
          </StyledLabel>
        )}
      </StyledLabel>
    )
  }
)

Label.displayName = 'Label'

export default Label