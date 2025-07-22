import { cosmic } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

async function getNewProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'products',
      'metadata.new_release': true
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    return response.objects || []
  } catch (error) {
    console.error('Error fetching new products:', error)
    return []
  }
}

export default async function NewPage() {
  const newProducts = await getNewProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">New Releases</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest drops and newest arrivals. Be the first to get your hands on our freshest styles.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=2000&auto=format,compress"
            alt="New Releases"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Fresh Drops</h2>
              <p className="text-lg md:text-xl">The newest styles just landed</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">New releases are on the way. Check back soon for the latest drops!</p>
          </div>
        )}
      </div>
    </div>
  )
}