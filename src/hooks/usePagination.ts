'use client'

import { useState, useCallback, useMemo } from 'react'

export interface PaginationState {
    page: number
    perPage: number
    total: number
}

export interface PaginationActions {
    setPage: (page: number) => void
    setPerPage: (perPage: number) => void
    setTotal: (total: number) => void
    nextPage: () => void
    prevPage: () => void
    goToFirst: () => void
    goToLast: () => void
}

export interface UsePaginationReturn extends PaginationState, PaginationActions {
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
    startIndex: number
    endIndex: number
    pageNumbers: number[]
}

export function usePagination(initialPerPage = 10): UsePaginationReturn {
    const [state, setState] = useState<PaginationState>({
        page: 1,
        perPage: initialPerPage,
        total: 0,
    })

    const totalPages = useMemo(() =>
        Math.max(1, Math.ceil(state.total / state.perPage)),
        [state.total, state.perPage]
    )

    const hasNext = state.page < totalPages
    const hasPrev = state.page > 1

    const startIndex = (state.page - 1) * state.perPage
    const endIndex = Math.min(startIndex + state.perPage, state.total)

    // Generate page numbers for pagination UI
    const pageNumbers = useMemo(() => {
        const pages: number[] = []
        const maxVisible = 5
        let start = Math.max(1, state.page - Math.floor(maxVisible / 2))
        let end = Math.min(totalPages, start + maxVisible - 1)

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1)
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
        return pages
    }, [state.page, totalPages])

    const setPage = useCallback((page: number) => {
        setState(prev => ({ ...prev, page: Math.max(1, Math.min(page, Math.ceil(prev.total / prev.perPage) || 1)) }))
    }, [])

    const setPerPage = useCallback((perPage: number) => {
        setState(prev => ({ ...prev, perPage, page: 1 }))
    }, [])

    const setTotal = useCallback((total: number) => {
        setState(prev => ({ ...prev, total }))
    }, [])

    const nextPage = useCallback(() => {
        setState(prev => ({ ...prev, page: Math.min(prev.page + 1, Math.ceil(prev.total / prev.perPage)) }))
    }, [])

    const prevPage = useCallback(() => {
        setState(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))
    }, [])

    const goToFirst = useCallback(() => {
        setState(prev => ({ ...prev, page: 1 }))
    }, [])

    const goToLast = useCallback(() => {
        setState(prev => ({ ...prev, page: Math.ceil(prev.total / prev.perPage) || 1 }))
    }, [])

    return {
        ...state,
        totalPages,
        hasNext,
        hasPrev,
        startIndex,
        endIndex,
        pageNumbers,
        setPage,
        setPerPage,
        setTotal,
        nextPage,
        prevPage,
        goToFirst,
        goToLast,
    }
}

export default usePagination
