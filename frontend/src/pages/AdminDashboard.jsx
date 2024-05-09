import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Sidebar from "../components/Sidebar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/ListItem";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // useEffect(() => {
  //   if (!token || role !== "Admin") {
  //     swal(
  //       "Not Authorized",
  //       "This page is for Admin only",
  //       "error"
  //     );
  //     navigate("/welcome");
  //   }
  // }, [token]);

  useEffect(() => {
    document.title = "ABS3 BLOG | Admin";
  }, []);
  const [selectedMonthStats, setSelectedMonthStats] = useState(0);
  const [selectedMonthTopBlog, setSelectedMonthTopBlog] = useState(1);
  const [selectedMonthTopBlogger, setSelectedMonthTopBlogger] = useState(1);

  const [blog, setBlog] = useState([]);
  const [upvote, setUpvote] = useState([]);
  const [downvote, setDownvote] = useState([]);
  const [comment, setComment] = useState([]);

  const [topBlog, setTopBlog] = useState([]);
  const [topBlogMonth, setTopBlogMonth] = useState([]);
  const [topBlogger, setTopBlogger] = useState([]);
  const [topBloggerMonth, setTopBloggerMonth] = useState([]);

  const listStats = async () => {
    let blogApi = await fetch("https://localhost:7124/api/Admin/Blog", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    let blogs = await blogApi.json();
    setBlog(blogs);

    let upvoteApi = await fetch(
      "https://localhost:7124/api/Admin/GetBlogUpVote",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let upvotes = await upvoteApi.json();
    setUpvote(upvotes);

    let downvoteApi = await fetch(
      "https://localhost:7124/api/Admin/GetBlogDownVote",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let downvotes = await downvoteApi.json();
    setDownvote(downvotes);

    let commentApi = await fetch(
      "https://localhost:7124/api/Admin/GetCommentCount",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let comments = await commentApi.json();
    setComment(comments);
  };

  const listMonthlyStats = async () => {
    let blogMonthApi = await fetch(
      "https://localhost:7124/api/Admin/BlogMonth?id=" + selectedMonthStats,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let blogsMonth = await blogMonthApi.json();
    setBlog(blogsMonth);

    let upvoteMonthApi = await fetch(
      "https://localhost:7124/api/Admin/GetBlogUpVoteMonth?month=" +
        selectedMonthStats,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let upvotesMonth = await upvoteMonthApi.json();
    setUpvote(upvotesMonth);

    let downvoteMonthApi = await fetch(
      "https://localhost:7124/api/Admin/GetBlogDownVoteMonth?month=" +
        selectedMonthStats,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let downvotesMonth = await downvoteMonthApi.json();
    setDownvote(downvotesMonth);

    let commentMonthApi = await fetch(
      "https://localhost:7124/api/Admin/GetCommentCountMonth?month=" +
        selectedMonthStats,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let commentsMonth = await commentMonthApi.json();
    setComment(commentsMonth);
  };

  const listTopBlog = async () => {
    let topBlogApi = await fetch("https://localhost:7124/api/Admin/TopBlog", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    let topBlogs = await topBlogApi.json();
    setTopBlog(topBlogs);

    let topBlogMonthApi = await fetch(
      "https://localhost:7124/api/Admin/TopBlogMonth?month=" +
        selectedMonthTopBlog,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let topBlogsMonth = await topBlogMonthApi.json();
    setTopBlogMonth(topBlogsMonth);

    let topBloggerApi = await fetch(
      "https://localhost:7124/api/Admin/TopUser",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let topBloggers = await topBloggerApi.json();
    setTopBlogger(topBloggers);

    let topBloggerMonthApi = await fetch(
      "https://localhost:7124/api/Admin/TopUserMonth?month=" +
        selectedMonthTopBlogger,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let topBloggersMonth = await topBloggerMonthApi.json();
    setTopBloggerMonth(topBloggersMonth);
  };

  useEffect(() => {
    if (selectedMonthStats === 0) {
      listStats();
    } else {
      listMonthlyStats();
    }
  }, [selectedMonthStats]);

  useEffect(() => {
    listTopBlog();
  }, []);

  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <h1>Stats</h1>
          <FormControl
            sx={{ m: 1, minWidth: 150 }}
            size="small"
            style={{ marginLeft: "auto", marginBottom: "1rem" }}
          >
            <InputLabel>Select Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Select Month"
              value={selectedMonthStats}
              onChange={(e) => setSelectedMonthStats(e.target.value)}
            >
              <MenuItem value={0} defaultChecked>
                All
              </MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>

          <Grid
            container
            spacing={2}
            style={{
              paddingBottom: "2rem",
              borderBottom: "3px solid #e9e6e6",
            }}
          >
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100, bgcolor: "#028A0F" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="white"
                    gutterBottom
                    align="center"
                  >
                    Total Blogs
                  </Typography>

                  <Typography
                    variant="body2"
                    color="white"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    {blog}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100, bgcolor: "#028A0F" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="white"
                    gutterBottom
                    align="center"
                  >
                    Upvotes
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    color="white"
                    align="center"
                  >
                    {upvote}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100, bgcolor: "#028A0F" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="white"
                    gutterBottom
                    align="center"
                  >
                    Downvotes
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    color="white"
                    align="center"
                  >
                    {downvote}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100, bgcolor: "#028A0F" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="white"
                    gutterBottom
                    align="center"
                  >
                    Comments
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    color="white"
                    align="center"
                  >
                    {comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div className="top10">
            <div className="left">
              <h2>Top 10 Blog of all time</h2>
              <br />
              <Stack spacing={2}>
                {topBlog.map((blog, index) => (
                  <Item key={index}>
                    {blog.title} - {blog.score}
                  </Item>
                ))}
              </Stack>
            </div>

            <div className="right">
              <h2>Top 10 Bloggers of all time</h2>
              <br />
              <Stack spacing={2}>
                {topBlogger.map((blogger, index) => (
                  <Item key={index}>
                    {blogger.userName} - {blogger.totalBlogScore}
                  </Item>
                ))}
              </Stack>
            </div>
          </div>

          <div
            className="top10"
            style={{
              borderBottom: "none",
            }}
          >
            <div className="left">
              <h2>Top 10 Blog according to month</h2>
              <FormControl
                sx={{ m: 1, minWidth: 150 }}
                size="small"
                style={{ marginLeft: "auto" }}
              >
                <InputLabel>Select Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Select Month"
                  value={selectedMonthTopBlog}
                  onChange={(e) => setSelectedMonthTopBlog(e.target.value)}
                >
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
              <br />
              <Stack spacing={2}>
                {topBlogMonth.length > 0 ? (
                  topBlogMonth.map((blog, index) => (
                    <Item key={index}>
                      {blog.title} - {blog.score}
                    </Item>
                  ))
                ) : (
                  <Item>No data found</Item>
                )}
              </Stack>
            </div>

            <div className="right">
              <h2>Top 10 Bloggers according to month</h2>
              <FormControl
                sx={{ m: 1, minWidth: 150 }}
                size="small"
                style={{ marginLeft: "auto" }}
              >
                <InputLabel>Select Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Select Month"
                  value={selectedMonthTopBlogger}
                  onChange={(e) => setSelectedMonthTopBlogger(e.target.value)}
                >
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
              <br />
              <Stack spacing={2}>
                {topBloggerMonth.length > 0 ? (
                  topBloggerMonth.map((blogger, index) => (
                    <Item key={index}>
                      {blogger.userName} - {blogger.totalBlogScore}
                    </Item>
                  ))
                ) : (
                  <Item>No data found</Item>
                )}
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
