import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  productCount?: number
}

export default function CategoryCard({ category, productCount = 0 }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {category.metadata.image ? (
          <img
            src={`${category.metadata.image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={category.metadata.name}
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
          {category.metadata.name}
        </h3>
        {category.metadata.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {category.metadata.description}
          </p>
        )}
        <p className="text-gray-500">
          {productCount} {productCount === 1 ? 'product' : 'products'}
        </p>
        {category.metadata.target_audience && (
          <p className="text-xs text-gray-400 mt-1">
            {category.metadata.target_audience.value}
          </p>
        )}
      </div>
    </Link>
  )
}