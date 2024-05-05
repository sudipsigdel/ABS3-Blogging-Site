import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/logo.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import swal from "sweetalert";

const AdminUsers = () => {
  const openAdd = () => {
    swal({
      title: "Add Admin",
      text: "Enter email of user you want to add as admin",
      content: {
        element: "input",
        attributes: {
          placeholder: "Email",
        },
      },
    });
  };

  useEffect(() => {
    document.title = "ABS3 BLOG | Users";
  }, []);
  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <Button
            variant="contained"
            style={{ marginLeft: "90%", backgroundColor: "#12372a" }}
            onClick={openAdd}
          >
            Add Admin
          </Button>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
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
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
