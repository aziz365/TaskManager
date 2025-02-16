import AuthForm from "../components/AuthForm";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    console.log(email, password);
    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "LOGIN", payload: data });
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AuthForm title="Login" onSubmit={handleLogin} />
    </div>
  );
}

export default Login;
