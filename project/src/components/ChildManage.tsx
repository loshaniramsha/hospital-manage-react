import { useState } from "react";
import Child from "../model/ChildModel.ts";

interface Doctor {
  id: number;
  name: string;
}

interface Staff {
  id: number;
  name: string;
}

function ChildManage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [formData, setFormData] = useState<Child>({
    child_id: 0,
    child_name: "",
    mother_name: "",
    contact: "",
    address: "",
    age: 0,
    vaccine_status: "",
    doctor_id: 0,
    staff_id: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editChild, setEditChild] = useState<Child | null>(null); // State to track the child being edited

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
      [name]: name === "age" || name === "doctor_id" || name === "staff_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editChild) {
      setChildren(children.map(child =>
          child.child_id === editChild.child_id ? { ...formData, child_id: editChild.child_id } : child
      ));
    } else {
      setChildren([...children, { ...formData, child_id: children.length + 1 }]);
    }
    setFormData({
      child_id: 0,
      child_name: "",
      mother_name: "",
      contact: "",
      address: "",
      age: 0,
      vaccine_status: "",
      doctor_id: 0,
      staff_id: 0,
    });
    setIsModalOpen(false);
    setEditChild(null); // Reset the edit state
  };

  const handleEdit = (child: Child) => {
    setEditChild(child);
    setFormData(child);
    setIsModalOpen(true);
  };

  const handleDelete = (child_id: number) => {
    setChildren(children.filter((child) => child.child_id !== child_id));
  };

  const filteredChildren = children.filter((child) =>
      child.child_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.mother_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Registered Children</h3>

        {/* Search bar */}
        <input
            type="text"
            placeholder="Search by Child or Guardian's Name"
            className="w-full p-2 mb-4 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register New Child
        </button>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">{editChild ? "Edit Child" : "Register New Child"}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                      name="child_name"
                      type="text"
                      placeholder="Child's Name"
                      className="w-full p-2 border rounded-lg"
                      value={formData.child_name}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="age"
                      type="number"
                      placeholder="Age"
                      className="w-full p-2 border rounded-lg"
                      value={formData.age}
                      onChange={handleChange}
                      required
                  />
                  <input
                      name="mother_name"
                      type="text"
                      placeholder="Parent/Guardian Name"
                      className="w-full p-2 border rounded-lg"
                      value={formData.mother_name}
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
                      name="address"
                      placeholder="Address"
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      required
                  ></textarea>

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

                  <select
                      name="vaccine_status"
                      className="w-full p-2 border rounded-lg"
                      value={formData.vaccine_status}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Vaccine Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>

                  <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                  >
                    {editChild ? "Update Child" : "Register Child"}
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
              <th className="border p-2">Child Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Guardian</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Staff</th>
              <th className="border p-2">Vaccine Status</th>
              <th className="border p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredChildren.map((child) => (
                <tr key={child.child_id} className="text-center">
                  <td className="border p-2">{child.child_id}</td>
                  <td className="border p-2">{child.child_name}</td>
                  <td className="border p-2">{child.age}</td>
                  <td className="border p-2">{child.mother_name}</td>
                  <td className="border p-2">
                    {doctors.find((doc) => doc.id === child.doctor_id)?.name || "N/A"}
                  </td>
                  <td className="border p-2">
                    {staffMembers.find((staff) => staff.id === child.staff_id)?.name || "N/A"}
                  </td>
                  <td className="border p-2">{child.vaccine_status}</td>
                  <td className="border p-2">
                    <button
                        onClick={() => handleEdit(child)}
                        className="text-yellow-500 hover:text-yellow-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                        onClick={() => handleDelete(child.child_id)}
                        className="text-red-500 hover:text-red-700"
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

export default ChildManage;
