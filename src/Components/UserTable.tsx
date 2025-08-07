import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import UserCard from "./UserCard";

const UserTable = () => {
  const users = useSelector((state: RootState) => state.user.users);

  return (
    <div className="p-4">
      <h2 className="text-4xl text-white text-center font-semibold mb-4 mt-10">User Cards</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserTable;
