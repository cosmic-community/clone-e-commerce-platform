import { cosmic } from '@/lib/cosmic'
import { Store } from '@/types'
import StoreCard from '@/components/StoreCard'

async function getStores(): Promise<Store[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'stores'
      })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.objects as Store[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function StoresPage() {
  const stores = await getStores()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Find a Nike Store
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visit our stores for the latest products, personalized service, and exclusive experiences
          </p>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {stores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No stores found. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}