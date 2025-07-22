import Link from 'next/link'
import { COSMIC_BUCKET_SLUG } from '@/lib/cosmic'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Find a Store */}
          <div>
            <h3 className="font-semibold mb-4">Find a Store</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/stores" className="hover:text-white">Store Locator</Link></li>
              <li><Link href="/membership" className="hover:text-white">Membership</Link></li>
              <li><Link href="/nike-journal" className="hover:text-white">Nike Journal</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/help" className="hover:text-white">Get Help</Link></li>
              <li><Link href="/order-status" className="hover:text-white">Order Status</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping and Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-white">About Nike</Link></li>
              <li><Link href="/news" className="hover:text-white">News</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/purpose" className="hover:text-white">Purpose</Link></li>
              <li><Link href="/sustainability" className="hover:text-white">Sustainability</Link></li>
            </ul>
          </div>

          {/* Promotions */}
          <div>
            <h3 className="font-semibold mb-4">Promotions & Discounts</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/student" className="hover:text-white">Student</Link></li>
              <li><Link href="/military" className="hover:text-white">Military</Link></li>
              <li><Link href="/teacher" className="hover:text-white">Teacher</Link></li>
              <li><Link href="/first-responders" className="hover:text-white">First Responders</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">© 2025 Nike Clone, Inc. All Rights Reserved</span>
            <a
              href={`https://www.cosmicjs.com?utm_source=bucket_${COSMIC_BUCKET_SLUG}&utm_medium=referral&utm_campaign=app_footer&utm_content=built_with_cosmic`}
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button"
            >
              <img 
                src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
                alt="Cosmic Logo" 
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
              Built with Cosmic
            </a>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}