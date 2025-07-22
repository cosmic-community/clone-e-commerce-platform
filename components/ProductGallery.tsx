'use client'

import { useState } from 'react'
import { Product } from '@/types'

interface ProductGalleryProps {
  product: Product
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = product.metadata.images || []

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={`${images[selectedImage].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={product.metadata.name}
          className="w-full h-full object-cover"
          width={400}
          height={400}
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                selectedImage === index ? 'border-black' : 'border-gray-200'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${product.metadata.name} view ${index + 1}`}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}