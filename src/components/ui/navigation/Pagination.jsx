import { styled, XStack, Text } from 'tamagui'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@tamagui/lucide-icons'
import { forwardRef } from 'react'
import { IconButton } from '../buttons'

/**
 * 📄 PAGINATION COMPONENT
 * 
 * Pagination pour listes de données
 * Avec numéros de page et navigation
 * 
 * @example
 * <Pagination 
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 * />
 * 
 * <Pagination 
 *   currentPage={1}
 *   totalPages={20}
 *   onPageChange={setPage}
 *   showFirstLast
 *   showPageNumbers
 *   maxPageNumbers={5}
 * />
 */

// Pagination Root
export const StyledPagination = styled(XStack, {
  name: 'Pagination',
  
  alignItems: 'center',
  gap: '$2',
  
  variants: {
    size: {
      sm: {
        gap: '$1',
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

// Page Number Button
export const StyledPageButton = styled(XStack, {
  name: 'PageButton',
  
  width: 36,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  
  pressStyle: {
    backgroundColor: '$backgroundPress',
    scale: 0.95,
  },
  
  variants: {
    active: {
      true: {
        backgroundColor: '$primary',
        
        hoverStyle: {
          backgroundColor: '$primaryHover',
        },
        
        pressStyle: {
          backgroundColor: '$primaryPress',
        },
      },
    },
    
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        
        hoverStyle: {
          backgroundColor: 'transparent',
        },
        
        pressStyle: {
          scale: 1,
        },
      },
    },
  },
})

// Page Number Text
export const StyledPageText = styled(Text, {
  name: 'PageText',
  
  fontSize: 14,
  fontWeight: '500',
  color: '$color',
  userSelect: 'none',
  
  variants: {
    active: {
      true: {
        color: 'white',
        fontWeight: '600',
      },
    },
  },
})

// Helper pour générer les numéros de page
const getPageNumbers = (currentPage, totalPages, maxPageNumbers) => {
  if (totalPages <= maxPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(maxPageNumbers / 2)
  let start = Math.max(currentPage - half, 1)
  let end = Math.min(start + maxPageNumbers - 1, totalPages)

  if (end - start + 1 < maxPageNumbers) {
    start = Math.max(end - maxPageNumbers + 1, 1)
  }

  const pages = []
  
  // Toujours montrer la première page
  if (start > 1) {
    pages.push(1)
    if (start > 2) {
      pages.push('...')
    }
  }

  // Pages du milieu
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Toujours montrer la dernière page
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push('...')
    }
    pages.push(totalPages)
  }

  return pages
}

export const Pagination = forwardRef(
  (
    {
      currentPage = 1,
      totalPages = 1,
      onPageChange,
      showFirstLast = false,
      showPageNumbers = true,
      maxPageNumbers = 5,
      size = 'md',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages

    const handlePageChange = (page) => {
      if (disabled) return
      if (page < 1 || page > totalPages) return
      if (page === currentPage) return
      onPageChange?.(page)
    }

    const pageNumbers = showPageNumbers 
      ? getPageNumbers(currentPage, totalPages, maxPageNumbers)
      : []

    return (
      <StyledPagination ref={ref} size={size} {...props}>
        {/* First Page Button */}
        {showFirstLast && (
          <IconButton
            size="$4"
            variant="ghost"
            disabled={isFirstPage || disabled}
            onPress={() => handlePageChange(1)}
            aria-label="Première page"
          >
            <ChevronsLeft size={18} />
          </IconButton>
        )}

        {/* Previous Button */}
        <IconButton
          size="$4"
          variant="ghost"
          disabled={isFirstPage || disabled}
          onPress={() => handlePageChange(currentPage - 1)}
          aria-label="Page précédente"
        >
          <ChevronLeft size={18} />
        </IconButton>

        {/* Page Numbers */}
        {showPageNumbers && (
          <XStack gap="$1">
            {pageNumbers.map((page, index) => {
              if (page === '...') {
                return (
                  <XStack
                    key={`ellipsis-${index}`}
                    width={36}
                    height={36}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color="$colorMuted">...</Text>
                  </XStack>
                )
              }

              const isActive = page === currentPage

              return (
                <StyledPageButton
                  key={page}
                  active={isActive}
                  disabled={disabled}
                  onPress={() => handlePageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <StyledPageText active={isActive}>
                    {page}
                  </StyledPageText>
                </StyledPageButton>
              )
            })}
          </XStack>
        )}

        {/* Current/Total (si pas de page numbers) */}
        {!showPageNumbers && (
          <Text fontSize={14} color="$colorMuted" paddingHorizontal="$3">
            {currentPage} / {totalPages}
          </Text>
        )}

        {/* Next Button */}
        <IconButton
          size="$4"
          variant="ghost"
          disabled={isLastPage || disabled}
          onPress={() => handlePageChange(currentPage + 1)}
          aria-label="Page suivante"
        >
          <ChevronRight size={18} />
        </IconButton>

        {/* Last Page Button */}
        {showFirstLast && (
          <IconButton
            size="$4"
            variant="ghost"
            disabled={isLastPage || disabled}
            onPress={() => handlePageChange(totalPages)}
            aria-label="Dernière page"
          >
            <ChevronsRight size={18} />
          </IconButton>
        )}
      </StyledPagination>
    )
  }
)

Pagination.displayName = 'Pagination'

export default Pagination