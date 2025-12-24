import { Popover as TamaguiPopover, styled, YStack, XStack, Text, Separator } from 'tamagui'
import { Check } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'

/**
 * 📋 DROPDOWN COMPONENT
 * 
 * Menu dropdown pour actions et sélections
 * Utilise le Popover natif de Tamagui avec styled()
 * 
 * @example
 * <Dropdown>
 *   <Dropdown.Trigger>
 *     <Button>Menu</Button>
 *   </Dropdown.Trigger>
 *   
 *   <Dropdown.Content>
 *     <Dropdown.Item onPress={() => {}}>
 *       Profil
 *     </Dropdown.Item>
 *     <Dropdown.Item onPress={() => {}}>
 *       Paramètres
 *     </Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item variant="danger" onPress={() => {}}>
 *       Déconnexion
 *     </Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown>
 */

// Dropdown Root (Popover)
export const StyledDropdown = styled(TamaguiPopover, {
  name: 'Dropdown',
  allowFlip: true,
  placement: 'bottom-start',
})

// Dropdown Trigger
export const StyledDropdownTrigger = styled(TamaguiPopover.Trigger, {
  name: 'DropdownTrigger',
})

// Dropdown Content
export const StyledDropdownContent = styled(TamaguiPopover.Content, {
  name: 'DropdownContent',
  
  backgroundColor: '$background',
  borderRadius: '$3',
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: '$2',
  minWidth: 180,
  
  // Shadow
  shadowColor: '$shadowColor',
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.2,
  
  // Animation
  enterStyle: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  
  exitStyle: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  
  animation: [
    'quick',
    {
      opacity: {
        overshootClamping: true,
      },
    },
  ],
  
  variants: {
    size: {
      sm: {
        minWidth: 150,
      },
      md: {
        minWidth: 180,
      },
      lg: {
        minWidth: 220,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
})

// Dropdown Item
export const StyledDropdownItem = styled(XStack, {
  name: 'DropdownItem',
  
  alignItems: 'center',
  gap: '$3',
  padding: '$3',
  borderRadius: '$2',
  cursor: 'pointer',
  userSelect: 'none',
  
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  
  pressStyle: {
    backgroundColor: '$backgroundPress',
  },
  
  variants: {
    variant: {
      default: {
        // Déjà défini
      },
      
      danger: {
        color: '$red10',
        
        hoverStyle: {
          backgroundColor: '$red3',
        },
      },
      
      success: {
        color: '$green10',
        
        hoverStyle: {
          backgroundColor: '$green3',
        },
      },
    },
    
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        
        hoverStyle: {
          backgroundColor: 'transparent',
        },
        
        pressStyle: {
          backgroundColor: 'transparent',
        },
      },
    },
    
    selected: {
      true: {
        backgroundColor: '$backgroundHover',
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
  },
})

// Dropdown Item Text
export const StyledDropdownItemText = styled(Text, {
  name: 'DropdownItemText',
  
  fontSize: 14,
  fontWeight: '500',
  color: '$color',
  flex: 1,
})

// Dropdown Separator
export const StyledDropdownSeparator = styled(Separator, {
  name: 'DropdownSeparator',
  
  marginVertical: '$2',
  backgroundColor: '$borderColor',
})

// Dropdown Label (section header)
export const StyledDropdownLabel = styled(Text, {
  name: 'DropdownLabel',
  
  fontSize: 12,
  fontWeight: '600',
  color: '$colorMuted',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
})

// Component Dropdown principal
export const Dropdown = forwardRef(
  (
    {
      children,
      open,
      onOpenChange,
      defaultOpen,
      placement = 'bottom-start',
      ...props
    },
    ref
  ) => {
    return (
      <StyledDropdown
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        placement={placement}
        {...props}
      >
        {children}
      </StyledDropdown>
    )
  }
)

Dropdown.displayName = 'Dropdown'

// Dropdown.Trigger
const DropdownTrigger = forwardRef((props, ref) => {
  return <StyledDropdownTrigger ref={ref} asChild {...props} />
})

DropdownTrigger.displayName = 'DropdownTrigger'

// Dropdown.Content
const DropdownContent = forwardRef(
  (
    {
      children,
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <TamaguiPopover.Content
        ref={ref}
        size={size}
        {...props}
      >
        <StyledDropdownContent size={size}>
          {children}
        </StyledDropdownContent>
      </TamaguiPopover.Content>
    )
  }
)

DropdownContent.displayName = 'DropdownContent'

// Dropdown.Item
const DropdownItem = forwardRef(
  (
    {
      children,
      icon,
      shortcut,
      variant = 'default',
      disabled = false,
      selected = false,
      onPress,
      ...props
    },
    ref
  ) => {
    const handlePress = () => {
      if (disabled) return
      onPress?.()
    }

    return (
      <StyledDropdownItem
        ref={ref}
        variant={variant}
        disabled={disabled}
        selected={selected}
        onPress={handlePress}
        {...props}
      >
        {/* Icon à gauche */}
        {icon && (
          <XStack width={18}>
            {icon}
          </XStack>
        )}
        
        {/* Text */}
        <StyledDropdownItemText>
          {children}
        </StyledDropdownItemText>
        
        {/* Selected check */}
        {selected && (
          <Check size={16} color="$primary" />
        )}
        
        {/* Shortcut à droite */}
        {shortcut && (
          <Text fontSize={12} color="$colorMuted">
            {shortcut}
          </Text>
        )}
      </StyledDropdownItem>
    )
  }
)

DropdownItem.displayName = 'DropdownItem'

// Dropdown.Separator
const DropdownSeparator = forwardRef((props, ref) => {
  return <StyledDropdownSeparator ref={ref} {...props} />
})

DropdownSeparator.displayName = 'DropdownSeparator'

// Dropdown.Label
const DropdownLabel = forwardRef((props, ref) => {
  return <StyledDropdownLabel ref={ref} {...props} />
})

DropdownLabel.displayName = 'DropdownLabel'

// Attacher les sous-composants
Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
Dropdown.Item = DropdownItem
Dropdown.Separator = DropdownSeparator
Dropdown.Label = DropdownLabel

export default Dropdown