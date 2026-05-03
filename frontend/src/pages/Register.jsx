import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Leaf, 
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import TranslatedText from '../components/common/TranslatedText';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return 'Please enter your full name (at least 2 characters)';
    }
    if (!formData.email.includes('@')) {
      return 'Please enter a valid email address';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile)) {
      return 'Please enter a valid 10-digit Indian mobile number';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
        formData.mobile || undefined
      );
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Email might already exist.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        <img 
          src="/images/sugarcane_bg.png" 
          alt="Agriculture" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/40 to-transparent" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Leaf className="text-green-600" size={28} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">Smart Krishi</span>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-6xl font-black text-white leading-tight mb-8">
                Grow Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Digital Farm</span>
              </h2>
              <div className="space-y-6 mb-12">
                {[
                  'Save your profit history & ROI stats',
                  'Manage multiple farm plots easily',
                  'Access personalized disease remedies',
                  'Multilingual support (English & Marathi)'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-green-50 font-bold text-lg">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30">
                      <CheckCircle size={14} className="text-green-400" />
                    </div>
                    <TranslatedText>{text}</TranslatedText>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex items-center gap-8 text-white/40 text-[10px] font-black uppercase tracking-widest">
            <span>Verified 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Secure SSL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>50K+ Farmers</span>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden bg-gray-50/30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl -ml-48 -mt-48" />
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              <TranslatedText>Join the Future,</TranslatedText> <br/>
              <span className="text-green-600"><TranslatedText>Create New Account</TranslatedText></span>
            </h1>
            <p className="text-gray-400 font-bold">Start your digital farming journey today with Smart Krishi.</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 bg-red-50 border border-red-100 text-red-600 p-5 rounded-3xl mb-8 shadow-sm"
              >
                <AlertCircle size={20} className="flex-shrink-0" />
                <p className="font-bold text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={18} />
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Patil"
                  className="w-full bg-white border-2 border-transparent rounded-2xl py-4 pl-14 pr-4 font-bold text-gray-900 shadow-sm focus:border-green-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="farmer@smartkrishi.com"
                  className="w-full bg-white border-2 border-transparent rounded-2xl py-4 pl-14 pr-4 font-bold text-gray-900 shadow-sm focus:border-green-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="col-span-1 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile</label>
              <div className="relative group">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={18} />
                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876..."
                  className="w-full bg-white border-2 border-transparent rounded-2xl py-4 pl-14 pr-4 font-bold text-gray-900 shadow-sm focus:border-green-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="col-span-1 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={18} />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full bg-white border-2 border-transparent rounded-2xl py-4 pl-14 pr-4 font-bold text-gray-900 shadow-sm focus:border-green-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={18} />
                <input
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="w-full bg-white border-2 border-transparent rounded-2xl py-4 pl-14 pr-4 font-bold text-gray-900 shadow-sm focus:border-green-400 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="col-span-2 mt-4 py-5 bg-green-600 text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl shadow-green-100 hover:bg-green-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <TranslatedText>Create Free Account</TranslatedText>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`}
              className="w-full flex items-center justify-center gap-4 py-4 bg-white border-2 border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all mb-6"
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" />
              <TranslatedText>Quick Register with Google</TranslatedText>
            </button>

            <p className="text-gray-500 font-bold text-sm">
              <TranslatedText>Already part of the community?</TranslatedText>{' '}
              <Link to="/login" className="text-green-600 hover:underline">
                <TranslatedText>Sign In</TranslatedText>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;