import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();

  const handleSignup = async ({ name, email, password }) => {
    try {
      const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Signup Successfull. Please Login to Start managing your tasks.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AuthForm title="Signup" onSubmit={handleSignup} />
    </div>
  );
}

export default Signup;
