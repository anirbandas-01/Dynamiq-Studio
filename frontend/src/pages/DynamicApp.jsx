import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import DynamicForm from "../components/DynamicForm";
import DynamicTable from "../components/DynamicTable";

function DynamicApp() {

  const { id } = useParams();

  const [config, setConfig] = useState(null);

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  // fetch config
  const fetchConfig = async () => {

    try {

      const res = await api.get(`/apps/${id}`);

      setConfig(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // fetch records
  const fetchRecords = async () => {

    try {

      const res = await api.get(`/data/${id}`);

      setRecords(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchConfig();
    fetchRecords();

  }, []);

  // submit dynamic form
  const handleSubmit = async (formData) => {

    try {

      await api.post(`/data/${id}`, formData);

      fetchRecords();

      alert("Data saved successfully");

    } catch (err) {

      console.log(err);

      alert("Failed to save data");

    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div>

      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          {config?.name}
        </h1>

        {/* Dynamic Form */}
        <DynamicForm
          fields={config?.config?.fields || []}
          onSubmit={handleSubmit}
        />

        {/* Dynamic Table */}
        <DynamicTable
          fields={config?.config?.fields || []}
          records={records}
        />

      </div>

    </div>
  );
}

export default DynamicApp;