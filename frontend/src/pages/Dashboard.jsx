import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";

function Dashboard() {

  const [apps, setApps] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchApps();

  }, []);

  const fetchApps = async () => {

    try {

      const res = await api.get("/apps");

      setApps(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };


  const handleDelete = async (appId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this app?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/apps/${appId}`);

    // remove from UI instantly
    setApps(
      apps.filter((app) => app.id !== appId)
    );

  } catch (err) {

    alert(
      err.response?.data?.error ||
      "Delete failed"
    );

  }
};

  return (
    <div>

      <Navbar />

      <div className="p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Your Apps
          </h1>

          <Link
            to="/create"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create App
          </Link>

        </div>

        {loading ? (

          <p>Loading...</p>

        ) : apps.length === 0 ? (

          <p>No apps created yet.</p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {apps.map((app) => (

              <div
                key={app.id}
                className="border rounded-xl p-4 shadow-sm"
              >

                <h2 className="text-xl font-semibold">
                  {app.name}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  App ID: {app.id}
                </p>

                <div className="flex gap-2 mt-4">

                <Link
                  to={`/app/${app.id}`}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Open App
                </Link>

                <button
                  onClick={() => handleDelete(app.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;