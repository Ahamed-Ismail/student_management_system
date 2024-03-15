import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserHomePage() {
  const [userid, setUserid] = useState(localStorage.getItem("userid"));
  const [task, setTask] = useState([]);
  const [profile, setProfile] = useState([{userid:"", name:"", email:"", dept:"", batch:""}]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchtask = async () => {
      const res = await axios.get(`http://localhost:8000/db/gettask/${userid}`);
      const taskdata = res.data;

      if (taskdata.res === "ok") {
        setTask(taskdata.data);
      } else {
        toast.error(taskdata.msg);
      }
    };
    
      const fetchprofile = async () => {
        const res = await axios.get(`http://localhost:8000/db/getprofile/${userid}`);
        const taskdata = res.data;
  
        if (taskdata.res === "ok") {
          setProfile(taskdata.data);
        } else {
          toast.error(taskdata.msg);
        }
      ;
    }
    fetchtask();
    fetchprofile();
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const handleFinish = async (index) => {
    const { userid, taskdesc, deadline, status } = task[index];

    const res = await axios.post("http://localhost:8000/db/finishtask", {
      userid,
      taskdesc,
      deadline,
    });
    const resp = res.data;
    if (resp.res === "ok") {
      toast.success(resp.msg);
      window.location.reload();
    } else {
      toast.error(resp.msg);
    }
    task[index].status = 1;
  };

  const handlelogout = () => {
    localStorage.setItem("userid", "");
    navigate("/");
  };
  const handleprofile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex  justify-center items-center flex-col ">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ID: {userid}</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* ------------------------------------------ */}
              <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_3').showModal()}>Profile</button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                     
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Profile</h3>
                  <p className="py-4">Name : {profile[0].name }</p>
                  <p className="py-4">Email : {profile[0].email}</p>
                  <p className="py-4">Department : {profile[0].dept}</p>
                  <p className="py-4">Batch : {profile[0].batch}</p>
                  </div>
                </dialog>
              {/* ---------------------------------- */}
            </li>
            <li></li>
            <li>
              <button className="btn btn-secondary" onClick={handlelogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="overflow-x-auto w-4/5">
        <table className="table ">
          <thead>
            <tr className="bg-base-200">
              <td>Task Description</td>
              <td>Due Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {task.map((details, index) => {
              return (
                <tr key={index}>
                  <td>{details.taskdesc}</td>
                  <td>{details.deadline}</td>
                  <td>
                    {details.status === 0 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleFinish(index)}
                      >
                        Finish
                      </button>
                    ) : (
                      details.status===1?"Completed": "Failed"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserHomePage;
