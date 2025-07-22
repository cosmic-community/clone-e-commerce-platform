import { Store } from '@/types'
import { MapPin, Clock, Phone } from 'lucide-react'

interface StoreCardProps {
  store: Store
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {store.metadata.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${store.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={store.metadata.name}
            className="w-full h-full object-cover"
            width={300}
            height={200}
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-4">
          {store.metadata.name}
        </h3>
        
        <div className="space-y-3 text-gray-600">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="whitespace-pre-line">
                {store.metadata.address}
              </p>
            </div>
          </div>
          
          {store.metadata.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span>{store.metadata.phone}</span>
            </div>
          )}
          
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="whitespace-pre-line">
                {store.metadata.hours}
              </p>
            </div>
          </div>
        </div>
        
        {store.metadata.services && store.metadata.services.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-black mb-2">Services Available</h4>
            <div className="flex flex-wrap gap-2">
              {store.metadata.services.map((service) => (
                <span
                  key={service}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}