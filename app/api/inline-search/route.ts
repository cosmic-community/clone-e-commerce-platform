import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import { isValidLocale, DEFAULT_LOCALE } from '@/lib/locale'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  // Get locale from headers (set by middleware)
  const locale = request.headers.get('x-locale') || DEFAULT_LOCALE
  const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE

  if (!query || query.trim().length < 3) {
    return NextResponse.json({ 
      products: [],
      categories: []
    })
  }

  try {
    const results = {
      products: [] as Product[],
      categories: [] as Category[]
    }

    // Quick product search with locale filtering - limit to 5 results
    try {
      const productResponse = await cosmic.objects
        .find({
          type: 'products',
          locale: validLocale,
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { 'metadata.name': { $regex: query, $options: 'i' } }
          ]
        })
        .props(['id', 'title', 'slug', 'metadata'])
        .depth(1)
        .limit(5)

      results.products = productResponse.objects as Product[]
    } catch (error: any) {
      if (error.status !== 404) {
        console.error('Error in quick product search:', error)
      }
    }

    // Quick category search (categories don't have locale) - limit to 3 results
    try {
      const categoryResponse = await cosmic.objects
        .find({
          type: 'categories',
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { 'metadata.name': { $regex: query, $options: 'i' } }
          ]
        })
        .props(['id', 'title', 'slug', 'metadata'])
        .limit(3)

      results.categories = categoryResponse.objects as Category[]
    } catch (error: any) {
      if (error.status !== 404) {
        console.error('Error in quick category search:', error)
      }
    }

    return NextResponse.json(results)

  } catch (error) {
    console.error('Inline search API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error during search',
      products: [],
      categories: []
    }, { status: 500 })
  }
}