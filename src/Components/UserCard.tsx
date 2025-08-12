import { useDispatch } from "react-redux";
import { showEditModal } from "@redux/UserSlice";
import type { AppDispatch } from "@redux/store";
import { Pencil } from "lucide-react";
import { memo } from "react";

const UserCard = ({ user }: { user: any }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="border p-4 rounded-2xl shadow-md bg-white/20 backdrop-blur-2xl relative border-black shadow-black">
      <p className={`text-center mt-2 text-sm `}>
        {user.active ? (
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
        ) : (
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
          </span>
        )}
      </p>
      <button
        onClick={() => dispatch(showEditModal(user))}
        className="absolute top-2 right-2 text-black hover:scale-110 transition-all duration-500 hover:cursor-pointer"
      >
        <Pencil className="w-6 h-6 fill-teal-50" />
      </button>

      <img
        src={user.image}
        loading="lazy"
        alt={user.name}
        className="w-20 h-auto rounded-full mx-auto bg-black"
      />
      <h3 className="text-center text-xl font-semibold text-white mt-2">
        <span>User Name : </span>
        {user.name}
      </h3>
      <hr className="my-2" />
      <p className="text-center font-semibold text-md text-white text-shadow-md text-shadow-black" >
        <span className="text-gray-900 text-shadow-none">User Role : </span>
        {user.role}
      </p>
      <p className="text-center text-lg text-green-500">
        <span className="text-black">Salary : </span> ${user.salary}
      </p>
    </div>
  );
};

export default memo(UserCard);
