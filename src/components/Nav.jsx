import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Actions/User';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/auth/signin');
  };
  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ul className="flex space-x-6">
          <li><a href="/admin/stats" className="hover:text-blue-400">Stats</a></li>
          <li><a href="/admin/users" className="hover:text-blue-400">Users</a></li>
          <li><a href="/admin/projects" className="hover:text-blue-400">Projects</a></li>
        </ul>
        <a onClick={handleLogout} className="hover:text-blue-50 cursor-pointer no-underline">Sign Out</a>
      </div>
    </nav>
  );
};

export default Nav;
