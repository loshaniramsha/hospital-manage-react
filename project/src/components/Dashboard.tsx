import React from 'react';
import { Users, Baby, UserRound, Syringe, Pill as Pills, HeartPulse } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

function Dashboard() {
  const stats = [
    { title: 'Total Doctors', value: '12', icon: UserRound, color: 'bg-blue-500' },
    { title: 'Total Staff', value: '24', icon: Users, color: 'bg-green-500' },
    { title: 'Registered Children', value: '156', icon: Baby, color: 'bg-purple-500' },
    { title: 'Pregnant Mothers', value: '48', icon: HeartPulse, color: 'bg-pink-500' },
    { title: 'Available Vaccines', value: '8', icon: Syringe, color: 'bg-yellow-500' },
    { title: 'Medicine Stock', value: '234', icon: Pills, color: 'bg-red-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Patient {i + 1}</p>
                  <p className="text-sm text-gray-600">Dr. Smith • General Checkup</p>
                </div>
                <span className="text-sm text-gray-600">09:00 AM</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Vaccinations</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Child {i + 1}</p>
                  <p className="text-sm text-gray-600">Polio Vaccine • Due Today</p>
                </div>
                <span className="px-3 py-1 text-sm text-yellow-700 bg-yellow-100 rounded-full">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;