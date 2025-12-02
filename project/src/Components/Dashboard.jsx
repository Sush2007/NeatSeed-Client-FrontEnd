import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('clientUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('clientUser');
    localStorage.removeItem('client_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">Welcome, {user.full_name || 'User'}!</h2>
          <p className="text-emerald-600">You are successfully logged in as a <strong>{user.role || 'Client'}</strong>.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-200 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-2">Your Status</h3>
            <p className="text-gray-500">Account Verified</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-2">Next Pickup</h3>
            <p className="text-gray-500">No scheduled pickups yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;