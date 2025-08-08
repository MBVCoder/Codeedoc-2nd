import { useDispatch } from "react-redux";
import {  showEditModal } from "@redux/UserSlice";
import type { AppDispatch } from "@redux/store";
import { Pencil } from 'lucide-react';

const UserCard = ({ user }: { user: any }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="border p-4 rounded shadow-md bg-white/10 backdrop-blur-2xl relative">
      <p className={`text-center mt-2 text-sm `}>
        {user.active ? <p className="bg-green-400 w-3 h-3 rounded-full animate-pulse"></p> : <p className="bg-red-400 w-3 h-3 rounded-full animate-pulse"></p>}
      </p>
      <button
        onClick={() => dispatch(showEditModal(user))}
        className="absolute top-2 right-2 text-blue-500 hover:scale-110 transition-all duration-500 hover:cursor-pointer"
      >
        <Pencil className="w-6 h-6" />
      </button>

      <img src={user.image} loading="lazy" alt={user.name} className="w-20 h-auto rounded-full mx-auto bg-black" />
      <h3 className="text-center font-semibold text-white mt-2"><span>User Name : </span>{user.name}</h3>
      <hr />
      <p className="text-center text-md text-gray-500"><span>User Role : </span>{user.role}</p>
      <p className="text-center text-md text-green-500"><span className="text-gray-500">Salary : </span> ${user.salary}</p>
    </div>
  );
};

export default UserCard;
