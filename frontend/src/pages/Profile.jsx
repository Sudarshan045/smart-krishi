import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from '../components/common/TranslatedText';
import { userService } from '../services/userService';
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Edit2, 
  Save, 
  X, 
  Leaf, 
  Droplet, 
  Sun, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  LogOut,
  Camera,
  Plus,
  Trash2,
  ChevronRight,
  Info
} from 'lucide-react';

const Profile = () => {
  const { user, updateUserData, logout } = useAuth();
  const { language, translateInstant } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    farmSize: '',
    soilType: '',
    irrigationType: ''
  });
  const [farms, setFarms] = useState([]);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [newFarm, setNewFarm] = useState({
    name: '',
    area: '',
    crop: '',
    location: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        location: user.location || '',
        farmSize: user.farm_size || '',
        soilType: user.soil_type || '',
        irrigationType: user.irrigation_type || ''
      });
      fetchFarms();
    }
  }, [user]);

  const fetchFarms = async () => {
    try {
      setLoadingFarms(true);
      const res = await userService.getFarms();
      setFarms(res.farms || []);
    } catch (error) {
      console.error("Failed to fetch farms", error);
    } finally {
      setLoadingFarms(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await userService.updateProfile({
        name: formData.name,
        mobile: formData.mobile,
        location: formData.location,
        farm_size: formData.farmSize,
        soil_type: formData.soilType,
        irrigation_type: formData.irrigationType
      });
      updateUserData(updatedUser.user);
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleAddFarm = async () => {
    if (!newFarm.name || !newFarm.area || !newFarm.crop) {
      alert("Name, area, and crop are required.");
      return;
    }
    try {
      const res = await userService.addFarm(newFarm);
      setFarms([res.farm, ...farms]);
      setShowAddFarm(false);
      setNewFarm({ name: '', area: '', crop: '', location: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add farm');
    }
  };

  const handleDeleteFarm = async (farmId) => {
    try {
      await userService.deleteFarm(farmId);
      setFarms(farms.filter(farm => farm._id !== farmId));
    } catch (error) {
      alert('Failed to delete farm');
    }
  };

  const stats = useMemo(() => [
    { label: 'Total Land', value: `${formData.farmSize || 0} ha`, icon: MapPin, color: 'text-emerald-500' },
    { label: 'Active Farms', value: farms.length, icon: Leaf, color: 'text-green-500' },
    { label: 'Soil Health', value: formData.soilType || 'Pending', icon: ShieldCheck, color: 'text-blue-500' },
    { label: 'Experience', value: '2+ Years', icon: Award, color: 'text-amber-500' }
  ], [formData, farms]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-500 font-bold mb-8">Please login to access your personal farming dashboard and stats.</p>
          <a href="/login" className="inline-block w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all">Login Now</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Cinematic Cover & Profile Header */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src="/images/sugarcane_bg.png" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-gray-50" />
      </div>

      <div className="container-custom max-w-6xl mx-auto -mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[3rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] text-center relative"
            >
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2.5rem] p-1 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.2rem] flex items-center justify-center overflow-hidden">
                    <User size={64} className="text-gray-300" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>

              <h1 className="text-3xl font-black text-gray-900 mb-1">{user.name}</h1>
              <p className="text-gray-400 font-bold mb-6 lowercase">{user.email}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase tracking-widest border border-green-100">
                <Award size={14} />
                <TranslatedText>Verified Farmer</TranslatedText>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <button 
                  onClick={logout}
                  className="w-full py-4 flex items-center justify-center gap-3 text-red-500 font-black uppercase tracking-widest text-xs hover:bg-red-50 rounded-2xl transition-all"
                >
                  <LogOut size={18} />
                  <TranslatedText>Sign Out</TranslatedText>
                </button>
              </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100"
                >
                  <stat.icon className={`${stat.color} mb-3`} size={24} />
                  <div className="text-xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <TranslatedText>{stat.label}</TranslatedText>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Edit2 size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest text-xs">
                    <TranslatedText>General Information</TranslatedText>
                  </h2>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all"
                  >
                    <TranslatedText>Edit Profile</TranslatedText>
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-black text-xs uppercase tracking-widest"
                    >
                      <TranslatedText>Cancel</TranslatedText>
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-200"
                    >
                      <TranslatedText>Save Changes</TranslatedText>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { id: 'name', label: 'Full Name', type: 'text', icon: User },
                  { id: 'mobile', label: 'Mobile Number', type: 'tel', icon: Phone },
                  { id: 'location', label: 'District / Village', type: 'text', icon: MapPin },
                  { id: 'farmSize', label: 'Total Farm Area (ha)', type: 'number', icon: Leaf },
                ].map((field) => (
                  <div key={field.id} className="relative group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                      <TranslatedText>{field.label}</TranslatedText>
                    </label>
                    <div className="relative">
                      <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      {isEditing ? (
                        <input
                          type={field.type}
                          value={formData[field.id]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-900 focus:bg-white focus:border-green-400 outline-none transition-all"
                        />
                      ) : (
                        <div className="w-full bg-gray-50/50 rounded-2xl py-4 pl-12 pr-4 font-black text-gray-900">
                          {formData[field.id] || '---'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Custom Selects */}
                <div className="relative">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    <TranslatedText>Soil Type</TranslatedText>
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    {isEditing ? (
                      <select
                        value={formData.soilType}
                        onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-900 focus:bg-white focus:border-green-400 outline-none transition-all appearance-none"
                      >
                        <option value="">Select Soil</option>
                        <option value="Black Cotton">Black Cotton Soil</option>
                        <option value="Red Loamy">Red Loamy</option>
                        <option value="Alluvial">Alluvial</option>
                        <option value="Laterite">Laterite</option>
                      </select>
                    ) : (
                      <div className="w-full bg-gray-50/50 rounded-2xl py-4 pl-12 pr-4 font-black text-gray-900 capitalize">
                        {formData.soilType || '---'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    <TranslatedText>Irrigation Method</TranslatedText>
                  </label>
                  <div className="relative">
                    <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    {isEditing ? (
                      <select
                        value={formData.irrigationType}
                        onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-900 focus:bg-white focus:border-green-400 outline-none transition-all appearance-none"
                      >
                        <option value="">Select Method</option>
                        <option value="Drip">Drip Irrigation</option>
                        <option value="Sprinkler">Sprinkler</option>
                        <option value="Flood">Flood / Traditional</option>
                        <option value="Rainfed">Rainfed Only</option>
                      </select>
                    ) : (
                      <div className="w-full bg-gray-50/50 rounded-2xl py-4 pl-12 pr-4 font-black text-gray-900 capitalize">
                        {formData.irrigationType || '---'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Farms Management Section */}
            <div className="bg-white p-10 rounded-[3rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <Leaf size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest text-xs">
                    <TranslatedText>My Managed Farms</TranslatedText>
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddFarm(true)}
                  className="p-3 bg-green-600 text-white rounded-xl shadow-lg shadow-green-100 hover:scale-110 transition-transform"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {loadingFarms ? (
                    <div className="col-span-2 text-center py-12">
                      <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Farms...</p>
                    </div>
                  ) : farms.length === 0 ? (
                    <div className="col-span-2 bg-gray-50 rounded-[2rem] p-12 text-center border-2 border-dashed border-gray-200">
                      <p className="text-gray-400 font-bold mb-4">You haven't added any specific farm plots yet.</p>
                      <button onClick={() => setShowAddFarm(true)} className="text-green-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 mx-auto">
                        <Plus size={16} /> <TranslatedText>Register Your First Farm</TranslatedText>
                      </button>
                    </div>
                  ) : farms.map((farm, idx) => (
                    <motion.div 
                      key={farm._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group bg-gray-50 p-6 rounded-[2.5rem] border border-transparent hover:border-green-200 hover:bg-white transition-all duration-500"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <Leaf size={24} className="text-green-500" />
                        </div>
                        <button 
                          onClick={() => handleDeleteFarm(farm._id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{farm.name}</h3>
                      <div className="flex items-center gap-2 text-xs font-black text-green-600 uppercase tracking-widest mb-6">
                        <TranslatedText>{farm.crop}</TranslatedText>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{farm.area} Hectares</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 flex items-center gap-1">
                          <MapPin size={10} /> {farm.location || 'Maharashtra'}
                        </span>
                        <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Add Farm Modal */}
      <AnimatePresence>
        {showAddFarm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3.5rem] p-12 max-w-xl w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Plus size={200} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
                  <TranslatedText>Register New</TranslatedText> <br/>
                  <span className="text-green-600"><TranslatedText>Farm Plot</TranslatedText></span>
                </h3>
                <p className="text-gray-400 font-bold mb-10 text-sm">Add details of your land plot to get specialized advisory.</p>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Plot Name</label>
                    <input
                      type="text"
                      placeholder="e.g. North Acre Sugarcane"
                      value={newFarm.name}
                      onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:bg-white focus:border-green-400 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Area (ha)</label>
                      <input
                        type="number"
                        placeholder="0.0"
                        value={newFarm.area}
                        onChange={(e) => setNewFarm({ ...newFarm, area: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:bg-white focus:border-green-400 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Primary Crop</label>
                      <select
                        value={newFarm.crop}
                        onChange={(e) => setNewFarm({ ...newFarm, crop: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:bg-white focus:border-green-400 outline-none transition-all appearance-none"
                      >
                        <option value="">Select Crop</option>
                        <option value="Sugarcane">Sugarcane</option>
                        <option value="Grapes">Grapes</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Rice">Rice</option>
                        <option value="Soybean">Soybean</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Location</label>
                    <input
                      type="text"
                      placeholder="Village / District"
                      value={newFarm.location}
                      onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:bg-white focus:border-green-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-12">
                  <button
                    onClick={() => setShowAddFarm(false)}
                    className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest"
                  >
                    <TranslatedText>Discard</TranslatedText>
                  </button>
                  <button
                    onClick={handleAddFarm}
                    className="flex-1 py-5 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-100"
                  >
                    <TranslatedText>Save Farm</TranslatedText>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;