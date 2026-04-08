import React from 'react'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white mt-auto">
      <div className="container-custom py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Smart Krishi</h3>
            <p className="text-green-200">Empowering Maharashtra farmers with smart farming solutions</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="/guide" className="hover:text-white">Crop Guides</a></li>
              <li><a href="/calculator" className="hover:text-white">Cost Calculator</a></li>
              <li><a href="/schemes" className="hover:text-white">Government Schemes</a></li>
              <li><a href="/help" className="hover:text-white">Help & Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-green-200">
              <li>Email: support@smartkrishi.com</li>
              <li>Helpline: 1800-XXX-XXXX</li>
              <li>मराठी मध्ये उपलब्ध</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-300">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart size={16} className="text-red-400" /> for Indian Farmers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer