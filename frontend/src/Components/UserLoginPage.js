import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLoginPage() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/auth/userlogin", { userid, password });
    const data = result.data;
    if (data.res === "ok") {
      console.log("OK");
      toast.success(data.msg);
      setTimeout(() => {
        navigate("/userhomepage");
        localStorage.setItem("userid", userid);
      }, 2500);
    } else {
      console.log("NO");
      toast.error(data.msg);
    }
  };
  return (
    <div>
      <form onSubmit={handleUserLogin}>
      <div className="flex  min-h-screen justify-center items-center flex-col">
        <label className='mb-6'>User Login</label>

          <input
            className="mb-6 input input-bordered w-full max-w-xs"
          required
          placeholder="username"
          type="text"
          id="username"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
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

export default UserLoginPage