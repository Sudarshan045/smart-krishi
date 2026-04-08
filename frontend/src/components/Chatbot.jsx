import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Namaste! I am Smart Krishi Assistant. How can I help you today?', time: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('sugarcane') || msg.includes('उस')) {
      return 'Sugarcane requires well-drained soil, 10-12 months growing period. Best planting time is February-March. Would you like detailed cultivation guide?';
    }
    if (msg.includes('grape') || msg.includes('द्राक्ष')) {
      return 'Grapes grow best in sandy loam soil. Requires pruning twice a year. Main harvest season is January-March. Need more details?';
    }
    if (msg.includes('weather') || msg.includes('हवामान')) {
      return 'You can check current weather for your location in the weather widget. For specific crop advice based on weather, please tell me your crop and location.';
    }
    if (msg.includes('scheme') || msg.includes('योजना')) {
      return 'Visit our Government Schemes page to see all available schemes like PM-KISAN, Fasal Bima Yojana, etc. Would you like help applying for any specific scheme?';
    }
    if (msg.includes('calculator') || msg.includes('कॅल्क्युलेटर')) {
      return 'Our cost calculator helps you estimate investment, revenue and profit. Go to Calculator page, select crop and enter your land area.';
    }
    if (msg.includes('pest') || msg.includes('किड')) {
      return 'Common pests: For sugarcane - Stem borer, for grapes - Powdery mildew. Use organic pesticides and consult local agricultural officer.';
    }
    if (msg.includes('fertilizer') || msg.includes('खत')) {
      return 'For sugarcane: 250:125:125 kg NPK per hectare. For grapes: Apply compost and balanced fertilizers based on soil test.';
    }
    if (msg.includes('help') || msg.includes('मदत')) {
      return 'I can help with: Crop guides, Pest management, Fertilizer recommendations, Government schemes, Weather advice. What do you need?';
    }
    if (msg.includes('price') || msg.includes('किंमत')) {
      return 'Current market prices: Sugarcane ₹3,200/tonne, Grapes ₹60-80/kg. Prices vary by location and quality.';
    }
    
    return 'I understand you need farming assistance. Could you please specify your crop (Sugarcane/Grapes) or the type of help you need?';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: inputText, time: new Date() }]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse, time: new Date() }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">Smart Krishi Assistant</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsOpen(false)} className="hover:bg-green-800 p-1 rounded">
                <Minimize2 size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-green-800 p-1 rounded">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === 'user' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {msg.type === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    msg.type === 'user' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {msg.time.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Try: "Sugarcane guide", "Weather", "Government schemes", "Pest control"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;