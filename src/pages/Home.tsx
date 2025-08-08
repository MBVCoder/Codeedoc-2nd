import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Dashboard from "@components/Dashboard";
import EditUserModal from "@components/EditUserModal";
import UserCard from "@components/UserCard";
import UserFilter from "@components/UserFilter";
import type { RootState } from "@redux/store";
import { logout } from "@redux/AuthSlice";
import { useDispatch } from "react-redux";
import { Images } from "@assets/Assets";

const COLUMN_COUNT = 4; // Number of columns in your grid

const Home = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredUsers.length / COLUMN_COUNT), // total rows
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280, // Approx height of each row
    overscan: 5,
  });

  const getUserAt = (rowIndex: number, colIndex: number) => {
    const index = rowIndex * COLUMN_COUNT + colIndex;
    return filteredUsers[index];
  };
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full bg-[#0F2027] min-h-screen px-5">
      <nav className=" flex flex-row justify-between  items-center px-3 py-2 mb-5 border-b-2 border-b-amber-50">
          <img src={Images.logo} alt="logo" className="w-auto h-16" />
          <h1 className="text-white text-4xl font-extrabold tracking-wider">Dashboard</h1>
          <h1
            className="font-semibold text-md bg-red-400 px-2 py-1 my-auto rounded-lg hover:scale-105 transition-all duration-500 hover:cursor-pointer"
            onClick={handleClick}
          >
            Logout
          </h1>
        </nav>
      <div className="flex flex-row  divide-gray-500 divide-x-2">
        <div className="w-1/3 px-5">
          <Dashboard />
        </div>
        <div className="w-full">
          <UserFilter allUsers={users} onFilterChange={setFilteredUsers} />
          {filteredUsers.length === 0 ? (
            <p className="text-gray-300 text-center mt-10 text-lg">
              No users match your Search data.
            </p>
          ) : (
            <div
              ref={parentRef}
              className="relative overflow-auto h-[90vh]" // scroll container
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                  <div
                    key={virtualRow.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      transform: `translateY(${virtualRow.start}px)`,
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: `repeat(${COLUMN_COUNT}, minmax(0, 1fr))`,
                      gap: "1rem",
                      padding: "0 1rem",
                    }}
                  >
                    {Array.from({ length: COLUMN_COUNT }).map((_, colIndex) => {
                      const user = getUserAt(virtualRow.index, colIndex);
                      return user && <UserCard key={user.id} user={user} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <EditUserModal />
      </div>
    </div>
  );
};

export default Home;
