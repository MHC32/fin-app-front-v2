// src/components/layout/SearchBar.jsx
import { XStack, Input } from 'tamagui'
import { Search } from 'lucide-react'

/**
 * 🔍 SEARCH BAR RESPONSIVE - FINAPP HAITI
 * 
 * Desktop/Tablet: min-width 250px
 * Mobile: full width (flex: 1)
 */

export function SearchBar({ placeholder = "Rechercher...", onChange }) {
  return (
    <XStack
      backgroundColor="$backgroundSoft"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$3"
      paddingHorizontal="$3"
      paddingVertical="$2"
      gap="$2"
      alignItems="center"
      minWidth={250}       // Desktop/Tablet: 250px
      $sm={{               // Mobile
        minWidth: '100%',  // Full width
        flex: 1,
      }}
      hoverStyle={{
        borderColor: '$primary',
      }}
      animation="quick"
    >
      <Search
        size={18}
        color="#a0aec0"
        strokeWidth={2}
        $sm={{ size: 16 }}  // Mobile: smaller icon
      />
      <Input
        flex={1}
        placeholder={placeholder}
        fontSize={14}
        $sm={{ fontSize: 13 }}  // Mobile: smaller font
        color="$color"
        backgroundColor="transparent"
        borderWidth={0}
        outlineWidth={0}
        focusStyle={{
          outlineWidth: 0,
        }}
        placeholderTextColor="$colorMuted"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </XStack>
  )
}

export default SearchBar