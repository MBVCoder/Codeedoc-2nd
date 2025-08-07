import { createSlice } from "@reduxjs/toolkit";

const roles = ["Accountant", "Manager", "Developer", "Designer"];

const generateUsers = () => {
  const users = [];

  for (let i = 1; i <= 5000; i++) {
    users.push({
      id: i,
      name: `Product ${i}`,
      role: roles[Math.floor(Math.random() * roles.length)],
      salary: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
      active: Math.random() < 0.5,
      image: `https://picsum.photos/seed/${i}/200`,
    });
  }

  return users;
};

// Load from localStorage (if exists)
const loadUsers = () => {
  const stored = localStorage.getItem("users");
  if (stored) {
    return JSON.parse(stored);
  }
  const users = generateUsers();
  localStorage.setItem("users", JSON.stringify(users));
  return users;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: loadUsers(),
  },
  reducers: {
    toggleUserActive: (state, action) => {
      const user = state.users.find((u: any) => u.id === action.payload);
      if (user) {
        user.active = !user.active;
      }
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u: any) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});

export const { toggleUserActive, updateUser } = userSlice.actions;
export default userSlice.reducer;
