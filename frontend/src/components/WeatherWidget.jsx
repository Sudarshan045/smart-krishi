import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplet, 
  Thermometer, 
  MapPin, 
  Sunrise, 
  Sunset, 
  Zap,
  RefreshCw,
  Navigation
} from 'lucide-react';
import TranslatedText from './common/TranslatedText';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Pune');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const regions = [
    { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Nashik', lat: 19.9975, lon: 73.7898 },
    { name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
    { name: 'Aurangabad', lat: 19.8762, lon: 75.3433 },
    { name: 'Solapur', lat: 17.6599, lon: 75.9064 },
    { name: 'Kolhapur', lat: 16.7050, lon: 74.2433 },
    { name: 'Sangli', lat: 16.8524, lon: 74.5815 },
    { name: 'Satara', lat: 17.6805, lon: 73.9803 },
    { name: 'Amravati', lat: 20.9320, lon: 77.7523 },
    { name: 'Ratnagiri', lat: 16.9902, lon: 73.3120 },
    { name: 'Jalgaon', lat: 21.0077, lon: 75.5626 },
    { name: 'Ahmednagar', lat: 19.0948, lon: 74.7480 },
    { name: 'Latur', lat: 18.4088, lon: 76.5604 }
  ];

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const selectedRegion = regions.find(r => r.name === location) || regions[0];
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedRegion.lat}&longitude=${selectedRegion.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=sunrise,sunset,uv_index_max&timezone=auto`
      );
      const data = await response.json();
      
      // Map WMO weather codes to conditions
      const codeMap = {
        0: 'Clear Sky',
        1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
        45: 'Foggy', 48: 'Depositing Rime Fog',
        51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
        61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
        80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
        95: 'Thunderstorm'
      };

      setWeather({
        temp: Math.round(data.current.temperature_2m),
        condition: codeMap[data.current.weather_code] || 'Clear',
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        apparentTemp: Math.round(data.current.apparent_temperature),
        precipitation: data.current.precipitation,
        sunrise: data.daily.sunrise[0].split('T')[1],
        sunset: data.daily.sunset[0].split('T')[1],
        uvIndex: data.daily.uv_index_max[0]
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('drizzle')) return <CloudRain className="text-blue-500" size={48} />;
    if (c.includes('cloud') || c.includes('overcast')) return <Cloud className="text-gray-400" size={48} />;
    if (c.includes('thunderstorm')) return <Zap className="text-purple-500" size={48} />;
    return <Sun className="text-amber-500" size={48} />;
  };

  const getFarmingAdvice = () => {
    if (!weather) return '';
    if (weather.precipitation > 0.5) return '🌧️ Heavy rain expected. Delay irrigation and cover sensitive seedlings.';
    if (weather.temp > 38) return '🔥 Extreme heat! Deep irrigation recommended during early morning/late evening.';
    if (weather.humidity > 85) return '💧 High humidity! High risk of Powdery Mildew in grapes. Inspect crops.';
    if (weather.windSpeed > 30) return '🌬️ Strong winds! Avoid tall crop support work or pesticide spraying.';
    return '✅ Ideal conditions for most farming activities today.';
  };

  const getUVLevel = (uv) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  return (
    <section className="relative z-40 px-4 mt-20 mb-20">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-[0_20px_80px_rgb(0,0,0,0.08)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center px-10 py-6 border-b border-gray-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <Navigation size={24} />
              </div>
              <div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent font-black text-2xl text-gray-900 outline-none cursor-pointer hover:text-emerald-600 transition-colors"
                >
                  {regions.map(reg => (
                    <option key={reg.name} value={reg.name}>{reg.name}</option>
                  ))}
                </select>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <TranslatedText>Live Forecast</TranslatedText>
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  <TranslatedText>Updated</TranslatedText>
                </div>
                <div className="text-xs font-bold text-gray-600">
                  {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <button 
                onClick={fetchWeatherData}
                className={`p-4 bg-gray-50 rounded-2xl text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all ${loading ? 'animate-spin' : ''}`}
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <div className="p-10 grid lg:grid-cols-12 gap-10">
            {/* Main Weather Card */}
            <div className="lg:col-span-4 flex items-center justify-between bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
              <AnimatePresence mode="wait">
                {!loading && weather && (
                  <motion.div 
                    key={location}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-8 w-full"
                  >
                    <div className="w-24 h-24 flex items-center justify-center bg-white rounded-3xl shadow-sm">
                      {getWeatherIcon(weather.condition)}
                    </div>
                    <div>
                      <div className="text-5xl font-black text-gray-900 tracking-tighter mb-1">
                        {weather.temp}°<span className="text-2xl text-emerald-500">C</span>
                      </div>
                      <div className="text-sm font-black text-gray-400 uppercase tracking-widest">
                        <TranslatedText>{weather.condition}</TranslatedText>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Details Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Droplet, label: 'Humidity', value: `${weather?.humidity}%`, color: 'text-blue-500' },
                { icon: Wind, label: 'Wind', value: `${weather?.windSpeed} km/h`, color: 'text-indigo-500' },
                { icon: Sunrise, label: 'Sunrise', value: weather?.sunrise, color: 'text-amber-500' },
                { icon: Sunset, label: 'Sunset', value: weather?.sunset, color: 'text-rose-500' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
                  <item.icon className={`${item.color} mb-3`} size={20} />
                  <div className="text-sm font-black text-gray-900 mb-1">{item.value}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <TranslatedText>{item.label}</TranslatedText>
                  </div>
                </div>
              ))}
            </div>

            {/* UV & Advice */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-[1.5rem] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">
                    <TranslatedText>UV Index</TranslatedText>
                  </div>
                  <div className="text-lg font-black text-amber-900">
                    <TranslatedText>{getUVLevel(weather?.uvIndex)}</TranslatedText>
                  </div>
                </div>
                <Sun className="text-amber-500" size={32} />
              </div>

              <div className="flex-1 bg-emerald-600 p-6 rounded-[1.5rem] text-white flex items-center gap-4 shadow-lg shadow-emerald-100">
                <Thermometer size={24} className="flex-shrink-0" />
                <div className="text-xs font-bold leading-relaxed">
                  <TranslatedText>{getFarmingAdvice()}</TranslatedText>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeatherWidget;