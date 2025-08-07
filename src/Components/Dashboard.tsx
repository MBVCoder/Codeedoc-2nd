import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import { logout } from "@redux/AuthSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const users = useSelector((state: RootState) => state.user.users);

  const totalUsers = users.length;
  const totalSalary = users.reduce((acc, user) => acc + user.salary, 0);
  const activeUsers = users.filter((u) => u.active).length;
  const roleCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const dispatch = useDispatch();

  const handleclick = () => {
    dispatch(logout());
  };

  return (
    <div className="p-6 shadow rounded-lg mb-4">
      <div className=" flex flex-row justify-end items-end gap-2 " onClick={handleclick}>
        <h1 className="font-semibold text-md bg-red-400 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-500 hover:cursor-pointer">
          Logout
        </h1>
      </div>
      <h2 className="text-4xl text-center font-light my-5 mx-auto px-4 py-2 rounded-4xl ring-2 border-black bg-white/90 w-fit inset-shadow-sm inset-shadow-[#0F2027] text-shadow-lg shadow-cyan-900 shadow-md">
        Dashboard Overview
      </h2>

      <hr className="border-white my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded">
          <span className="font-semibold text-lg ">Total Users :</span>{" "}
          {totalUsers}
        </div>
        <div className="bg-green-100 p-4 rounded">
          <span className="font-semibold text-lg">Active Users :</span>{" "}
          {activeUsers}
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <span className="font-semibold text-lg ">Total Salary :</span> $
          {totalSalary.toLocaleString()}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 p-4">
          {["Accountant", "Manager", "Developer", "Designer"].map((role) => (
            <div key={role} className="bg-purple-100 p-4 rounded text-center">
              <span className="font-semibold">{role}s :</span>{" "}
              {roleCount[role] || 0}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
