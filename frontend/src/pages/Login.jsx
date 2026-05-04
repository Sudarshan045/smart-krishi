import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Leaf, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import TranslatedText from '../components/common/TranslatedText';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
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
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-red-900/40 to-transparent" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Leaf className="text-green-600" size={28} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">Smart Krishi</span>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-6xl font-black text-white leading-tight mb-8">
                Empowering <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Modern Farmers</span>
              </h2>
              <p className="text-xl text-green-50 font-bold max-w-lg mb-12">
                Join our ecosystem of digital agriculture tools designed to increase yield and ensure sustainability.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, label: 'Secure Data' },
                { icon: Zap, label: 'Instant Advice' },
                { icon: Award, label: 'Top Experts' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <item.icon className="text-green-400 mb-2" size={24} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/60">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
            © 2026 Smart Krishi Platform • Version 3.0
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative overflow-hidden bg-gray-50/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -ml-48 -mb-48" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              <TranslatedText>Welcome Back,</TranslatedText> <br/>
              <span className="text-green-600"><TranslatedText>Login to Dashboard</TranslatedText></span>
            </h1>
            <p className="text-gray-400 font-bold">Sign in to your account to manage your farms and view reports.</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-4 bg-red-50 border border-red-100 text-red-600 p-6 rounded-[2rem] mb-8 shadow-sm"
              >
                <AlertCircle size={24} />
                <p className="font-bold text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@smartkrishi.com"
                  className="w-full bg-white border-2 border-transparent rounded-[2rem] py-5 pl-16 pr-8 font-bold text-gray-900 shadow-[0_8px_40px_rgb(0,0,0,0.03)] focus:border-green-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-black text-green-600 uppercase tracking-widest hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-transparent rounded-[2rem] py-5 pl-16 pr-16 font-bold text-gray-900 shadow-[0_8px_40px_rgb(0,0,0,0.03)] focus:border-green-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-black active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <TranslatedText>Sign In to Account</TranslatedText>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-400 font-bold mb-8 uppercase tracking-tighter text-sm italic">
              <TranslatedText>Digital Agriculture Ecosystem</TranslatedText>
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                  const authUrl = baseUrl.endsWith('/api') ? `${baseUrl}/auth/google` : `${baseUrl}/api/auth/google`;
                  window.location.href = authUrl;
                }}
                className="flex items-center justify-center gap-4 py-4 px-8 bg-white border-2 border-gray-100 rounded-[1.5rem] font-black text-xs uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" />
                <TranslatedText>Continue with Google</TranslatedText>
              </button>

              <p className="text-gray-500 font-bold text-sm mt-4">
                <TranslatedText>New to Smart Krishi?</TranslatedText>{' '}
                <Link to="/register" className="text-green-600 hover:underline">
                  <TranslatedText>Create a free account</TranslatedText>
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;