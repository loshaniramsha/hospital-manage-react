import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import Doctor from "../model/DoctorModel.ts";

function DoctorsManage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [formData, setFormData] = useState<Doctor>({
    doctor_id: 0,
    doctor_name: "",
    doctor_register_number: "",
    doctor_position: "",
    contact: "",
    email: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDoctors([...doctors, { ...formData, doctor_id: doctors.length + 1 }]);
    setFormData({
      doctor_id: 0,
      doctor_name: "",
      doctor_register_number: "",
      doctor_position: "",
      contact: "",
      email: "",
    });
    setShowAddModal(false);
  };

  return (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Doctors</h2>
          <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Doctor
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search doctors..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Doctors Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border">
            <thead className="bg-gray-50">
            <tr>
              {["ID", "Name", "Regi-Number", "Specialization", "Contact", "Email", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
                <tr key={doctor.doctor_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{doctor.doctor_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.doctor_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.doctor_register_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.doctor_position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
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

        {/* Add Doctor Modal */}
        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Doctor</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {["doctor_name", "doctor_register_number", "contact", "email"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace('_', ' ')}</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field] as string}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                      </div>
                  ))}

                  {/* Doctor Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Type</label>
                    <select name="doctor_position" value={formData.doctor_position} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
                      <option value="">Select Doctor Type</option>
                      {["General Physician", "Pediatrician", "Cardiologist", "Dermatologist", "Neurologist", "Orthopedic Surgeon", "Gynecologist", "Dentist", "Psychiatrist"].map((type) => (
                          <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Add Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}

export default DoctorsManage;
