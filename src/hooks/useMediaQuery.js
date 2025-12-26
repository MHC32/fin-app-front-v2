// src/app/hooks/useMediaQuery.js
import { useMedia } from 'tamagui'

/**
 * 🎯 USE MEDIA QUERY HOOK - TAMAGUI WRAPPER
 * 
 * Wrapper autour de useMedia() de Tamagui
 * Fournit des helpers semantic pour responsive
 * 
 * Breakpoints (from tamagui.config.js):
 * - sm: < 768px (Mobile)
 * - lg: < 1200px (Tablet)
 * - gtLg: >= 1201px (Desktop)
 */

export function useMediaQuery() {
  const media = useMedia()
  
  return {
    // Raw Tamagui media
    ...media,
    
    // Semantic helpers
    isMobile: media.sm,           // < 768px
    isTablet: media.lg && !media.sm,  // 768px - 1200px
    isDesktop: media.gtLg,        // >= 1201px
    
    // Width (for debugging)
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
  }
}

export default useMediaQuery