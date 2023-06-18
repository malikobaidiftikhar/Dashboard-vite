import { Box, Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import SetNewPassword from "./SetNewPassword";

function PasswordVerification() {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleVerificationChange = (event) => {
    setVerificationCode(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //////validation/////////
    if (!verificationCode) {
      setError("verification is required");
    } else if (verificationCode > 5) {
      setError("verification code must be of 5 digits");
    }
    const storedUserData = JSON.parse(localStorage.getItem("usersData")) || [];
    const existingUser = storedUserData.find(
      (user) => user.verificationCode === verificationCode
    );
    if (existingUser) {
      navigate("/SetNewPassword", {
        state: {
          email: existingUser.email,
        },
      });
    } else {
      setError(" Invalid Verfication code");
    }
  };
  return (
    <div className="center-container">
      <div className="signup-login-form">
        <Box maw={500}>
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              value={verificationCode}
              label="Verification-Code"
              placeholder="Verification-Code"
              onChange={handleVerificationChange}
            />
            {error && <span className="error-message">{error}</span>}
            <Button type="submit" w={500} top={4}>
              Submit
            </Button>
          </form>
        </Box>
      </div>
      {/* <SetNewPassword user={existingUser.password} /> */}
    </div>
  );
}

export default PasswordVerification;
