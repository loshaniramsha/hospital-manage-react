import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import Staff from "../model/Staff.ts";

function StaffManage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  const [formData, setFormData] = useState<Staff>({
    staffId: 0,
    profile: "",
    name: "",
    contact: "",
    address: "",
    role: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profile: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffList([...staffList, { ...formData, staffId: staffList.length + 1 }]);
    setFormData({ staffId: 0, profile: "", name: "", contact: "", address: "", role: "" });
    setShowAddModal(false);
  };

  return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Staff</h2>
          <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Staff
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search staff..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border">
            <thead className="bg-gray-50">
            <tr>
              {["ID", "Profile", "Name", "Contact", "Address", "Role", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {staffList.map((staff) => (
                <tr key={staff.staffId}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{staff.staffId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {staff.profile && <img src={staff.profile} alt="Profile" className="w-10 h-10 rounded-full" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{staff.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{staff.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{staff.role}</td>
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

        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Staff</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-lg" />
                  </div>
                  {["name", "contact", "address"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {field.replace('_', ' ')}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field as keyof Staff] as string}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                      </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
                      <option value="">Select Role</option>
                      {["Admin", "Receptionist", "Nurse", "Technician", "Support Staff"].map((role) => (
                          <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Add Staff
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}

export default StaffManage;
