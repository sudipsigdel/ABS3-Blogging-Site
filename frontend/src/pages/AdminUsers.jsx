import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // useEffect(() => {
  //   if (!token || role !== "Admin") {
  //     swal("Not Authorized", "This page is for Admin only", "error");
  //     navigate("/welcome");
  //   }
  // }, [token]);

  useEffect(() => {
    document.title = "ABS3 BLOG | Users";
  }, []);

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

  const [userList, setUserList] = useState([]);

  const listUsers = async () => {
    let userApi = await fetch("https://localhost:7124/api/User", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let users = await userApi.json();

    if (users.length > 0) {
      setUserList(users);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  console.log(userList);

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
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    key={user.id}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell>
                      <img
                        src={
                          user.image
                            ? `https://localhost:7124/${user.image}`
                            : Logo
                        }
                        alt=""
                        height={100}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
