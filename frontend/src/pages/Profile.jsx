import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Phone, Calendar, Edit2, Save, X, Leaf, Droplet, Sun } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
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
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [newFarm, setNewFarm] = useState({
    name: '',
    area: '',
    crop: '',
    location: ''
  });

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        name: user.profile.name || '',
        mobile: user.profile.mobile || '',
        location: user.profile.location || '',
        farmSize: user.profile.farm_size || '',
        soilType: user.profile.soil_type || '',
        irrigationType: user.profile.irrigation_type || ''
      });
    }
    
    // Load farms from localStorage
    const savedFarms = localStorage.getItem('userFarms');
    if (savedFarms) {
      setFarms(JSON.parse(savedFarms));
    }
  }, [user]);

  const handleUpdateProfile = () => {
    updateProfile(formData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleAddFarm = () => {
    const farmWithId = { ...newFarm, id: Date.now() };
    const updatedFarms = [...farms, farmWithId];
    setFarms(updatedFarms);
    localStorage.setItem('userFarms', JSON.stringify(updatedFarms));
    setShowAddFarm(false);
    setNewFarm({ name: '', area: '', crop: '', location: '' });
  };

  const handleDeleteFarm = (farmId) => {
    const updatedFarms = farms.filter(farm => farm.id !== farmId);
    setFarms(updatedFarms);
    localStorage.setItem('userFarms', JSON.stringify(updatedFarms));
  };

  if (!user) {
    return (
      <div className="py-12 text-center">
        <div className="container-custom">
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-8 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-4">
                <User size={40} className="text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.profile?.name || user?.email}</h1>
                <p className="text-green-100">{user?.email}</p>
                <p className="text-green-100 text-sm">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-800">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save size={16} /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.name || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.mobile || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.location || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (hectares)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.farmSize}
                      onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.farmSize || 'Not provided'} ha</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                  {isEditing ? (
                    <select
                      value={formData.soilType}
                      onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select soil type</option>
                      <option value="loamy">Loamy</option>
                      <option value="clay">Clay</option>
                      <option value="sandy">Sandy</option>
                      <option value="black">Black Soil</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{formData.soilType || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation Type</label>
                  {isEditing ? (
                    <select
                      value={formData.irrigationType}
                      onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select irrigation type</option>
                      <option value="drip">Drip Irrigation</option>
                      <option value="sprinkler">Sprinkler System</option>
                      <option value="flood">Flood Irrigation</option>
                      <option value="rainfed">Rainfed</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{formData.irrigationType || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Farms Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-800">My Farms</h2>
              <button
                onClick={() => setShowAddFarm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                + Add Farm
              </button>
            </div>

            {farms.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No farms added yet. Click "Add Farm" to get started.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {farms.map((farm) => (
                  <div key={farm.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{farm.name}</h3>
                      <button
                        onClick={() => handleDeleteFarm(farm.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Area: {farm.area} hectares</p>
                    <p className="text-sm text-gray-600">Crop: {farm.crop}</p>
                    <p className="text-sm text-gray-600">Location: {farm.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Farm Modal */}
      {showAddFarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Add New Farm</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Farm Name"
                value={newFarm.name}
                onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Area (hectares)"
                value={newFarm.area}
                onChange={(e) => setNewFarm({ ...newFarm, area: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newFarm.crop}
                onChange={(e) => setNewFarm({ ...newFarm, crop: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Crop</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Grapes">Grapes</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={newFarm.location}
                onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddFarm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFarm}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Farm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;