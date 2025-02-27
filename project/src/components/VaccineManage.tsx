import {Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Vaccine from "../model/VaccineModel.ts";
import axiosInstance from "../util/axios.ts";

function VaccineManage() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editVaccine, setEditVaccine] = useState<Vaccine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchId, setSearchId] = useState("");

  const [formData, setFormData] = useState<Vaccine>({
    vaccine_id: 0,
    name: "",
    batch_number: "",
    brand: "",
    qty: 0,
    date: new Date(),
  });

  useEffect(() => {
    fetchVaccine();
  }, []);

  const fetchVaccine = async () => {
    try {
      const response = await axiosInstance.get<Vaccine[]>("/vaccine/all");
      setVaccines(response.data);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "qty" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editVaccine) {
        await axiosInstance.put(`/vaccine/update/${formData.vaccine_id}`, formData);
        alert("Vaccine updated successfully");
      } else {
        await axiosInstance.post<Vaccine>("/vaccine/add", formData);
        alert("Vaccine added successfully");
      }
      setIsModalOpen(false);
      resetForm();
      fetchVaccine();  // <-- Ensure new vaccines are fetched
    } catch (error) {
      console.error("Error saving vaccine:", error);
    }
  };


  const handleEdit = (vaccine: Vaccine) => {
    setEditVaccine(vaccine);
    setFormData({ ...vaccine, date: new Date(vaccine.date) }); // Ensure date is formatted correctly
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (vaccine_id: number) => {
    if (window.confirm("Are you sure you want to delete this vaccine?")) {
      try {
        await axiosInstance.delete(`/vaccine/delete/${vaccine_id}`);
        setVaccines(vaccines.filter((vaccine) => vaccine.vaccine_id !== vaccine_id));
        alert("Vaccine deleted successfully");
      } catch (error) {
        console.error("Error deleting vaccine:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      vaccine_id: 0,
      name: "",
      batch_number: "",
      brand: "",
      qty: 0,
      date: new Date(),
    });
    setIsEditing(false);
    setEditVaccine(null);
  };

  const filteredVaccines = vaccines.filter(
      (vaccine) =>
          (searchQuery === "" ||
              vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              vaccine.batch_number.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (searchId === "" || vaccine.vaccine_id.toString() === searchId)
  );

  return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Registered Vaccines</h3>

        {/* Search Bar */}
        <input
            type="text"
            placeholder="Search by Vaccine Name or Batch Number"
            className="w-full p-2 mb-4 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Dropdown for Vaccine ID Filter */}
        <select
            className="border p-2 rounded-lg mb-4"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
        >
          <option value="">All</option>
          {vaccines.map((vaccine) => (
              <option key={vaccine.vaccine_id} value={vaccine.vaccine_id.toString()}>
                {vaccine.vaccine_id}
              </option>
          ))}
        </select>

        <button onClick={()=>{
          setIsModalOpen(true);
          resetForm();
        }}className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Vaccine
        </button>

        {/* Modal for Adding/Editing Vaccine */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">
                  {isEditing ? "Edit Vaccine" : "Register New Vaccine"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                      name="name"
                      type="text"
                      placeholder="Vaccine Name"
                      className="w-full p-2 border rounded-lg"
                      value={formData.name}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="batch_number"
                      type="text"
                      placeholder="Batch Number"
                      className="w-full p-2 border rounded-lg"
                      value={formData.batch_number}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="brand"
                      type="text"
                      placeholder="Brand"
                      className="w-full p-2 border rounded-lg"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="qty"
                      type="number"
                      placeholder="Quantity"
                      className="w-full p-2 border rounded-lg"
                      value={formData.qty}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="date"
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      value={formData.date.toISOString().split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                      required
                  />
                  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                    {isEditing ? "Update Vaccine" : "Register Vaccine"}
                  </button>
                </form>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 w-full text-center bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
        )}

        {/* Vaccine Table */}
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Vaccine Name</th>
              <th className="border p-2">Batch Number</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredVaccines.map((vaccine) => (
                <tr key={vaccine.vaccine_id}>
                  <td className="border p-2">{vaccine.vaccine_id}</td>
                  <td className="border p-2">{vaccine.name}</td>
                  <td className="border p-2">{vaccine.batch_number}</td>
                  <td className="border p-2">{vaccine.brand}</td>
                  <td className="border p-2">{vaccine.qty}</td>
                  <td className="border p-2">{new Date(vaccine.date).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button onClick={() => handleEdit(vaccine)} className="px-2 py-1 bg-blue-500 text-white rounded">
                      <Edit2 size={16}/>
                    </button>
                    <button
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                        onClick={() => handleDelete(vaccine.vaccine_id)}
                    >
                      <Trash2 className="w-4 h-4"/>
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

export default VaccineManage;
