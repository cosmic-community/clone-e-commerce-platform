import { cosmic } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import { Product, Category } from '@/types'

async function getWomenData(): Promise<{
  products: Product[]
  categories: Category[]
}> {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      cosmic.objects.find({
        type: 'products',
        'metadata.category': ['688003c617ea59ba722382f7', '688003c617ea59ba722382fe'] // Women's Shoes and Women's Clothing IDs
      }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      cosmic.objects.find({
        type: 'categories',
        'metadata.target_audience.key': 'women'
      }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    ])

    return {
      products: productsResponse.objects || [],
      categories: categoriesResponse.objects || []
    }
  } catch (error) {
    console.error('Error fetching women data:', error)
    return { products: [], categories: [] }
  }
}

export default async function WomenPage() {
  const { products, categories } = await getWomenData()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Women's Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover performance-driven apparel that combines comfort, style, and functionality for every workout and lifestyle.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=2000&auto=format,compress"
            alt="Women's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Empower Your Journey</h2>
              <p className="text-lg md:text-xl">Style meets performance</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category: Category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        {/* Featured Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600">Women's products will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}