import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Collections from '@/components/Collections'
import FeaturedAthletes from '@/components/FeaturedAthletes'
import LatestArticles from '@/components/LatestArticles'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Collections />
      <FeaturedAthletes />
      <LatestArticles />
    </main>
  )
}