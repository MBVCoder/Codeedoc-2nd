import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import Fields from "./Fields";

const Dashboard = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const roles = ["Accountant", "Manager", "Developer", "Designer"];

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
    <div className="rounded-lg flex lg:flex-col justify-around lg:justify-normal gap-5 py-3 h-full">
      <div className="flex flex-col gap-5 mb-10 border-2 border-amber-50 rounded-2xl p-5 bg-slate-700/80 backdrop-blur-2xl min-w-1/3 lg:min-w-0">
        <h1 className="text-white text-center text-2xl">Total Users Data</h1>
        <hr className="border-white" />
        <Fields label="Total Users" count={totalUsers} />
        <Fields label="Active Users" count={activeUsers} />
        <Fields label="Total Salary" count={totalSalary.toLocaleString()} />
      </div>
      <div className=" flex flex-col gap-5 border-2 border-amber-50 rounded-2xl p-5 bg-slate-700/80 min-w-1/3 lg:min-w-0 backdrop-blur-2xl">
        <h1 className="text-white text-center text-2xl">Roles Of Users</h1>
        <hr className="border-white" />
        {roles.map((role) => (
          <Fields key={role} label={role} count={roleCount[role] || 0} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
