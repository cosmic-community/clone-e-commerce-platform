import { cosmic } from '@/lib/cosmic'
import { Product } from '@/types'
import CategoryCard from '@/components/CategoryCard'

export default async function CategoriesPage() {
  try {
    // Get all products to extract unique categories
    const { objects: products } = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    // Extract unique categories from products
    const categoryMap = new Map<string, {
      slug: string;
      name: string;
      products: Product[];
    }>()

    products.forEach((product: Product) => {
      const categorySlug = product.metadata.category
      if (categorySlug) {
        if (!categoryMap.has(categorySlug)) {
          // Create a human-readable name from slug
          const name = categorySlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          
          categoryMap.set(categorySlug, {
            slug: categorySlug,
            name,
            products: []
          })
        }
        categoryMap.get(categorySlug)?.products.push(product)
      }
    })

    const categories = Array.from(categoryMap.values())

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Categories</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection organized by categories
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories found.</p>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching categories:', error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Categories</h1>
          <p className="text-gray-500">Unable to load categories at this time.</p>
        </div>
      </div>
    )
  }
}