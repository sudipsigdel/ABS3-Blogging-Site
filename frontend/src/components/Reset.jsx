import React, { useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const nav = useNavigate();

  const resetPassword = () => {
    swal({
      title: "ENTER OTP",
      text: "Please enter OTP sent to your email:",
      content: "input",
      button: {
        text: "Submit",
        closeModal: false,
      },
    }).then((otp) => {
      if (otp) {
        if (otp === "1234") {
          swal({
            title: "Reset your Password",
            text: "Please add your new password:",
            content: "input",
            button: {
              text: "Submit",
              closeModal: false,
            },
          }).then((password) => {
            if (password) {
              swal("Password Changed Successfully!", {
                icon: "success",
                timer: 1000,
              });
              setTimeout(() => {
                nav("/welcome");
              }, 1000);
            } else {
              swal("Password Required!", {
                icon: "error",
              }).then(() => resetPassword());
            }
          });
        } else {
          swal("Invalid OTP!", {
            icon: "error",
          }).then(() => resetPassword());
        }
      } else {
        swal("OTP Required!", {
          icon: "error",
        }).then(() => resetPassword());
      }
    });
  };

  useEffect(() => {
    resetPassword();
  }, []);

  return <div></div>;
};

export default Reset;
