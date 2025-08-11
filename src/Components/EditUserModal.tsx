// components/EditUserModal.tsx
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@redux/store";
import { updateUser, hideEditModal } from "@redux/UserSlice";
import { useState, useEffect } from "react";

const roles = ["Accountant", "Manager", "Developer", "Designer"];

interface User {
  id: number;
  name: string;
  role: string;
  salary: number;
  active: boolean;
  image: string;
}

const EditUserModal = () => {
  const dispatch = useDispatch();
  const { showModal, selectedUser } = useSelector(
    (state: RootState) => state.user,
  );
  const [formData, setFormData] = useState<User | null>(selectedUser);

  useEffect(() => {
    setFormData(selectedUser);
  }, [selectedUser]);

  if (!showModal || !formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : prev,
    );
  };

  const handleToggle = () => {
    setFormData((prev) => (prev ? { ...prev, active: !prev.active } : prev));
  };

  const handleSave = () => {
    if (formData) {
      dispatch(updateUser(formData));
      dispatch(hideEditModal());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-2xl shadow-lg w-[300px]">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Edit Userdata
        </h2>
        <hr className="border-white mb-5" />
        <label className="block text-md mb-1 text-white">New Username</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded-xl bg-[#0F2027] text-white"
        />

        <label className="block text-md mb-1 text-white">New Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded-xl bg-[#0F2027] text-white hover:cursor-pointer"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div className="flex items-center mt-3 mb-5">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:bg-green-600 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
          </label>
          <span className="ml-3 text-md font-semibold">
            {formData.active ? (
              <p className="text-green-400">Active</p>
            ) : (
              <p className="text-red-400">InActive</p>
            )}
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => dispatch(hideEditModal())}
            className="px-4 py-2 border-2 rounded-xl hover:bg-black hover:text-white text-md duration-500 hover:cursor-pointer hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border-2 rounded-xl hover:bg-blue-500/60 hover:text-white text-md duration-500 hover:cursor-pointer hover:scale-105"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
