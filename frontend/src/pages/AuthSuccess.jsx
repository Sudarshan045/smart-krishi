import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const AuthSuccess = () => {
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      loginWithToken(token)
        .then(() => {
          setTimeout(() => {
            navigate('/');
          }, 2000);
        })
        .catch((err) => {
          console.error('Google Auth Failed:', err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [location, loginWithToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white rounded-[3rem] shadow-xl max-w-sm w-full mx-4"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Login Successful!</h2>
        <p className="text-gray-500">Redirecting you to the dashboard...</p>
        
        <div className="mt-8 flex justify-center">
          <div className="flex gap-1">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="w-2 h-2 bg-green-600 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              className="w-2 h-2 bg-green-600 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              className="w-2 h-2 bg-green-600 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthSuccess;
