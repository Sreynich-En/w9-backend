import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Helper function to create protected routes
const createProtectedRoute = (Component) => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={createProtectedRoute(Dashboard)} />
      <Route path="/courses" element={createProtectedRoute(Courses)} />
      <Route path="/teachers" element={createProtectedRoute(Teachers)} />
      <Route path="/students" element={createProtectedRoute(Students)} />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}
