import React, { useState } from 'react';
import { User, Mail, Lock, } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config/api.js';

export const Login = () => {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!identifier || !password) {
      setMessage('Please enter both email/phone number and password');
      return;
    }

    try {
      const response = await fetch(getApiUrl('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: identifier, password: password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (parseError) {
          setMessage(`Server error: ${response.statusText}`);
          setIsLoading(false);
          return;
        }
        
        // --- FIX 1: HANDLE UNVERIFIED USER REDIRECT ---
        // The backend sends a 403 with a flag and the user's role/email
        if (response.status === 403 && errorData.redirect_to_verify) {
            setMessage('Account unverified. Sending new OTP...');
            setTimeout(() => {
                // Pass the correct email and role (returned by backend) to the verification page
                navigate('/verify-otp', { 
                    state: { 
                        email: errorData.email, 
                        role: errorData.role 
                    } 
                });
            }, 1500);
            setIsLoading(false);
            return;
        }

        // Handle other errors (401, 400, etc.)
        setMessage(errorData.message || `Login failed. Status: ${response.status}`);
        setIsLoading(false);
        return;
      }
      
      // 2. Handle HTTP Success (response.ok is true)
      if (data.ok) {
        setMessage('Welcome back! Redirecting...');
        
        // Store user data and token
        localStorage.setItem('clientUser', JSON.stringify(data.user));
        
        // FIX 2: Store a token so App.jsx knows the user is authenticated
        const tokenToStore = data.token || 'client_verified_session'; 
        localStorage.setItem('client_token', tokenToStore); 
        
        setTimeout(() => {
          window.location.href = '/dashboard'; 
        }, 1500);
      } else {
        setMessage(data.message || 'Login failed');
      }

    } catch (err) {
      console.error('Login error:', err);
      setMessage('Network error. Please try again.');
    } finally {
        setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl shadow-lg flex items-center justify-center mr-3 relative">
                  <div className="relative">
                   <img src="logo.jpg" alt="logo" />
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">NeatSeed</h1>
              </div>
              <p className="text-gray-500 text-sm lg:text-base">
                Smarter Waste Management for a Cleaner Tomorrow
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {/* Welcome Header - Simplified */}
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-500">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Removed "User Type Selection" - this is a login page */}
              
              {/* --- FORM STARTS HERE --- */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* --- KEY CHANGE 1: "Identifier" Input --- */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email / Phone Number
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="identifier"
                      value={identifier} /* Use 'identifier' state */
                      onChange={(e) => setIdentifier(e.target.value)} /* Update 'identifier' state */
                      placeholder="Enter your email or phone"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* --- KEY CHANGE 2: "Password" Input --- */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"} /* Added showPassword logic */
                      name="password"
                      value={password} /* Use 'password' state */
                      onChange={(e) => setPassword(e.target.value)} /* Update 'password' state */
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                    {/* Optional: Show/Hide button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link to="/forgotpassword" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm cursor-pointer">
                    Forgot Password?
                  </Link>
                </div>

                {/* --- KEY CHANGE 3: Message Display --- */}
                {message && (
                  <div className={`text-center text-sm p-3 rounded-lg ${
                    message.includes('Welcome') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {message}
                  </div>
                )}

                {/* --- KEY CHANGE 4: Submit Button --- */}
                <button
                type="submit"
                disabled={isLoading} // PREVENT DOUBLE CLICKS
                className={`w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg 
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-emerald-600 hover:shadow-xl'}
                `}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  {/* ... (divider JSX) ... */}
                </div>

                {/* Google Login */}
                <button
                  type="button" /* Use type="button" so it doesn't submit the form */
                  onClick={handleGoogleLogin}className="w-full flex items-center justify-center gap-3 py-3 px-6 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Login with Google
                </button>

                {/* --- KEY CHANGE 5: Toggle Sign Up Link --- */}
                <p className="text-center text-gray-600 text-sm mt-6">
                  Don't have an account?{' '}
                  <Link
                    to="/signup" /* Use a proper Link */
                    className="text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </p>

              </form> {/* --- FORM ENDS HERE --- */}
            </div>
          </div>

          {/* Right Panel - Desktop Only */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full"></div>
            </div>

            <div className="text-center relative z-10 max-w-lg">
              {/* Recycle Icon */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                 <img src="logo.jpg" alt="logo" />
                </div>
              </div>

              <h1 className="text-5xl font-bold mb-6">Join the Green Revolution</h1>
              <p className="text-xl text-white leading-relaxed mb-12">
                Together, we're building a sustainable future through smart waste management and eco-friendly practices.
              </p>
            </div>

            {/* Decorative plant silhouettes at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                  fill="currentColor"
                  d="M0,0 L50,20 L100,10 L150,30 L200,20 L250,40 L300,30 L350,50 L400,40 L450,60 L500,50 L550,70 L600,60 L650,80 L700,70 L750,90 L800,80 L850,100 L900,90 L950,110 L1000,100 L1050,120 L1100,110 L1150,120 L1200,110 L1200,120 L0,120 Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
