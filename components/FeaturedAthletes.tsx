import { cosmic } from '@/lib/cosmic'
import Link from 'next/link'
import { Athlete } from '@/types'

async function getFeaturedAthletes(): Promise<Athlete[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'athletes',
        'metadata.featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Athlete[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    console.error('Error fetching featured athletes:', error)
    return []
  }
}

export default async function FeaturedAthletes() {
  try {
    const athletes = await getFeaturedAthletes()

    if (athletes.length === 0) {
      return null
    }

    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Featured Athletes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the champions who inspire greatness on and off the field
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {athletes.map((athlete) => (
              <Link key={athlete.id} href={`/athletes/${athlete.slug}`}>
                <div className="group relative overflow-hidden rounded-lg bg-gray-900 aspect-[3/2] cursor-pointer">
                  {athlete.metadata?.action_shot ? (
                    <img
                      src={`${athlete.metadata.action_shot.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                      alt={athlete.metadata.name || athlete.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={267}
                    />
                  ) : athlete.metadata?.profile_image ? (
                    <img
                      src={`${athlete.metadata.profile_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                      alt={athlete.metadata.name || athlete.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={267}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-white text-6xl font-bold">
                        {(athlete.metadata?.name || athlete.title).charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {athlete.metadata?.name || athlete.title}
                      </h3>
                      
                      {athlete.metadata?.sport && (
                        <div className="text-gray-300 font-medium mb-3">
                          {typeof athlete.metadata.sport === 'object' ? athlete.metadata.sport.value : athlete.metadata.sport}
                        </div>
                      )}
                      
                      {athlete.metadata?.bio && (
                        <p className="text-lg opacity-90 line-clamp-3 mb-4">
                          {athlete.metadata.bio}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                          View Profile
                        </button>
                        
                        {athlete.metadata?.signature_products && athlete.metadata.signature_products.length > 0 && (
                          <span className="text-sm opacity-75">
                            {athlete.metadata.signature_products.length} Signature Product{athlete.metadata.signature_products.length > 1 ? 's' : ''}
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
  } catch (error) {
    console.error('Error rendering FeaturedAthletes component:', error)
    return null
  }
}