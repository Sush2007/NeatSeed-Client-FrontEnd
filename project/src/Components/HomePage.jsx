import React from 'react'
import { Sparkles, Users, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
  <> 
 <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="w-24 h-24  rounded-full flex items-center justify-center shadow-lg">
            <img src="logo.jpg" alt="logo" />
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-green-500">NeatSeed</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join our eco-friendly community and make the world cleaner,
            one step at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup"> 
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105">
              <Sparkles className="w-5 h-5" />
              Get Started
            </button>
             </Link>
            <Link to="/login">
            <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-xl shadow-lg border-2 border-gray-200 transition-all duration-200 hover:scale-105">
              Login
            </button>
             </Link>
           
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For Users Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">For Users</h2>
            <p className="text-gray-600 text-lg">
              Schedule pickups, track your contributions, and be part of a cleaner environment.
            </p>
          </div>

          {/* For Drivers Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">For Drivers</h2>
            <p className="text-gray-600 text-lg">
              Manage your routes efficiently and contribute to a sustainable future.
            </p>
          </div>
        </div>
      </div>
    </div>
  

  </>
  )
}

export default HomePage