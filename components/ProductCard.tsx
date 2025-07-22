import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.metadata.images?.[0]
  const isOnSale = product.metadata.sale_price && product.metadata.sale_price < product.metadata.price

  return (
    <div className="group cursor-pointer">
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square mb-4">
          {primaryImage && (
            <img
              src={`${primaryImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={300}
              height={300}
            />
          )}
          
          {product.metadata.new_release && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
              New
            </div>
          )}
          
          {isOnSale && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              Sale
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-gray-600 transition-colors">
            {product.metadata.name}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.metadata.description}
          </p>

          <div className="flex items-center space-x-2">
            {isOnSale ? (
              <>
                <span className="text-red-600 font-semibold">
                  ${product.metadata.sale_price}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.metadata.price}
                </span>
              </>
            ) : (
              <span className="font-semibold">
                ${product.metadata.price}
              </span>
            )}
          </div>

          {product.metadata.colors && product.metadata.colors.length > 0 && (
            <div className="text-sm text-gray-500">
              {product.metadata.colors.length} Color{product.metadata.colors.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}