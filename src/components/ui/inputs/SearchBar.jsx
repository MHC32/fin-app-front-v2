import { Input as TamaguiInput, styled, XStack, YStack, Text } from 'tamagui'
import { Search, X } from '@tamagui/lucide-icons'
import { forwardRef, useState, useEffect, useRef } from 'react'
import { IconButton } from '../buttons'

/**
 * 🔍 SEARCHBAR COMPONENT
 * 
 * Barre de recherche avec debounce et clear button
 * Utilise Input Tamagui avec icônes Lucide
 * 
 * @example
 * <SearchBar 
 *   value={query}
 *   onChangeText={setQuery}
 *   onSearch={handleSearch}
 *   debounce={300}
 *   placeholder="Rechercher..."
 * />
 */

export const StyledSearchInput = styled(TamaguiInput, {
  name: 'SearchInput',
  
  // Base styles
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$round',
  backgroundColor: '$background',
  color: '$color',
  paddingLeft: '$10',  // Space pour l'icône search
  paddingRight: '$10', // Space pour le clear button
  
  // Focus
  focusStyle: {
    borderColor: '$primary',
    borderWidth: 2,
    outlineWidth: 0,
  },
  
  // Hover
  hoverStyle: {
    borderColor: '$borderColorHover',
  },
  
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        backgroundColor: '$backgroundHover',
      },
    },
  },
})

export const SearchBar = forwardRef(
  (
    {
      value = '',
      onChangeText,
      onSearch,
      placeholder = 'Rechercher...',
      debounce = 300,
      disabled = false,
      size = '$4',
      showSearchIcon = true,
      showClearButton = true,
      helperText,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(value)
    const debounceTimerRef = useRef(null)

    // Sync avec la prop value
    useEffect(() => {
      setLocalValue(value)
    }, [value])

    // Debounce pour onSearch
    useEffect(() => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        if (onSearch && localValue !== value) {
          onSearch(localValue)
        }
      }, debounce)

      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }
      }
    }, [localValue, debounce, onSearch, value])

    const handleChangeText = (text) => {
      setLocalValue(text)
      onChangeText?.(text)
    }

    const handleClear = () => {
      setLocalValue('')
      onChangeText?.('')
      onSearch?.('')
    }

    return (
      <YStack gap="$2" width="100%">
        <XStack position="relative" alignItems="center" width="100%">
          {/* Search Icon */}
          {showSearchIcon && (
            <XStack
              position="absolute"
              left="$3"
              zIndex={1}
              pointerEvents="none"
            >
              <Search size={18} color="$colorMuted" />
            </XStack>
          )}

          {/* Input */}
          <StyledSearchInput
            ref={ref}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            value={localValue}
            onChangeText={handleChangeText}
            flex={1}
            {...props}
          />

          {/* Clear Button */}
          {showClearButton && localValue && !disabled && (
            <XStack
              position="absolute"
              right="$2"
              zIndex={1}
            >
              <IconButton
                size="$3"
                variant="ghost"
                onPress={handleClear}
                circular
              >
                <X size={16} />
              </IconButton>
            </XStack>
          )}
        </XStack>

        {/* Helper text */}
        {helperText && (
          <Text
            fontSize={13}
            color="$colorMuted"
          >
            {helperText}
          </Text>
        )}
      </YStack>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export default SearchBar