import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/style.css";

import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Sidebar>
                  <Menu>
                    <MenuItem> Home </MenuItem>
                    <SubMenu label="Filter">
                      <MenuItem> Random  </MenuItem>
                      <MenuItem> Recent  </MenuItem>
                      <MenuItem> Popular </MenuItem>
                    </SubMenu>
                    <MenuItem> Notification</MenuItem>
                    <MenuItem> Profile </MenuItem>
                    <MenuItem> Logout </MenuItem>
                  </Menu>
                </Sidebar>
                ;
                <Home />
              </>
            }
          />
          <Route path="/welcome" element={<LoginRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
