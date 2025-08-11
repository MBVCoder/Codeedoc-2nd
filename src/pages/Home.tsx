import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Dashboard from "@components/Dashboard";
import EditUserModal from "@components/EditUserModal";
import UserCard from "@components/UserCard";
import UserFilter from "@components/UserFilter";
import type { RootState } from "@redux/store";
import { logout } from "@redux/AuthSlice";
import { Images } from "@assets/assets";
import { useMemo } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [columnCount, setColumnCount] = useState(getColumnCount());

  const parentRef = useRef<HTMLDivElement>(null);

  const columnsArray = useMemo(
    () => Array.from({ length: columnCount }),
    [columnCount],
  );

  function getColumnCount() {
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 1024) return 2; // tablet
    if (width < 1440) return 3; // laptop
    return 4; // large screens
  }

  useEffect(() => {
    let timeout: number;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        setColumnCount(getColumnCount());
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredUsers.length / columnCount), // total rows
    getScrollElement: () => parentRef.current,
    estimateSize: () => 250, // Approx height of each row
    overscan: 5,
  });

  const getUserAt = useCallback(
    (rowIndex: number, colIndex: number) => {
      const index = rowIndex * columnCount + colIndex;
      return filteredUsers[index];
    },
    [filteredUsers, columnCount],
  );

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full min-h-screen relative">
      <img
        src="https://cdn.pixabay.com/photo/2017/02/09/15/10/sea-2052650_640.jpg"
        alt=""
        className="absolute top-0 left-0 w-full h-full z-0 object-cover"
      />
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0) 50%)",
        }}
      ></div>
      <nav className="flex flex-row justify-between items-center px-5 py-2 mb-5 relative bg-white/80 z-0">
        <img
          src={Images.logo}
          alt="logo"
          className="w-auto h-16 z-10 invert-100"
        />
        <h1 className="text-4xl font-extrabold tracking-wider z-10">
          Dashboard
        </h1>
        <h1
          className="font-semibold text-md bg-red-400 px-2 py-1 my-auto rounded-lg hover:scale-105 transition-all duration-500 hover:cursor-pointer z-10"
          onClick={handleClick}
        >
          Logout
        </h1>
        <svg
          className="absolute h-40 -bottom-40 w-full right-0 z-0 rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            fillOpacity="0.8"
            d="M0,96L48,122.7C96,149,192,203,288,192C384,181,480,107,576,69.3C672,32,768,32,864,64C960,96,1056,160,1152,165.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L0,320Z"
          />
        </svg>
      </nav>
      <div className="flex flex-col lg:flex-row  divide-black divide-y-2 lg:divide-y-0 lg:divide-x-2 z-30">
        <div className="lg:w-1/4 px-5 lg:mx-auto pb-5 lg:pb-0 z-30 mb-5 lg:mb-0">
          <Dashboard />
        </div>
        <div className="w-full z-20">
          <UserFilter allUsers={users} onFilterChange={setFilteredUsers} />
          {filteredUsers.length === 0 ? (
            <p className="text-gray-300 text-center mt-10 text-lg">
              No users match your Search data.
            </p>
          ) : (
            <div
              ref={parentRef}
              className="relative overflow-auto h-[70vh]" // scroll container
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
                    {columnsArray.map((_, colIndex) => {
                      const user = getUserAt(virtualRow.index, colIndex);
                      // console.log(virtualRow.index, colIndex, user)
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
