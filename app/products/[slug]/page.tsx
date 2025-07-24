// app/products/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Product } from '@/types'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import ProductGallery from '@/components/ProductGallery'
import ProductDetails from '@/components/ProductDetails'

async function getProduct(slug: string, locale: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug: slug,
        locale: locale
      })
      .props(['id', 'title', 'slug', 'metadata', 'locale'])
      .depth(1)

    return response.object as Product
  } catch (error: any) {
    if (error.status === 404) {
      // Try fallback to default locale (en) if localized version not found
      try {
        const fallbackResponse = await cosmic.objects
          .findOne({
            type: 'products',
            slug: slug,
            locale: 'en'
          })
          .props(['id', 'title', 'slug', 'metadata', 'locale'])
          .depth(1)

        return fallbackResponse.object as Product
      } catch (fallbackError: any) {
        if (fallbackError.status === 404) {
          return null
        }
        throw fallbackError
      }
    }
    throw error
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'en'
  
  const product = await getProduct(slug, locale)

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