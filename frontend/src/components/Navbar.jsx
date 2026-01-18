import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
function Navbar() {
  const { token, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="fixed top-0 w-full shadow-md z-50 bg-blue-400 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <ul className="flex space-x-4 text-lg">
          <li>
            <Link to="/" className="hover:underline ">
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
