// app/categories/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  try {
    // Get all products for this category
    const { objects: products } = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.category': slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    if (!products || products.length === 0) {
      notFound()
    }

    // Create a human-readable category name from slug
    const categoryName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">{categoryName}</h1>
            <p className="text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} in this category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching category products:', error)
    notFound()
  }
}

export async function generateStaticParams() {
  try {
    // Get all products to extract unique category slugs
    const { objects: products } = await cosmic.objects
      .find({ type: 'products' })
      .props(['metadata'])

    const categorySet = new Set<string>()
    products.forEach((product: Product) => {
      if (product.metadata.category) {
        categorySet.add(product.metadata.category)
      }
    })

    return Array.from(categorySet).map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}