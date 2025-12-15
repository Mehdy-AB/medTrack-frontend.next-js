'use client'

import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    debounceMs?: number
    className?: string
}

export default function SearchInput({
    value,
    onChange,
    placeholder = 'Rechercher...',
    debounceMs = 300,
    className = '',
}: SearchInputProps) {
    const [localValue, setLocalValue] = useState(value)

    // Sync with external value
    useEffect(() => {
        setLocalValue(value)
    }, [value])

    // Debounced onChange
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                onChange(localValue)
            }
        }, debounceMs)

        return () => clearTimeout(timer)
    }, [localValue, debounceMs, onChange, value])

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
            />
            {localValue && (
                <button
                    onClick={() => {
                        setLocalValue('')
                        onChange('')
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
            )}
        </div>
    )
}
