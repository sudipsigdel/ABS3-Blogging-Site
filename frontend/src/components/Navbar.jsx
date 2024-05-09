import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Badge from "@mui/material/Badge";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [count, setCount] = useState("");

  const logout = async () => {
    localStorage.clear();
    swal("Logout Successfully", {
      icon: "success",
      timer: 2000,
    });
    handleClose();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="left">
        <a href="/">
          <img src={Logo} alt="logo" />
        </a>
      </div>

      <div className="center">
        <input type="text" placeholder="Search here" />
      </div>

      <div className="right">
        <a href="/notification">
          <Badge color="error" badgeContent={count} variant="dot">
            <i className="fa fa-bell"></i>
          </Badge>
        </a>

        <div className="dropdown">
          <i
            className="fa fa-user dropdown-toggle"
            id="profileDropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></i>
          <div className="dropdown-menu" aria-labelledby="profileDropdown">
            <a className="dropdown-item" href="/profile">
              Profile
            </a>
            <a className="dropdown-item" href="/blogs">
              My Blogs
            </a>
            <a className="dropdown-item" href="/admin">
              Admin
            </a>
            <hr />
            <a className="dropdown-item" href="/welcome">
              Login
            </a>
            <div className="dropdown-item" onClick={handleOpen}>
              Logout
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Log Out?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={logout}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </nav>
  );
};

export default Navbar;
