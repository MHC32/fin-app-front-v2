import { 
  Select as TamaguiSelect, 
  styled, 
  YStack, 
  Text,
  Adapt,
  Sheet
} from 'tamagui'
import { ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons'
import { forwardRef, useMemo } from 'react'

/**
 * 📋 SELECT COMPONENT
 * 
 * Dropdown select avec Adapt pour mobile
 * Utilise le Select natif de Tamagui avec styled()
 * 
 * @example
 * <Select 
 *   value={country}
 *   onValueChange={setCountry}
 *   placeholder="Sélectionnez un pays"
 *   items={[
 *     { value: 'ht', label: 'Haïti' },
 *     { value: 'us', label: 'USA' }
 *   ]}
 * />
 */

export const StyledSelectTrigger = styled(TamaguiSelect.Trigger, {
  name: 'SelectTrigger',
  
  // Base styles
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  backgroundColor: '$background',
  
  // Hover
  hoverStyle: {
    borderColor: '$borderColorHover',
  },
  
  // Focus
  focusStyle: {
    borderColor: '$primary',
    borderWidth: 2,
    outlineWidth: 0,
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
    
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        backgroundColor: '$backgroundHover',
      },
    },
  },
})

export const StyledSelectValue = styled(TamaguiSelect.Value, {
  name: 'SelectValue',
  color: '$color',
})

export const StyledSelectContent = styled(TamaguiSelect.Content, {
  name: 'SelectContent',
  
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  padding: '$2',
  shadowColor: '$shadowColor',
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.1,
})

export const StyledSelectItem = styled(TamaguiSelect.Item, {
  name: 'SelectItem',
  
  padding: '$3',
  borderRadius: '$2',
  
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  
  focusStyle: {
    backgroundColor: '$backgroundHover',
  },
})

export const StyledSelectItemText = styled(TamaguiSelect.ItemText, {
  name: 'SelectItemText',
  color: '$color',
})

export const Select = forwardRef(
  (
    {
      items = [],
      value,
      onValueChange,
      placeholder = 'Sélectionnez...',
      error,
      helperText,
      disabled,
      size = '$4',
      native = false,
      ...props
    },
    ref
  ) => {
    const hasError = !!error

    // Fonction pour récupérer le label depuis la value
    const getLabel = useMemo(() => {
      return (val) => {
        const item = items.find((i) => i.value === val)
        return item?.label || val
      }
    }, [items])

    return (
      <YStack gap="$2" width="100%">
        <TamaguiSelect
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          native={native}
          {...props}
        >
          <StyledSelectTrigger
            ref={ref}
            size={size}
            error={hasError}
            disabled={disabled}
            iconAfter={ChevronDown}
          >
            <StyledSelectValue placeholder={placeholder} />
          </StyledSelectTrigger>

          {/* Adapt pour mobile - Render en Sheet */}
          <Adapt when="sm" platform="touch">
            <Sheet modal dismissOnSnapToBottom>
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay />
            </Sheet>
          </Adapt>

          {/* Content Desktop */}
          <StyledSelectContent>
            <TamaguiSelect.ScrollUpButton
              alignItems="center"
              justifyContent="center"
              padding="$2"
            >
              <ChevronUp size={16} />
            </TamaguiSelect.ScrollUpButton>

            <TamaguiSelect.Viewport>
              <TamaguiSelect.Group>
                {items.map((item, index) => (
                  <StyledSelectItem
                    key={item.value}
                    value={item.value}
                    index={index}
                  >
                    <StyledSelectItemText>
                      {item.label}
                    </StyledSelectItemText>
                    <TamaguiSelect.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </TamaguiSelect.ItemIndicator>
                  </StyledSelectItem>
                ))}
              </TamaguiSelect.Group>
            </TamaguiSelect.Viewport>

            <TamaguiSelect.ScrollDownButton
              alignItems="center"
              justifyContent="center"
              padding="$2"
            >
              <ChevronDown size={16} />
            </TamaguiSelect.ScrollDownButton>
          </StyledSelectContent>
        </TamaguiSelect>

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

Select.displayName = 'Select'

export default Select