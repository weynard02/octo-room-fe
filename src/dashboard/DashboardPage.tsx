import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Welcome to your dashboard!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Recent Appointments</h3>
          <p className="text-gray-500 italic">No upcoming appointments scheduled.</p>
          <button className="mt-4 text-blue-600 font-medium hover:underline text-sm">View All</button>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Summary</h3>
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-gray-700 font-medium text-sm">Status: Active</p>
          </div>
          <p className="text-gray-600 text-sm mt-2">Member since: Jan 2026</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Notifications</h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600 border-l-4 border-blue-500 pl-3">Your profile is 80% complete.</li>
            <li className="text-sm text-gray-600 border-l-4 border-yellow-500 pl-3">New message from Support.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
