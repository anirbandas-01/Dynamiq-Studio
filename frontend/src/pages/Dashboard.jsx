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
      "Delete this app permanently?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/apps/${appId}`);

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

    <div className="min-h-screen bg-[#F5F5F3]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        

        <div className="bg-[#EAE4D5] rounded-[28px] p-10 border border-[#d6d0c2]">

          <div className="max-w-3xl">

            <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">
              Dynamic Runtime Platform
            </p>

            <h1 className="text-5xl font-bold text-[#2B2B2B] leading-tight">
              Build Applications
              With Config-Driven Architecture
            </h1>

            <p className="text-gray-600 text-lg mt-5 leading-8">
              Create scalable dynamic applications with
              runtime-generated forms, validations,
              CSV imports, and reusable architecture.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                to="/create"
                className="bg-[#2F3645] text-white px-7 py-3 rounded-2xl font-medium"
              >
                Create App
              </Link>

              <button
                className="border border-[#b8b2a5] text-[#2B2B2B] px-7 py-3 rounded-2xl"
              >
                Explore
              </button>

            </div>

          </div>

        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#ECECEC]">

            <p className="text-gray-500 text-sm">
              Total Apps
            </p>

            <h2 className="text-4xl font-bold text-[#2B2B2B] mt-3">
              {apps.length}
            </h2>

          </div>

          <div className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#ECECEC]">

            <p className="text-gray-500 text-sm">
              Runtime Forms
            </p>

            <h2 className="text-4xl font-bold text-[#2B2B2B] mt-3">
              {apps.reduce(
                (total, app) =>
                  total +
                  (app.config?.fields?.length || 0),
                0
              )}
            </h2>

          </div>

          <div className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#ECECEC]">

            <p className="text-gray-500 text-sm">
              CSV Uploads
            </p>

              <h2 className="text-4xl font-bold text-[#2B2B2B] mt-3">
                {apps.reduce(
                  (total, app) => total + (app.csv_uploads || 0),
                  0
                )}
              </h2>
          </div>

        </div>

        <div className="flex justify-between items-end mt-14 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-[#2B2B2B]">
              Your Applications
            </h2>

            <p className="text-gray-500 mt-2">
              Manage and launch your generated apps
            </p>

          </div>

        </div>

        {loading ? (

          <div className="py-24 text-center text-gray-500">
            Loading applications...
          </div>

        ) : apps.length === 0 ? (

          <div className="bg-white rounded-[28px] p-16 border border-[#ECECEC] text-center">

            <h2 className="text-3xl font-bold text-[#2B2B2B]">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Start by creating your first dynamic app.
            </p>

            <Link
              to="/create"
              className="inline-block mt-8 bg-[#2F3645] text-white px-8 py-3 rounded-2xl"
            >
              Create First App
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {apps.map((app) => (

              <div
                key={app.id}
                className="bg-white rounded-[28px] p-7 border border-[#ECECEC] hover:border-[#BBD5DA] transition"
              >

                

                <div className="flex items-start justify-between">

                  <div className="w-14 h-14 rounded-2xl bg-[#BBD5DA] flex items-center justify-center text-xl">

                    logo

                  </div>

                  <span className="text-xs text-gray-400">
                    Runtime App
                  </span>

                </div>

                

                <div className="mt-7">

                  <h2 className="text-2xl font-bold text-[#2B2B2B]">
                    {app.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-3 leading-6">
                    Config-driven application with
                    reusable dynamic runtime architecture.
                  </p>

                </div>

                

                <div className="mt-7 space-y-2 text-sm text-gray-500">

                  <p>
                    App ID: {app.id}
                  </p>

                  <p>
                    Dynamic Forms Enabled
                  </p>
                  
                  <p>
                  Created:{" "}
                  {
                    app.created_at
                      ? new Date(app.created_at)
                          .toLocaleDateString()
                      : "N/A"
                  }
                </p>
                </div>

                <div className="flex gap-3 mt-8">

                  <Link
                    to={`/app/${app.id}`}
                    className="flex-1 bg-[#2F3645] text-white text-center py-3 rounded-2xl"
                  >
                    Open
                  </Link>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="px-5 py-3 rounded-2xl border border-[#E5E5E5] text-gray-600"
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