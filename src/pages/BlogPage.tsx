import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Tag, Search, Piano, Guitar, Mic } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'tips', name: 'Learning Tips', count: 5 },
    { id: 'insights', name: 'Music Insights', count: 3 },
    { id: 'spotlights', name: 'Student Stories', count: 4 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Practice Techniques Every Piano Student Should Know',
      category: 'tips',
      author: 'Mrs. Laveena Fernandes',
      date: '2025-01-15',
      readTime: '8 min read',
      excerpt: 'Discover proven practice methods that will accelerate your piano learning journey and help you overcome common challenges.',
      image: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg',
      tags: ['Piano', 'Practice', 'Beginner Tips'],
      featured: true
    },
    {
      id: 2,
      title: 'The Science Behind Music Education: How Learning Music Changes Your Brain',
      category: 'insights',
      author: 'Mr. Sharwin Fernandes',
      date: '2025-01-12',
      readTime: '12 min read',
      excerpt: 'Explore the fascinating neurological benefits of music education and why starting early can have lifelong impacts.',
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg',
      tags: ['Neuroscience', 'Benefits', 'Education'],
      featured: true
    },
    {
      id: 3,
      title: 'From Shy Beginner to Confident Performer: Arjun\'s Musical Journey',
      category: 'spotlights',
      author: 'Musicraft Team',
      date: '2025-01-10',
      readTime: '6 min read',
      excerpt: 'Follow Arjun\'s transformation from a hesitant beginner to a Grade 5 pianist who now performs with confidence.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      tags: ['Success Story', 'Piano', 'Student Journey']
    },
    {
      id: 4,
      title: 'Guitar Chord Progressions That Every Beginner Should Master',
      category: 'tips',
      author: 'Mr. Sharwin Fernandes',
      date: '2025-01-08',
      readTime: '10 min read',
      excerpt: 'Learn the fundamental chord progressions that form the backbone of countless popular songs.',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
      tags: ['Guitar', 'Chords', 'Beginner'],
      featured: false
    },
    {
      id: 5,
      title: 'The Benefits of Online Music Learning: Breaking Geographical Barriers',
      category: 'insights',
      author: 'Mrs. Laveena Fernandes',
      date: '2025-01-05',
      readTime: '7 min read',
      excerpt: 'Discover how online music education has revolutionized learning and made quality instruction accessible worldwide.',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      tags: ['Online Learning', 'Technology', 'Accessibility']
    },
    {
      id: 6,
      title: 'Vocal Warm-ups: Essential Exercises for Every Singer',
      category: 'tips',
      author: 'Ms. Priya Shenoy',
      date: '2025-01-03',
      readTime: '5 min read',
      excerpt: 'Protect your voice and improve your singing with these fundamental warm-up exercises.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      tags: ['Vocals', 'Warm-ups', 'Voice Care']
    },
    {
      id: 7,
      title: 'Music Production Basics: Your First Steps into Digital Creation',
      category: 'tips',
      author: 'Mr. Sharwin Fernandes',
      date: '2025-01-01',
      readTime: '15 min read',
      excerpt: 'A comprehensive beginner\'s guide to music production, covering DAWs, basic recording, and mixing techniques.',
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg',
      tags: ['Music Production', 'DAW', 'Recording']
    },
    {
      id: 8,
      title: 'Twin Success: How Two Siblings Discovered Their Musical Talents',
      category: 'spotlights',
      author: 'Musicraft Team',
      date: '2024-12-28',
      readTime: '8 min read',
      excerpt: 'Meet the twins who started their musical journey together and how they\'ve grown into accomplished young musicians.',
      image: 'https://images.pexels.com/photos/1516775/pexels-photo-1516775.jpeg',
      tags: ['Success Story', 'Family', 'Piano', 'Violin']
    },
    {
      id: 9,
      title: 'Understanding Music Theory: Building Blocks of Musical Understanding',
      category: 'insights',
      author: 'Mr. Arun Kumar',
      date: '2024-12-25',
      readTime: '11 min read',
      excerpt: 'Demystify music theory and understand how it enhances your musical performance and composition skills.',
      image: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg',
      tags: ['Music Theory', 'Education', 'Foundation']
    },
    {
      id: 10,
      title: 'The Adult Learner\'s Guide to Starting Music at Any Age',
      category: 'tips',
      author: 'Mrs. Laveena Fernandes',
      date: '2024-12-22',
      readTime: '9 min read',
      excerpt: 'It\'s never too late to start learning music. Discover strategies specifically designed for adult beginners.',
      image: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg',
      tags: ['Adult Learning', 'Motivation', 'Getting Started']
    },
    {
      id: 11,
      title: 'From Bedroom Producer to Professional: Rahul\'s Music Production Journey',
      category: 'spotlights',
      author: 'Musicraft Team',
      date: '2024-12-20',
      readTime: '7 min read',
      excerpt: 'Discover how Rahul transformed from a hobbyist to a professional music producer through dedication and expert guidance.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      tags: ['Success Story', 'Music Production', 'Career']
    },
    {
      id: 12,
      title: 'Building Confidence for Musical Performances',
      category: 'spotlights',
      author: 'Ms. Priya Shenoy',
      date: '2024-12-18',
      readTime: '6 min read',
      excerpt: 'Learn practical strategies to overcome performance anxiety and build the confidence needed for successful musical performances.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      tags: ['Performance', 'Confidence', 'Mental Health']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tips': return Guitar;
      case 'insights': return Piano;
      case 'spotlights': return Mic;
      default: return Piano;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tips': return 'from-yellow-500 to-orange-500';
      case 'insights': return 'from-blue-500 to-cyan-500';
      case 'spotlights': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Blog & Resources
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Insights, tips, and inspiring stories from our musical community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, tips, stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
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

        {/* Featured Posts */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => {
                const CategoryIcon = getCategoryIcon(post.category);
                return (
                  <article
                    key={post.id}
                    className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <div className={`bg-gradient-to-r ${getCategoryColor(post.category)} rounded-full px-4 py-2 flex items-center`}>
                          <CategoryIcon className="h-4 w-4 text-white mr-2" />
                          <span className="text-white text-sm font-semibold capitalize">{post.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-gray-300 text-sm">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory === 'all' ? 'Latest Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-400">
              {filteredPosts.length} articles found
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const CategoryIcon = getCategoryIcon(post.category);
              return (
                <article
                  key={post.id}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <div className={`bg-gradient-to-r ${getCategoryColor(post.category)} rounded-full px-3 py-1 flex items-center`}>
                        <CategoryIcon className="h-3 w-3 text-white mr-1" />
                        <span className="text-white text-xs font-semibold capitalize">{post.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>{post.author}</span>
                      <div className="flex items-center space-x-3">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 1).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center">
                        Read
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* No posts found */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
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

        {/* Newsletter Subscription */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-12 text-center border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Our Latest Articles</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get weekly insights, tips, and stories delivered straight to your inbox
            </p>
            <div className="max-w-md mx-auto flex space-x-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;