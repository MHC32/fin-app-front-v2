import { Popover as TamaguiPopover, styled, YStack, XStack, Text } from 'tamagui'
import { X } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'
import { IconButton } from '../buttons'

/**
 * 💭 POPOVER COMPONENT
 * 
 * Popover contextuel pour afficher du contenu riche
 * Utilise le Popover natif de Tamagui avec styled()
 * 
 * @example
 * <Popover>
 *   <Popover.Trigger>
 *     <Button>Ouvrir Popover</Button>
 *   </Popover.Trigger>
 *   
 *   <Popover.Content>
 *     <Popover.Header>
 *       <Popover.Title>Titre</Popover.Title>
 *     </Popover.Header>
 *     <Popover.Body>
 *       Contenu du popover
 *     </Popover.Body>
 *   </Popover.Content>
 * </Popover>
 */

// Popover Root
export const StyledPopover = styled(TamaguiPopover, {
  name: 'Popover',
  allowFlip: true,
  placement: 'bottom',
})

// Popover Trigger
export const StyledPopoverTrigger = styled(TamaguiPopover.Trigger, {
  name: 'PopoverTrigger',
})

// Popover Content
export const StyledPopoverContent = styled(TamaguiPopover.Content, {
  name: 'PopoverContent',
  
  backgroundColor: '$background',
  borderRadius: '$3',
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: 0,
  minWidth: 200,
  maxWidth: 400,
  
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
        minWidth: 180,
        maxWidth: 300,
      },
      md: {
        minWidth: 200,
        maxWidth: 400,
      },
      lg: {
        minWidth: 300,
        maxWidth: 500,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
})

// Popover Arrow
export const StyledPopoverArrow = styled(TamaguiPopover.Arrow, {
  name: 'PopoverArrow',
  borderColor: '$borderColor',
})

// Popover Header
export const StyledPopoverHeader = styled(YStack, {
  name: 'PopoverHeader',
  
  padding: '$4',
  paddingBottom: '$3',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  gap: '$1',
  position: 'relative',
})

// Popover Title
export const StyledPopoverTitle = styled(Text, {
  name: 'PopoverTitle',
  
  fontSize: 16,
  fontWeight: '600',
  color: '$color',
  paddingRight: '$8', // Space for close button
})

// Popover Description
export const StyledPopoverDescription = styled(Text, {
  name: 'PopoverDescription',
  
  fontSize: 13,
  color: '$colorMuted',
})

// Popover Body
export const StyledPopoverBody = styled(YStack, {
  name: 'PopoverBody',
  
  padding: '$4',
  gap: '$3',
})

// Popover Footer
export const StyledPopoverFooter = styled(XStack, {
  name: 'PopoverFooter',
  
  padding: '$4',
  paddingTop: '$3',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  gap: '$2',
  justifyContent: 'flex-end',
})

// Popover Close
export const StyledPopoverClose = styled(TamaguiPopover.Close, {
  name: 'PopoverClose',
})

// Component Popover principal
export const Popover = forwardRef(
  (
    {
      children,
      open,
      onOpenChange,
      defaultOpen,
      placement = 'bottom',
      ...props
    },
    ref
  ) => {
    return (
      <StyledPopover
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        placement={placement}
        {...props}
      >
        {children}
      </StyledPopover>
    )
  }
)

Popover.displayName = 'Popover'

// Popover.Trigger
const PopoverTrigger = forwardRef((props, ref) => {
  return <StyledPopoverTrigger ref={ref} asChild {...props} />
})

PopoverTrigger.displayName = 'PopoverTrigger'

// Popover.Content
const PopoverContent = forwardRef(
  (
    {
      children,
      size = 'md',
      showArrow = true,
      showClose = false,
      ...props
    },
    ref
  ) => {
    return (
      <StyledPopoverContent
        ref={ref}
        size={size}
        {...props}
      >
        {showArrow && <StyledPopoverArrow />}
        
        {children}
        
        {/* Close button optionnel */}
        {showClose && (
          <StyledPopoverClose asChild>
            <IconButton
              size="$3"
              variant="ghost"
              circular
              position="absolute"
              top="$3"
              right="$3"
              zIndex={1}
            >
              <X size={16} />
            </IconButton>
          </StyledPopoverClose>
        )}
      </StyledPopoverContent>
    )
  }
)

PopoverContent.displayName = 'PopoverContent'

// Popover.Header
const PopoverHeader = forwardRef((props, ref) => {
  return <StyledPopoverHeader ref={ref} {...props} />
})

PopoverHeader.displayName = 'PopoverHeader'

// Popover.Title
const PopoverTitle = forwardRef((props, ref) => {
  return <StyledPopoverTitle ref={ref} {...props} />
})

PopoverTitle.displayName = 'PopoverTitle'

// Popover.Description
const PopoverDescription = forwardRef((props, ref) => {
  return <StyledPopoverDescription ref={ref} {...props} />
})

PopoverDescription.displayName = 'PopoverDescription'

// Popover.Body
const PopoverBody = forwardRef((props, ref) => {
  return <StyledPopoverBody ref={ref} {...props} />
})

PopoverBody.displayName = 'PopoverBody'

// Popover.Footer
const PopoverFooter = forwardRef((props, ref) => {
  return <StyledPopoverFooter ref={ref} {...props} />
})

PopoverFooter.displayName = 'PopoverFooter'

// Popover.Close
const PopoverClose = forwardRef((props, ref) => {
  return <StyledPopoverClose ref={ref} asChild {...props} />
})

PopoverClose.displayName = 'PopoverClose'

// Attacher les sous-composants
Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
Popover.Arrow = StyledPopoverArrow
Popover.Header = PopoverHeader
Popover.Title = PopoverTitle
Popover.Description = PopoverDescription
Popover.Body = PopoverBody
Popover.Footer = PopoverFooter
Popover.Close = PopoverClose

export default Popover