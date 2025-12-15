'use client'

import { Filter, X } from 'lucide-react'

interface FilterOption {
    label: string
    value: string
}

interface FilterDropdownProps {
    label: string
    value: string
    options: FilterOption[]
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function FilterDropdown({
    label,
    value,
    options,
    onChange,
    placeholder = 'Tous',
    className = '',
}: FilterDropdownProps) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-xs font-medium text-gray-600">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

interface FilterBarProps {
    children: React.ReactNode
    onClear?: () => void
    hasActiveFilters?: boolean
    className?: string
}

export function FilterBar({
    children,
    onClear,
    hasActiveFilters = false,
    className = '',
}: FilterBarProps) {
    return (
        <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
            <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filtres</span>
                {hasActiveFilters && onClear && (
                    <button
                        onClick={onClear}
                        className="ml-auto flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700"
                    >
                        <X className="w-3 h-3" />
                        Réinitialiser
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-4">
                {children}
            </div>
        </div>
    )
}

export default FilterDropdown
