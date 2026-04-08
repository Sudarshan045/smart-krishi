import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplet, Thermometer, MapPin } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Pune');

  // Mock weather data for different locations
  const weatherData = {
    'Pune': {
      temp: 28,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12,
      rainfall: 0,
      icon: 'sun'
    },
    'Mumbai': {
      temp: 30,
      condition: 'Cloudy',
      humidity: 78,
      windSpeed: 15,
      rainfall: 5,
      icon: 'cloud'
    },
    'Nashik': {
      temp: 26,
      condition: 'Clear',
      humidity: 58,
      windSpeed: 10,
      rainfall: 0,
      icon: 'sun'
    },
    'Sangli': {
      temp: 32,
      condition: 'Hot',
      humidity: 45,
      windSpeed: 8,
      rainfall: 0,
      icon: 'sun'
    },
    'Kolhapur': {
      temp: 27,
      condition: 'Rainy',
      humidity: 82,
      windSpeed: 20,
      rainfall: 15,
      icon: 'rain'
    }
  };

  const locations = ['Pune', 'Mumbai', 'Nashik', 'Sangli', 'Kolhapur'];

  useEffect(() => {
    loadWeather();
  }, [location]);

  const loadWeather = () => {
    setLoading(true);
    setTimeout(() => {
      setWeather(weatherData[location]);
      setLoading(false);
    }, 500);
  };

  const getWeatherIcon = (icon) => {
    switch(icon) {
      case 'sun': return <Sun className="text-yellow-500" size={48} />;
      case 'cloud': return <Cloud className="text-gray-500" size={48} />;
      case 'rain': return <CloudRain className="text-blue-500" size={48} />;
      default: return <Sun className="text-yellow-500" size={48} />;
    }
  };

  const getFarmingAdvice = () => {
    if (!weather) return '';
    if (weather.condition === 'Rainy') {
      return '🌧️ Avoid spraying pesticides today. Good for soil moisture.';
    }
    if (weather.temp > 35) {
      return '🔥 High temperature! Ensure adequate irrigation for crops.';
    }
    if (weather.humidity > 80) {
      return '💧 High humidity! Watch for fungal diseases in grapes.';
    }
    return '✅ Good conditions for farming activities.';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-pulse">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-gray-600" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent font-semibold text-gray-800 focus:outline-none"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <span className="text-sm text-gray-500">Updated just now</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {getWeatherIcon(weather.icon)}
          <div>
            <div className="text-4xl font-bold text-gray-800">{weather.temp}°C</div>
            <div className="text-gray-600">{weather.condition}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Droplet size={16} /> {weather.humidity}%
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Wind size={16} /> {weather.windSpeed} km/h
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Thermometer size={16} className="text-orange-500" />
          <span className="text-gray-700">{getFarmingAdvice()}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-white rounded p-2">
          <div className="text-gray-500">Sunrise</div>
          <div className="font-semibold">6:30 AM</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-gray-500">Sunset</div>
          <div className="font-semibold">6:45 PM</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-gray-500">UV Index</div>
          <div className="font-semibold">Moderate</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;