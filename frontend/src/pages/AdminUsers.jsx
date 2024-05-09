import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

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
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role.toLowerCase() !== "admin") {
      swal("Not Authorized", "This page is for Admin only", "error");
      navigate("/welcome");
    }
  }, [token]);

  useEffect(() => {
    document.title = "ABS3 BLOG | Users";
  }, []);

  const addAdmin = async (email) => {
    console.log(email);
    let adminApi = await fetch(
      `https://localhost:7124/api/Admin/RoleUpdate?email=${email}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(adminApi);

    if (adminApi.status === 200) {
      swal({
        title: "Success",
        text: "User has been added as admin",
        icon: "success",
      });
    } else {
      swal({
        title: "Error",
        text: "User not found",
        icon: "error",
      });
    }
    setRefresh((refresh) => !refresh);
  };

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
    }).then((email) => {
      if (!email) {
        swal({
          title: "Error",
          text: "Email cannot be empty",
          icon: "error",
        });
      } else {
        addAdmin(email);
      }
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
  }, [refresh]);

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
          <TableContainer component={Paper} style={{ marginBottom: "2rem" }}>
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
                      {user.imagePath && (
                        <img
                          src={`https://localhost:7124/${user.imagePath.slice(
                            user.imagePath.indexOf("uploads")
                          )}`}
                          alt="user"
                          style={{ width: "auto", height: "100px" }}
                        />
                      )}
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
