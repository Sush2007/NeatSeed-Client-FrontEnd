import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, BrowserRouter } from 'react-router-dom';
import { CheckCircle, AlertCircle, Leaf, ArrowRight, Loader2, Mail } from 'lucide-react';

// --- Custom Animated Background Components ---

const FloatingLeaf = ({ delay, x, y, scale, rotate }) => (
  <motion.div
    className="absolute text-green-400/30 pointer-events-none z-0"
    initial={{ x, y, scale, rotate, opacity: 0 }}
    animate={{
      y: [y, y - 20, y],
      rotate: [rotate, rotate + 10, rotate],
      opacity: 1,
    }}
    transition={{
      duration: 4,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Leaf size={40 * scale} />
  </motion.div>
);

const GradientOrb = ({ className, animate }) => (
    <motion.div
        className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none z-0 ${className}`}
        animate={animate}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
);


// Internal Component containing the Logic
const OtpVerificationContent = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(30); 

  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // --- KEY CHANGE: Extract Email & Role from Navigation State ---
  // If state is missing (e.g. direct URL access), fallback or redirect
  const { email, role } = location.state || { email: 'your-email@example.com', role: 'user' };

  useEffect(() => {
    // Optional: Redirect if no email found (security best practice)
    // if (!location.state?.email) navigate('/login'); 

    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]); // Add navigate to dependency if uncommenting redirect

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').slice(0, 6).split('');
    if (data.length === 6 && data.every(char => !isNaN(char))) {
        setOtp(data);
        inputRefs.current[5].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setIsLoading(true);
    setError('');
    
    try {
      // Simulating API Call - Replace with fetch to your backend
      // const response = await fetch(getApiUrl('verify_otp'), {
      //   method: 'POST',
      //   body: JSON.stringify({ email, otp: code, role })
      // });

      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Verified successfully!');
      
      setTimeout(() => {
        if (role === 'admin') {
            navigate('/dashboard'); // Admin Dashboard
        } else {
            navigate('/'); // Client/User Home or Dashboard
        }
      }, 1000);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setError('');
      setSuccess('New code sent!');
      // Trigger backend resend API here using `email` variable
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 relative overflow-hidden">
      
      {/* --- 3D-like Animated Background Layer --- */}
      <GradientOrb 
        className="top-[-10%] left-[-10%] w-96 h-96 bg-green-300"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
      />
      <GradientOrb 
        className="bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-emerald-300"
        animate={{ scale: [1, 1.1, 1], x: [0, -50, 0], y: [0, -50, 0] }}
      />
      <GradientOrb 
        className="top-[40%] right-[20%] w-64 h-64 bg-lime-200"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
      />

      <FloatingLeaf delay={0} x={50} y={100} scale={1.5} rotate={45} />
      <FloatingLeaf delay={1} x={window.innerWidth - 100} y={50} scale={1.2} rotate={-15} />
      <FloatingLeaf delay={2} x={100} y={window.innerHeight - 150} scale={0.8} rotate={90} />
      <FloatingLeaf delay={3} x={window.innerWidth / 2 + 200} y={window.innerHeight / 2 - 100} scale={1} rotate={180} />

      {/* --- Main Content Card --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative z-10 border border-white/60"
      >
        {/* Glossy Effect on Card */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

        <div className="relative z-20">
            <div className="flex justify-center mb-8">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="w-20 h-20 bg-gradient-to-tr from-green-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-white"
            >
                <Mail className="w-10 h-10 text-green-600" />
            </motion.div>
            </div>

            <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">Verify Email</h2>
            <p className="text-gray-600 text-sm font-medium">
                We've sent a secure code to <br/>
                {/* --- DYNAMIC EMAIL DISPLAY --- */}
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">{email}</span>
            </p>
            </div>

            <form onSubmit={handleVerify}>
            <div className="flex justify-between gap-2 mb-8">
                {otp.map((digit, index) => (
                <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-100 rounded-xl bg-white/50 text-gray-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all shadow-sm"
                    whileFocus={{ scale: 1.1, y: -2, borderColor: "#10b981" }}
                />
                ))}
            </div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex items-center justify-center gap-2 text-red-600 text-sm mb-6 bg-red-50 border border-red-100 p-3 rounded-xl"
                >
                <AlertCircle size={16} /> {error}
                </motion.div>
            )}
            
            {success && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex items-center justify-center gap-2 text-green-700 text-sm mb-6 bg-green-50 border border-green-100 p-3 rounded-xl"
                >
                <CheckCircle size={16} /> {success}
                </motion.div>
            )}

            <motion.button
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : <span>Verify Account</span>}
                {!isLoading && <ArrowRight size={20} />}
            </motion.button>
            </form>

            <div className="text-center mt-8 text-sm text-gray-500">
            Didn't receive the code?{' '}
            {timer > 0 ? (
                <span className="text-emerald-600 font-semibold inline-block min-w-[3ch]">00:{timer < 10 ? `0${timer}` : timer}</span>
            ) : (
                <button 
                onClick={handleResend} 
                className="text-emerald-700 font-bold hover:text-emerald-800 hover:underline cursor-pointer transition-colors"
                >
                Resend Now
                </button>
            )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200/60 text-center">
            <button 
                onClick={() => navigate('/login')} 
                className="group text-sm text-gray-500 hover:text-emerald-700 transition-colors flex items-center justify-center gap-1 mx-auto font-medium"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Login
            </button>
            </div>
        </div>
      </motion.div>

    </div>
  );
};

// Wrapper for Standalone Preview
export default function OtpVerification() {
  return (
    <BrowserRouter>
      <OtpVerificationContent />
    </BrowserRouter>
  );
}