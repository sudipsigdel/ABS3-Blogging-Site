import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../components/Navbar";

const Notification = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [notification, setNotification] = useState([]);

  const getNotification = async (e) => {
    const response = await fetch(
      "https://localhost:7124/api/Notification/User",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setNotification(data);
  };
  useEffect(() => {
    getNotification();
  }, []);

  const viewNotification = async (id) => {
    const response = await fetch(
      "https://localhost:7124/api/Notification/UserView?id=" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getNotification();
  };

  const [newNotification, setNewNotification] = useState([]);
  const newNotificationData = async () => {
    const response = await fetch(
      "https://localhost:7124/api/Notification/User",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setNewNotification(data);
  };

  const viewNotificationAll = async () => {
    const response = await fetch(
      "https://localhost:7124/api/Notification/ViewAll",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getNotification();
  };

  useEffect(() => {
    if (!token || role.toLowerCase() !== "user") {
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

  setTimeout(() => {
    newNotificationData();
    if (newNotification.length > notification.length) {
      getNotification();
    }
  }, 10000);

  return (
    <div>
      <Navbar />

      <div className="home-container" style={{ width: "60%" }}>
        <div className="notification">
          <h1>Notifications</h1>
          <button onClick={viewNotificationAll}>Mark all as read</button>
        </div>

        {notification &&
          notification.map((item, index) => (
            <div className="notification-content" key={item}>
              {item.isViewed ? (
                <p> {item.notificationMsg}</p>
              ) : (
                <p
                  onClick={() => {
                    viewNotification(item.id);
                  }}
                  style={{ background: "#dad4d4" }}
                >
                  {item.notificationMsg}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notification;
