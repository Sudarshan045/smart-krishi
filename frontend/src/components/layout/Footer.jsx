import React from 'react'
import { Heart } from 'lucide-react'
import TranslatedText from '../common/TranslatedText'

const Footer = () => {
  return (
    <footer className="bg-green-950/60 backdrop-blur-xl border-t border-white/10 text-white mt-auto relative z-50">
      <div className="container-custom py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Smart Krishi</h3>
            <p className="text-green-200">
              <TranslatedText>Empowering Maharashtra farmers with smart farming solutions</TranslatedText>
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">
              <TranslatedText>Quick Links</TranslatedText>
            </h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="/guide" className="hover:text-white"><TranslatedText>Crop Guides</TranslatedText></a></li>
              <li><a href="/calculator" className="hover:text-white"><TranslatedText>Agri Calculator</TranslatedText></a></li>
              <li><a href="/schemes" className="hover:text-white"><TranslatedText>Government Schemes</TranslatedText></a></li>
              <li><a href="/help" className="hover:text-white"><TranslatedText>Help & Support</TranslatedText></a></li>
              <li><a href="/about" className="hover:text-white"><TranslatedText>About Us</TranslatedText></a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">
              <TranslatedText>Contact</TranslatedText>
            </h4>
            <ul className="space-y-2 text-green-200">
              <li>Email: support@smartkrishi.com</li>
              <li>Helpline: 1800-XXX-XXXX</li>
              <li>मराठी मध्ये उपलब्ध</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-300">
          <p className="flex items-center justify-center gap-1">
            <TranslatedText>Made with</TranslatedText> <Heart size={16} className="text-red-400" /> <TranslatedText>for Indian Farmers</TranslatedText>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer