import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import swal from "sweetalert";

const Profile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role.toLowerCase() !== "user") {
      swal(
        "Not Authorized",
        "You are not authorized to visit profile page",
        "error"
      );
      navigate("/welcome");
    }
  }, [token]);

  useEffect(() => {
    document.title = "ABS3 BLOG | Profile";
  }, []);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpenEdit = () => setOpenEdit(true);

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  // const handleDelete = () => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, there is no way back!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       swal("Poof! Your account has been deleted!", {
  //         icon: "success",
  //       });
  //     }
  //   });
  // };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [profileData, setProfileData] = useState([]);

  const profileDetails = async (e) => {
    const response = await fetch(
      "https://localhost:7124/api/User/GetCurrentUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setProfileData(data);
    console.log(data);

    setName(data.name);
    setEmail(data.email);
    setPhone(data.phone);
  };
  useEffect(() => {
    if (token) {
      profileDetails();
    }
  }, []);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://localhost:7124/api/User/UserProfilePassword?currentPassword=" +
        password +
        "&newPassword=" +
        newPassword,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      swal("Success", "Password Changed Successfully", "success");
      handleClose();
      setPassword("");
      setNewPassword("");
    } else {
      swal("Error", "Unable to change password", "error");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://localhost:7124/api/User?email=" +
        email +
        "&phone=" +
        phone +
        "&name=" +
        name,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      swal("Success", "Profile updated", "success");
      handleClose();
      profileDetails();
    } else {
      swal("Error", "Unable to update profile", "error");
    }
  };

  const deleteProfile = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://localhost:7124/api/User/DeleteProfile",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      swal("Deleted", "Deleted Successfully", "success");
      localStorage.clear();
      navigate("/welcome");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  return (
    <div>
      <Navbar />
      <div class="profile-container">
        <div className="profile-header">
          <div className="profile-header-image">
            {profileData.imagePath && (
              <img
                src={`https://localhost:7124/${profileData.imagePath.slice(
                  profileData.imagePath.indexOf("uploads")
                )}`}
                alt="profile"
              />
            )}
          </div>
          <h3>Welcome {profileData.name}</h3>
        </div>

        <div className="profile-details">
          <div className="profile-details-row">
            <p>Name</p>
            <p>{profileData.name}</p>
          </div>
          <div className="profile-details-row">
            <p>Email</p>
            <p>{profileData.email}</p>
          </div>
          <div className="profile-details-row">
            <p>Phone</p>
            <p>{profileData.phone}</p>
          </div>
          <div
            className="profile-details-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button onClick={handleOpen}>Change Password</button>
            <button onClick={handleOpenEdit}>Edit Profile</button>
            <button
              style={{
                backgroundColor: "red",
              }}
              onClick={deleteProfile}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          <br />
          <TextField
            id="outlined-basic"
            label="Old Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={changePassword}
              autoFocus
            >
              Change Password
            </Button>
          </DialogActions>
        </Box>
      </Modal>

      {/* Edit profile */}
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit profile
          </Typography>
          <br />

          <TextField
            id="outlined-basic"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={updateProfile}
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
