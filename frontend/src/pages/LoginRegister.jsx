import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const LoginRegister = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openOtp, setOpenOtp] = useState(false);
  const handleOpenOtp = () => {
    setOpenOtp(true);
    handleClose();
  };
  const handleCloseOtp = () => setOpenOtp(false);

  const [openPassword, setOpenPassword] = useState(false);
  const handleOpenPassword = () => {
    setOpenPassword(true);
  };
  const handleClosePassword = () => setOpenPassword(false);

  const [emailReset, setEmailReset] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordReset, setPasswordReset] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    let emailApi = await fetch(
      "https://localhost:7124/api/Email?email=" + emailReset,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
      }
    );

    if (emailApi.status === 200) {
      swal("Email Sent!", {
        icon: "success",
      });
      handleClose();
      handleOpenOtp();
    } else {
      swal("Email Failed!", {
        icon: "error",
      });
    }
  };

  const VerifyCode = async (e) => {
    e.preventDefault();

    let emailApi = await fetch(
      "https://localhost:7124/api/Email?code=" + otp + "&email=" + emailReset,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
      }
    );

    if (emailApi.status === 200) {
      swal("Code Verified!", {
        icon: "success",
      });
      handleCloseOtp();
      handleOpenPassword();
      setOtp("");
    } else {
      swal("Code Failed!", {
        icon: "error",
      });
    }
  };

  const passwordChange = async (e) => {
    e.preventDefault();

    let emailApi = await fetch(
      "https://localhost:7124/api/Email/password?password=" +
        passwordReset +
        "&email=" +
        emailReset,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
      }
    );

    if (emailApi.status === 200) {
      swal("Password Changed!", {
        icon: "success",
      });

      handleClosePassword();
      setOtp("");
      setEmailReset("");
      setPasswordReset("");
    } else {
      swal("Change Failed!", {
        icon: "error",
      });
    }
  };

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
  const [image, setImage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", "User");
    formData.append("ProfileImage", image);

    let registerApi = await fetch("https://localhost:7124/api/User/Register", {
      method: "POST",

      body: formData,
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
      let id = data.id;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);

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
            <p
              style={{
                marginRight: "62%",
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              Upload your Image:
            </p>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => {
                if (e.target.files[0].size > 3 * 1024 * 1024) {
                  swal("Image size should be less than 3MB", {
                    icon: "error",
                  });
                } else {
                  setImage(e.target.files[0]);
                }
              }}
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
            <p onClick={handleOpen} style={{ cursor: "pointer" }}>
              Forget Your Password?
            </p>
            <input type="submit" value="Sign In" />
          </form>
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Enter Email
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                Enter your email address to reset password.
              </Typography>
              <br />
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                value={emailReset}
                onChange={(e) => setEmailReset(e.target.value)}
                fullWidth
              />
              <br />
              <br />
              <Button onClick={sendEmail} style={{ float: "right" }}>
                Submit
              </Button>
            </Box>
          </Modal>

          <Modal
            keepMounted
            open={openOtp}
            onClose={handleCloseOtp}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Enter OTP
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                Enter the OTP that was sent to your email address.
              </Typography>
              <br />
              <TextField
                id="outlined-basic"
                label="OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
              />
              <br />
              <br />
              <Button onClick={VerifyCode} style={{ float: "right" }}>
                Submit
              </Button>
            </Box>
          </Modal>

          <Modal
            keepMounted
            open={openPassword}
            onClose={handleClosePassword}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Enter New Password
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                Enter the new password you want to register.
              </Typography>
              <br />
              <TextField
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                value={passwordReset}
                onChange={(e) => setPasswordReset(e.target.value)}
                fullWidth
              />
              <br />
              <br />
              <Button onClick={passwordChange} style={{ float: "right" }}>
                Submit
              </Button>
            </Box>
          </Modal>
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
