import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useState } from "react";
import MedicineModel from "../model/MedicineModel.ts";

function MedicineManage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicines, setMedicines] = useState<MedicineModel[]>([]);
  const [nextId, setNextId] = useState(1);
  const [formData, setFormData] = useState({
    doctor_id: 0,
    name: "",
    batch_number: "",
    brand: "",
    qty: 0,
    date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    const newMedicine: MedicineModel = new MedicineModel(
        nextId,
        formData.name,
        formData.batch_number,
        formData.brand,
        formData.qty,
        new Date(formData.date)
    );
    setMedicines([...medicines, newMedicine]);
    setNextId(nextId + 1);
    setShowAddModal(false);
    setFormData({ name: "", batch_number: "", brand: "", qty: 0, date: "" });
  };

  return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Medicine</h2>
          <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Medicine
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                  type="text"
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {medicines.map((medicine) => (
                  <tr key={medicine.medi_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{medicine.medi_id}</td>
                    <td className="px-6 py-4">{medicine.name}</td>
                    <td className="px-6 py-4">{medicine.brand}</td>
                    <td className="px-6 py-4">{medicine.qty} units</td>
                    <td className="px-6 py-4">{medicine.date.toDateString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Medicine</h3>
                <form onSubmit={handleAddMedicine} className="space-y-4">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Medicine Name" className="w-full p-2 border rounded-lg" required />
                  <input type="text" name="batch_number" value={formData.batch_number} onChange={handleInputChange} placeholder="Batch Number" className="w-full p-2 border rounded-lg" required />
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Brand" className="w-full p-2 border rounded-lg" required />
                  <input type="number" name="qty" value={formData.qty} onChange={handleInputChange} placeholder="Stock (Units)" className="w-full p-2 border rounded-lg" required />
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Medicine</button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}

export default MedicineManage;










/*

import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useState } from "react";
import MedicineModel from "../model/MedicineModel.ts";

function MedicineManage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicines, setMedicines] = useState<MedicineModel[]>([]);
  const [formData, setFormData] = useState({
    doctor_id: 0,
    name: "",
    batch_number: "",
    brand: "",
    qty: 0,
    date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    const newMedicine: MedicineModel = new MedicineModel(
        medicines.length + 1,
        formData.name,
        formData.batch_number,
        formData.brand,
        formData.qty,
        new Date(formData.date)
    );
    setMedicines([...medicines, newMedicine]);
    setShowAddModal(false);
    setFormData({ name: "", batch_number: "", brand: "", qty: 0, date: "" });
  };

  return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Medicine</h2>
          <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Medicine
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                  type="text"
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {medicines.map((medicine) => (
                  <tr key={medicine.medi_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{medicine.medi_id}</td>
                    <td className="px-6 py-4">{medicine.name}</td>
                    <td className="px-6 py-4">{medicine.brand}</td>
                    <td className="px-6 py-4">{medicine.qty} units</td>
                    <td className="px-6 py-4">{medicine.date.toDateString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Medicine</h3>
                <form onSubmit={handleAddMedicine} className="space-y-4">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Medicine Name" className="w-full p-2 border rounded-lg" required />
                  <input type="text" name="batch_number" value={formData.batch_number} onChange={handleInputChange} placeholder="Batch Number" className="w-full p-2 border rounded-lg" required />
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Brand" className="w-full p-2 border rounded-lg" required />
                  <input type="number" name="qty" value={formData.qty} onChange={handleInputChange} placeholder="Stock (Units)" className="w-full p-2 border rounded-lg" required />
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Medicine</button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}

export default MedicineManage;

*/
