import { cosmic } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

async function getJordanProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'products',
      title: { $regex: 'Jordan', $options: 'i' }
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    return response.objects || []
  } catch (error) {
    console.error('Error fetching Jordan products:', error)
    return []
  }
}

export default async function JordanPage() {
  const jordanProducts = await getJordanProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jordan Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the legacy of basketball's greatest icon. Discover the legendary silhouettes that continue to define culture and performance.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=2000&auto=format,compress"
            alt="Jordan Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Jumpman Legacy</h2>
              <p className="text-lg md:text-xl">Where legends are made</p>
            </div>
          </div>
        </div>

        {/* Brand Story */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Story Continues</h3>
            <p className="text-gray-600 leading-relaxed">
              From the courts of Chicago to streets around the world, Jordan represents more than basketball. 
              It's a symbol of excellence, determination, and the relentless pursuit of greatness. Each silhouette 
              tells a story of iconic moments that transcended the game and influenced culture forever.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {jordanProducts.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop Jordan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {jordanProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Jordan Collection Coming Soon</h3>
            <p className="text-gray-600">The legendary Jordan collection will be available soon. Stay tuned for iconic drops!</p>
          </div>
        )}
      </div>
    </div>
  )
}