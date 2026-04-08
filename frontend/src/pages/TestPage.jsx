import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const TestPage = () => {
  const { language, toggleLanguage } = useLanguage()
  
  return (
    <div className="p-8">
      <h1>Current Language: {language}</h1>
      <button onClick={toggleLanguage} className="bg-green-600 text-white px-4 py-2 rounded">
        Toggle Language
      </button>
    </div>
  )
}

export default TestPage
