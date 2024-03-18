import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

function Qrcode() {
  const [userid, setUserid] = useState(localStorage.getItem("userid"));
  const [qrData, setQRData] = useState("");
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.setItem("userid", "");
    navigate("/");
  };

  const goHome = () => {
    navigate("/userhomepage");
  };

  const generateQRCode = () => {
    setQRData(userid);
  };

  return (
    <div className="flex  justify-center items-center flex-col">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ID: {userid}</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button className="btn btn-primary" onClick={goHome}>
                Home
              </button>
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
      <div>
        <button className="btn btn-primary" onClick={generateQRCode}>
          Generate QR Code
        </button>
        {qrData && (
          <div className="mt-6">
            <h2></h2>
            <QRCode value={qrData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Qrcode;
