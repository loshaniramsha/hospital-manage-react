import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Syringe } from 'lucide-react';

function VaccineManage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVaccinateModal, setShowVaccinateModal] = useState(false);

  const vaccines = [
    { id: 1, name: 'BCG', type: 'Child', stock: 150, expiry: '2024-12-31' },
    { id: 2, name: 'Polio', type: 'Child', stock: 200, expiry: '2024-10-15' },
    { id: 3, name: 'Tetanus', type: 'Mother', stock: 100, expiry: '2024-11-30' },
  ];

  // Sample children data (in a real app, this would come from your database)
  const children = [
    { id: 1, name: 'Alex Smith', age: '2 years' },
    { id: 2, name: 'Emma Johnson', age: '1 year' },
    { id: 3, name: 'Michael Brown', age: '3 years' },
  ];

  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');

  const handleVaccinate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would:
    // 1. Make an API call to create the vaccination record
    // 2. Update the vaccine stock
    // 3. Show success message
    // 4. Close the modal
    
    console.log('Vaccination record:', {
      childId: selectedChild,
      vaccineId: selectedVaccine,
      reason,
      date,
    });
    
    setShowVaccinateModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Vaccines</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowVaccinateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Syringe className="w-5 h-5" />
            Vaccinate Child
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Vaccine
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vaccines..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{vaccine.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      vaccine.type === 'Child' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {vaccine.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${
                      vaccine.stock < 100 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {vaccine.stock} doses
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{vaccine.expiry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vaccinate Child Modal */}
      {showVaccinateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Record Child Vaccination</h3>
                <button
                  onClick={() => setShowVaccinateModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleVaccinate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Child</label>
                  <select
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select a child</option>
                    {children.map((child) => (
                      <option key={child.id} value={child.id}>
                        {child.name} ({child.age})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Vaccine</label>
                  <select
                    value={selectedVaccine}
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select a vaccine</option>
                    {vaccines
                      .filter(v => v.type === 'Child' && v.stock > 0)
                      .map((vaccine) => (
                        <option key={vaccine.id} value={vaccine.id}>
                          {vaccine.name} (Stock: {vaccine.stock})
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason/Notes</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowVaccinateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Record Vaccination
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Vaccine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Vaccine</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine Name</label>
                  <input type="text" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Child</option>
                    <option>Mother</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock (Doses)</label>
                  <input type="number" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Requirements</label>
                  <textarea className="w-full p-2 border rounded-lg" rows={3}></textarea>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Vaccine
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VaccineManage;