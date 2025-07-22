# Nike Clone E-commerce Platform

![Nike Clone Preview](https://imgix.cosmicjs.com/47b3db70-6741-11f0-a051-23c10f41277a-photo-1556906781-9a412961c28c-1753219052042.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive Nike-inspired e-commerce platform built with Next.js 15 and powered by Cosmic CMS. This application showcases products, athlete profiles, store locations, and dynamic content management with Nike's iconic design language.

## ✨ Features

- **Dynamic Product Catalog** - Browse products with filtering, search, and detailed views
- **Athlete Showcase** - Featured athletes with signature products and biographical content  
- **Store Locator** - Find Nike stores with location details and available services
- **Content Management** - Articles, collections, and page content powered by Cosmic CMS
- **Responsive Design** - Optimized for desktop and mobile with Nike's design aesthetics
- **Image Optimization** - High-performance image delivery with imgix integration
- **Search & Filter** - Advanced product discovery with multiple filter options
- **Collection Features** - Curated product collections and limited edition releases

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=687fff0917ea59ba722382d1&clone_repository=6880014017ea59ba722382f1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a clone of Nike.com"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **React** - UI component library

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your Nike clone bucket

### Installation

1. **Clone and install dependencies**:
   ```bash
   bun create next-app nike-clone-app
   cd nike-clone-app
   bun install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=nike-clone-production
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

3. **Start the development server**:
   ```bash
   bun run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Cosmic SDK Examples

### Fetch Products
```typescript
import { cosmic } from '@/lib/cosmic'

async function getProducts() {
  try {
    const response = await cosmic.objects.find({
      type: 'products'
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

### Get Featured Athletes
```typescript
async function getFeaturedAthletes() {
  try {
    const response = await cosmic.objects.find({
      type: 'athletes',
      'metadata.featured': true
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

### Store Locator
```typescript
async function getStores() {
  try {
    const response = await cosmic.objects.find({
      type: 'stores'
    }).props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

## 🎨 Cosmic CMS Integration

This application integrates with the following Cosmic object types:

- **Products** - Nike footwear, apparel, and accessories with images, pricing, and variants
- **Athletes** - Featured athletes with profiles, bios, and signature products  
- **Collections** - Curated product groupings like Jordan Brand with launch dates
- **Articles** - Blog posts and news content with featured images and tags
- **Stores** - Physical store locations with addresses, hours, and services
- **Pages** - Static content pages like About Nike with rich text content

All content is dynamically fetched and rendered with proper error handling and loading states.

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
bunx vercel
```

### Netlify
```bash
bun run build
# Deploy the .next folder
```

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

The application will automatically use the staging API environment as configured in the Cosmic client setup.
<!-- README_END -->