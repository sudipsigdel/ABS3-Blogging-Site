import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../components/Navbar";

const Notification = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "User") {
      swal(
        "Not Authorized",
        "You are not authorized to see notifications",
        "error"
      );
      navigate("/welcome");
    }
  }, [token]);

  useEffect(() => {
    document.title = "ABS3 BLOG | Notifications";
  }, []);

  return (
    <div>
      <Navbar />

      <div className="home-container" style={{ width: "60%" }}>
        <div className="notification">
          <h1>Notifications</h1>
          <button>Mark all as read</button>
        </div>

        <div className="notification-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            facilis quod minima eos? Ex nesciunt sunt quidem officiis sapiente,
            quisquam error, assumenda libero aspernatur voluptates quae itaque
            alias voluptate optio!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            facilis quod minima eos? Ex nesciunt sunt quidem officiis sapiente,
            quisquam error, assumenda libero aspernatur voluptates quae itaque
            alias voluptate optio!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            facilis quod minima eos? Ex nesciunt sunt quidem officiis sapiente,
            quisquam error, assumenda libero aspernatur voluptates quae itaque
            alias voluptate optio!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
