import { useSelector } from "react-redux";
import { useState, useRef , useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Dashboard from "@components/Dashboard";
import EditUserModal from "@components/EditUserModal";
import UserCard from "@components/UserCard";
import UserFilter from "@components/UserFilter";
import type { RootState } from "@redux/store";
import { logout } from "@redux/AuthSlice";
import { useDispatch } from "react-redux";
import { Images } from "@assets/Assets";

const Home = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [columnCount, setColumnCount] = useState(getColumnCount());

  const parentRef = useRef<HTMLDivElement>(null);

  function getColumnCount() {
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 1024) return 2; // tablet
    if (width < 1440) return 3; // laptop
    return 4; // large screens
  }

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredUsers.length / columnCount), // total rows
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280, // Approx height of each row
    overscan: 5,
  });

  const getUserAt = (rowIndex: number, colIndex: number) => {
    const index = rowIndex * columnCount + colIndex;
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
      <div className="flex flex-col lg:flex-row  divide-gray-500 divide-y-2 lg:divide-y-0 lg:divide-x-2">
        <div className="lg:w-1/3 px-5 lg:mx-auto">
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
                      gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                      gap: "1rem",
                      padding: "0 1rem",
                    }}
                  >
                    {Array.from({ length: columnCount }).map((_, colIndex) => {
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
