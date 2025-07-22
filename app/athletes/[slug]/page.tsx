// app/athletes/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Athlete } from '@/types'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

async function getAthlete(slug: string): Promise<Athlete | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'athletes',
        slug
      })
      .depth(1)

    return response.object as Athlete
  } catch (error: any) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function AthletePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const athlete = await getAthlete(slug)

  if (!athlete) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {athlete.metadata.action_shot ? (
          <img
            src={`${athlete.metadata.action_shot.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={athlete.metadata.name}
            className="w-full h-full object-cover"
            width={800}
            height={400}
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <span className="text-white text-8xl font-bold">
              {athlete.metadata.name.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {athlete.metadata.name}
            </h1>
            {athlete.metadata.sport && (
              <p className="text-xl text-gray-200 font-medium">
                {athlete.metadata.sport.value}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Biography</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {athlete.metadata.bio}
              </p>
            </div>
            
            {athlete.metadata.profile_image && (
              <div className="order-first lg:order-last">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={`${athlete.metadata.profile_image.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
                    alt={athlete.metadata.name}
                    className="w-full h-full object-cover"
                    width={300}
                    height={400}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Signature Products */}
      {athlete.metadata.signature_products && athlete.metadata.signature_products.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Signature Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the products that define {athlete.metadata.name.split(' ')[0]}'s legacy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {athlete.metadata.signature_products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}