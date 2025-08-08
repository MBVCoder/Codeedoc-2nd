# 🧠 React Practical Assessment

## 🎯 Goal

Build a **scalable** and **performant** React web app using **Vite**, implementing:

- Authentication
- Protected routes
- Redux state management
- Editable data grid (5000+ users)
- Performance optimizations

---

## ✅ Requirements

### 🛠️ Project Setup

- Create a React app using **Vite**
- Setup **absolute imports** using:
  - `@components`
  - `@store`
  - `@pages`
  - `@utils`
- Implement a **scalable folder structure**
- Use **Redux Toolkit** & **React-Redux** for state management
- Use an **Axios instance** with **interceptors** to handle token-based authentication

---

### 🔐 Authentication

- Create a **Login Page**
- Use the following API to authenticate users:

POST https://dummyjson.com/auth/login

```
{
"username": "kminchelle",
"password": "0lelplR"
}
```

- On successful login:
  - Save the **user** and **token** in Redux
  - Redirect to the **Home Page**
- Implement **Protected Routes**:
  - Unauthorized users should **not be able to access** internal pages

---

### 🏠 Home Page (Protected)

Generate and render **5000 user items** in Redux (mock data, not from API).

Each user should have the following structure:

- `name`: `"Product 1"`, `"Product 2"`, ...
- `role`: Randomly assigned from:
  - `"Accountant"`
  - `"Manager"`
  - `"Developer"`
  - `"Designer"`
- `salary`: Random number between **1000 - 10000**
- `active`: Boolean flag (shown as UI switch)
- `image`: Random image from [`https://picsum.photos/200`](https://picsum.photos/200)

---

### 🧩 Editable Grid

- Display users in a **virtualized table/grid** (optimized for 5000 items)
- Editable inline fields:
  - `name`
  - `role`
  - `active` (toggle)
- On edit:
  - Update Redux state efficiently
  - Avoid full list re-renders
- Use **memoization**, **selectors**, or other **render optimization** techniques

---

### 📊 Dashboard Overview (Above the List)

Display dynamic stats that update automatically with user edits:

- Total number of users
- Number of active users
- Total salary (sum of all users)
- Count of users per role:
  - Accountant
  - Manager
  - Developer
  - Designer

---

## 💡 Bonus (Optional but Impressive)

- Add **filters** or **search** functionality by name or role
- Add a **toast system** for success and error notifications
- Add **logout** functionality:
  - Clear token and user data
- Persist user session using:
  - `localStorage` or `sessionStorage`

---

## 📦 Submission Expectations

- Smooth scrolling and interaction
- Clean, readable, and well-documented code
- Optimized and reusable components
- Fully **buildable codebase**

---

Good luck! 🚀

# login page figma link
https://www.figma.com/design/BtHTZv4ahDJgD1toBV8TOm/Millineal---Landing-Sign-in-Login-Page--Community-?node-id=0-1&p=f&t=aFdO3JDMWJFR6D8D-0
