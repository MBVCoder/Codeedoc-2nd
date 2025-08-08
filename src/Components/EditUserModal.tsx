// components/EditUserModal.tsx
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@redux/store";
import { updateUser, hideEditModal } from "@redux/UserSlice";
import { useState, useEffect } from "react";

const roles = ["Accountant", "Manager", "Developer", "Designer"];

const EditUserModal = () => {
  const dispatch = useDispatch();
  const { showModal, selectedUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState(selectedUser);

  useEffect(() => {
    setFormData(selectedUser);
  }, [selectedUser]);

  if (!showModal || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData((prev: any) => ({ ...prev, active: !prev.active }));
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    dispatch(hideEditModal());
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="bg-white/80 backdrop-blur-2xl p-6 rounded-lg shadow-lg w-[300px]">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>

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
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
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
            onClick={() => dispatch(hideEditModal())}
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
  );
};

export default EditUserModal;
