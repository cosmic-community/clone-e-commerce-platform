'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import LocaleSwitch from '@/components/LocaleSwitch'
import SearchBar from '@/components/SearchBar'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 text-xs py-2 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/stores" className="hover:text-gray-600">Find a Store</Link>
            <span>|</span>
            <Link href="/help" className="hover:text-gray-600">Help</Link>
            <span>|</span>
            <Link href="/join" className="hover:text-gray-600">Join Us</Link>
          </div>
          <div className="flex items-center space-x-4">
            <LocaleSwitch />
            <span>|</span>
            <Link href="/sign-in" className="hover:text-gray-600">Sign In</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-16 h-6 bg-black flex items-center justify-center">
                <span className="text-white font-bold text-xl">NIKE</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/new" className="text-black hover:text-gray-600 font-medium">New</Link>
              <Link href="/men" className="text-black hover:text-gray-600 font-medium">Men</Link>
              <Link href="/women" className="text-black hover:text-gray-600 font-medium">Women</Link>
              <Link href="/kids" className="text-black hover:text-gray-600 font-medium">Kids</Link>
              <Link href="/jordan" className="text-black hover:text-gray-600 font-medium">Jordan</Link>
              <Link href="/sport" className="text-black hover:text-gray-600 font-medium">Sport</Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <SearchBar showInlineResults={true} />
              </div>
              
              {/* Mobile Search Button */}
              <button 
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-5 h-5" />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ShoppingBag className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
            <SearchBar 
              showInlineResults={true} 
              onClose={() => setMobileSearchOpen(false)} 
            />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <nav className="space-y-4">
                <Link 
                  href="/new" 
                  className="block text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New
                </Link>
                <Link 
                  href="/men" 
                  className="block text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Men
                </Link>
                <Link 
                  href="/women" 
                  className="block text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Women
                </Link>
                <Link 
                  href="/kids" 
                  className="block text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kids
                </Link>
                <Link 
                  href="/jordan" 
                  className="block text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Jordan
                </Link>
                <Link 
                  href="/sport" 
                  className="block text-black font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sport
                </Link>
              </nav>
              <div className="pt-4 border-t border-gray-200">
                <LocaleSwitch />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}