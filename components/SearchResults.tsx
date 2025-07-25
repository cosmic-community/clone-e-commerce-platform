import { headers } from 'next/headers'
import { cosmic } from '@/lib/cosmic'
import { Product, Category, Article, Athlete } from '@/types'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { isValidLocale, DEFAULT_LOCALE } from '@/lib/locale'

interface SearchResultsProps {
  query: string
  category?: string
  type?: string
}

interface SearchResult {
  products: Product[]
  categories: Category[]
  articles: Article[]
  athletes: Athlete[]
  totalResults: number
}

async function searchContent(query: string, category?: string, type?: string): Promise<SearchResult> {
  if (!query.trim()) {
    return {
      products: [],
      categories: [],
      articles: [],
      athletes: [],
      totalResults: 0
    }
  }

  // Get locale from headers (set by middleware) - await the Promise in Next.js 15+
  const headersList = await headers()
  const locale = headersList.get('x-locale') || DEFAULT_LOCALE
  const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE

  console.log('Search locale:', validLocale, 'Query:', query) // Debug log

  const results: SearchResult = {
    products: [],
    categories: [],
    articles: [],
    athletes: [],
    totalResults: 0
  }

  try {
    // Search products with locale filtering
    if (!type || type === 'products') {
      try {
        let productQuery: any = {
          type: 'products',
          'metadata.locale': validLocale,
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { 'metadata.name': { $regex: query, $options: 'i' } },
            { 'metadata.description': { $regex: query, $options: 'i' } }
          ]
        }

        // Add category filter if specified
        if (category) {
          productQuery['metadata.category'] = category
        }

        console.log('Product search query:', JSON.stringify(productQuery, null, 2)) // Debug log

        const productResponse = await cosmic.objects
          .find(productQuery)
          .props(['id', 'title', 'slug', 'metadata'])
          .depth(1)
          .limit(20)

        results.products = productResponse.objects as Product[]
        console.log('Found products:', results.products.length) // Debug log
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching products:', error)
        }
      }
    }

    // Search categories with locale filtering
    if (!type || type === 'categories') {
      try {
        const categoryResponse = await cosmic.objects
          .find({
            type: 'categories',
            'metadata.locale': validLocale,
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { 'metadata.name': { $regex: query, $options: 'i' } },
              { 'metadata.description': { $regex: query, $options: 'i' } }
            ]
          })
          .props(['id', 'title', 'slug', 'metadata'])
          .depth(1)
          .limit(10)

        results.categories = categoryResponse.objects as Category[]
        console.log('Found categories:', results.categories.length) // Debug log
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching categories:', error)
        }
      }
    }

    // Search articles with locale filtering
    if (!type || type === 'articles') {
      try {
        const articleResponse = await cosmic.objects
          .find({
            type: 'articles',
            'metadata.locale': validLocale,
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { 'metadata.headline': { $regex: query, $options: 'i' } },
              { 'metadata.excerpt': { $regex: query, $options: 'i' } }
            ]
          })
          .props(['id', 'title', 'slug', 'metadata'])
          .depth(1)
          .limit(10)

        results.articles = articleResponse.objects as Article[]
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching articles:', error)
        }
      }
    }

    // Search athletes with locale filtering
    if (!type || type === 'athletes') {
      try {
        const athleteResponse = await cosmic.objects
          .find({
            type: 'athletes',
            'metadata.locale': validLocale,
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { 'metadata.name': { $regex: query, $options: 'i' } },
              { 'metadata.bio': { $regex: query, $options: 'i' } }
            ]
          })
          .props(['id', 'title', 'slug', 'metadata'])
          .depth(1)
          .limit(10)

        results.athletes = athleteResponse.objects as Athlete[]
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching athletes:', error)
        }
      }
    }

    results.totalResults = 
      results.products.length + 
      results.categories.length + 
      results.articles.length + 
      results.athletes.length

  } catch (error) {
    console.error('Search error:', error)
  }

  return results
}

export default async function SearchResults({ query, category, type }: SearchResultsProps) {
  const results = await searchContent(query, category, type)

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Enter a search term to find products, articles, and more.</p>
      </div>
    )
  }

  if (results.totalResults === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-black mb-4">No results found</h2>
        <p className="text-gray-500 text-lg mb-6">
          We couldn't find anything matching "{query}". Try different keywords or browse our categories.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/men" className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
            Shop Men
          </Link>
          <Link href="/women" className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
            Shop Women
          </Link>
          <Link href="/categories" className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
            Browse Categories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Search summary */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-semibold text-black mb-2">
          Search Results for "{query}"
        </h2>
        <p className="text-gray-600">
          {results.totalResults} result{results.totalResults !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Products */}
      {results.products.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-black mb-6">
            Products ({results.products.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {results.categories.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-black mb-6">
            Categories ({results.categories.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {category.metadata.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`${category.metadata.image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                      alt={category.metadata.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-black mb-2">
                    {category.metadata.name}
                  </h4>
                  {category.metadata.description && (
                    <p className="text-gray-600 text-sm">
                      {category.metadata.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles */}
      {results.articles.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-black mb-6">
            Articles ({results.articles.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {article.metadata.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`${article.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                      alt={article.metadata.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {article.metadata.headline}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {article.metadata.excerpt}
                  </p>
                  <p className="text-xs text-gray-500">
                    By {article.metadata.author} • {new Date(article.metadata.publish_date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Athletes */}
      {results.athletes.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-black mb-6">
            Athletes ({results.athletes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.athletes.map((athlete) => (
              <Link
                key={athlete.id}
                href={`/athletes/${athlete.slug}`}
                className="group block bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {athlete.metadata.profile_image && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`${athlete.metadata.profile_image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={athlete.metadata.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-black mb-2">
                    {athlete.metadata.name}
                  </h4>
                  {athlete.metadata.sport && (
                    <p className="text-sm text-gray-500 mb-2">
                      {athlete.metadata.sport.value}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {athlete.metadata.bio}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}