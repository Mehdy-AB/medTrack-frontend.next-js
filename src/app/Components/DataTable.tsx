'use client'

import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import { SortDirection } from '@/hooks/useFilters'
import Pagination from './Pagination'

// Column definition
export interface Column<T> {
    key: string
    header: string
    sortable?: boolean
    width?: string
    render?: (item: T, index: number) => React.ReactNode
    className?: string
}

// Table props
interface DataTableProps<T> {
    data: T[]
    columns: Column<T>[]
    keyExtractor: (item: T) => string
    loading?: boolean
    error?: string | null
    emptyMessage?: string
    // Sorting
    sortField?: string | null
    sortDirection?: SortDirection
    onSort?: (field: string) => void
    // Pagination
    pagination?: {
        page: number
        perPage: number
        total: number
        totalPages: number
        onPageChange: (page: number) => void
        onPerPageChange?: (perPage: number) => void
    }
    // Actions
    onRowClick?: (item: T) => void
    className?: string
}

export default function DataTable<T>({
    data,
    columns,
    keyExtractor,
    loading = false,
    error = null,
    emptyMessage = 'Aucune donnée disponible',
    sortField,
    sortDirection,
    onSort,
    pagination,
    onRowClick,
    className = '',
}: DataTableProps<T>) {
    const renderSortIcon = (field: string) => {
        if (!onSort) return null

        const isActive = sortField === field

        return (
            <span className="inline-flex flex-col ml-1">
                <ChevronUp
                    className={`w-3 h-3 -mb-1 ${isActive && sortDirection === 'asc' ? 'text-teal-500' : 'text-gray-300'}`}
                />
                <ChevronDown
                    className={`w-3 h-3 ${isActive && sortDirection === 'desc' ? 'text-teal-500' : 'text-gray-300'}`}
                />
            </span>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <p className="text-red-600">{error}</p>
            </div>
        )
    }

    return (
        <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    style={{ width: column.width }}
                                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase ${column.sortable && onSort ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                                        } ${column.className || ''}`}
                                    onClick={() => column.sortable && onSort?.(column.key)}
                                >
                                    <div className="flex items-center">
                                        {column.header}
                                        {column.sortable && renderSortIcon(column.key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto" />
                                    <p className="mt-2 text-sm text-gray-500">Chargement...</p>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr
                                    key={keyExtractor(item)}
                                    onClick={() => onRowClick?.(item)}
                                    className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''
                                        }`}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className={`px-6 py-4 text-sm text-gray-900 ${column.className || ''}`}
                                        >
                                            {column.render
                                                ? column.render(item, index)
                                                : (item as Record<string, unknown>)[column.key] as React.ReactNode
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && !loading && data.length > 0 && (
                <Pagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    total={pagination.total}
                    perPage={pagination.perPage}
                    onPageChange={pagination.onPageChange}
                    onPerPageChange={pagination.onPerPageChange}
                />
            )}
        </div>
    )
}
