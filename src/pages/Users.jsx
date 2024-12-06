import React, { useState, useEffect } from "react";
import UsersTable from "../components/UsersTable";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling any error

  const api = axios.create({
    baseURL: "http://localhost:5000/api/admin",
    withCredentials: true,
  });

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        if (response.data.success) {
          setUsers(response.data.users); 
        } else {
          setError("Failed to fetch users");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  },  []); 

  // Delete user handler
  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id)); // Filter out the deleted user
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something went wrong
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <UsersTable users={users} deleteUser={deleteUser} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Users;
