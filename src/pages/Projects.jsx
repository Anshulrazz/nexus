import React, { useEffect, useState } from "react";
import ProjectsTable from "../components/ProjectsTable";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/admin/projects");
        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          setError("Failed to fetch projects");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const deleteProject = async (id) => {
    try {
      const response = await api.delete(`/admin/project/${id}`);
      if (response.status === 200) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== id)
        );
        toast.success('Deleted')
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const togglePremium = async (id) => {
    try {
      const response = await api.post(`/project/makep/${id}`);
      if (response.status === 200) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === id ? { ...project, premium: !project.premium } : project
          )
        );
        toast.success('Marked')
      } else {
        console.error("Failed to toggle premium status");
      }
    } catch (error) {
      console.error("Error toggling premium status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-xl font-medium text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer/>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <ProjectsTable
        projects={projects}
        deleteProject={deleteProject}
        togglePremium={togglePremium}
      />
    </div>
  );
};

export default Projects;
