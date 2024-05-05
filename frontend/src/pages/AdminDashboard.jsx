import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG | Admin";
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
            <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Month"
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
                    1
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
                    11
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
                    11
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
                    11
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div className="top10">
            <div className="left">
              <h2>Top 10 Blog of all time</h2>
            </div>

            <div className="right">
              <h2>Top 10 Bloggers of all time</h2>
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
                <InputLabel id="demo-simple-select-label">
                  Select Month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Month"
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
            </div>

            <div className="right">
              <h2>Top 10 Bloggers according to month</h2>
              <FormControl
                sx={{ m: 1, minWidth: 150 }}
                size="small"
                style={{ marginLeft: "auto" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Select Month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Month"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
