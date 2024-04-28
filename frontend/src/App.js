import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/style.css";

import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar /> <Home />
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
