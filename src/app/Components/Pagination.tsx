'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
    page: number
    totalPages: number
    total: number
    perPage: number
    onPageChange: (page: number) => void
    onPerPageChange?: (perPage: number) => void
    showPerPageSelector?: boolean
    perPageOptions?: number[]
}

export default function Pagination({
    page,
    totalPages,
    total,
    perPage,
    onPageChange,
    onPerPageChange,
    showPerPageSelector = true,
    perPageOptions = [10, 25, 50, 100],
}: PaginationProps) {
    const startItem = (page - 1) * perPage + 1
    const endItem = Math.min(page * perPage, total)

    // Generate page numbers
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            pages.push(1)

            if (page > 3) pages.push('...')

            const start = Math.max(2, page - 1)
            const end = Math.min(totalPages - 1, page + 1)

            for (let i = start; i <= end; i++) pages.push(i)

            if (page < totalPages - 2) pages.push('...')

            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200">
            {/* Info */}
            <div className="text-sm text-gray-600">
                Affichage de <span className="font-medium">{startItem}</span> à{' '}
                <span className="font-medium">{endItem}</span> sur{' '}
                <span className="font-medium">{total}</span> résultats
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                {/* Per page selector */}
                {showPerPageSelector && onPerPageChange && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Par page:</span>
                        <select
                            value={perPage}
                            onChange={(e) => onPerPageChange(Number(e.target.value))}
                            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                            {perPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Page navigation */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={page === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Première page"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Page précédente"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                        {getPageNumbers().map((pageNum, idx) => (
                            pageNum === '...' ? (
                                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
                            ) : (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum as number)}
                                    className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors ${page === pageNum
                                            ? 'bg-teal-500 text-white'
                                            : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            )
                        ))}
                    </div>

                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Page suivante"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={page === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Dernière page"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
