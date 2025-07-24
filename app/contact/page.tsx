import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Nike Clone',
  description: 'Get in touch with us. We\'d love to hear from you and answer any questions you may have.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-black mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">tony@cosmicjs.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-black mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-black mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Office</h3>
                    <p className="text-gray-600">
                      123 Innovation Drive<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-black mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-black transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-gray-400 hover:bg-black rounded transition-colors"></div>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-black transition-colors">
                    <span className="sr-only">Instagram</span>
                    <div className="w-6 h-6 bg-gray-400 hover:bg-black rounded transition-colors"></div>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-black transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-gray-400 hover:bg-black rounded transition-colors"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions or contact us for more information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">How long does shipping take?</h3>
              <p className="text-gray-600">
                Standard shipping typically takes 3-5 business days. Express shipping options are available for faster delivery.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">What is your return policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day return policy for all unworn items in original condition with tags attached.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-600">
                Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">How can I track my order?</h3>
              <p className="text-gray-600">
                Once your order ships, you'll receive a tracking number via email to monitor your package's progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}