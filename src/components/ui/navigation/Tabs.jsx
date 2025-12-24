import { Tabs as TamaguiTabs, styled, YStack } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 📑 TABS COMPONENT
 * 
 * Onglets de navigation
 * Utilise le Tabs natif de Tamagui avec styled()
 * 
 * @example
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Tab value="tab1">Aperçu</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Transactions</Tabs.Tab>
 *     <Tabs.Tab value="tab3">Statistiques</Tabs.Tab>
 *   </Tabs.List>
 *   
 *   <Tabs.Content value="tab1">
 *     Contenu de l'aperçu
 *   </Tabs.Content>
 *   <Tabs.Content value="tab2">
 *     Contenu des transactions
 *   </Tabs.Content>
 * </Tabs>
 */

// Tabs Root
export const StyledTabs = styled(TamaguiTabs, {
  name: 'Tabs',
  
  flex: 1,
  flexDirection: 'column',
  
  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'column',
      },
      vertical: {
        flexDirection: 'row',
      },
    },
  },
  
  defaultVariants: {
    orientation: 'horizontal',
  },
})

// Tabs List (container des tabs)
export const StyledTabsList = styled(TamaguiTabs.List, {
  name: 'TabsList',
  
  flexDirection: 'row',
  backgroundColor: '$backgroundStrong',
  padding: '$1',
  borderRadius: '$3',
  gap: '$1',
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$backgroundStrong',
      },
      
      underline: {
        backgroundColor: 'transparent',
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: '$borderColor',
        borderRadius: 0,
        gap: 0,
      },
      
      pills: {
        backgroundColor: 'transparent',
        padding: 0,
        gap: '$2',
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
  },
})

// Tabs Tab (bouton individual)
export const StyledTabsTab = styled(TamaguiTabs.Tab, {
  name: 'TabsTab',
  
  paddingHorizontal: '$4',
  paddingVertical: '$2.5',
  borderRadius: '$2',
  backgroundColor: 'transparent',
  color: '$colorMuted',
  fontSize: 14,
  fontWeight: '500',
  cursor: 'pointer',
  borderWidth: 0,
  
  hoverStyle: {
    color: '$color',
    backgroundColor: '$backgroundHover',
  },
  
  pressStyle: {
    backgroundColor: '$backgroundPress',
  },
  
  variants: {
    active: {
      true: {
        color: '$color',
        backgroundColor: '$background',
        fontWeight: '600',
        
        hoverStyle: {
          backgroundColor: '$background',
        },
      },
    },
    
    variant: {
      default: {
        // Déjà défini dans base
      },
      
      underline: {
        borderRadius: 0,
        paddingBottom: '$3',
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        
        hoverStyle: {
          backgroundColor: 'transparent',
          borderBottomColor: '$borderColorHover',
        },
      },
      
      pills: {
        backgroundColor: '$backgroundStrong',
        
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },
    },
  },
  
  // Active variants par type
  compoundVariants: [
    {
      active: true,
      variant: 'underline',
      style: {
        borderBottomColor: '$primary',
        color: '$primary',
        
        hoverStyle: {
          borderBottomColor: '$primary',
        },
      },
    },
    {
      active: true,
      variant: 'pills',
      style: {
        backgroundColor: '$primary',
        color: 'white',
        
        hoverStyle: {
          backgroundColor: '$primaryHover',
        },
      },
    },
  ],
})

// Tabs Content
export const StyledTabsContent = styled(TamaguiTabs.Content, {
  name: 'TabsContent',
  
  padding: '$4',
  
  variants: {
    padded: {
      true: {
        padding: '$4',
      },
      false: {
        padding: 0,
      },
    },
  },
  
  defaultVariants: {
    padded: true,
  },
})

// Component Tabs principal
export const Tabs = forwardRef(
  (
    {
      children,
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    return (
      <StyledTabs
        ref={ref}
        orientation={orientation}
        {...props}
      >
        {children}
      </StyledTabs>
    )
  }
)

Tabs.displayName = 'Tabs'

// Tabs.List
const TabsList = forwardRef(
  (
    {
      children,
      variant = 'default',
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    return (
      <StyledTabsList
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      >
        {children}
      </StyledTabsList>
    )
  }
)

TabsList.displayName = 'TabsList'

// Tabs.Tab
const TabsTab = forwardRef(
  (
    {
      children,
      value,
      ...props
    },
    ref
  ) => {
    return (
      <StyledTabsTab
        ref={ref}
        value={value}
        {...props}
      >
        {children}
      </StyledTabsTab>
    )
  }
)

TabsTab.displayName = 'TabsTab'

// Tabs.Content
const TabsContent = forwardRef(
  (
    {
      children,
      value,
      padded = true,
      ...props
    },
    ref
  ) => {
    return (
      <StyledTabsContent
        ref={ref}
        value={value}
        padded={padded}
        {...props}
      >
        {children}
      </StyledTabsContent>
    )
  }
)

TabsContent.displayName = 'TabsContent'

// Attacher les sous-composants
Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Content = TabsContent

export default Tabs