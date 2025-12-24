/**
 * 📝 INPUTS COMPONENTS - INDEX
 * 
 * Export de tous les composants Input pour FinApp Haiti
 * Utilisant Tamagui natif avec styled()
 * 
 * @module @components/ui/inputs
 */

// =============================================================================
// GROUPE 1 - BASICS (Text Inputs)
// =============================================================================

/**
 * Label - Label pour formulaires avec support required
 * @example
 * <Label htmlFor="email" required>Email</Label>
 */
export { default as Label } from './Label'

/**
 * Input - Champ de saisie texte avec states
 * @example
 * <Input placeholder="Email" error="Invalide" />
 */
export { default as Input } from './Input'

/**
 * TextArea - Champ multi-lignes avec resize
 * @example
 * <TextArea numberOfLines={4} resizable={false} />
 */
export { default as TextArea } from './TextArea'

// =============================================================================
// GROUPE 2 - SELECTION (Checkboxes, Switches, Radio)
// =============================================================================

/**
 * Checkbox - Case à cocher avec label optionnel
 * @example
 * <Checkbox checked={value} label="J'accepte" />
 */
export { default as Checkbox } from './Checkbox'

/**
 * Switch - Interrupteur on/off avec animation
 * @example
 * <Switch checked={enabled} label="Mode sombre" />
 */
export { default as Switch } from './Switch'

/**
 * RadioGroup - Groupe de boutons radio avec Items
 * @example
 * <RadioGroup value={value}>
 *   <RadioGroup.Item value="1" label="Option 1" />
 * </RadioGroup>
 */
export { default as RadioGroup } from './RadioGroup'

// =============================================================================
// GROUPE 3 - ADVANCED (Select, Currency, Search)
// =============================================================================

/**
 * Select - Dropdown avec Adapt mobile (Sheet)
 * @example
 * <Select items={items} placeholder="Sélectionnez..." />
 */
export { default as Select } from './Select'

/**
 * CurrencyInput - Input pour montants HTG/USD avec format
 * @example
 * <CurrencyInput currency="HTG" value={amount} />
 */
export { default as CurrencyInput } from './CurrencyInput'

/**
 * SearchBar - Barre de recherche avec debounce et clear
 * @example
 * <SearchBar debounce={300} onSearch={handleSearch} />
 */
export { default as SearchBar } from './SearchBar'

// =============================================================================
// EXPORTS PAR GROUPE (Alternative)
// =============================================================================

// Groupe 1
export { 
  Label,
  Input, 
  TextArea 
} from './index'

// Groupe 2
export { 
  Checkbox, 
  Switch, 
  RadioGroup 
} from './index'

// Groupe 3
export { 
  Select, 
  CurrencyInput, 
  SearchBar 
} from './index'

// =============================================================================
// TYPES & CONSTANTS
// =============================================================================

/**
 * Currencies supportées par CurrencyInput
 */
export const SUPPORTED_CURRENCIES = ['HTG', 'USD']

/**
 * Sizes Tamagui pour les inputs
 */
export const INPUT_SIZES = {
  SMALL: '$3',
  MEDIUM: '$4',
  LARGE: '$5',
}

/**
 * Debounce par défaut pour SearchBar (ms)
 */
export const DEFAULT_DEBOUNCE = 300