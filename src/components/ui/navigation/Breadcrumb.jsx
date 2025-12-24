import { styled, XStack, Text } from 'tamagui'
import { ChevronRight, Home } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'

/**
 * 🍞 BREADCRUMB COMPONENT
 * 
 * Fil d'ariane pour navigation hiérarchique
 * Utilise styled() Tamagui avec Lucide icons
 * 
 * @example
 * <Breadcrumb>
 *   <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
 *   <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
 *   <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
 * </Breadcrumb>
 * 
 * <Breadcrumb separator={<ChevronRight />}>
 *   <Breadcrumb.Item icon={<Home />} href="/">Accueil</Breadcrumb.Item>
 *   <Breadcrumb.Item>Compte</Breadcrumb.Item>
 * </Breadcrumb>
 */

// Breadcrumb Root
export const StyledBreadcrumb = styled(XStack, {
  name: 'Breadcrumb',
  
  alignItems: 'center',
  gap: '$2',
  flexWrap: 'wrap',
  
  variants: {
    size: {
      sm: {
        gap: '$1.5',
      },
      md: {
        gap: '$2',
      },
      lg: {
        gap: '$3',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
})

// Breadcrumb Item
export const StyledBreadcrumbItem = styled(XStack, {
  name: 'BreadcrumbItem',
  
  alignItems: 'center',
  gap: '$2',
  cursor: 'pointer',
  
  variants: {
    active: {
      true: {
        cursor: 'default',
      },
    },
    
    clickable: {
      true: {
        cursor: 'pointer',
        
        hoverStyle: {
          opacity: 0.7,
        },
        
        pressStyle: {
          opacity: 0.5,
        },
      },
      false: {
        cursor: 'default',
      },
    },
  },
})

// Breadcrumb Text
export const StyledBreadcrumbText = styled(Text, {
  name: 'BreadcrumbText',
  
  fontSize: 14,
  color: '$colorMuted',
  fontWeight: '500',
  
  variants: {
    active: {
      true: {
        color: '$color',
        fontWeight: '600',
      },
    },
    
    clickable: {
      true: {
        color: '$primary',
        
        hoverStyle: {
          textDecorationLine: 'underline',
        },
      },
    },
  },
})

// Breadcrumb Separator
export const StyledBreadcrumbSeparator = styled(XStack, {
  name: 'BreadcrumbSeparator',
  
  alignItems: 'center',
  color: '$colorMuted',
  opacity: 0.5,
})

// Component Breadcrumb principal
export const Breadcrumb = forwardRef(
  (
    {
      children,
      separator = <ChevronRight size={16} />,
      size = 'md',
      ...props
    },
    ref
  ) => {
    // Convertir children en array
    const items = Array.isArray(children) ? children : [children]
    
    // Filtrer les enfants valides
    const validItems = items.filter(Boolean)

    return (
      <StyledBreadcrumb ref={ref} size={size} {...props}>
        {validItems.map((item, index) => {
          const isLast = index === validItems.length - 1
          
          return (
            <XStack key={index} alignItems="center" gap="$2">
              {item}
              
              {/* Separator - sauf pour le dernier item */}
              {!isLast && (
                <StyledBreadcrumbSeparator>
                  {separator}
                </StyledBreadcrumbSeparator>
              )}
            </XStack>
          )
        })}
      </StyledBreadcrumb>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'

// Breadcrumb.Item
const BreadcrumbItem = forwardRef(
  (
    {
      children,
      href,
      active = false,
      icon,
      onPress,
      ...props
    },
    ref
  ) => {
    const isClickable = !!href || !!onPress
    const handlePress = () => {
      if (active) return
      if (onPress) {
        onPress()
      } else if (href) {
        // Dans une vraie app, utiliser router.push(href)
        console.log('Navigate to:', href)
      }
    }

    return (
      <StyledBreadcrumbItem
        ref={ref}
        active={active}
        clickable={isClickable && !active}
        onPress={handlePress}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <XStack color={active ? '$color' : '$colorMuted'}>
            {icon}
          </XStack>
        )}
        
        {/* Text */}
        <StyledBreadcrumbText
          active={active}
          clickable={isClickable && !active}
        >
          {children}
        </StyledBreadcrumbText>
      </StyledBreadcrumbItem>
    )
  }
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

// Attacher Item au Breadcrumb
Breadcrumb.Item = BreadcrumbItem

export default Breadcrumb