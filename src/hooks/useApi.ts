'use client'

import { useState, useCallback } from 'react'
import { AxiosError, AxiosResponse } from 'axios'

// Generic API state
export interface ApiState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

// Hook for single API calls
export function useApi<T, P = void>() {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    })

    const execute = useCallback(async (
        apiCall: (params: P) => Promise<AxiosResponse<T>>,
        params?: P
    ) => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await apiCall(params as P)
            setState({ data: response.data, loading: false, error: null })
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ error?: string; message?: string }>
            const message = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'An error occurred'
            setState({ data: null, loading: false, error: message })
            throw err
        }
    }, [])

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null })
    }, [])

    return { ...state, execute, reset }
}

// Hook for paginated API calls
export interface PaginatedData<T> {
    items: T[]
    total: number
    page: number
    perPage: number
    totalPages: number
}

export function usePaginatedApi<T>() {
    const [state, setState] = useState<ApiState<PaginatedData<T>>>({
        data: null,
        loading: false,
        error: null,
    })

    const execute = useCallback(async <R>(
        apiCall: () => Promise<AxiosResponse<R>>,
        transform?: (response: R) => PaginatedData<T>
    ) => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await apiCall()
            const data = transform
                ? transform(response.data)
                : response.data as unknown as PaginatedData<T>
            setState({ data, loading: false, error: null })
            return data
        } catch (err) {
            const error = err as AxiosError<{ error?: string; message?: string }>
            const message = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'An error occurred'
            setState({ data: null, loading: false, error: message })
            throw err
        }
    }, [])

    return { ...state, execute }
}

export default useApi
