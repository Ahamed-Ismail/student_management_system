import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminlogin = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/auth/adminlogin", {
      username,
      password,
    });
    const data = result.data;
    if (data.res === "ok") {
      console.log("OK");
      toast.success(data.msg);
      setTimeout(() => {
        navigate("/adminhomepage");
        localStorage.setItem("username", "admin");
      }, 2500);
    } else {
      console.log("NO");
      toast.error(data.msg);
    }
  };
  return (
    <div className="flex  justify-center items-center flex-col">
      
      
      <form onSubmit={handleAdminlogin}>
        <div className="flex  min-h-screen justify-center items-center flex-col">
        <label className="mb-6">Admin Login</label>
          <input
            className="mb-6 input input-bordered w-full max-w-xs"
            required
            placeholder="username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="mb-6 input input-bordered w-full max-w-xs"
            required
            placeholder="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-active btn-primary" type="submit">Login</button>
          </div>
        </form>


      <ToastContainer />
    </div>
  );
}

export default AdminLoginPage;
