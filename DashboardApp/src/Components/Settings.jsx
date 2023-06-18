import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("logedinUsersData");

    navigate("/");
  };
  return (
    <div>
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        onClick={handleLogout}
      >
        LogOut
      </Button>
    </div>
  );
}

export default Settings;
