import { cosmic } from '@/lib/cosmic'
import Link from 'next/link'
import { Collection } from '@/types'

async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'collections'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Collection[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function Collections() {
  const collections = await getCollections()

  if (collections.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections of iconic designs and performance innovations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.slug}`}>
              <div className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] cursor-pointer">
                {collection.metadata.hero_image && (
                  <img
                    src={`${collection.metadata.hero_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={collection.metadata.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={300}
                  />
                )}
                
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-white">
                    {collection.metadata.limited_edition && (
                      <div className="inline-block bg-red-600 text-xs font-semibold px-2 py-1 rounded mb-2">
                        Limited Edition
                      </div>
                    )}
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {collection.metadata.name}
                    </h3>
                    
                    <p className="text-lg mb-4 opacity-90 line-clamp-2">
                      {collection.metadata.description}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        Explore Collection
                      </button>
                      
                      {collection.metadata.products && collection.metadata.products.length > 0 && (
                        <span className="text-sm opacity-75">
                          {collection.metadata.products.length} Product{collection.metadata.products.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}