import { Sheet as TamaguiSheet, styled, YStack, XStack } from 'tamagui'
import { X } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'
import { IconButton } from '../buttons'

/**
 * 📱 DRAWER COMPONENT
 * 
 * Panneau latéral pour navigation ou contenu
 * Utilise le Sheet natif de Tamagui avec styled()
 * 
 * @example
 * <Drawer open={open} onOpenChange={setOpen} position="right">
 *   <Drawer.Trigger>
 *     <Button>Ouvrir Drawer</Button>
 *   </Drawer.Trigger>
 *   
 *   <Drawer.Content>
 *     <Drawer.Header>
 *       <Drawer.Title>Menu</Drawer.Title>
 *     </Drawer.Header>
 *     
 *     <Drawer.Body>
 *       Contenu du drawer
 *     </Drawer.Body>
 *   </Drawer.Content>
 * </Drawer>
 */

// Drawer Root (Sheet)
export const StyledDrawer = styled(TamaguiSheet, {
  name: 'Drawer',
  modal: true,
  dismissOnSnapToBottom: true,
})

// Drawer Trigger
export const StyledDrawerTrigger = styled(TamaguiSheet.Trigger, {
  name: 'DrawerTrigger',
})

// Drawer Overlay
export const StyledDrawerOverlay = styled(TamaguiSheet.Overlay, {
  name: 'DrawerOverlay',
  
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  
  animation: 'quick',
  enterStyle: {
    opacity: 0,
  },
  exitStyle: {
    opacity: 0,
  },
})

// Drawer Frame
export const StyledDrawerFrame = styled(TamaguiSheet.Frame, {
  name: 'DrawerFrame',
  
  backgroundColor: '$background',
  padding: 0,
  gap: 0,
  
  // Shadow
  shadowColor: '$shadowColor',
  shadowRadius: 30,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.3,
  
  variants: {
    position: {
      left: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 320,
        maxWidth: '80%',
      },
      
      right: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 320,
        maxWidth: '80%',
      },
      
      top: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 'auto',
        maxHeight: '80%',
      },
      
      bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'auto',
        maxHeight: '80%',
      },
    },
    
    size: {
      sm: {
        width: 280,
      },
      md: {
        width: 320,
      },
      lg: {
        width: 400,
      },
      xl: {
        width: 500,
      },
    },
  },
  
  defaultVariants: {
    position: 'right',
    size: 'md',
  },
})

// Drawer Handle (pour mobile - bottom drawer)
export const StyledDrawerHandle = styled(TamaguiSheet.Handle, {
  name: 'DrawerHandle',
  
  backgroundColor: '$borderColor',
  width: 40,
  height: 4,
  borderRadius: '$round',
  marginVertical: '$3',
  alignSelf: 'center',
})

// Drawer Header
export const StyledDrawerHeader = styled(YStack, {
  name: 'DrawerHeader',
  
  padding: '$6',
  paddingBottom: '$4',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  gap: '$2',
  position: 'relative',
})

// Drawer Title
export const StyledDrawerTitle = styled(YStack, {
  name: 'DrawerTitle',
  
  fontSize: 20,
  fontWeight: '600',
  color: '$color',
  paddingRight: '$8', // Space for close button
})

// Drawer Body
export const StyledDrawerBody = styled(TamaguiSheet.ScrollView, {
  name: 'DrawerBody',
  
  padding: '$6',
  gap: '$4',
  flex: 1,
})

// Component Drawer principal
export const Drawer = forwardRef(
  (
    {
      children,
      open,
      onOpenChange,
      defaultOpen,
      position = 'right',
      modal = true,
      dismissOnSnapToBottom = true,
      dismissOnOverlayPress = true,
      ...props
    },
    ref
  ) => {
    return (
      <StyledDrawer
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        modal={modal}
        dismissOnSnapToBottom={dismissOnSnapToBottom}
        dismissOnOverlayPress={dismissOnOverlayPress}
        position={position}
        {...props}
      >
        {children}
      </StyledDrawer>
    )
  }
)

Drawer.displayName = 'Drawer'

// Drawer.Trigger
const DrawerTrigger = forwardRef((props, ref) => {
  return <StyledDrawerTrigger ref={ref} asChild {...props} />
})

DrawerTrigger.displayName = 'DrawerTrigger'

// Drawer.Overlay
const DrawerOverlay = forwardRef((props, ref) => {
  return <StyledDrawerOverlay ref={ref} {...props} />
})

DrawerOverlay.displayName = 'DrawerOverlay'

// Drawer.Handle
const DrawerHandle = forwardRef((props, ref) => {
  return <StyledDrawerHandle ref={ref} {...props} />
})

DrawerHandle.displayName = 'DrawerHandle'

// Drawer.Content
const DrawerContent = forwardRef(
  (
    {
      children,
      position = 'right',
      size = 'md',
      showHandle = false,
      showClose = true,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <StyledDrawerOverlay />
        
        <StyledDrawerFrame
          ref={ref}
          position={position}
          size={size}
          {...props}
        >
          {/* Handle pour mobile */}
          {showHandle && <StyledDrawerHandle />}
          
          {children}
          
          {/* Close button */}
          {showClose && (
            <IconButton
              size="$3"
              variant="ghost"
              circular
              position="absolute"
              top="$4"
              right="$4"
              zIndex={1}
              onPress={() => {
                // Close drawer
                props.onPress?.()
              }}
            >
              <X size={18} />
            </IconButton>
          )}
        </StyledDrawerFrame>
      </>
    )
  }
)

DrawerContent.displayName = 'DrawerContent'

// Drawer.Header
const DrawerHeader = forwardRef((props, ref) => {
  return <StyledDrawerHeader ref={ref} {...props} />
})

DrawerHeader.displayName = 'DrawerHeader'

// Drawer.Title
const DrawerTitle = forwardRef((props, ref) => {
  return <StyledDrawerTitle ref={ref} {...props} />
})

DrawerTitle.displayName = 'DrawerTitle'

// Drawer.Body
const DrawerBody = forwardRef((props, ref) => {
  return <StyledDrawerBody ref={ref} {...props} />
})

DrawerBody.displayName = 'DrawerBody'

// Attacher les sous-composants
Drawer.Trigger = DrawerTrigger
Drawer.Overlay = DrawerOverlay
Drawer.Handle = DrawerHandle
Drawer.Content = DrawerContent
Drawer.Header = DrawerHeader
Drawer.Title = DrawerTitle
Drawer.Body = DrawerBody

export default Drawer