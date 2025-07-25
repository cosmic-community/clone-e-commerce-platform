import { Suspense } from 'react'
import { Metadata } from 'next'
import SearchResults from '@/components/SearchResults'
import SearchBar from '@/components/SearchBar'

export const metadata: Metadata = {
  title: 'Search - Nike',
  description: 'Search for Nike products, collections, and more',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; type?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // In Next.js 15+, searchParams are now Promises and must be awaited
  const params = await searchParams
  const query = params.q || ''
  const category = params.category || ''
  const type = params.type || ''

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">Search</h1>
          <SearchBar initialQuery={query} />
        </div>
        
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults 
            query={query} 
            category={category} 
            type={type} 
          />
        </Suspense>
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}