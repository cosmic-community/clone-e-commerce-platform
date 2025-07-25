'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import InlineSearch from './InlineSearch'

interface SearchBarProps {
  initialQuery?: string
  showInlineResults?: boolean
  onClose?: () => void
}

function SearchBarContent({ 
  initialQuery = '', 
  showInlineResults = true,
  onClose 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Navigate to dedicated search page
      const params = new URLSearchParams(searchParams.toString())
      params.set('q', query.trim())
      router.push(`/search?${params.toString()}`)
      setShowResults(false)
      onClose?.()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setShowResults(value.length > 2 && showInlineResults)
  }

  const handleBlur = () => {
    // Delay hiding results to allow clicking on results
    setTimeout(() => setShowResults(false), 200)
  }

  const handleFocus = () => {
    if (query.length > 2 && showInlineResults) {
      setShowResults(true)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setShowResults(false)
  }

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-black focus-within:ring-opacity-20">
          <Search className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search for products..."
            className="bg-transparent outline-none text-black placeholder-gray-500 flex-1 text-base"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
        
        {/* Hidden submit button for form submission */}
        <button type="submit" className="sr-only">Search</button>
      </form>

      {/* Inline search results */}
      {showResults && showInlineResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <InlineSearch 
            query={query} 
            onResultClick={() => {
              setShowResults(false)
              onClose?.()
            }} 
          />
        </div>
      )}
    </div>
  )
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense fallback={
      <div className="relative w-full max-w-md">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
          <Search className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none text-black placeholder-gray-500 flex-1 text-base"
            disabled
          />
        </div>
      </div>
    }>
      <SearchBarContent {...props} />
    </Suspense>
  )
}