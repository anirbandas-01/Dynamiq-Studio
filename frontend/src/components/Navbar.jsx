import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between items-center">

      <Link
        to="/dashboard"
        className="text-xl font-bold"
      >
        App Generator
      </Link>

      <div className="flex gap-4 items-center">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/create">
          Create App
        </Link>

        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;