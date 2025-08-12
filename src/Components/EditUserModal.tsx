// components/EditUserModal.tsx
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@redux/store";
import { updateUser, hideEditModal } from "@redux/UserSlice";
import { useState, useEffect } from "react";
import { X , Save } from 'lucide-react';

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
    <div className="fixed inset-0 bg-[#0F2027]/90 flex justify-center items-center z-50">
      <div className="bg-[#0F2027]/30 backdrop-blur-2xl p-6 rounded-2xl shadow-lg w-[300px] relative pt-20 inset-shadow-sm inset-shadow-white">
      <div className="absolute -top-25 left-0 scale-90">
      <img src={formData?.image} alt="user" className="w-1/2 h-auto mb-4 object-contain bg-black mx-auto rounded-full p-2 shadow-md shadow-white" />
      </div>
        <h2 className="text-2xl text-center text-blue-400 mb-4">
          Edit <strong className="text-white">{formData?.name}</strong> Data
        </h2>
        <hr className="border-white mb-5" />
        <label className="block text-md mb-1 text-white">New Username</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 outline-0 rounded-xl border-b-[2px] border-white text-white"
        />

        <label className="block text-md mb-1 text-white my-3">New Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 mb-3 outline-0 rounded-xl border-b-[2px] border-white text-white hover:cursor-pointer"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div className="flex items-center mt-3 mb-5 space-y-5">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-red-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:bg-green-600 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
          </label>
          <span className="ml-3 text-md font-semibold self-start">
            {formData.active ? (
              <p className="text-green-400">Active</p>
            ) : (
              <p className="text-red-400">InActive</p>
            )}
          </span>
        </div>

        <div className="flex justify-between gap-2 items-center my-5">
          <button
            onClick={() => dispatch(hideEditModal())}
            className="px-4 py-2 border-b-2 border-white bg-black/70 rounded-xl hover:bg-black text-white text-md duration-500 hover:cursor-pointer hover:scale-105 flex items-center gap-2"
          >
            Cancel <X />
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border-b-2 border-white rounded-xl bg-blue-500/80 hover:bg-blue-600/60 text-white text-md duration-500 hover:cursor-pointer hover:scale-105 flex items-center gap-2"
          >
            Save <Save />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
