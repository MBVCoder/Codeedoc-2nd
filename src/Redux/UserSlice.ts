import { createSlice , type PayloadAction } from "@reduxjs/toolkit";
import { uniqueNamesGenerator, names } from 'unique-names-generator';

const roles = ["Accountant", "Manager", "Developer", "Designer"];

const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 5000; i++) {
    const name = uniqueNamesGenerator({
      dictionaries: [names],
      separator: '_',
      style: 'lowerCase'
    });
    users.push({
      id: i,
      name,
      role: roles[Math.floor(Math.random() * roles.length)],
      salary: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
      active: Math.random() < 0.5,
      image: `https://robohash.org/user${i+1}.png?set=any`,
    });
  }
  return users;
};

// Load from localStorage (if exists)
const loadUsers = () => {
  try {
    // localStorage.removeItem("users");
    const stored = localStorage.getItem("users");
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error("Error loading users from localStorage", err);
  }
  const users = generateUsers();
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (err) {
    console.error("Error saving users to localStorage", err);
  }
  return users;
};


const userSlice = createSlice({
  name: "user",
  initialState: {
    users: loadUsers(),
    showModal: false,
    selectedUser: null,
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
      const index = state.users.findIndex(
        (u: any) => u.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    showEditModal: (state, action: PayloadAction<any>) => {
      state.showModal = true;
      state.selectedUser = action.payload;
    },
    hideEditModal: (state) => {
      state.showModal = false;
      state.selectedUser = null;
    },
  },
});

export const { toggleUserActive, updateUser , showEditModal , hideEditModal } = userSlice.actions;
export default userSlice.reducer;
