import { Input as TamaguiInput, styled, YStack, XStack, Text } from 'tamagui'
import { forwardRef, useState, useEffect } from 'react'

/**
 * 💰 CURRENCY INPUT COMPONENT
 * 
 * Input pour montants avec format de devise
 * Support HTG et USD
 * 
 * @example
 * <CurrencyInput 
 *   value={amount}
 *   onValueChange={setAmount}
 *   currency="HTG"
 *   placeholder="0.00"
 * />
 */

export const StyledCurrencyInput = styled(TamaguiInput, {
  name: 'CurrencyInput',
  
  // Base styles
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  backgroundColor: '$background',
  color: '$color',
  textAlign: 'right',
  fontVariant: 'tabular-nums',
  
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

// Symboles de devises
const CURRENCY_SYMBOLS = {
  HTG: 'G',
  USD: '$',
}

// Formatage du montant
const formatCurrency = (value, currency, showSymbol = true) => {
  if (!value && value !== 0) return ''
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(numValue)) return ''
  
  // Format avec séparateurs de milliers et 2 décimales
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue)
  
  if (showSymbol) {
    const symbol = CURRENCY_SYMBOLS[currency] || currency
    return `${symbol} ${formatted}`
  }
  
  return formatted
}

// Parse le texte en nombre
const parseCurrency = (text) => {
  if (!text) return ''
  
  // Enlever tout sauf les chiffres, point et virgule
  const cleaned = text.replace(/[^\d.,]/g, '')
  
  // Remplacer virgule par point
  const normalized = cleaned.replace(',', '.')
  
  // Convertir en nombre
  const parsed = parseFloat(normalized)
  
  return isNaN(parsed) ? '' : parsed
}

export const CurrencyInput = forwardRef(
  (
    {
      value,
      onValueChange,
      currency = 'HTG',
      error,
      helperText,
      disabled,
      size = '$4',
      placeholder = '0.00',
      showSymbol = true,
      ...props
    },
    ref
  ) => {
    const hasError = !!error
    const [displayValue, setDisplayValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    // Mettre à jour displayValue quand value change
    useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatCurrency(value, currency, showSymbol))
      }
    }, [value, currency, showSymbol, isFocused])

    const handleFocus = () => {
      setIsFocused(true)
      // Afficher le nombre brut sans symbole en focus
      if (value) {
        setDisplayValue(value.toString())
      }
    }

    const handleBlur = () => {
      setIsFocused(false)
      // Re-formater avec le symbole
      if (value) {
        setDisplayValue(formatCurrency(value, currency, showSymbol))
      }
    }

    const handleChangeText = (text) => {
      setDisplayValue(text)
      
      // Parser et envoyer la valeur numérique
      const parsed = parseCurrency(text)
      onValueChange?.(parsed)
    }

    return (
      <YStack gap="$2" width="100%">
        <XStack gap="$2" alignItems="center">
          {/* Currency Badge */}
          <YStack
            paddingHorizontal="$3"
            paddingVertical="$2"
            backgroundColor="$backgroundStrong"
            borderRadius="$2"
            minWidth={50}
            alignItems="center"
          >
            <Text
              fontSize={14}
              fontWeight="600"
              color="$color"
            >
              {currency}
            </Text>
          </YStack>

          {/* Input */}
          <StyledCurrencyInput
            ref={ref}
            size={size}
            error={hasError}
            disabled={disabled}
            placeholder={showSymbol ? `${CURRENCY_SYMBOLS[currency]} ${placeholder}` : placeholder}
            value={displayValue}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType="decimal-pad"
            flex={1}
            {...props}
          />
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

CurrencyInput.displayName = 'CurrencyInput'

export default CurrencyInput