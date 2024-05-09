import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../components/Navbar";

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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const MyBlogs = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!token || role.toLowerCase() !== "user") {
      swal(
        "Not Authorized",
        "You are not authorized to see your blogs without login",
        "error"
      );
      navigate("/welcome");
    }
  }, [token]);

  useEffect(() => {
    document.title = "ABS3 BLOG | My Blogs";
  }, []);

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenDel(false);
  };

  const handleOpen = (blog) => {
    setOpenDel(true);
    setSelectedBlog(blog);
  };

  const handleClickOpen = (blog) => {
    setOpen(true);
    setSelectedBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setCategory(blog.category);
  };

  const [blogList, setBlogList] = useState([]);

  const listBlogs = async () => {
    let blogApi = await fetch("https://localhost:7124/api/Blog/GetUserBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let blogs = await blogApi.json();

    if (blogs.length > 0) {
      setBlogList(blogs);
    }
  };

  useEffect(() => {
    if (token) {
      listBlogs();
    }
  }, [refresh]);

  console.log(blogList);

  // Edit
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [BlogImage, setBlogImage] = useState("");
  const [Category, setCategory] = useState(0);

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Content", Content);
    formData.append("Category", Category);
    formData.append("BlogImage", BlogImage);

    let postApi = await fetch(
      `https://localhost:7124/api/Blog/edit/${selectedBlog.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      }
    );

    if (postApi.status === 200) {
      swal("Updated successfully", {
        icon: "success",
      });
      setRefresh((refresh) => !refresh);
      handleClose();
      setTitle("");
      setContent("");
      setCategory(0);
      setBlogImage("");
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    let deleteApi = await fetch(
      `https://localhost:7124/api/Blog/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (deleteApi.status === 200) {
      swal("Deleted successfully", {
        icon: "success",
      });
      setRefresh((refresh) => !refresh);
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
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
                <TableCell>Category</TableCell>
                <TableCell>Published on</TableCell>
                <TableCell>Last Edited</TableCell>
                <TableCell>Upvotes</TableCell>
                <TableCell>Downvotes</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogList.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.id}</TableCell>
                  <TableCell>
                    <img
                      src={`https://localhost:7124/${blog.imagePath.slice(
                        blog.imagePath.indexOf("uploads")
                      )}`}
                      alt={blog.title}
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
                          .map((item, index) => <div key={index}>{item}</div>)}
                  </TableCell>
                  <TableCell>{blog.upVoteCount}</TableCell>
                  <TableCell>{blog.downVoteCount}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleClickOpen(blog)}
                    >
                      Edit
                    </Button>
                    <br />
                    <br />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpen(blog)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            margin="dense"
            id="name"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={6}
            value={Content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <br />
          Image
          <TextField
            margin="dense"
            id="name"
            type="file"
            fullWidth
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
          <br />
          <br />
          Category
          <br />
          <br />
          <Select
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="0" disabled>
              Select a category
            </MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Politics">Politics</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            variant="contained"
            style={{ marginRight: "1rem", backgroundColor: "green" }}
          >
            Save
          </Button>
        </DialogActions>
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
                handleDelete(selectedBlog.id);
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
