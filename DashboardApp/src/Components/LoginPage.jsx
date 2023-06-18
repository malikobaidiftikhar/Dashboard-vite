import { Box, Button, PasswordInput, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

function LoginPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeVisible, setVerificationCodeVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const logedinUsersData = JSON.parse(
      localStorage.getItem("logedinUsersData")
    );

    console.log("LOGGED IN USER DATA", logedinUsersData);

    if (logedinUsersData) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };
  // const logedinUsersData = JSON.parse(
  //   localStorage.getItem("logedinUsersData") || "[]"
  // );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button pressed");
    const validationErrors = [];
    //////validation/////////
    if (!email) {
      validationErrors.email = "Email is required";
      console.log("button pressed");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email invalid";
    }
    if (!password) {
      validationErrors.password = "password required";
      console.log("button pressed");
    }
    if (Object.keys(validationErrors).length === 0) {
      // console.log("LOGIN BUTTON PRESSED");
      const storedUserData = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      );

      // console.log("GET DATA AND PARSE IT");
      const existingUser = storedUserData.find((user) => user.email === email);

      // console.log("FIND EXISTINGUSER FROM STORED USER DATA");
      if (existingUser) {
        // console.log("existing user", existingUser);
        // navigate("/home");
        if (existingUser.password === password) {
          if (existingUser.emailVerified === false) {
            setVerificationCodeVisible(true);

            if ((existingUser.verificationCode = verificationCode)) {
              existingUser.emailVerified = true;
              localStorage.setItem("usersData", JSON.stringify(storedUserData));

              // console.log("storedemailverified = true;last");
            } else {
              validationErrors.verificationCode = "verification code not match";
            }
          } else {
            // logedinUsersData.push(logedinUserData)
            localStorage.setItem(
              "logedinUsersData",
              JSON.stringify(existingUser)
            );
            // localStorage.setItem("isLoggedIn", JSON.stringify(true));

            navigate("/home");
          }
        } else {
          validationErrors.password = "password not match";
        }
      } else {
        validationErrors.email = "email not find";
      }
    } else {
      setError(validationErrors);
    }
  };
  return (
    <div className="center-container">
      <div className="signup-login-form">
        <h2>Login</h2>
        <Box maw={500}>
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              value={email}
              label="Email"
              placeholder="your@email.com"
              onChange={handleEmailChange}
            />
            {error.email && (
              <span className="error-message">{error.email}</span>
            )}

            <PasswordInput
              withAsterisk
              value={password}
              label="Password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            {error.password && (
              <span className="error-message">{error.password}</span>
            )}
            {verificationCodeVisible && (
              <TextInput
                withAsterisk
                label="Verification Code"
                value={verificationCode}
                placeholder="Verification Code"
                onChange={handleVerificationCodeChange}
              />
            )}
            {error.verificationCode && (
              <span className="error-message">{error.verificationCode}</span>
            )}

            <Button type="submit" w={500} top={4}>
              Submit
            </Button>
          </form>

          <Box>
            Do you have an account? <NavLink to="/signup">SignUp</NavLink>
          </Box>

          <Box>
            <NavLink to="/forgetpassword">Forget Password?</NavLink>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default LoginPage;
