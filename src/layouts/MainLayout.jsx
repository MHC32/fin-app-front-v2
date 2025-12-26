// src/layouts/MainLayout.jsx - VERSION FINALE
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { YStack } from 'tamagui'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import BurgerMenu from '../components/layout/BurgerMenu'
import MobileOverlay from '../components/layout/MobileOverlay'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * 🏗️ MAIN LAYOUT FINAL - FINAPP HAITI
 * 
 * ARCHITECTURE:
 * - Left sidebar: position: fixed, left: 0, width: 80px
 * - Right sidebar: position: fixed, right: 0, width: 320px
 * - Main content: margin-left: 80px, margin-right: 320px, overflow: auto
 * 
 * Chaque partie a son propre scroll INDÉPENDANT:
 * - Left: pas de scroll (navigation simple)
 * - Right: overflow: auto (scroll son contenu)
 * - Main: overflow: auto (scroll son contenu)
 * 
 * Responsive:
 * - Desktop (>1200px): 3 colonnes, sidebars fixes
 * - Tablet (768-1200px): 2 colonnes, right caché
 * - Mobile (<768px): 1 colonne, left overlay
 */

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isMobile, isTablet } = useMediaQuery()
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)
  
  return (
    <>
      {/* Burger Menu - Mobile only */}
      {isMobile && <BurgerMenu onToggle={toggleSidebar} />}
      
      {/* Mobile Overlay */}
      {isMobile && <MobileOverlay isOpen={sidebarOpen} onClose={closeSidebar} />}
      
      {/* LEFT SIDEBAR - Fixed à gauche */}
      <LeftSidebar mobileOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* RIGHT SIDEBAR - Fixed à droite (desktop only) */}
      {!isMobile && !isTablet && <RightSidebar />}
      
      {/* MAIN CONTENT - Scroll indépendant */}
      <YStack
        flex={1}
        backgroundColor="$background"
        minHeight="100vh"
        overflow="auto"
        // Margins pour laisser place aux sidebars fixes
        marginLeft={isMobile ? 0 : 80}
        marginRight={isMobile || isTablet ? 0 : 320}
        paddingTop={isMobile ? 80 : 0}
        paddingHorizontal={isMobile ? 20 : 0}
      >
        <Outlet />
      </YStack>
    </>
  )
}

export default MainLayout