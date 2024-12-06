import User from "../pages/User";
const UsersTable = ({ users = [], deleteUser }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl rounded-lg">
        <thead className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
          <tr>
            <th className="px-6 py-3 uppercase font-semibold text-sm tracking-wider">Name</th>
            <th className="px-6 py-3 uppercase font-semibold text-sm tracking-wider">Email</th>
            <th className="px-6 py-3 uppercase font-semibold text-sm tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800 divide-y divide-gray-300">
          {users.length > 0 ? ( 
            users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 transition duration-300">
                <td className="px-6 py-4 font-medium"><User id={user?._id} /></td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500 font-medium">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
