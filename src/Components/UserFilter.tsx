import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: string;
  salary: number;
  active: boolean;
  image: string;
}

interface UserFilterProps {
  allUsers: User[];
  onFilterChange: (filtered: User[]) => void;
}

const roles = ["All", "Accountant", "Manager", "Developer", "Designer"];

const UserFilter = ({ allUsers, onFilterChange }: UserFilterProps) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [activeStatus, setActiveStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [filteredCount, setFilteredCount] = useState(allUsers.length);

  useEffect(() => {
    let filtered = allUsers;

    // Search
    if (search.trim()) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Role filter
    if (role !== "All") {
      filtered = filtered.filter((user) => user.role === role);
    }

    // Active filter
    if (activeStatus !== "all") {
      filtered = filtered.filter((user) =>
        activeStatus === "active" ? user.active : !user.active,
      );
    }

    onFilterChange(filtered);
    setFilteredCount(filtered.length);
  }, [search, role, activeStatus, allUsers, onFilterChange]);

  return (
    <div className="m-6 mt-0 p-4 shadow flex flex-col xl:flex-row gap-4 xl:items-center rounded-4xl">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded-4xl w-full text-white"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded-4xl w-30 text-white"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={activeStatus}
        onChange={(e) =>
          setActiveStatus(e.target.value as "all" | "active" | "inactive")
        }
        className="border p-2 w-40 text-white rounded-4xl"
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <span className="text-md xl:text-lg text-center text-white">
        Filtered Users: <strong>{filteredCount}</strong>
      </span>
    </div>
  );
};

export default UserFilter;
