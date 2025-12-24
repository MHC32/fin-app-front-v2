import { Tooltip as TamaguiTooltip, styled, Text } from 'tamagui'
import { forwardRef } from 'react'

/**
 * 💬 TOOLTIP COMPONENT
 * 
 * Info-bulle pour afficher des informations au survol
 * Utilise le Tooltip natif de Tamagui avec styled()
 * 
 * @example
 * <Tooltip content="Ceci est une info-bulle">
 *   <Button>Survolez-moi</Button>
 * </Tooltip>
 * 
 * <Tooltip 
 *   content="Info importante"
 *   placement="top"
 *   delay={500}
 * >
 *   <IconButton><Info /></IconButton>
 * </Tooltip>
 */

// Tooltip Root
export const StyledTooltip = styled(TamaguiTooltip, {
  name: 'Tooltip',
  allowFlip: true,
  placement: 'top',
})

// Tooltip Trigger
export const StyledTooltipTrigger = styled(TamaguiTooltip.Trigger, {
  name: 'TooltipTrigger',
})

// Tooltip Content
export const StyledTooltipContent = styled(TamaguiTooltip.Content, {
  name: 'TooltipContent',
  
  backgroundColor: '$backgroundStrong',
  borderRadius: '$2',
  paddingVertical: '$2',
  paddingHorizontal: '$3',
  maxWidth: 250,
  
  // Shadow
  shadowColor: '$shadowColor',
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.2,
  
  // Animation
  enterStyle: {
    opacity: 0,
    scale: 0.95,
    y: -5,
  },
  
  exitStyle: {
    opacity: 0,
    scale: 0.95,
    y: -5,
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
    variant: {
      default: {
        backgroundColor: '$backgroundStrong',
      },
      
      dark: {
        backgroundColor: '$gray12',
      },
      
      light: {
        backgroundColor: '$gray2',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      
      primary: {
        backgroundColor: '$primary',
      },
      
      error: {
        backgroundColor: '$red9',
      },
      
      success: {
        backgroundColor: '$green9',
      },
      
      warning: {
        backgroundColor: '$orange9',
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
  },
})

// Tooltip Text
export const StyledTooltipText = styled(Text, {
  name: 'TooltipText',
  
  fontSize: 13,
  color: '$color',
  lineHeight: 18,
  
  variants: {
    variant: {
      default: {
        color: '$color',
      },
      
      dark: {
        color: 'white',
      },
      
      light: {
        color: '$color',
      },
      
      primary: {
        color: 'white',
      },
      
      error: {
        color: 'white',
      },
      
      success: {
        color: 'white',
      },
      
      warning: {
        color: 'white',
      },
    },
  },
})

// Tooltip Arrow
export const StyledTooltipArrow = styled(TamaguiTooltip.Arrow, {
  name: 'TooltipArrow',
  
  variants: {
    variant: {
      default: {
        borderColor: '$backgroundStrong',
      },
      
      dark: {
        borderColor: '$gray12',
      },
      
      light: {
        borderColor: '$borderColor',
      },
      
      primary: {
        borderColor: '$primary',
      },
      
      error: {
        borderColor: '$red9',
      },
      
      success: {
        borderColor: '$green9',
      },
      
      warning: {
        borderColor: '$orange9',
      },
    },
  },
})

// Component Tooltip principal
export const Tooltip = forwardRef(
  (
    {
      children,
      content,
      placement = 'top',
      delay = 0,
      variant = 'default',
      showArrow = true,
      ...props
    },
    ref
  ) => {
    return (
      <StyledTooltip
        ref={ref}
        placement={placement}
        delay={delay}
        {...props}
      >
        <StyledTooltipTrigger asChild>
          {children}
        </StyledTooltipTrigger>
        
        <StyledTooltipContent
          variant={variant}
          enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
          scale={1}
          x={0}
          y={0}
          opacity={1}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          {showArrow && <StyledTooltipArrow variant={variant} />}
          
          <StyledTooltipText variant={variant}>
            {content}
          </StyledTooltipText>
        </StyledTooltipContent>
      </StyledTooltip>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export default Tooltip