import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { Product, Category } from '@/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

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

    // Quick product search - limit to 5 results
    try {
      const productResponse = await cosmic.objects
        .find({
          type: 'products',
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

    // Quick category search - limit to 3 results
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