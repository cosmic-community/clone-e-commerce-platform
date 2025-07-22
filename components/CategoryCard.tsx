import Link from 'next/link'
import { Product } from '@/types'

interface CategoryCardProps {
  category: {
    slug: string
    name: string
    products: Product[]
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Get the first product's image as category thumbnail
  const thumbnailImage = category.products[0]?.metadata.images?.[0]

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {thumbnailImage ? (
          <img
            src={`${thumbnailImage.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🏷️</div>
              <div className="text-sm">No image</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-gray-700">
          {category.name}
        </h3>
        <p className="text-gray-600">
          {category.products.length} {category.products.length === 1 ? 'product' : 'products'}
        </p>
      </div>
    </Link>
  )
}