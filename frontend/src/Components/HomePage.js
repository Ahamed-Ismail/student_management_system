import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row min-h-screen justify-center items-center flex-col">
      <label>
        Student Task Management
        <br />
        Chennai Institute of Technology
        <br />
      </label>

      <div className="flex-row mt-8">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/userlogin")}
        >
          UserLogin
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/adminlogin")}
        >
          AdminLogin
        </button>
      </div>
    </div>
  );
}

export default HomePage;
