import { Plus, Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../util/axios.ts";
import Doctor from "../model/DoctorModel";

function DoctorsManage() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState("");
  const [formData, setFormData] = useState<Doctor>({
    doctor_id: 0,
    doctor_name: "",
    doctor_register_number: "",
    doctor_position: "",
    contact: "",
    email: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get<Doctor[]>("/doctor/all");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axiosInstance.put(`/doctor/update/${formData.doctor_id}`, formData);
        alert("Doctor updated successfully!");
      } else {
        const response = await axiosInstance.post<Doctor>("/doctor/add", formData);
        setDoctors([...doctors, response.data]);
        alert("Doctor added successfully!");
      }
      setShowModal(false);
      resetForm();
      fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  const handleDelete = async (doctor_id: number) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axiosInstance.delete(`/doctor/delete/${doctor_id}`);
        setDoctors(doctors.filter((doc) => doc.doctor_id !== doctor_id));
        alert("Doctor deleted successfully!");
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setFormData(doctor);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      doctor_id: 0,
      doctor_name: "",
      doctor_register_number: "",
      doctor_position: "",
      contact: "",
      email: "",
    });
    setIsEditing(false);
  };

  return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Manage Doctors</h2>
          <div className="flex gap-2">
            <select
                className="border p-2 rounded-lg"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            >
              <option value="">All</option> {/* This allows you to reset the search */}
              {doctors.map((doctor) => (
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.doctor_id}
                  </option>
              ))}
            </select>
            <button
                onClick={() => {
                  setShowModal(true);
                  resetForm();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" /> Add Doctor
            </button>
          </div>
        </div>

        {/* Modal for Add/Edit Doctor */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {isEditing ? "Edit Doctor" : "Add New Doctor"}
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {["doctor_name", "doctor_register_number", "contact", "email"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace('_', ' ')}</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field as keyof Doctor] as string}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                      </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Type</label>
                    <select
                        name="doctor_position"
                        value={formData.doctor_position}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                      <option value="">Select Doctor Type</option>
                      {["General Physician", "Pediatrician", "Cardiologist", "Dermatologist", "Neurologist"].map((type) => (
                          <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isEditing ? "Update" : "Add"} Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}

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
            <tbody>
            {doctors
                .filter((doctor) => (searchId ? doctor.doctor_id.toString() === searchId : true))
                .map((doctor) => (
                    <tr key={doctor.doctor_id} className={selectedDoctorId === doctor.doctor_id ? "bg-blue-100" : ""}>
                      <td className="px-6 py-4">{doctor.doctor_id}</td>
                      <td className="px-6 py-4">{doctor.doctor_name}</td>
                      <td className="px-6 py-4">{doctor.doctor_register_number}</td>
                      <td className="px-6 py-4">{doctor.doctor_position}</td>
                      <td className="px-6 py-4">{doctor.contact}</td>
                      <td className="px-6 py-4">{doctor.email}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                            className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                            onClick={() => handleEdit(doctor)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                            onClick={() => handleDelete(doctor.doctor_id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default DoctorsManage;
