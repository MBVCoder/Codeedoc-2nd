import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";

const Dashboard = () => {
  const users = useSelector((state: RootState) => state.user.users);

  const totalUsers = users.length;
  const totalSalary = users.reduce(
    (acc: any, user: any) => acc + user.salary,
    0,
  );
  const activeUsers = users.filter((u: any) => u.active).length;
  const roleCount = users.reduce((acc: any, user: any) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="rounded-lg mb-4 flex justify-around lg:flex-col">
      <div className="flex flex-col gap-5 mb-10 border-2 border-amber-50 rounded-2xl p-5 bg-slate-900/80 backdrop-blur-2xl min-w-1/3 lg:min-w-0">
        <h1 className="text-white text-center text-2xl">Total Users Data</h1>
        <hr className="border-white" />
        <div className=" border-[1px] border-white rounded-4xl hover:-translate-y-2 duration-400 bg-[#0F2027] inset-shadow-sm inset-shadow-black">
          <div className=" p-3 text-white text-center">
            <span className="font-semibold text-lg ">Total Users :</span>{" "}
            {totalUsers}
          </div>
        </div>
        <div className=" border-[1px] border-white rounded-4xl hover:-translate-y-2 duration-400 bg-[#0F2027] inset-shadow-sm inset-shadow-black">
          <div className=" p-3 text-white text-center">
            <span className="font-semibold text-lg">Active Users :</span>{" "}
            {activeUsers}
          </div>
        </div>
        <div className=" border-[1px] border-white rounded-4xl hover:-translate-y-2 duration-400 bg-[#0F2027] inset-shadow-sm inset-shadow-black">
          <div className=" p-3 text-white text-center">
            <span className="font-semibold text-lg ">Total Salary :</span> $
            {totalSalary.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="min-w-1/3 lg:min-w-0">
        <div className=" flex flex-col gap-5 border-2 border-amber-50 rounded-2xl p-5 bg-teal-900/80">
          <h1 className="text-white text-center text-2xl">Roles Of Users</h1>
          <hr className="border-white" />
          {["Accountant", "Manager", "Developer", "Designer"].map((role) => (
            <div key={role} className=" border-[1px] border-white rounded-4xl hover:-translate-y-2 duration-400 bg-[#0F2027] inset-shadow-sm inset-shadow-black">
              <div className="p-3 text-white text-center">
                <span className="font-semibold text-lg">{role}s :</span>{" "}
                {roleCount[role] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
