import { Metadata } from 'next'
import { getAboutPage } from '@/lib/cosmic'
import { About } from '@/types'

export const revalidate = 60 // Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getAboutPage()
  
  return {
    title: aboutData?.metadata.page_title || 'About Us',
    description: aboutData?.metadata.meta_description || aboutData?.metadata.introduction || 'Learn more about our company',
  }
}

export default async function AboutPage() {
  const aboutData: About | null = await getAboutPage()

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-600">About page content is not available at the moment.</p>
        </div>
      </div>
    )
  }

  const {
    page_title,
    hero_image,
    introduction,
    main_content,
    mission_statement,
    values,
    team_image,
    founded_year,
    location
  } = aboutData.metadata

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 flex items-center justify-center">
        {hero_image?.imgix_url && (
          <img
            src={`${hero_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={page_title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{page_title}</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">{introduction}</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: main_content }}
            />
          </div>
          {team_image?.imgix_url && (
            <div className="order-first md:order-last">
              <img
                src={`${team_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt="Our Team"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Mission and Values */}
      {(mission_statement || values) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {mission_statement && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{mission_statement}</p>
                </div>
              )}
              
              {values && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
                  <div className="text-gray-700 leading-relaxed text-lg">
                    {values.split('•').map((value, index) => (
                      value.trim() && (
                        <div key={index} className="flex items-center mb-3">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                          <span>{value.trim()}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Company Info */}
      {(founded_year || location) && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Company Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {founded_year && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Founded</h3>
                  <p className="text-2xl font-bold text-blue-600">{founded_year}</p>
                </div>
              )}
              
              {location && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Headquarters</h3>
                  <p className="text-2xl font-bold text-blue-600">{location}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}