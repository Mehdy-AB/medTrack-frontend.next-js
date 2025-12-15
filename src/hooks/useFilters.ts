'use client'

import { useState, useCallback, useMemo } from 'react'

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
    field: string | null
    direction: SortDirection
}

export interface FilterValue {
    [key: string]: string | number | boolean | string[] | undefined
}

export interface UseFiltersReturn<T extends FilterValue> {
    filters: T
    sort: SortState
    search: string
    setFilter: <K extends keyof T>(key: K, value: T[K]) => void
    setFilters: (filters: Partial<T>) => void
    clearFilter: (key: keyof T) => void
    clearAllFilters: () => void
    setSort: (field: string) => void
    clearSort: () => void
    setSearch: (query: string) => void
    clearSearch: () => void
    hasActiveFilters: boolean
    activeFilterCount: number
    // For API query params
    toQueryParams: () => Record<string, string>
}

export function useFilters<T extends FilterValue>(
    initialFilters: T
): UseFiltersReturn<T> {
    const [filters, setFiltersState] = useState<T>(initialFilters)
    const [sort, setSortState] = useState<SortState>({ field: null, direction: null })
    const [search, setSearchState] = useState('')

    const setFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
        setFiltersState(prev => ({ ...prev, [key]: value }))
    }, [])

    const setFilters = useCallback((newFilters: Partial<T>) => {
        setFiltersState(prev => ({ ...prev, ...newFilters }))
    }, [])

    const clearFilter = useCallback((key: keyof T) => {
        setFiltersState(prev => ({ ...prev, [key]: initialFilters[key] }))
    }, [initialFilters])

    const clearAllFilters = useCallback(() => {
        setFiltersState(initialFilters)
    }, [initialFilters])

    const setSort = useCallback((field: string) => {
        setSortState(prev => {
            if (prev.field === field) {
                // Cycle: asc -> desc -> null
                if (prev.direction === 'asc') return { field, direction: 'desc' }
                if (prev.direction === 'desc') return { field: null, direction: null }
            }
            return { field, direction: 'asc' }
        })
    }, [])

    const clearSort = useCallback(() => {
        setSortState({ field: null, direction: null })
    }, [])

    const setSearch = useCallback((query: string) => {
        setSearchState(query)
    }, [])

    const clearSearch = useCallback(() => {
        setSearchState('')
    }, [])

    const activeFilterCount = useMemo(() => {
        return Object.entries(filters).filter(([key, value]) => {
            const initial = initialFilters[key as keyof T]
            return value !== initial && value !== '' && value !== undefined
        }).length
    }, [filters, initialFilters])

    const hasActiveFilters = activeFilterCount > 0 || search !== '' || sort.field !== null

    const toQueryParams = useCallback(() => {
        const params: Record<string, string> = {}

        // Add filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '' && value !== initialFilters[key as keyof T]) {
                if (Array.isArray(value)) {
                    params[key] = value.join(',')
                } else {
                    params[key] = String(value)
                }
            }
        })

        // Add search
        if (search) {
            params.search = search
        }

        // Add sort
        if (sort.field && sort.direction) {
            params.sort = sort.direction === 'desc' ? `-${sort.field}` : sort.field
        }

        return params
    }, [filters, search, sort, initialFilters])

    return {
        filters,
        sort,
        search,
        setFilter,
        setFilters,
        clearFilter,
        clearAllFilters,
        setSort,
        clearSort,
        setSearch,
        clearSearch,
        hasActiveFilters,
        activeFilterCount,
        toQueryParams,
    }
}

export default useFilters
