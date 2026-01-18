import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthForm = ({ title, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };
  const redirect = (path) => {
    navigate(path);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {title === "Signup" && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {title === "Login" ? "Login" : "Signup"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => redirect(title === "Login" ? "/signup" : "/login")}
          className="mt-4 w-full bg-gray-300 text-blue-600 py-3 rounded-lg font-medium hover:bg-gray-400 transition"
        >
          {title === "Login" ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default AuthForm;
