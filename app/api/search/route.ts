import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { Product, Category, Article, Athlete } from '@/types'
import { isValidLocale, DEFAULT_LOCALE } from '@/lib/locale'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const category = searchParams.get('category')
  const type = searchParams.get('type')
  const limit = parseInt(searchParams.get('limit') || '20')

  // Get locale from headers (set by middleware)
  const locale = request.headers.get('x-locale') || DEFAULT_LOCALE
  const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ 
      error: 'Search query must be at least 2 characters long' 
    }, { status: 400 })
  }

  try {
    const results = {
      products: [] as Product[],
      categories: [] as Category[],
      articles: [] as Article[],
      athletes: [] as Athlete[],
      totalResults: 0
    }

    // Search products with locale filtering
    if (!type || type === 'products') {
      try {
        let productQuery: any = {
          type: 'products',
          locale: validLocale,
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { 'metadata.name': { $regex: query, $options: 'i' } },
            { 'metadata.description': { $regex: query, $options: 'i' } }
          ]
        }

        if (category) {
          productQuery['metadata.category'] = category
        }

        const productResponse = await cosmic.objects
          .find(productQuery)
          .props(['id', 'title', 'slug', 'metadata'])
          .depth(1)
          .limit(limit)

        results.products = productResponse.objects as Product[]
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching products:', error)
        }
      }
    }

    // Search categories (categories don't have locale, so we search all)
    if (!type || type === 'categories') {
      try {
        const categoryResponse = await cosmic.objects
          .find({
            type: 'categories',
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { 'metadata.name': { $regex: query, $options: 'i' } },
              { 'metadata.description': { $regex: query, $options: 'i' } }
            ]
          })
          .props(['id', 'title', 'slug', 'metadata'])
          .limit(Math.floor(limit / 2))

        results.categories = categoryResponse.objects as Category[]
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching categories:', error)
        }
      }
    }

    // Search articles (articles don't have locale in the data, so we search all)
    if (!type || type === 'articles') {
      try {
        const articleResponse = await cosmic.objects
          .find({
            type: 'articles',
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { 'metadata.headline': { $regex: query, $options: 'i' } },
              { 'metadata.excerpt': { $regex: query, $options: 'i' } }
            ]
          })
          .props(['id', 'title', 'slug', 'metadata'])
          .limit(Math.floor(limit / 4))

        results.articles = articleResponse.objects as Article[]
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching articles:', error)
        }
      }
    }

    // Search athletes (athletes don't have locale in the data, so we search all)
    if (!type || type === 'athletes') {
      try {
        const athleteResponse = await cosmic.objects
          .find({
            type: 'athletes',
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { 'metadata.name': { $regex: query, $options: 'i' } },
              { 'metadata.bio': { $regex: query, $options: 'i' } }
            ]
          })
          .props(['id', 'title', 'slug', 'metadata'])
          .limit(Math.floor(limit / 4))

        results.athletes = athleteResponse.objects as Athlete[]
      } catch (error: any) {
        if (error.status !== 404) {
          console.error('Error searching athletes:', error)
        }
      }
    }

    results.totalResults = 
      results.products.length + 
      results.categories.length + 
      results.articles.length + 
      results.athletes.length

    return NextResponse.json(results)

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error during search' 
    }, { status: 500 })
  }
}