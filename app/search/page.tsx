import { Suspense } from 'react'
import SearchResults from '@/components/SearchResults'
import SearchBar from '@/components/SearchBar'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    type?: string
  }>
}

function SearchContent({ query, category, type }: { query: string; category?: string; type?: string }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-6">Search</h1>
          <div className="max-w-2xl">
            <SearchBar 
              initialQuery={query} 
              showInlineResults={false}
            />
          </div>
        </div>

        {/* Search Results */}
        <SearchResults 
          query={query} 
          category={category}
          type={type}
        />
      </div>
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const category = params.category
  const type = params.type

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-full max-w-2xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchContent query={query} category={category} type={type} />
    </Suspense>
  )
}