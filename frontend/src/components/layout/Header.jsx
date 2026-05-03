import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Sprout, 
  Menu, 
  X, 
  Globe, 
  User, 
  LogOut, 
  ChevronDown,
  Search,
  Bell,
  Settings
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import TranslatedText from '../common/TranslatedText'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { isAuthenticated, logout, user } = useAuth()
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t('nav.home'), path: '/', exact: true },
    { name: t('nav.farming_basics'), path: '/farming-basics' },
    { name: t('nav.crop_guide'), path: '/guide/sugarcane' },
    { name: t('nav.disease_detection'), path: '/disease-detection' },
    { name: t('nav.marketplace'), path: '/marketplace' },
    { name: t('nav.smart_advisor'), path: '/smart-advisor' },
    { name: t('nav.calendar'), path: '/calendar' },
    { name: t('nav.schemes'), path: '/schemes' },
    { name: t('nav.videos'), path: '/videos' },
    { name: t('nav.help'), path: '/help' },
  ]

  const getLinkClass = (path, exact = false) => {
    const isActive = exact 
      ? location.pathname === path 
      : location.pathname.startsWith(path);
      
    return `relative py-2 px-1 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
      isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-500'
    }`;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled ? 'py-4' : 'py-6'
    }`}>
      <div className="container-custom">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[2rem] px-8 py-3 shadow-[0_8px_40px_rgb(0,0,0,0.06)] flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'shadow-[0_20px_60px_rgb(0,0,0,0.1)] scale-[1.02]' : ''
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <Sprout size={22} className="text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
              <TranslatedText>Smart Krishi</TranslatedText>
            </span>
          </Link>

          {/* Desktop Navigation - Scrollable on overflow */}
          <nav className="hidden xl:flex items-center gap-4 ml-6 overflow-x-auto no-scrollbar max-w-[60%] py-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={getLinkClass(link.path, link.exact)}>
                <span className="whitespace-nowrap">{link.name}</span>
                {((link.exact && location.pathname === link.path) || (!link.exact && location.pathname.startsWith(link.path))) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-5 py-2 bg-gray-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-gray-100"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'मराठी' : 'EN'}</span>
            </button>

            <div className="w-px h-6 bg-gray-100" />

            {/* Auth/Profile */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  <User size={20} />
                </Link>
                <button 
                  onClick={logout}
                  className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="px-6 py-2.5 font-black text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <TranslatedText>Login</TranslatedText>
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                >
                  <TranslatedText>Register</TranslatedText>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="xl:hidden w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="xl:hidden absolute left-4 right-4 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white p-8 shadow-2xl z-[90] overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4 mb-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 bg-gray-50 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-600"
                >
                  <Globe size={16} />
                  {language === 'en' ? 'मराठी मध्ये बदला' : 'Switch to English'}
                </button>
                
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">
                      <User size={16} />
                      {t('nav.profile')}
                    </Link>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center justify-center gap-3 px-8 py-4 bg-red-50 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                      <LogOut size={16} />
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center px-8 py-4 bg-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-600">
                      {t('nav.login')}
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header