import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Branding */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-black">
            Dynamic App Generator
          </h1>

          <p className="text-gray-500 mt-2">
            Build dynamic applications from JSON configuration
          </p>

        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90 transition"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="text-black font-semibold ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;