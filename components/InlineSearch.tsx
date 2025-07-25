import { cosmic } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface InlineSearchProps {
  query: string
  onResultClick: () => void
}

interface QuickSearchResult {
  products: Product[]
  categories: Category[]
}

async function quickSearch(query: string): Promise<QuickSearchResult> {
  if (!query.trim() || query.length < 3) {
    return { products: [], categories: [] }
  }

  const results: QuickSearchResult = {
    products: [],
    categories: []
  }

  try {
    // Quick product search - limit to 5 results
    try {
      const productResponse = await cosmic.objects
        .find({
          type: 'products',
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { 'metadata.name': { $regex: query, $options: 'i' } }
          ]
        })
        .props(['id', 'title', 'slug', 'metadata'])
        .depth(1)
        .limit(5)

      results.products = productResponse.objects as Product[]
    } catch (error: any) {
      if (error.status !== 404) {
        console.error('Error in quick product search:', error)
      }
    }

    // Quick category search - limit to 3 results
    try {
      const categoryResponse = await cosmic.objects
        .find({
          type: 'categories',
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { 'metadata.name': { $regex: query, $options: 'i' } }
          ]
        })
        .props(['id', 'title', 'slug', 'metadata'])
        .limit(3)

      results.categories = categoryResponse.objects as Category[]
    } catch (error: any) {
      if (error.status !== 404) {
        console.error('Error in quick category search:', error)
      }
    }

  } catch (error) {
    console.error('Quick search error:', error)
  }

  return results
}

export default async function InlineSearch({ query, onResultClick }: InlineSearchProps) {
  const results = await quickSearch(query)
  const router = useRouter()

  const totalResults = results.products.length + results.categories.length

  if (totalResults === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500 text-sm">No results found for "{query}"</p>
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          onClick={onResultClick}
          className="text-black hover:underline text-sm mt-2 inline-block"
        >
          Search all results
        </Link>
      </div>
    )
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Products */}
      {results.products.length > 0 && (
        <div className="p-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">
            Products
          </h4>
          <div className="space-y-1">
            {results.products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onResultClick}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {product.metadata.images?.[0] && (
                  <img
                    src={`${product.metadata.images[0].imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={product.metadata.name}
                    className="w-10 h-10 object-cover rounded mr-3 flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">
                    {product.metadata.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${product.metadata.sale_price || product.metadata.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {results.categories.length > 0 && (
        <div className="p-2 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">
            Categories
          </h4>
          <div className="space-y-1">
            {results.categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                onClick={onResultClick}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {category.metadata.image && (
                  <img
                    src={`${category.metadata.image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={category.metadata.name}
                    className="w-10 h-10 object-cover rounded mr-3 flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">
                    {category.metadata.name}
                  </p>
                  {category.metadata.description && (
                    <p className="text-xs text-gray-500 truncate">
                      {category.metadata.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* View all results link */}
      <div className="p-2 border-t border-gray-100">
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          onClick={onResultClick}
          className="block w-full text-center p-2 text-sm text-black hover:bg-gray-50 rounded-lg transition-colors"
        >
          View all results for "{query}"
        </Link>
      </div>
    </div>
  )
}