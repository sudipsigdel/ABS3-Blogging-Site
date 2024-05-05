import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
          <Grid container spacing={2}>
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                  >
                    Total Blogs
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    1
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                  >
                    Upvotes
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    11
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                  >
                    Downvotes
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    11
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2} md={3}>
              <Card sx={{ minWidth: 100 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                  >
                    Comments
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    11
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
