import {
  AppShell,
  Aside,
  Box,
  Burger,
  Button,
  Footer,
  Header,
  List,
  MediaQuery,
  Navbar,
  Space,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconMessageReport,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";
import { IconCurrencyDollar } from "@tabler/icons-react";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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

  const handleDashboard = (event) => {
    navigate("dashboard");
  };
  const handleOrders = (event) => {
    navigate("orders");
  };
  const handleNewOrder = (event) => {
    navigate("neworder");
  };
  const handleReviews = (event) => {
    navigate("reviews");
  };
  const handlePayments = (event) => {
    navigate("payments");
  };
  const handleSettings = (event) => {
    navigate("settings");
  };
  // const storedUserData = JSON.parse(localStorage.getItem("usersData") || "[]");
  // const existingUser = storedUserData.find(
  //   (user) => user.email === location.state.user
  // );
  const logedinUsersData = JSON.parse(
    localStorage.getItem("logedinUsersData") || "[]"
  );
  // console.log("hello", location);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          className="navbar"
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <List className="navbar-list" type="ordered" withPadding>
            <List.Item
              onClick={handleDashboard}
              icon={<IconLayoutDashboard size="1.5rem" stroke={1.5} />}
            >
              Dashboard
            </List.Item>

            <Space h="md" />
            <List.Item
              onClick={handleOrders}
              icon={<IconShoppingCart size="1.5rem" stroke={1.5} />}
            >
              Oders
            </List.Item>
            <Space h="md" />

            <List.Item
              onClick={handleNewOrder}
              icon={<IconMessageReport size="1.5rem" stroke={1.5} />}
            >
              New Order
            </List.Item>
            <Space h="md" />
            <List.Item
              onClick={handleReviews}
              icon={<IconCurrencyDollar size="1.5rem" stroke={1.5} />}
            >
              Reviews
            </List.Item>
            <Space h="md" />
            <List.Item
              onClick={handleSettings}
              icon={<IconSettings size="1.5rem" stroke={1.5} />}
            >
              Setting
            </List.Item>
          </List>
        </Navbar>
      }
      header={
        <Header className="header" height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <div className="header-container">
              <div className="header-left">
                <div>CAR FLYS</div>
                <div>+091-1234321</div>

                <div>info</div>
              </div>

              <div className="header-right">
                <div>Home</div>
                <div>Vehicle</div>
                <div>Dashboard</div>
                <div>Become A Partner</div>
                <div>
                  <Text>{logedinUsersData.firstName}</Text>
                  <Text size="xs" color="dimmed">
                    {logedinUsersData.email}
                  </Text>
                </div>
                <div>Profile</div>
              </div>
            </div>
          </div>
        </Header>
      }
    >
      <div className="appshell">
        <Outlet />
       
      </div>
     
    </AppShell>
  );
}

export default HomePage;
