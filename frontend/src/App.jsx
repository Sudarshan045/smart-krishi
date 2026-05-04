import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EnhancedCropDetail from './pages/EnhancedCropDetail';
import CropCalendar from './pages/CropCalendar';
import Schemes from './pages/Schemes';
import Videos from './pages/Videos';
import Help from './pages/Help';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import FarmingBasics from './pages/FarmingBasics';
import DiseaseDetection from './pages/DiseaseDetection';
import Marketplace from './pages/Marketplace';
import SmartAdvisor from './pages/SmartAdvisor';
import AuthSuccess from './pages/AuthSuccess';
import About from './pages/About';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WeatherWidget from './components/WeatherWidget';
import Chatbot from './components/Chatbot';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : (
        <LanguageProvider key="app">
          <AuthProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/guide/:cropId?" element={<EnhancedCropDetail />} />
                    <Route path="/calendar" element={<CropCalendar />} />
                    <Route path="/schemes" element={<Schemes />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/farming-basics" element={<FarmingBasics />} />
                    <Route path="/disease-detection" element={<DiseaseDetection />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/smart-advisor" element={<SmartAdvisor />} />
                    <Route path="/auth-success" element={<AuthSuccess />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </main>
                <WeatherWidget />
                <Footer />
                <Chatbot />
              </div>
            </Router>
          </AuthProvider>
        </LanguageProvider>
      )}
    </AnimatePresence>
  );
}

export default App;