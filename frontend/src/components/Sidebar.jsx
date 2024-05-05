import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/tlogo.png";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Sidebar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-top-logo">
            <a href="/admin">
              <img src={Logo} alt="Travel Buddy" />
            </a>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-menu">
            <ul>
              <li>
                <NavLink to="/admin">
                  <i className="fa-solid fa-home" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-users">
                  <i className="fa-solid fa-users" /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-blogs">
                  <i className="fa-solid fa-location-crosshairs" /> Blogs
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sidebar-bottom-logout">
            <button onClick={handleOpen}>
              <i className="fas fa-sign-out" /> Sign Out
            </button>
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
            <Button autoFocus onClick={handleClose}>
              No
            </Button>
            <Button autoFocus>Yes</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </>
  );
};

export default Sidebar;
