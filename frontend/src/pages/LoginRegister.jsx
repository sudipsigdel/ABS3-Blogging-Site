import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (token) {
      if (role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [token]);

  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleForget = () => {
    swal({
      title: "Forget Password",
      text: "Please enter your email:",
      content: "input",
      button: {
        text: "Submit",
        closeModal: false,
      },
    }).then((email) => {
      if (email) {
        swal("Code has been sent to " + email, {
          icon: "success",
          timer: 2000,
        });
        navigate("/reset-password");
      } else {
        swal("Email Required!", {
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    document.title = "ABS3 BLOG | Welcome";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    let registerApi = await fetch("https://localhost:7124/api/User/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },

      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: "User",
      }),
    });

    if (registerApi.status === 200) {
      swal("Registration Successful!", {
        icon: "success",
      });
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } else {
      swal("Registration Failed!", {
        icon: "error",
      });
    }
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let loginApi = await fetch("https://localhost:7124/api/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },

      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    if (loginApi.status === 200) {
      swal("Login Successful!", {
        icon: "success",
      });

      let data = await loginApi.json();

      let token = data.token;
      let role = data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      swal("Login Failed!", {
        icon: "error",
      });
    }
  };

  return (
    <div className="login-signup">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <a href="/">
              <img src={Logo} alt="" srcSet="" width={"250px"} />
            </a>
            <br />
            <h1>Create Account</h1>
            <br />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="submit" value="Sign Up" />
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <a href="/">
              <img src={Logo} alt="" srcSet="" width={"250px"} />
            </a>
            <br />
            <h1>Sign In</h1>
            <br />
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <p onClick={handleForget} style={{ cursor: "pointer" }}>
              Forget Your Password?
            </p>
            <input type="submit" value="Sign In" />
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Existing user?</h1>
              <p>Enter your login details and start blogging.</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>New here?</h1>
              <p>Register with your personal details to get started with us.</p>
              <button
                className="hidden"
                id="register"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
