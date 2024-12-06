import React, { useState } from "react";
import axios from "axios";

const Stats = () => {
  const [stats, setStats] = useState(''); // Overall stats
  const [error, setError] = useState(null); // Error state

  const api = axios.create({
    baseURL: "http://localhost:5000/api/admin",
    withCredentials: true,
  });

  const fetchStats = async () => {
    try {
      const response = await api.get("/stats");
      if (response.data.success) {
        setStats({
          users: response.data.users,
          projects: response.data.projects,
          documents: response.data.documents,
        });
      } else {
        throw new Error("Failed to fetch statistics");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  fetchStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Statistics Overview</h1>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl">{stats.users}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Projects</h3>
          <p className="text-3xl">{stats.projects}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Documents</h3>
          <p className="text-3xl">{stats.documents}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
