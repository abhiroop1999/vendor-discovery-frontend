import React, { useState } from 'react';
import { Search, MapPin, Package, Users, Shield, CheckCircle, Star, TrendingUp, Award, Globe } from 'lucide-react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    location: ''
  });
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.product || !formData.quantity || !formData.location) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://vendor-agent-backend.vercel.app/vendor-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
        setHasSearched(true);
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Vendor Hub</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Solutions</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Trust & Security</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Connect With <span className="text-green-600">Trusted</span> Suppliers Worldwide
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Vendor Hub's AI-powered B2B marketplace matches your business with verified suppliers, 
              streamlines procurement, and builds trust through our innovative rating system.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center space-x-2 text-gray-700">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Verified Suppliers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Award className="w-5 h-5 text-green-600" />
                <span>Credit Monitoring</span>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Product</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleInputChange}
                        placeholder="e.g., Industrial Components, Electronics..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g., 1000 units"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., United States, Europe"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.product || !formData.quantity || !formData.location}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>{loading ? 'Finding Suppliers...' : 'Find Suppliers'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {(hasSearched || loading) && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start">
              {/* Results */}
              <div className="flex-1 mr-8">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Finding the best suppliers for you...</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Found {suppliers.length} suppliers for "{formData.product}"
                      </h2>
                      <p className="text-gray-600">Sorted by relevance and rating</p>
                    </div>

                    <div className="grid gap-6">
                      {suppliers.map((supplier, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 border-l-4 border-l-green-500">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-xl font-semibold text-gray-900">{supplier.name}</h3>
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-sm text-green-600 font-medium">Verified</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-1 text-gray-600">
                                  <MapPin className="w-4 h-4" />
                                  <span>{supplier.location}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600">
                                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                                  <span>4.{Math.floor(Math.random() * 5) + 3}/5.0</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">ISO Certified</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Fast Response</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Quality Assured</span>
                              </div>

                              <div className="flex space-x-3">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                                  Contact Supplier
                                </button>
                                <button className="text-green-600 hover:text-green-700 border border-green-600 hover:border-green-700 px-4 py-2 rounded-lg transition-colors">
                                  View Details
                                </button>
                              </div>
                            </div>

                            {/* Score Display */}
                            <div className="ml-6 text-center">
                              <div className="relative w-20 h-20 mx-auto mb-2">
                                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                                <div 
                                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${getScoreBgColor(supplier.score)}`}
                                  style={{
                                    background: `conic-gradient(from 0deg, #10b981 ${supplier.score * 3.6}deg, #e5e7eb ${supplier.score * 3.6}deg)`
                                  }}
                                ></div>
                                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                  <span className={`text-lg font-bold ${getScoreColor(supplier.score)}`}>
                                    {supplier.score}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">Match Score</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Dashboard Sidebar */}
              <div className="w-80 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                    <h3 className="text-white font-semibold">Procurement Dashboard</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active RFQs</span>
                      <span className="text-2xl font-bold text-gray-900">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Open Orders</span>
                      <span className="text-2xl font-bold text-gray-900">26</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Supplier Rating</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-2xl font-bold text-gray-900">4.8</span>
                        <Star className="w-5 h-5 fill-current text-yellow-400" />
                      </div>
                    </div>
                    <hr className="my-4" />
                    <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors">
                      Live Demo
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <p className="text-gray-900">New quote received</p>
                        <p className="text-gray-500">ElectroTech Components</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <p className="text-gray-900">Order shipped</p>
                        <p className="text-gray-500">Global TextFabrics</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="text-sm">
                        <p className="text-gray-900">New AI match</p>
                        <p className="text-gray-500">PrecisionTools Co.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
