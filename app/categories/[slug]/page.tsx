// app/categories/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

async function getCategoryData(slug: string): Promise<{ category: Category; products: Product[] } | null> {
  try {
    // Get the category details
    const categoryResponse = await cosmic.objects
      .findOne({ 
        type: 'categories',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const category = categoryResponse.object as Category

    // Get all products for this category using the category ID
    const productsResponse = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.category': category.id
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const products = productsResponse.objects as Product[]

    return { category, products }
  } catch (error: any) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const data = await getCategoryData(slug)

  if (!data) {
    notFound()
  }

  const { category, products } = data

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="text-center mb-12">
          {category.metadata.image && (
            <div className="mb-8">
              <img
                src={`${category.metadata.image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
                alt={category.metadata.name}
                className="w-full max-w-4xl mx-auto h-64 object-cover rounded-lg"
                width={800}
                height={400}
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-black mb-4">{category.metadata.name}</h1>
          {category.metadata.description && (
            <p className="text-gray-600 text-lg mb-4 max-w-3xl mx-auto">
              {category.metadata.description}
            </p>
          )}
          <p className="text-gray-500">
            {products.length} {products.length === 1 ? 'product' : 'products'} in this category
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">
              Check back later for new products in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    // Get all categories to generate static params
    const { objects: categories } = await cosmic.objects
      .find({ type: 'categories' })
      .props(['slug'])

    return categories.map((category: Category) => ({
      slug: category.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}