import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, toggleUserActive } from "@redux/UserSlice";
import type { AppDispatch } from "@redux/store";

const roles = ["Accountant", "Manager", "Developer", "Designer"];

const UserCard = ({ user }: { user: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData((prev: any) => ({ ...prev, active: !prev.active }));
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    setShowModal(false);
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white/70 backdrop-blur-2xl relative">
      <button
        onClick={() => setShowModal(true)}
        className="absolute top-2 right-2 text-xs text-blue-500 hover:underline"
      >
        Edit
      </button>

      <img src={user.image} loading="lazy" alt={user.name} className="w-16 h-16 rounded-full mx-auto" />
      <h3 className="text-center font-medium mt-2">{user.name}</h3>
      <p className="text-center text-sm text-gray-500">{user.role}</p>
      <p className="text-center text-sm">💰 ${user.salary}</p>
      <p className={`text-center mt-2 text-xs ${user.active ? "text-green-600" : "text-red-600"}`}>
        {user.active ? "Active" : "Inactive"}
      </p>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>

            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border w-full p-1 mb-3 rounded"
            />

            <label className="block text-sm mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border w-full p-1 mb-3 rounded"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={handleToggle}
                className="mr-2"
              />
              <span>{formData.active ? "Active" : "Inactive"}</span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-300 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
