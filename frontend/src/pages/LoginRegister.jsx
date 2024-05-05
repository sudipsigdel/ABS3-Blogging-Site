import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

import swal from "sweetalert";

const LoginRegister = () => {
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
    })
      .then((email) => {
        if (!email) throw null;

        // TODO: Send email to user with code

        return swal({
          title: "Enter the code",
          text: `Please enter the code sent to ${email}`,
          content: "input",
          button: {
            text: "Verify",
            closeModal: false,
          },
        });
      })
      .then((code) => {
        if (!code) throw null;

        // TODO: Verify the code
        

        swal("Success", "Your new password is `changeasap`", "success");
      })
      .catch((err) => {
        if (err) {
          swal("Oh no!", "The request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  useEffect(() => {
    document.title = "ABS3 BLOG | Welcome";
  }, []);

  return (
    <div className="login-signup">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <a href="/">
              <img src={Logo} alt="" srcset="" width={"250px"} />
            </a>
            <br />
            <h1>Create Account</h1>
            <br />
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone" name="" id="" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button>Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <a href="/">
              <img src={Logo} alt="" srcset="" width={"250px"} />
            </a>
            <br />
            <h1>Sign In</h1>
            <br />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <p onClick={handleForget} style={{ cursor: "pointer" }}>
              Forget Your Password?
            </p>
            <button>Sign In</button>
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
