// router/index.tsx
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
// import Dashboard from "../pages/Dashboard";
// import Login from "../pages/Login";
// import NotFound from "../pages/NotFound";

import MainLayout from "../layouts/MainLayout";
// import DashboardLayout from "../layouts/DashboardLayout";
// import AuthLayout from "../layouts/AuthLayout";
// import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* Bạn có thể thêm các page public khác vào đây */}
      </Route>

      {/* Auth Routes */}
      {/* <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route> */}

      {/* Protected Routes */}
      {/* <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route> */}

      {/* 404 */}
      {/* Nếu muốn dùng MainLayout cho 404 */}
      <Route element={<MainLayout />}>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
