import { useState } from "react";
import Vaccine from "../model/VaccineModel.ts";

function VaccineManage() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [showVaccinateModal, setShowVaccinateModal] = useState(false);
  const [formData, setFormData] = useState<Vaccine>({
    vaccine_id: 0,
    name: "",
    batch_number: "",
    brand: "",
    qty: 0,
    date: new Date(),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVaccine, setEditVaccine] = useState<Vaccine | null>(null);

  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedMother, setSelectedMother] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [isVaccinatingChild, setIsVaccinatingChild] = useState(true); // true means child, false means mother

  const children = [{ id: 1, name: "John Doe", age: 5 }, { id: 2, name: "Jane Smith", age: 3 }]; // Example child data
  const mothers = [{ id: 1, name: "Alice Doe", age: 28 }, { id: 2, name: "Beth Smith", age: 30 }]; // Example mother data

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "qty" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editVaccine) {
      setVaccines(
          vaccines.map((vaccine) =>
              vaccine.vaccine_id === editVaccine.vaccine_id
                  ? { ...formData, vaccine_id: editVaccine.vaccine_id }
                  : vaccine
          )
      );
    } else {
      setVaccines([...vaccines, { ...formData, vaccine_id: vaccines.length + 1 }]);
    }
    setFormData({
      vaccine_id: 0,
      name: "",
      batch_number: "",
      brand: "",
      qty: 0,
      date: new Date(),
    });
    setIsModalOpen(false);
    setEditVaccine(null);
  };

  const handleEdit = (vaccine: Vaccine) => {
    setEditVaccine(vaccine);
    setFormData(vaccine);
    setIsModalOpen(true);
  };

  const handleDelete = (vaccine_id: number) => {
    setVaccines(vaccines.filter((vaccine) => vaccine.vaccine_id !== vaccine_id));
  };

  const filteredVaccines = vaccines.filter(
      (vaccine) =>
          vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vaccine.batch_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVaccinate = (e: React.FormEvent) => {
    e.preventDefault();

    // Vaccination logic based on child or mother
    const vaccinationData = {
      selectedId: isVaccinatingChild ? selectedChild : selectedMother,
      vaccineId: selectedVaccine,
      reason,
      date,
      type: isVaccinatingChild ? "Child" : "Mother",
    };

    console.log('Vaccination record:', vaccinationData);
    setShowVaccinateModal(false); // Close modal after submission
  };

  return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Registered Vaccines</h3>

        {/* Search bar */}
        <input
            type="text"
            placeholder="Search by Vaccine Name or Batch Number"
            className="w-full p-2 mb-4 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register New Vaccine
        </button>

        <div className="flex gap-2 mt-4">
          <button
              onClick={() => {
                setSelectedChild('');
                setSelectedVaccine('');
                setIsVaccinatingChild(true); // Set to child
                setShowVaccinateModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Vaccinate Child
          </button>

          <button
              onClick={() => {
                setSelectedMother('');
                setSelectedVaccine('');
                setIsVaccinatingChild(false); // Set to mother
                setShowVaccinateModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Vaccinate Mother
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">
                  {editVaccine ? "Edit Vaccine" : "Register New Vaccine"}
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
                      onChange={handleChange}
                      required
                  />
                  <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                  >
                    {editVaccine ? "Update Vaccine" : "Register Vaccine"}
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

        {/* Vaccinate Child and Mother Modal */}
        {showVaccinateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {isVaccinatingChild ? "Record Child Vaccination" : "Record Mother Vaccination"}
                    </h3>
                    <button
                        onClick={() => setShowVaccinateModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                      Close
                    </button>
                  </div>
                  <form onSubmit={handleVaccinate} className="space-y-4">
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
                            .filter(v => (isVaccinatingChild ? v.type === 'Child' : v.type === 'Mother') && v.qty > 0)
                            .map((vaccine) => (
                                <option key={vaccine.vaccine_id} value={vaccine.vaccine_id}>
                                  {vaccine.name} (Stock: {vaccine.qty})
                                </option>
                            ))}
                      </select>
                    </div>
                    {isVaccinatingChild ? (
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
                    ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Mother</label>
                          <select
                              value={selectedMother}
                              onChange={(e) => setSelectedMother(e.target.value)}
                              required
                              className="w-full p-2 border rounded-lg"
                          >
                            <option value="">Select a mother</option>
                            {mothers.map((mother) => (
                                <option key={mother.id} value={mother.id}>
                                  {mother.name} ({mother.age})
                                </option>
                            ))}
                          </select>
                        </div>
                    )}
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

        {/* Table View */}
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
                  <td className="border p-2">{vaccine.date.toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button
                        onClick={() => handleEdit(vaccine)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                        onClick={() => handleDelete(vaccine.vaccine_id)}
                        className="px-2 py-1 ml-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
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
