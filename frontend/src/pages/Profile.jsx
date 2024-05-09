import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Logo from "../assets/logo.png";

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
    if (!token || role !== "User") {
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

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, there is no way back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your account has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
            <img src={Logo} alt="profile" />
          </div>
          <h3>Welcome Sudip</h3>
        </div>

        <div className="profile-details">
          <div className="profile-details-row">
            <p>Name</p>
            <p>Sudip</p>
          </div>
          <div className="profile-details-row">
            <p>Email</p>
            <p>hello@sudipsigdel.com.np</p>
          </div>
          <div className="profile-details-row">
            <p>Phone</p>
            <p>+977 9800000000</p>
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
              onClick={handleDelete}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" color="success" autoFocus>
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
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" color="success" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
