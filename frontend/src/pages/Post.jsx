import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { MenuItem, Select } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import swal from "sweetalert";

const Post = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role.toLowerCase() !== "user") {
      swal(
        "Not Authorized",
        "You are not authorized to post",
        "error"
      );
      navigate("/welcome");
    }
  }, [token]);

  useEffect(() => {
    document.title = "ABS3 BLOG | Create post";
  }, []);

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [BlogImage, setBlogImage] = useState("");
  const [Category, setCategory] = useState(0);

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Content", Content);
    formData.append("Category", Category);
    formData.append("BlogImage", BlogImage);

    let postApi = await fetch("https://localhost:7124/api/Blog/UploadBlog", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });

    if (postApi.status === 200) {
      swal("Posted successfully", {
        icon: "success",
      });
      navigate("/");
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
        <h1>Create Post</h1>

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
            <MenuItem value="0" disabled>Select a category</MenuItem>
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
            variant="contained"
            style={{ marginRight: "1rem", backgroundColor: "#12372a" }}
            onClick={handlePost}
          >
            Post
          </Button>
        </DialogActions>
      </div>
    </div>
  );
};

export default Post;
