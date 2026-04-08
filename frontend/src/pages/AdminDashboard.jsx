import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Calendar, Eye, UserCheck, Activity, DollarSign, Award } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCalculations: 0,
    totalFarms: 0
  });

  useEffect(() => {
    // Load users from localStorage
    const registeredUsers = localStorage.getItem('registeredUsers');
    if (registeredUsers) {
      const usersList = JSON.parse(registeredUsers);
      setUsers(usersList);
      setStats({
        totalUsers: usersList.length,
        activeUsers: usersList.filter(u => u.active !== false).length,
        totalCalculations: Math.floor(Math.random() * 100) + 50,
        totalFarms: Math.floor(Math.random() * 80) + 30
      });
    } else {
      // Mock data for demo
      const mockUsers = [
        { id: 1, name: 'Rajesh Patil', email: 'rajesh@example.com', role: 'user', registeredDate: '2024-01-15', active: true },
        { id: 2, name: 'Suresh Deshmukh', email: 'suresh@example.com', role: 'user', registeredDate: '2024-02-20', active: true },
        { id: 3, name: 'Anita Kale', email: 'anita@example.com', role: 'user', registeredDate: '2024-03-10', active: false }
      ];
      setUsers(mockUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
      setStats({
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.active).length,
        totalCalculations: 78,
        totalFarms: 45
      });
    }
  }, []);

  const statsCards = [
    { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
    { icon: UserCheck, label: 'Active Users', value: stats.activeUsers, color: 'bg-green-500' },
    { icon: TrendingUp, label: 'Calculations', value: stats.totalCalculations, color: 'bg-purple-500' },
    { icon: Award, label: 'Total Farms', value: stats.totalFarms, color: 'bg-amber-500' }
  ];

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and view platform analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold text-gray-800">{card.value}</span>
              </div>
              <h3 className="text-gray-600 font-medium">{card.label}</h3>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-amber-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-green-800">Registered Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <Users size={16} className="text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.registeredDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded ${
                        user.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { action: 'New user registered', time: '5 minutes ago', icon: UserCheck },
              { action: 'Cost calculation performed', time: '1 hour ago', icon: TrendingUp },
              { action: 'New farm added', time: '3 hours ago', icon: Activity },
              { action: 'Crop guide viewed', time: '5 hours ago', icon: Eye },
              { action: 'Scheme application clicked', time: '1 day ago', icon: Calendar }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <activity.icon size={18} className="text-green-600" />
                  <span className="text-gray-700">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;