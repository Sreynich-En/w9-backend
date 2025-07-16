import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, isAuthenticated, loading } = useAuth(); // Added isAuthenticated and loading
  const autoLoginData = location.state;

  const [email, setEmail] = useState(autoLoginData?.email || "");
  const [password, setPassword] = useState(autoLoginData?.password || "");
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Q6: Auto redirect if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  // Auto login from registration
  useEffect(() => {
    if (autoLoginData?.email && autoLoginData?.password && !loading && !isAuthenticated()) {
      handleSubmit(); // auto login
    }
  }, [autoLoginData, loading, isAuthenticated]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoginLoading(true);
    setError("");

    try {
        const response = await API.post("/login", { email, password });
        setAuth(response.data.token);
        navigate("/dashboard");
    } catch (err) {
        setError(err.response?.data?.message || "Login failed");
    } finally {
        setLoginLoading(false);
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Sign In
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center transition-all">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          disabled={loginLoading}
        >
          {loginLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
