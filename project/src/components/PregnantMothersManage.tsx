import { useState } from "react";
import Mother from "../model/MotherModel.ts";

interface Doctor {
  id: number;
  name: string;
}

interface Staff {
  id: number;
  name: string;
}

function MotherManage() {
  const [mothers, setMothers] = useState<Mother[]>([]);
  const [formData, setFormData] = useState<Mother>({
    mother_id: 0,
    mother_name: "",
    mother_age: 0,
    mother_address: "",
    contact: "",
    gravidity: 0,
    register_date: new Date(),
    delivery_date: new Date(),
    clinic_date: new Date(),
    doctor_id: 0,
    staff_id: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMother, setEditMother] = useState<Mother | null>(null);

  const doctors: Doctor[] = [
    { id: 1, name: "Dr. Smith" },
    { id: 2, name: "Dr. Johnson" },
  ];

  const staffMembers: Staff[] = [
    { id: 1, name: "Nurse Anne" },
    { id: 2, name: "Staff John" },
  ];

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "mother_age" || name === "doctor_id" || name === "staff_id" || name === "gravidity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMother) {
      setMothers(mothers.map(mother =>
          mother.mother_id === editMother.mother_id ? { ...formData, mother_id: editMother.mother_id } : mother
      ));
    } else {
      setMothers([...mothers, { ...formData, mother_id: mothers.length + 1 }]);
    }
    setFormData({
      mother_id: 0,
      mother_name: "",
      mother_age: 0,
      mother_address: "",
      contact: "",
      gravidity: 0,
      register_date: new Date(),
      delivery_date: new Date(),
      clinic_date: new Date(),
      doctor_id: 0,
      staff_id: 0,
    });
    setIsModalOpen(false);
    setEditMother(null);
  };

  const handleEdit = (mother: Mother) => {
    setEditMother(mother);
    setFormData(mother);
    setIsModalOpen(true);
  };

  const handleDelete = (mother_id: number) => {
    setMothers(mothers.filter((mother) => mother.mother_id !== mother_id));
  };

  const filteredMothers = mothers.filter((mother) =>
      mother.mother_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mother.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Registered Mothers</h3>

        {/* Search bar */}
        <input
            type="text"
            placeholder="Search by Name or Contact"
            className="w-full p-2 mb-4 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register New Mother
        </button>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">{editMother ? "Edit Mother" : "Register New Mother"}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                      name="mother_name"
                      type="text"
                      placeholder="Mother's Name"
                      className="w-full p-2 border rounded-lg"
                      value={formData.mother_name}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="mother_age"
                      type="number"
                      placeholder="Age"
                      className="w-full p-2 border rounded-lg"
                      value={formData.mother_age}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="contact"
                      type="tel"
                      placeholder="Contact Number"
                      className="w-full p-2 border rounded-lg"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                  />
                  <textarea
                      name="mother_address"
                      placeholder="Address"
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                      value={formData.mother_address}
                      onChange={handleChange}
                      required
                  ></textarea>

                  <input
                      name="gravidity"
                      type="number"
                      placeholder="Gravidity"
                      className="w-full p-2 border rounded-lg"
                      value={formData.gravidity}
                      onChange={handleChange}
                      required
                  />

                  <input
                      name="register_date"
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      value={formData.register_date.toISOString().split("T")[0]}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="delivery_date"
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      value={formData.delivery_date.toISOString().split("T")[0]}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="clinic_date"
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      value={formData.clinic_date.toISOString().split("T")[0]}
                      onChange={handleChange}
                      required
                  />

                  <select
                      name="doctor_id"
                      className="w-full p-2 border rounded-lg"
                      value={formData.doctor_id}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name}
                        </option>
                    ))}
                  </select>

                  <select
                      name="staff_id"
                      className="w-full p-2 border rounded-lg"
                      value={formData.staff_id}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Select Staff</option>
                    {staffMembers.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name}
                        </option>
                    ))}
                  </select>

                  <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                  >
                    {editMother ? "Update Mother" : "Register Mother"}
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

        {/* Table View */}
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Mother Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Gravidity</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Staff</th>
              <th className="border p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredMothers.map((mother) => (
                <tr key={mother.mother_id} className="text-center">
                  <td className="border p-2">{mother.mother_id}</td>
                  <td className="border p-2">{mother.mother_name}</td>
                  <td className="border p-2">{mother.mother_age}</td>
                  <td className="border p-2">{mother.contact}</td>
                  <td className="border p-2">{mother.gravidity}</td>
                  <td className="border p-2">
                    {doctors.find((doc) => doc.id === mother.doctor_id)?.name || "N/A"}
                  </td>
                  <td className="border p-2">
                    {staffMembers.find((staff) => staff.id === mother.staff_id)?.name || "N/A"}
                  </td>
                  <td className="border p-2">
                    <button
                        onClick={() => handleEdit(mother)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                        onClick={() => handleDelete(mother.mother_id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 ml-2"
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

export default MotherManage;
