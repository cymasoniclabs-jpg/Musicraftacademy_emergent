import React, { useState } from 'react';
import { Guitar, Search, Filter, Star, Phone, MessageCircle } from 'lucide-react';

const StorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Products', count: 45 },
    { id: 'keyboards', name: 'Keyboards & Pianos', count: 8 },
    { id: 'guitars', name: 'Guitars & Ukuleles', count: 12 },
    { id: 'wind', name: 'Wind Instruments', count: 6 },
    { id: 'drums', name: 'Drums & Percussion', count: 7 },
    { id: 'violins', name: 'Violins & Strings', count: 5 },
    { id: 'software', name: 'Software & DAWs', count: 4 },
    { id: 'accessories', name: 'Accessories', count: 18 }
  ];

  const products = [
    {
      id: 1,
      name: 'Yamaha P-145 Digital Piano',
      category: 'keyboards',
      price: '₹54,999',
      originalPrice: '₹64,999',
      image: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg',
      rating: 4.8,
      reviews: 127,
      features: ['88 weighted keys', 'GHS action', '10 voices', 'USB connectivity'],
      badge: 'Best Seller',
      recommended: true
    },
    {
      id: 2,
      name: 'Fender Player Stratocaster',
      category: 'guitars',
      price: '₹75,999',
      originalPrice: '₹84,999',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
      rating: 4.9,
      reviews: 89,
      features: ['Alder body', '3 single-coil pickups', 'Modern C neck', 'Vintage style tuners'],
      badge: 'Premium',
      recommended: true
    },
    {
      id: 3,
      name: 'Audio-Technica ATH-M40x',
      category: 'accessories',
      price: '₹9,999',
      originalPrice: '₹12,999',
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg',
      rating: 4.7,
      reviews: 203,
      features: ['Professional monitoring', '40mm drivers', 'Foldable design', 'Detachable cables'],
      badge: 'Sale'
    },
    {
      id: 4,
      name: 'Roland TD-07KV Electronic Drum Kit',
      category: 'drums',
      price: '₹89,999',
      originalPrice: '₹99,999',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      rating: 4.6,
      reviews: 45,
      features: ['Mesh head snare', 'TD-07 sound module', '25 preset kits', 'Bluetooth audio'],
      badge: 'New Arrival'
    },
    {
      id: 5,
      name: 'Stentor Student II Violin',
      category: 'violins',
      price: '₹18,999',
      originalPrice: '₹22,999',
      image: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg',
      rating: 4.5,
      reviews: 67,
      features: ['Solid carved spruce top', 'Ebony fingerboard', 'Includes bow and case', 'Student level'],
      recommended: true
    },
    {
      id: 6,
      name: 'Native Instruments Komplete 14',
      category: 'software',
      price: '₹45,999',
      originalPrice: '₹54,999',
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg',
      rating: 4.9,
      reviews: 156,
      features: ['100+ instruments', '75GB samples', 'Kontakt 7 Player', 'Pro effects'],
      badge: 'Digital Download'
    },
    {
      id: 7,
      name: 'Yamaha F280 Acoustic Guitar',
      category: 'guitars',
      price: '₹12,999',
      originalPrice: '₹16,999',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
      rating: 4.4,
      reviews: 234,
      features: ['Spruce top', 'Meranti back & sides', 'Nato neck', 'Chrome tuners'],
      badge: 'Beginner Friendly'
    },
    {
      id: 8,
      name: 'Casio CT-S300 Keyboard',
      category: 'keyboards',
      price: '₹14,999',
      originalPrice: '₹18,999',
      image: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg',
      rating: 4.3,
      reviews: 98,
      features: ['61 keys', '400 tones', '77 rhythms', 'Dance music mode'],
      recommended: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const recommendedProducts = products.filter(product => product.recommended);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mr-4">
              <Guitar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Music Store
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Professional-grade instruments, software, and accessories curated by our expert faculty
          </p>
        </div>

        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-8 mb-12 border border-gray-700/50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need Expert Recommendations?</h2>
            <p className="text-gray-300 mb-6">Our faculty can help you choose the perfect instrument for your journey</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 7204731520
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Chat
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search instruments, software, accessories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter by category */}
          <div className="lg:w-80">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recommended Products */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Faculty Recommended</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 relative">
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                  <div className="aspect-square bg-gray-700 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-white">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm ml-2">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-400">
              {filteredProducts.length} products found
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                {/* Product Image */}
                <div className="aspect-square bg-gray-700 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      product.badge === 'Best Seller' ? 'bg-green-500 text-white' :
                      product.badge === 'Sale' ? 'bg-red-500 text-white' :
                      product.badge === 'New Arrival' ? 'bg-blue-500 text-white' :
                      product.badge === 'Premium' ? 'bg-purple-500 text-white' :
                      product.badge === 'Digital Download' ? 'bg-indigo-500 text-white' :
                      'bg-orange-500 text-white'
                    }`}>
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <ul className="text-gray-400 text-sm space-y-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-white">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm ml-2">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                      Get Quote
                    </button>
                    <button className="w-full border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white py-2 rounded-xl text-sm font-medium transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No products found</h3>
            <p className="text-gray-400 mb-8">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-12 border border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our expert team can help you find the perfect instrument or provide custom recommendations based on your needs and budget
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
              <Phone className="mr-3 h-5 w-5" />
              Call for Custom Quote
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
              <MessageCircle className="mr-3 h-5 w-5" />
              Chat with Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;