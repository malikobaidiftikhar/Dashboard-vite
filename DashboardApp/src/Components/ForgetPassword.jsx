import { Box, Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //////validation/////////
    if (!email) {
      setError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email invalid");
    }
    const storedUserData = JSON.parse(localStorage.getItem("usersData")) || [];
    const existingUser = storedUserData.find((user) => user.email === email);
    if (existingUser) {
      navigate("/passwordverification");
    } else {
      setError("Email not Exist");
    }
  };

  return (
    <div className="center-container">
      <div className="signup-login-form">
        <Box maw={500}>
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              value={email}
              label="Email"
              placeholder="your@email.com"
              onChange={handleEmailChange}
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

export default ForgetPassword;
