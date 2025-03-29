import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      console.log(response.data);
      
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (err) {
      console.log(err);
      
      setError("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#1E1E2E]">
      <div className="p-6 bg-[#FF5733] text-white px-6 py-3 rounded-lg shadow-[5px_5px_0px_black] transition-all duration-300 w-80">
        <h2 className="text-xl font-bold text-[#007BFF]">Login</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="email"
            className="border p-2 rounded w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            className="border p-2 rounded w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-primary text-white p-2 w-full bg-[#007BFF] px-6 py-3 rounded-lg shadow-[5px_5px_0px_black] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-4 border-white border-t-transparent"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
