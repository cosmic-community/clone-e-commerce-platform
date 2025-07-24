// app/products/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Product } from '@/types'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import ProductGallery from '@/components/ProductGallery'
import ProductDetails from '@/components/ProductDetails'

async function getProduct(slug: string, locale: string): Promise<Product | null> {
  try {
    // First try to find product with locale-specific slug
    let response
    try {
      response = await cosmic.objects
        .findOne({
          type: 'products',
          slug: `${slug}-${locale}`
        })
        .depth(1)
    } catch (error: any) {
      // If locale-specific product not found, fall back to default slug
      if (error.status === 404) {
        response = await cosmic.objects
          .findOne({
            type: 'products',
            slug
          })
          .depth(1)
      } else {
        throw error
      }
    }

    const product = response.object as Product

    // If product has locale-specific content in metadata, use it
    if (product.metadata?.localized_content) {
      const localizedContent = product.metadata.localized_content[locale]
      if (localizedContent) {
        // Merge localized content with product data
        return {
          ...product,
          title: localizedContent.title || product.title,
          metadata: {
            ...product.metadata,
            description: localizedContent.description || product.metadata?.description,
            features: localizedContent.features || product.metadata?.features,
            materials: localizedContent.materials || product.metadata?.materials,
            care_instructions: localizedContent.care_instructions || product.metadata?.care_instructions
          }
        }
      }
    }

    return product
  } catch (error: any) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const headersList = headers()
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