import React from "react";
import { Link } from "react-router-dom";
import User from "../pages/User";
const ProjectsTable = ({ projects, deleteProject, togglePremium }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl rounded-lg">
        <thead className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
          <tr>
            <th className="px-6 py-3 uppercase font-semibold text-sm tracking-wider">Name</th>
            <th className="px-6 py-3 uppercase font-semibold text-sm tracking-wider">Owner</th>
            <th className="px-6 py-3 uppercase font-semibold text-sm tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800 divide-y divide-gray-300">
          {projects.map((project) => (
            <tr key={project._id} className="hover:bg-gray-100 transition duration-300">
              <td className="px-4 py-2 font-medium">
                <Link
                  to={`/details/project/${project._id}`}
                  className="inline-flex items-center"
                >{project.name}
                </Link>
              </td>
              <td className="px-4 py-2"><User id={project.owner} /></td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => togglePremium(project._id)}
                  className={`px-4 py-1 rounded ${project.premium ? "bg-green-500" : "bg-gray-500"
                    } text-white`}
                >
                  {project.premium ? "Premium" : "Make Premium"}
                </button>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;

