import { cosmic } from '@/lib/cosmic'
import { Category, Product } from '@/types'
import CategoryCard from '@/components/CategoryCard'

async function getCategoriesWithProductCounts(): Promise<Array<Category & { productCount: number }>> {
  try {
    // Get all categories
    const categoriesResponse = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const categories = categoriesResponse.objects as Category[]

    // Get all products
    const productsResponse = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'metadata.category'])
      .depth(1)

    const products = productsResponse.objects as Product[]

    // Count products for each category
    const categoriesWithCounts = categories.map(category => {
      const productCount = products.filter(product => {
        const productCategory = product.metadata.category
        // Handle both string and object category references
        if (typeof productCategory === 'string') {
          return productCategory === category.slug
        } else if (productCategory && typeof productCategory === 'object' && 'id' in productCategory) {
          return productCategory.id === category.id
        }
        return false
      }).length

      return {
        ...category,
        productCount
      }
    })

    return categoriesWithCounts
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function CategoriesPage() {
  const categories = await getCategoriesWithProductCounts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Shop by Category</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover our complete range of athletic footwear, apparel, and accessories organized by category.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                productCount={category.productCount}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏷️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
            <p className="text-gray-500">
              Check back later for new product categories.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}