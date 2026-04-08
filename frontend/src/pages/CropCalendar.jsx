import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle, AlertCircle, Leaf, Droplet, Sun, Wind, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const CropCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState('sugarcane');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedActivity, setSelectedActivity] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const activities = {
    sugarcane: {
      name: 'Sugarcane',
      nameMarathi: 'उस',
      color: 'from-green-500 to-green-600',
      icon: Leaf,
      calendar: {
        0: { activity: 'Land preparation', status: 'ongoing', details: 'Plowing and harrowing the field', icon: '🚜', priority: 'Medium' },
        1: { activity: 'Land preparation', status: 'ongoing', details: 'Furrow making and leveling', icon: '🌾', priority: 'Medium' },
        2: { activity: 'Spring Planting', status: 'critical', details: 'Main planting season begins', icon: '🌱', priority: 'High' },
        3: { activity: 'Planting', status: 'critical', details: 'Continue planting activities', icon: '🌿', priority: 'High' },
        4: { activity: 'Fertilizer Application', status: 'ongoing', details: 'First dose of fertilizers', icon: '💊', priority: 'High' },
        5: { activity: 'Weed Control', status: 'important', details: 'Regular weeding required', icon: '🌿', priority: 'Medium' },
        6: { activity: 'Pest Management', status: 'important', details: 'Monitor for stem borer', icon: '🐛', priority: 'High' },
        7: { activity: 'Earthing Up', status: 'ongoing', details: 'Soil mounding around plants', icon: '⛰️', priority: 'Medium' },
        8: { activity: 'Irrigation', status: 'ongoing', details: 'Regular watering schedule', icon: '💧', priority: 'High' },
        9: { activity: 'Growth Monitoring', status: 'ongoing', details: 'Check crop health', icon: '📊', priority: 'Medium' },
        10: { activity: 'Maturity Phase', status: 'ongoing', details: 'Sugar accumulation', icon: '🍬', priority: 'High' },
        11: { activity: 'Harvesting', status: 'critical', details: 'Begin harvest operations', icon: '✂️', priority: 'High' }
      }
    },
    grapes: {
      name: 'Grapes',
      nameMarathi: 'द्राक्ष',
      color: 'from-purple-500 to-purple-600',
      icon: Award,
      calendar: {
        0: { activity: 'Back Pruning', status: 'critical', details: 'January pruning for summer crop', icon: '✂️', priority: 'High' },
        1: { activity: 'Dormancy', status: 'ongoing', details: 'Rest period for vines', icon: '💤', priority: 'Low' },
        2: { activity: 'Bud Break', status: 'important', details: 'New growth begins', icon: '🌱', priority: 'High' },
        3: { activity: 'Shoot Growth', status: 'ongoing', details: 'Training and tying', icon: '📈', priority: 'Medium' },
        4: { activity: 'Flowering', status: 'critical', details: 'Bloom period', icon: '🌸', priority: 'High' },
        5: { activity: 'Fruit Set', status: 'important', details: 'Berry formation', icon: '🍇', priority: 'High' },
        6: { activity: 'Berry Development', status: 'ongoing', details: 'Rapid growth phase', icon: '📏', priority: 'High' },
        7: { activity: 'Veraison', status: 'important', details: 'Color change begins', icon: '🎨', priority: 'High' },
        8: { activity: 'Ripening', status: 'ongoing', details: 'Sugar accumulation', icon: '🍬', priority: 'High' },
        9: { activity: 'Harvesting', status: 'critical', details: 'Main harvest season', icon: '✂️', priority: 'High' },
        10: { activity: 'Post-Harvest', status: 'ongoing', details: 'Field cleanup', icon: '🧹', priority: 'Medium' },
        11: { activity: 'Forward Pruning', status: 'critical', details: 'December pruning', icon: '✂️', priority: 'High' }
      }
    }
  };

  const cropData = activities[selectedCrop];
  const currentActivity = cropData.calendar[currentMonth];

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg';
      case 'important': return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default: return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-amber-100 text-amber-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev + 1) % 12);
    setSelectedActivity(null);
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev - 1 + 12) % 12);
    setSelectedActivity(null);
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CalendarIcon size={40} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Smart Crop Calendar</h1>
          <p className="text-xl text-gray-600">Monthly farming activities for optimal yields</p>
        </AnimatedSection>

        {/* Crop Selection */}
        <div className="flex gap-4 mb-8 justify-center">
          {Object.keys(activities).map((crop) => (
            <motion.button
              key={crop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCrop(crop);
                setSelectedActivity(null);
              }}
              className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                selectedCrop === crop
                  ? `bg-gradient-to-r ${activities[crop].color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {React.createElement(activities[crop].icon, { size: 20 })}
              {activities[crop].name}
            </motion.button>
          ))}
        </div>

        {/* Month Navigator */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg"
          >
            <ChevronLeft size={24} className="text-green-600" />
          </motion.button>
          
          <motion.div
            key={currentMonth}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-green-800">{months[currentMonth]}</h2>
            <p className="text-gray-600 mt-1">
              {currentActivity.activity} • {currentActivity.priority} Priority
            </p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg"
          >
            <ChevronRight size={24} className="text-green-600" />
          </motion.button>
        </div>

        {/* Current Month Highlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`${getStatusColor(currentActivity.status)} rounded-2xl p-8 mb-8 shadow-xl`}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{currentActivity.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold">{currentActivity.activity}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(currentActivity.priority)}`}>
                    {currentActivity.priority} Priority
                  </span>
                </div>
                <p className="text-lg opacity-95 mb-3">{currentActivity.details}</p>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                    <span>📅</span> {months[currentMonth]}
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                    <span>⏰</span> {currentActivity.status === 'critical' ? 'Must do this month' : currentActivity.status === 'important' ? 'Should prioritize' : 'Regular maintenance'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Full Calendar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {months.map((month, index) => {
            const activity = cropData.calendar[index];
            const isCurrentMonth = index === currentMonth;
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => {
                  setCurrentMonth(index);
                  setSelectedActivity(null);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className={`cursor-pointer rounded-xl p-4 transition-all ${
                  isCurrentMonth
                    ? 'ring-4 ring-green-500 shadow-xl bg-gradient-to-br from-green-50 to-amber-50'
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{month.slice(0, 3)}</h3>
                  <span className="text-2xl">{activity.icon}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">{activity.activity}</p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(activity.priority)}`}>
                    {activity.priority}
                  </span>
                </div>
                {isCurrentMonth && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="mt-2 h-1 bg-green-500 rounded-full"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="font-semibold text-green-800 mb-3">Priority Legend</h3>
          <div className="flex flex-wrap gap-6">
            {[
              { color: 'bg-red-500', label: 'Critical - Must do this month' },
              { color: 'bg-amber-500', label: 'Important - Should prioritize' },
              { color: 'bg-green-500', label: 'Ongoing - Regular maintenance' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-4 h-4 ${item.color} rounded-full shadow-md`}></div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CropCalendar;