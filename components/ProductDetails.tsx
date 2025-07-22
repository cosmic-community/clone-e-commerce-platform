'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { Heart, Star } from 'lucide-react'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [isFavorited, setIsFavorited] = useState(false)

  const isOnSale = product.metadata.sale_price && product.metadata.sale_price < product.metadata.price
  const currentPrice = isOnSale ? product.metadata.sale_price : product.metadata.price

  return (
    <div className="space-y-6">
      {/* Product Title and Price */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          {product.metadata.name}
        </h1>
        
        <div className="flex items-center space-x-3 mb-4">
          {isOnSale ? (
            <>
              <span className="text-2xl font-bold text-red-600">
                ${product.metadata.sale_price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.metadata.price}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-black">
              ${product.metadata.price}
            </span>
          )}
        </div>

        {/* Product Type & Status */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {product.metadata.product_type && (
            <span>{product.metadata.product_type.value}</span>
          )}
          {product.metadata.new_release && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
              New Release
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-700 leading-relaxed">
          {product.metadata.description}
        </p>
      </div>

      {/* Colors */}
      {product.metadata.colors && product.metadata.colors.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Colors Available</h3>
          <div className="flex flex-wrap gap-2">
            {product.metadata.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  selectedColor === color
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.metadata.sizes && product.metadata.sizes.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Select Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {product.metadata.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 border rounded-lg font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4 pt-4">
        <button
          className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={
            (product.metadata.sizes && product.metadata.sizes.length > 0 && !selectedSize) ||
            (product.metadata.colors && product.metadata.colors.length > 0 && !selectedColor)
          }
        >
          Add to Cart
        </button>
        
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`w-full flex items-center justify-center space-x-2 py-3 border rounded-full font-semibold transition-colors ${
            isFavorited
              ? 'border-red-500 text-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          <span>Favorite</span>
        </button>
      </div>

      {/* Additional Info */}
      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
        </div>
        <div className="text-sm text-gray-600">
          <p>• Free returns within 30 days</p>
          <p>• Nike Member exclusive access</p>
          <p>• Sustainable materials used</p>
        </div>
      </div>
    </div>
  )
}