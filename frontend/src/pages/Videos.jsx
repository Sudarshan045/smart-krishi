import React, { useState } from 'react';

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'Sugarcane Cultivation - Complete Guide',
      titleMarathi: 'उस लागवड - संपूर्ण मार्गदर्शन',
      category: 'Sugarcane',
      duration: '15:30',
      views: '125K',
      description: 'Complete guide for sugarcane farming from land preparation to harvest'
    },
    {
      id: 2,
      title: 'Grape Farming Techniques',
      titleMarathi: 'द्राक्ष शेती तंत्र',
      category: 'Grapes',
      duration: '22:15',
      views: '89K',
      description: 'Learn modern grape cultivation techniques for higher yield'
    },
    {
      id: 3,
      title: 'Drip Irrigation for Sugarcane',
      titleMarathi: 'उसासाठी ठिबक सिंचन',
      category: 'Irrigation',
      duration: '12:45',
      views: '67K',
      description: 'Benefits and installation of drip irrigation system'
    },
    {
      id: 4,
      title: 'Pest Management in Grapes',
      titleMarathi: 'द्राक्षातील किड नियंत्रण',
      category: 'Pest Control',
      duration: '18:20',
      views: '54K',
      description: 'Identify and control common pests in grape vineyards'
    },
    {
      id: 5,
      title: 'Organic Farming Methods',
      titleMarathi: 'सेंद्रिय शेती पद्धती',
      category: 'Organic',
      duration: '25:00',
      views: '210K',
      description: 'Learn organic farming techniques for sustainable agriculture'
    },
    {
      id: 6,
      title: 'Government Schemes for Farmers',
      titleMarathi: 'शेतकऱ्यांसाठी सरकारी योजना',
      category: 'Schemes',
      duration: '20:15',
      views: '98K',
      description: 'Complete guide to available government schemes'
    },
    {
      id: 7,
      title: 'Soil Health Management',
      titleMarathi: 'मृदा आरोग्य व्यवस्थापन',
      category: 'Soil',
      duration: '16:40',
      views: '76K',
      description: 'Improve soil health for better crop yield'
    },
    {
      id: 8,
      title: 'Harvesting Techniques',
      titleMarathi: 'कापणी तंत्र',
      category: 'Harvesting',
      duration: '14:30',
      views: '82K',
      description: 'Proper harvesting methods for maximum yield'
    }
  ];

  const categories = ['all', 'Sugarcane', 'Grapes', 'Irrigation', 'Pest Control', 'Organic', 'Schemes', 'Soil', 'Harvesting'];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.titleMarathi.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Video Learning</h1>
          <p className="text-gray-600">व्हिडीो शिक्षण</p>
          <p className="text-gray-600 mt-2">Watch educational videos about farming techniques</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className="bg-gradient-to-r from-green-600 to-green-700 h-40 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-white text-5xl mb-2">▶️</div>
                  <span className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">{video.duration}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600">▶️</span>
                  <span className="text-xs text-gray-500">{video.views} views</span>
                  <span className="text-xs text-gray-500">⏱️ {video.duration}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{video.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{video.titleMarathi}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {video.category}
                  </span>
                  <span className="text-gray-400">👍</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Channel Link */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 text-center">
          <div className="text-red-600 text-6xl mb-3">▶️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Subscribe to Our YouTube Channel</h3>
          <p className="text-gray-600 mb-4">Get regular updates on farming techniques and government schemes</p>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <span>▶️</span>
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Videos;