import { Box, Button, PasswordInput, TextInput } from "@mantine/core";

import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const [verificationCode, setVerificationCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = [];
    if (!firstName) {
      validationErrors.firstName = "First name is required";
    } else if (firstName.trim().length < 3 || firstName.length > 15) {
      validationErrors.firstName = "First name must be between 3 t0 15";
    }
    if (!lastName) {
      validationErrors.lastName = "Last name is required";
    } else if (lastName.trim().length < 3 || lastName.length > 15) {
      validationErrors.lastName = "last name must be between 3 t0 15";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password should be at least 6 characters long";
    } else if (password.length > 12) {
      validationErrors.password = "Password must be less than 12 character";
    }
    if (!confirmpassword) {
      validationErrors.confirmpassword = "Confirm-Password is required";
    } else if (confirmpassword !== password) {
      validationErrors.confirmpassword = "Password not Match";
    }
    console.log("validation successfully.");
    if (Object.keys(validationErrors).length === 0) {
      const verificationCode = Math.floor(
        10000 + Math.random() * 90000
      ).toString();
      console.log("validationErrors.length === 0");
      const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
      const userData = {
        firstName,
        lastName,
        email,
        password,
        verificationCode,
        emailVerified,
      };
      console.log("userdata");
      const existingUser = usersData.find((user) => user.email === email);
      if (existingUser) {
        validationErrors.email = "email already exists";
        console.log("User data already exists.");
      } else {
        usersData.push(userData);
        localStorage.setItem("usersData", JSON.stringify(usersData));
        navigate("/");
      }

      console.log(localStorage);
      // alert("Form submitted successfully!");
    } else {
      setErrors(validationErrors);
    }
  };
  // setFirstName("");
  //   setLastName("");
  //   setEmail("");
  //   setPassword("");
  return (
    <div className="center-container">
      <div className="signup-login-form" onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <Box maw={500}>
          <form onSubmit={handleSubmit}>
            <div>
              <TextInput
                withAsterisk
                label="First Name"
                value={firstName}
                placeholder='e.g: "Ali"'
                onChange={handleFirstNameChange}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div>
              <TextInput
                withAsterisk
                label="Last Name"
                value={lastName}
                placeholder='e.g "Ahmad"'
                onChange={handleLastNameChange}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>
            <div>
              <TextInput
                withAsterisk
                label="Email"
                value={email}
                placeholder='e.g "abc@gmail.com"'
                onChange={handleEmailChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div>
              <PasswordInput
                withAsterisk
                label="Password"
                value={password}
                placeholder="Atleast of 6 Character"
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <div>
              <PasswordInput
                label="Confirm-Password"
                withAsterisk
                value={confirmpassword}
                placeholder="Re-Type password"
                onChange={handleConfirmPasswordChange}
              />
              {errors.confirmpassword && (
                <span className="error-message">{errors.confirmpassword}</span>
              )}
            </div>
            <div>
              <Button type="submit" w={500}>
                Signup
              </Button>
            </div>

            {/* <span>
          Already have an account, click on <NavLink to="/">About</NavLink>
        </span> */}
          </form>
        </Box>
        <div>
          Already have an account, click on <NavLink to="/">LogIn</NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
