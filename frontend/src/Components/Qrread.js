import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from 'axios';
import { QrReader } from "react-qr-reader";

function Qrread() {
  const navigate = useNavigate();

  const [scannedData, setScannedData] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    return () => {
      const res = axios.post('http://localhost:8000/db/addattendence', { scannedData });
      const d = res.data;
      if (d.res === 'ok') {
        toast.success('d.msg');
      }
      else {
        toast.error(d.msg);
      }
    };
  }, [scannedData]);

    const startCamera = () => {
        console.log("Starting camera...");
      
    setIsCameraActive(true);
  };

    const stopCamera = () => {
        console.log("Stopping camera...");
        setIsCameraActive(false);
        if (webcamRef.current) {
            const videoTracks = webcamRef.current.video.srcObject.getVideoTracks();
            console.log("Video tracks:", videoTracks);
            const videoTrack = videoTracks[0];
            console.log("Video track:", videoTrack);
            if (videoTrack) {
                console.log("Stopping video track...");
                videoTrack.stop();
            }
        };
    }

  const handleScan = (data) => {
    if (data) {
      setScannedData(data.text);
      console.log(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const handleLogout = () => {
    stopCamera();
    navigate("/");
  };

  const goHome = () => {
    stopCamera();
    navigate("/userhomepage");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <ToastContainer />
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Welcome: Admin</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button
                className="btn btn-secondary"
                onClick={goHome}
              >
                Home
              </button>
            </li>
            <li>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <button className="btn btn-primary" onClick={toggleCamera}>
          {isCameraActive ? "Turn Camera Off" : "Turn Camera On"}
        </button>
        {isCameraActive && (
          <QrReader
            ref={webcamRef}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            className="w-full max-w-md"
          />
        )}
        <div className="mt-4">
          {scannedData ? (
            <p>{scannedData}</p>
          ) : (
            <p className="text-gray-500">Scanning...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Qrread
