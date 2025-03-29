import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=1")
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeletingId(id);
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error(error);
    }
    setDeletingId(null);
  };

  return (
    <div className="p-8 bg-[#1E1E2E] min-h-screen text-white">
      <h2 className="text-3xl font-extrabold mb-6 text-[#FFBB33] text-center">User List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="bg-[#FF3355] p-6 rounded-xl shadow-[6px_6px_0px_black] 
                      border-4 border-black hover:translate-x-[4px] hover:translate-y-[4px] 
                      transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.avatar} alt="User" className="w-20 h-20 rounded-full mb-3 mx-auto border-4 border-black" />
            <h3 className="text-xl font-bold text-center">{user.first_name} {user.last_name}</h3>
            <p className="text-center text-sm text-gray-200">{user.email}</p>

            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 bg-[#222] text-white px-4 py-2 rounded-lg 
                           shadow-[4px_4px_0px_black] border-2 border-white 
                           transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit/${user.id}`);
                }}
              >
                Edit
              </button>

              <button
                className="flex-1 bg-black text-white px-4 py-2 rounded-lg 
                           shadow-[4px_4px_0px_black] border-2 border-white 
                           transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(user.id);
                }}
                disabled={deletingId === user.id}
              >
                {deletingId === user.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Window for User Details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#FFBB33] text-black p-8 rounded-xl shadow-[8px_8px_0px_black] 
                          border-4 border-black w-96 relative">
            <button 
              className="absolute top-3 right-3 text-black bg-white px-3 py-1 rounded-full 
                         shadow-[3px_3px_0px_black] border-2 border-black hover:translate-x-[1px] 
                         hover:translate-y-[1px] transition-all"
              onClick={() => setSelectedUser(null)}
            >
              ✕
            </button>
            <img src={selectedUser.avatar} alt="User" className="w-24 h-24 mx-auto rounded-full border-4 border-black" />
            <h3 className="text-2xl font-bold text-center mt-4">{selectedUser.first_name} {selectedUser.last_name}</h3>
            <p className="text-center text-lg font-semibold mt-2">{selectedUser.email}</p>
            <p className="text-center text-gray-800 mt-2">ID: {selectedUser.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
