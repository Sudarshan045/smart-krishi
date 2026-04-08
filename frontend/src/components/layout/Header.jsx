import React from 'react'
import { Link } from 'react-router-dom'
import { Sprout, Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout size={32} />
            <span className="text-xl font-bold">Smart Krishi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition">Home</Link>
            <Link to="/farming-basics" className="hover:text-green-200 transition">Farming Basics</Link>
            <Link to="/guide/sugarcane" className="hover:text-green-200 transition">Crop Guide</Link>
            <Link to="/calculator" className="hover:text-green-200 transition">Calculator</Link>
            <Link to="/calendar" className="hover:text-green-200 transition">Calendar</Link>
            <Link to="/schemes" className="hover:text-green-200 transition">Schemes</Link>
            <Link to="/videos" className="hover:text-green-200 transition">Videos</Link>
            <Link to="/help" className="hover:text-green-200 transition">Help</Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition"
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'मराठी' : 'English'}</span>
            </button>
            
            {/* Auth Buttons */}
            <Link to="/login" className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition">Register</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/farming-basics" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Farming Basics</Link>
              <Link to="/guide/sugarcane" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Crop Guide</Link>
              <Link to="/calculator" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Calculator</Link>
              <Link to="/calendar" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Calendar</Link>
              <Link to="/schemes" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Schemes</Link>
              <Link to="/videos" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Videos</Link>
              <Link to="/help" className="hover:text-green-200 transition" onClick={() => setIsMenuOpen(false)}>Help</Link>
              
              {/* Language Toggle Mobile */}
              <button 
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-700 rounded-lg"
              >
                <Globe size={18} />
                <span>{language === 'en' ? 'मराठी' : 'English'}</span>
              </button>
              
              <div className="flex space-x-4 pt-2">
                <Link to="/login" className="flex-1 px-4 py-2 bg-white text-green-600 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="flex-1 px-4 py-2 bg-green-700 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header