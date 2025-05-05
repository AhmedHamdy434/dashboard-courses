import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please Enter valid email and password");
      return;
    }
    localStorage.setItem("email", email);
    navigate("/courses");
  };

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[500px] rounded-lg bg-gray-800 p-6">
        <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="email">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your email"
            />
          </div>
          <div className="password">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your password"
            />
          </div>
          {error ? (
            <p className="min-h-[20px] mb-4 text-sm text-red-500">{error}</p>
          ) : (
            <div className="min-h-[20px]"></div>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-main px-4 py-2 hover:opacity-60 transition-all duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
