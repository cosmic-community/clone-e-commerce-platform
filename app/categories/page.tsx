import { cosmic } from '@/lib/cosmic'
import { Category, Product, CategoryWithProducts } from '@/types'
import CategoryCard from '@/components/CategoryCard'

async function getCategoriesWithProducts(): Promise<CategoryWithProducts[]> {
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
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const products = productsResponse.objects as Product[]

    // Group products by category
    const categoriesWithProducts: CategoryWithProducts[] = categories.map(category => {
      const categoryProducts = products.filter(
        product => product.metadata.category === category.slug
      )
      return {
        ...category,
        products: categoryProducts
      }
    })

    // Only return categories that have products
    return categoriesWithProducts.filter(category => category.products.length > 0)
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function CategoriesPage() {
  const categories = await getCategoriesWithProducts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Shop by Category</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection organized by category. Find exactly what you're looking for.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏷️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
            <p className="text-gray-500">
              Categories will appear here once products are added.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}