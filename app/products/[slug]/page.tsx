// app/products/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Product } from '@/types'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import ProductDetails from '@/components/ProductDetails'

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug
      })
      .depth(1)

    return response.object as Product
  } catch (error: any) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery product={product} />
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  )
}