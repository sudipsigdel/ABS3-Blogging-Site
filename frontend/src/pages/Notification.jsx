import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Notification = () => {
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
