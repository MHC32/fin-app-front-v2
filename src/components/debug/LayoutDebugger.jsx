// src/components/debug/LayoutDebugger.jsx
import { useEffect, useRef } from 'react'
import { YStack, XStack, Text } from 'tamagui'

/**
 * 🔍 LAYOUT DEBUGGER - AFFICHE DIMENSIONS ET LOGS
 * 
 * Usage: Wrapper n'importe quel composant pour voir ses dimensions
 * 
 * <LayoutDebugger label="Main Content" color="blue">
 *   <YStack>...</YStack>
 * </LayoutDebugger>
 */

export function LayoutDebugger({ 
  children, 
  label = 'Component', 
  color = 'red',
  showBorder = true,
  showInfo = true 
}) {
  const ref = useRef(null)
  
  useEffect(() => {
    if (!ref.current) return
    
    const measure = () => {
      const rect = ref.current.getBoundingClientRect()
      const computed = window.getComputedStyle(ref.current)
      
      console.group(`📐 ${label}`)
      console.log('Dimensions:', {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
      })
      console.log('Computed Styles:', {
        display: computed.display,
        position: computed.position,
        flex: computed.flex,
        flexGrow: computed.flexGrow,
        flexShrink: computed.flexShrink,
        flexBasis: computed.flexBasis,
        width: computed.width,
        minWidth: computed.minWidth,
        maxWidth: computed.maxWidth,
        marginLeft: computed.marginLeft,
        marginRight: computed.marginRight,
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
      })
      console.log('Scroll:', {
        scrollWidth: ref.current.scrollWidth,
        clientWidth: ref.current.clientWidth,
        offsetWidth: ref.current.offsetWidth,
        hasHorizontalScroll: ref.current.scrollWidth > ref.current.clientWidth,
      })
      console.groupEnd()
    }
    
    // Mesurer au mount
    measure()
    
    // Mesurer au resize
    window.addEventListener('resize', measure)
    
    // Mesurer après un court délai (pour laisser le temps au layout)
    const timer = setTimeout(measure, 100)
    
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(timer)
    }
  }, [label])
  
  return (
    <div
      ref={ref}
      style={{
        border: showBorder ? `2px solid ${color}` : 'none',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Label en haut */}
      {showInfo && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: color,
            color: 'white',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: 'bold',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {label}
        </div>
      )}
      
      {children}
    </div>
  )
}

export default LayoutDebugger