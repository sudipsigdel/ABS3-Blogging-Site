import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../components/Navbar";
import Logo from "../assets/logo.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";

const MyBlogs = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG | My Blogs";
  }, []);

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenDel(false);
  };

  const handleOpen = () => {
    setOpenDel(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Navbar />

      <div className="home-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Blog ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Published on</TableCell>
                <TableCell>Last Edited</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  Id
                </TableCell>
                <TableCell>
                  <img src={Logo} alt="" height={100} />
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleClickOpen()}
                  >
                    Edit
                  </Button>
                  <br />
                  <br />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpen()}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Edit */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
          />
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Fragment>
        <Dialog
          open={openDel}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default MyBlogs;
