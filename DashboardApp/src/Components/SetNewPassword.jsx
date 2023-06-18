import { Box, Button, PasswordInput } from "@mantine/core";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SetNewPassword() {
  const location = useLocation();

  console.log(location.state.email);

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const handleSetPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newPassword) {
      setError("Password is required");
      console.log("password");
    } else if (newPassword.length < 6) {
      setError("Password should be at least 6 characters long");
    } else if (newPassword.length > 12) {
      setError("Password must be less than 12 character");
    }else{
    const storedUserData = JSON.parse(localStorage.getItem("usersData")) || [];
    const existingEmail = storedUserData.find(
      (user) => user.email === location.state.email
    );
    if(existingEmail) {
      existingEmail.password = newPassword;
      localStorage.setItem("usersData", JSON.stringify(storedUserData));
      navigate("/");
    }}

    ///////////////////////////////////////////
    // const storedUserData = JSON.parse(localStorage.getItem("usersData")) || [];
    // const existingPassword = storedUserData.find(
    //   (user) => (user.password = newPassword)
    // );
    // // user = newPassword;
    // localStorage.setItem("usersData", JSON.stringify(existingPassword));
    ///////////////////////////////////////////////////////
    
  };

  return (
    <div className="center-container">
      <div className="signup-login-form">
        <Box maw={500}>
          <form onSubmit={handleSubmit}>
            <PasswordInput
              withAsterisk
              value={newPassword}
              label="New Password"
              placeholder="New Password"
              onChange={handleSetPasswordChange}
            />
            {error && <span className="error-message">{error}</span>}
            <Button type="submit" w={500} top={4}>
              Submit
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default SetNewPassword;
