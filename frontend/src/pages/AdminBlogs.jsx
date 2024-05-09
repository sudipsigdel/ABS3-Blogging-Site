import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/logo.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AdminBlogs = () => {
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
    document.title = "ABS3 BLOG | Blogs";
  }, []);

  const [blogList, setBlogList] = useState([]);

  const listBlogs = async () => {
    let blogApi = await fetch("https://localhost:7124/api/Blog/GetBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let blogs = await blogApi.json();

    if (blogs.length > 0) {
      setBlogList(blogs);
    }
  };

  useEffect(() => {
    listBlogs();
  }, []);

  console.log(blogList);

  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <TableContainer component={Paper} style={{marginBottom: "2rem"}}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Blog ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Published on</TableCell>
                  <TableCell>Last Edited</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Upvotes</TableCell>
                  <TableCell>Downvotes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogList.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>{blog.id}</TableCell>
                    <TableCell>
                      <img
                        src={blog.imagePath}
                        alt="Blog Cover"
                        style={{ width: "100px" }}
                      />
                    </TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>
                      {new Date(blog.createdAt)
                        .toISOString()
                        .split(".")[0]
                        .split("T")
                        .map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}
                    </TableCell>
                    <TableCell>
                      {blog.updatedAt === null
                        ? "Not edited"
                        : new Date(blog.updatedAt)
                            .toISOString()
                            .split(".")[0]
                            .split("T")
                            .map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                    </TableCell>
                    <TableCell>{blog.userName}</TableCell>
                    <TableCell>{blog.upVoteCount}</TableCell>
                    <TableCell>{blog.downVoteCount}</TableCell>
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

export default AdminBlogs;
