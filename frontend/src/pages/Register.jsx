import { useState } from "react";
import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/auth/register",
        formData
      );

      alert("Registration successful");

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Registration failed"
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
            Create flexible applications without coding
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
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
                ? "Creating account..."
                : "Register"
            }

          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-6 text-gray-600">

          Already have an account?

          <Link
            to="/"
            className="text-black font-semibold ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;