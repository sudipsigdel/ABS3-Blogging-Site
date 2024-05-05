import React, { useState, Fragment } from "react";
import Logo from "../assets/logo.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MailIcon from "@mui/icons-material/Mail";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [count, setCount] = useState("");

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

      <div class="right">
        <a href="/notification">
          <Badge color="error" badgeContent={count} variant="dot">
            <i class="fa fa-bell"></i>
          </Badge>
        </a>

        <div class="dropdown">
          <i
            class="fa fa-user dropdown-toggle"
            id="profileDropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></i>
          <div class="dropdown-menu" aria-labelledby="profileDropdown">
            <a class="dropdown-item" href="/profile">
              Profile
            </a>
            <a class="dropdown-item" href="/blogs">
              My Blogs
            </a>
            <a class="dropdown-item" href="/admin">
              Admin
            </a>
            <hr />
            <a class="dropdown-item" href="/welcome">
              Login
            </a>
            <div class="dropdown-item" onClick={handleOpen}>
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
            <Button>Yes</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </nav>
  );
};

export default Navbar;
