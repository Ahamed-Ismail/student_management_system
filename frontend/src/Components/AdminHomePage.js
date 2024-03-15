import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminHomePage() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [useridsearch, setuseridsearch] = useState("");
  const [statussearch, setstatussearch] = useState("");
  const [deadlineSearch, setDeadlineSearch] = useState("");

  const [adduserid, setAdduserid] = useState("");
  const [addtask, setAddtask] = useState("");
  const [addDeadline, setAdddeadline] = useState("");

  const [userid, setUserid] = useState("");
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("");
  const [batch, setBatch] = useState("");




  const [originalData, setOriginaldata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`http://localhost:8000/db/getalltask`);
      const taskdata = res.data;

      if (taskdata.res === "ok") {
        setData(taskdata.data);
        setOriginaldata(taskdata.data);
      } else {
        toast.error(taskdata.msg);
      }
    };
    fetchdata();
  }, []);

  // useEffect(() => {
  //   console.log(deadlineSearch);
  // }, [deadlineSearch]);

  const handlelogout = () => {
    navigate("/");
  };

  const handlesearch = () => {};

  const handledelete = async(index) => {
    const { userid, taskdesc, deadline, status } = data[index];
    const res =await axios.post("http://localhost:8000/db/deletetask", {
      userid,
      taskdesc,
      deadline,
      status,
    });
    const resp = res.data;
    if (resp.res === "ok") {
      toast.success(resp.msg,{
        onClose: () => {
          window.location.reload();
        }
      });
    } else {
      toast.error(resp.msg);
    }
  };

  const handlefilter = () => {
    const resdata = data.filter(
      (item) =>
        item.userid.toLowerCase() === useridsearch.toLowerCase() ||
        item.deadline.toLowerCase() === deadlineSearch.toLowerCase() ||
        (statussearch != ""
          ? item.status.toString() === statussearch.toString()
          : false)
    );
    setData(resdata);
    console.log(resdata);
  };

  const handlereset = () => {
    setData(originalData);
    setDeadlineSearch("");
    setstatussearch("");
    setuseridsearch("");
  };

  const handleaddtask = async () => {
    const res =await axios.post("http://localhost:8000/db/addtask", {
      adduserid,
      addtask,
      addDeadline,
    });
    const resp = res.data;
    if (resp.res === 'ok') {
      toast.success(resp.msg, {
        onClose: () => {
          window.location.reload();
        }
      })
    }
    else {
      toast.error(resp.msg);
    }
  }

  const handleadduser = async () => {
    const res=await axios.post("http://localhost:8000/auth/adduser", {
      userid, password, name, email, dept, batch
    });
    const resp = res.data;
    if (resp.res === 'ok') {
      toast.success(resp.msg);
    }
    else {
      toast.error(resp.msg);
    }
  }

  return (
    <div className="flex  justify-center items-center flex-col">
      <ToastContainer />
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Welcome: Admin</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button className="btn btn-secondary" onClick={handlelogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-6 w-4/5 flex  justify-center items-center flex-row">
        <input
          className=" input input-bordered w-full max-w-xs"
          placeholder="userid"
          type="text"
          value={useridsearch}
          onChange={(e) => setuseridsearch(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          type="date"
          value={deadlineSearch}
          onChange={(e) => setDeadlineSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={statussearch}
          onChange={(e) => setstatussearch(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="0">Pending</option>
          <option value="1">Completed</option>
        </select>
        <button className="btn btn-active btn-neutral" onClick={handlefilter}>
          Filter
        </button>
        <button className="btn btn-active btn-neutral" onClick={handlereset}>
          Reset
        </button>
      </div>
      <div className="overflow-x-auto w-4/5">
        <table className="table table-sm">
          <thead>
            <tr className="bg-base-200">
              <td>User ID</td>
              <td>Task Description</td>
              <td>Due Date</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data.map((details, index) => {
              return (
                <tr key={index}>
                  <td>{details.userid}</td>
                  <td>{details.taskdesc}</td>
                  <td>{details.deadline}</td>
                  <td>{details.status === 0 ? "Pending" : details.status===1?"Completed":"Failed"}</td>
                  <td>
                    <button
                      className="btn btn-accent"
                      onClick={() => handledelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 mb-6 w-4/5 flex  justify-center items-center flex-row">
        <input
          className=" input input-bordered w-full max-w-xs"
          placeholder="userid"
          type="text"
          value={adduserid}
          onChange={(e) => setAdduserid(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          placeholder="task"
          type="text"
          value={addtask}
          onChange={(e) => setAddtask(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          type="date"
          value={addDeadline}
          onChange={(e) => setAdddeadline(e.target.value)}
        />
        <button className="btn btn-active btn-neutral" onClick={handleaddtask}>
          Add Task
        </button>
      </div>
      <div className=" mb-6 w-4/5 flex  justify-center items-center flex-row">
        <input
          className=" input input-bordered w-full max-w-xs"
          placeholder="userid"
          type="text"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          type="text"
          placeholder="dept"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />
        <input
          className=" input input-bordered w-full max-w-xs"
          type="text"
          placeholder="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        <button className="btn btn-active btn-neutral" onClick={handleadduser}>
          Add User
        </button>
      </div>
    </div>
  );
}

export default AdminHomePage;
