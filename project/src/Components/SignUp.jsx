import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config/api.js';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    role: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit CALLED");
    setMessage('');

    console.log("Form Data:", formData);
    if (!formData.fullName || !formData.phone || !formData.address || !formData.role || !formData.password || !formData.email) {
      setMessage('Please fill in all fields');
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch(getApiUrl('signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully! Redirecting to verification...');
        setTimeout(() => {
          navigate('/verify-otp', {
            state: {
              email: formData.email,
              role: formData.role
            }
          });
        }, 2000);
      } else {
        setMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Desktop Only */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="text-center relative z-10">
              <div className="w-24 h-24 bg-opacity-40 rounded-full flex items-center justify-center mx-auto mb-8">
                <img src="logo.jpg" alt="logo" />
              </div>

              <h1 className="text-5xl font-bold mb-6">Join NeatSeed</h1>
              <p className="text-xl text-white leading-relaxed mb-12 max-w-md">
                Be part of our eco-friendly community. Together, we're making the world cleaner and greener.
              </p>

              {/* Illustration Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 relative overflow-hidden shadow-2xl max-w-md mx-auto">
                {/* Background circles */}
                <div className="absolute top-10 right-10 w-40 h-40 bg-emerald-200 rounded-full opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-300 rounded-full opacity-20"></div>

                {/* Plant illustration */}
                <div className="relative z-10">
                  {/* Recycling symbol top-left */}
                  <div className="absolute top-0 left-0">
                    <svg className="w-16 h-16 text-emerald-300 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.82 15.42l-2.5-4.33c-.49-.85-1.39-1.42-2.41-1.42h-.77l1.39-2.4c.45-.78.18-1.77-.6-2.22-.77-.45-1.77-.18-2.21.6l-2.82 4.87h-2.09l-2.82-4.87c-.45-.78-1.44-1.05-2.21-.6-.78.45-1.05 1.44-.6 2.22l1.39 2.4h-.77c-1.02 0-1.92.57-2.41 1.42l-2.5 4.33c-.49.85-.49 1.9 0 2.75.49.85 1.39 1.42 2.41 1.42h2.09l-1.39 2.4c-.45.78-.18 1.77.6 2.21.26.15.54.22.81.22.55 0 1.09-.29 1.4-.82l2.82-4.87h2.09l2.82 4.87c.31.53.85.82 1.4.82.27 0 .55-.07.81-.22.78-.44 1.05-1.43.6-2.21l-1.39-2.4h2.09c1.02 0 1.92-.57 2.41-1.42.49-.85.49-1.9 0-2.75z" />
                    </svg>
                  </div>

                  {/* Main plant stem and leaves */}
                  <div className="flex justify-center items-end h-48 relative">
                    {/* Stem */}
                    <div className="w-2 h-32 bg-emerald-600 rounded-full relative">
                      {/* Left leaf */}
                      <div className="absolute left-0 top-12 -translate-x-8">
                        <div className="w-16 h-12 bg-emerald-500 rounded-full transform -rotate-45 opacity-80"></div>
                        <div className="w-10 h-8 bg-emerald-600 rounded-full transform -rotate-45 absolute top-2 left-3"></div>
                      </div>

                      {/* Right leaf */}
                      <div className="absolute right-0 top-16 translate-x-8">
                        <div className="w-16 h-12 bg-emerald-500 rounded-full transform rotate-45 opacity-80"></div>
                        <div className="w-10 h-8 bg-emerald-600 rounded-full transform rotate-45 absolute top-2 right-3"></div>
                      </div>

                      {/* Top leaves */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <div className="w-12 h-16 bg-emerald-600 rounded-full transform -rotate-12"></div>
                        <div className="w-10 h-14 bg-emerald-500 rounded-full absolute top-0 left-1 transform rotate-12"></div>
                      </div>
                    </div>
                  </div>

                  {/* Ground/soil */}
                  <div className="mt-0 h-8 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-full opacity-40"></div>
                </div>

                {/* Recycling symbol bottom-right */}
                <div className="absolute bottom-16 right-8">
                  <svg className="w-12 h-12 text-emerald-300 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.82 15.42l-2.5-4.33c-.49-.85-1.39-1.42-2.41-1.42h-.77l1.39-2.4c.45-.78.18-1.77-.6-2.22-.77-.45-1.77-.18-2.21.6l-2.82 4.87h-2.09l-2.82-4.87c-.45-.78-1.44-1.05-2.21-.6-.78.45-1.05 1.44-.6 2.22l1.39 2.4h-.77c-1.02 0-1.92.57-2.41 1.42l-2.5 4.33c-.49.85-.49 1.9 0 2.75.49.85 1.39 1.42 2.41 1.42h2.09l-1.39 2.4c-.45.78-.18 1.77.6 2.21.26.15.54.22.81.22.55 0 1.09-.29 1.4-.82l2.82-4.87h2.09l2.82 4.87c.31.53.85.82 1.4.82.27 0 .55-.07.81-.22.78-.44 1.05-1.43.6-2.21l-1.39-2.4h2.09c1.02 0 1.92-.57 2.41-1.42.49-.85.49-1.9 0-2.75z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 mt-2">Join the NeatSeed community</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-500">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Type your Name"
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Entrer your email"
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Type your Phone Number"
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Please Enter your Complete Address"
                      rows="3"
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-900 placeholder-gray-400 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    I am a
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-12 pr-10 py-3 bg-gray-100 border-2 border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="">Select your role</option>
                      <option value="user">User</option>
                      <option value="driver">Driver</option>

                    </select>
                    <svg
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=""
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl mt-6">
                  Create Account
                </button>
              </div>
            </form>
            {/* Message Display */}
            {message && (
              <div className={`text-center text-sm mt-4 p-3 rounded-lg ${message.includes('successfully')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
                }`}>
                {message}
              </div>
            )}
            {/* Sign In Link */}
            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?{' '}
              <Link to="/login">
                <span className="text-emerald-500 hover:text-emerald-600 font-semibold cursor-pointer">
                  Log In
                </span>
              </Link>

            </p>
          </div>
        </div >
      </div >
    </div >
  );
}

export default Signup;