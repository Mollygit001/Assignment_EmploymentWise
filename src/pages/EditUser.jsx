import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      setSuccess(true);
      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeleting(true);
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      alert("User deleted successfully!");
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
    setDeleting(false);
  };

  if (loading) return <div className="text-center text-xl font-bold text-[#FF5733]">Loading...</div>;

  return (
    <div className="p-8 bg-[#1E1E2E] min-h-screen flex items-center justify-center text-white">
      <div className="bg-[#FFBB33] p-8 rounded-xl shadow-[6px_6px_0px_black] border-4 border-black w-96">
        <h2 className="text-2xl font-bold text-center text-black">Edit User</h2>
        
        <input
          type="text"
          className="border-4 border-black p-3 rounded w-full mb-3 text-black"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        
        <input
          type="text"
          className="border-4 border-black p-3 rounded w-full mb-3 text-black"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        
        <input
          type="text"
          className="border-4 border-black p-3 rounded w-full mb-3 text-black"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <button
          className="w-full bg-[#FF3355] text-white px-4 py-3 rounded-lg shadow-[5px_5px_0px_black] 
                     border-2 border-black transition-all duration-300 
                     hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {success && <p className="text-green-500 text-center mt-4 font-semibold">Updated Successfully!</p>}

        <button
          className="w-full mt-4 bg-[#000] text-white px-4 py-3 rounded-lg shadow-[5px_5px_0px_black] 
                     border-2 border-black transition-all duration-300 
                     hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete User"}
        </button>
      </div>
    </div>
  );
};

export default EditUser;
