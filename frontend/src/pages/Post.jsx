import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Post = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG | Create post";
  }, []);

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
          />
          <br />
          <br />
          Image
          <TextField margin="dense" id="name" type="file" fullWidth />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            style={{ marginRight: "1rem", backgroundColor: "#12372a" }}
          >
            Post
          </Button>
        </DialogActions>
      </div>
    </div>
  );
};

export default Post;
