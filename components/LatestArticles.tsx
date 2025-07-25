import { cosmic } from '@/lib/cosmic'
import Link from 'next/link'
import { Article } from '@/types'

async function getLatestArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'articles'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('-metadata.publish_date')
      .limit(3)

    return response.objects as Article[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    console.error('Error fetching latest articles:', error)
    return []
  }
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

export default async function LatestArticles() {
  try {
    const articles = await getLatestArticles()

    if (articles.length === 0) {
      return null
    }

    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Latest Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, innovations, and stories from the world of Nike
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  {article.metadata?.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={`${article.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                        alt={article.metadata.headline || article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={300}
                        height={200}
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      {article.metadata?.publish_date && (
                        <>
                          <span>{formatDate(article.metadata.publish_date)}</span>
                          <span>•</span>
                        </>
                      )}
                      {article.metadata?.author && (
                        <span>{article.metadata.author}</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-600 transition-colors">
                      {article.metadata?.headline || article.title}
                    </h3>
                    
                    {article.metadata?.excerpt && (
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {article.metadata.excerpt}
                      </p>
                    )}

                    {article.metadata?.tags && article.metadata.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.metadata.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/articles" className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-block">
              Read More Stories
            </Link>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error rendering LatestArticles component:', error)
    return null
  }
}