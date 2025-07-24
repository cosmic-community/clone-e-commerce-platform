import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Category } from '@/types'
import { getCurrentLocale, DEFAULT_LOCALE } from '@/lib/locale'

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is required')
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY environment variable is required')
}

// Server-side Cosmic client with staging environment
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

export const COSMIC_BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG as string

// Helper function to get the current locale for server-side operations
function getLocaleForQuery() {
  // For server-side operations, we'll use the default locale
  // Client-side components can override this by passing locale explicitly
  return DEFAULT_LOCALE
}

// Server-side helper functions for common queries with locale support
export async function getProductsByCategory(categoryId: string, locale?: string): Promise<Product[]> {
  try {
    const queryLocale = locale || getLocaleForQuery()
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.category': categoryId,
        locale: queryLocale
      })
      .props(['id', 'title', 'slug', 'metadata', 'locale'])
      .depth(1)

    return response.objects as Product[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'categories',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Category
  } catch (error: any) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Category[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getAllProducts(locale?: string): Promise<Product[]> {
  try {
    const queryLocale = locale || getLocaleForQuery()
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        locale: queryLocale
      })
      .props(['id', 'title', 'slug', 'metadata', 'locale'])
      .depth(1)

    return response.objects as Product[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getFeaturedProducts(locale?: string): Promise<Product[]> {
  try {
    const queryLocale = locale || getLocaleForQuery()
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.featured': true,
        locale: queryLocale
      })
      .props(['id', 'title', 'slug', 'metadata', 'locale'])
      .depth(1)

    return response.objects as Product[]
  } catch (error: any) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getProductBySlug(slug: string, locale?: string): Promise<Product | null> {
  try {
    const queryLocale = locale || getLocaleForQuery()
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug,
        locale: queryLocale
      })
      .props(['id', 'title', 'slug', 'metadata', 'locale'])
      .depth(1)

    return response.object as Product
  } catch (error: any) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}