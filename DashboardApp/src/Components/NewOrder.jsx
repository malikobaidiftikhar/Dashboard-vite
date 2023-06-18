import {
  Box,
  Button,
  Checkbox,
  Group,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NewOrder() {
  const [year, setYear] = useState("");
  // const [erroryear, setErrorYear] = useState("");
  const [VehicleMake, setVehicleMake] = useState("");
  // const [errorVehicleMake, setErrorVehicleMake] = useState("");
  const [VehicleModel, setVehicleModel] = useState("");
  // const [errorVehicleModel, setErrorVehicleModel] = useState("");
  const [Price, setPrice] = useState("");
  // const [errorPrice, setErrorPrice] = useState("");
  const [error, setError] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // console(location.indexofupdatedobject);
  // console.log(location.indexofupdatedobject.year);
  useEffect(() => {
    if (location.state && location.state.indexofupdatedobject) {
      const updatedObject = location.state.indexofupdatedobject;
      setYear(updatedObject.year);
      setVehicleMake(updatedObject.VehicleMake);
      setVehicleModel(updatedObject.VehicleModel);
      setPrice(updatedObject.Price);
    }
  }, [location]);
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  const handleVehicleMake = (event) => {
    setVehicleMake(event.target.value);
  };
  const handleVehicleModel = (event) => {
    setVehicleModel(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleCancle = () => {
    navigate("/home/orders");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = [];
    if (!year) {
      validationErrors.year = "Vehicle Year is Required";
    } else if (year.length !== 4) {
      validationErrors.year = "Vehicle Year is of 4 alphabets";
    } else if (!/^\d+$/.test(year)) {
      validationErrors.year = "Vehicle Year must be a number. ";
    }

    if (!VehicleMake) {
      validationErrors.VehicleMake = "Vehicle Year is Required";
    } else if (
      VehicleMake.trim().length < 3 ||
      VehicleMake.trim().length > 10
    ) {
      validationErrors.VehicleMake =
        "Vehicle Make must be between 3 and 10 characters";
    }
    if (!VehicleModel) {
      validationErrors.VehicleModel = "Vehicle Model is Required";
    } else if (
      VehicleModel.trim().length < 3 ||
      VehicleModel.trim().length > 10
    ) {
      validationErrors.VehicleModel =
        "Vehicle model must be between 3 and 10 characters";
    }
    if (!Price) {
      validationErrors.Price = "Vehicle price is Required";
    } else if (!/^\d+$/.test(Price)) {
      validationErrors.Price = "Vehicle Price must be a number. ";
    }
    if (Object.keys(validationErrors).length === 0) {
      const ordersData = JSON.parse(localStorage.getItem("ordersData")) || [];
      const orderData = {
        year,
        VehicleMake,
        VehicleModel,
        Price,
      };
      if (location.state && location.state.indexofupdatedobject) {
        const updatedObject = location.state.indexofupdatedobject;
        const updatedIndex = ordersData.find(
          (order) => order.year === updatedObject.year
        );
        if (updatedIndex) {
          updatedIndex.year = year;
          updatedIndex.VehicleMake = VehicleMake;
          updatedIndex.VehicleModel = VehicleModel;
          updatedIndex.Price = Price;
          localStorage.setItem("ordersData", JSON.stringify(ordersData));
          setYear("");
          setVehicleMake("");
          setVehicleModel("");
          setPrice("");
          navigate("/home/orders");
          alert("Data Updated successfully");
        }
      } else {
        console.log("order", orderData);
        ordersData.push(orderData);
        localStorage.setItem("ordersData", JSON.stringify(ordersData));
        navigate("/home/orders");
        alert("Data Added successfully");
      }
    } else {
      setError(validationErrors);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          withAsterisk
          label="Year"
          value={year}
          placeholder="eg. 2015"
          onChange={handleYear}
        />
        {error.year && <span className="error-message">{error.year}</span>}
        <TextInput
          withAsterisk
          label="Vehicle Make"
          value={VehicleMake}
          placeholder="eg. Toyota"
          onChange={handleVehicleMake}
        />
        {error.VehicleMake && (
          <span className="error-message">{error.VehicleMake}</span>
        )}
        <TextInput
          withAsterisk
          label="Vehicle Model"
          placeholder="eg. Prius"
          value={VehicleModel}
          onChange={handleVehicleModel}
        />
        {error.VehicleModel && (
          <span className="error-message">{error.VehicleModel}</span>
        )}
        <TextInput
          withAsterisk
          label="Vehicle Price"
          placeholder="$999"
          value={Price}
          onChange={handlePrice}
        />
        {error.Price && <span className="error-message">{error.Price}</span>}
        {/* <Textarea
          placeholder="Your comment"
          label="Your comment"
          withAsterisk
          {...form.getInputProps("comment")}
        /> */}

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
          <Button onClick={handleCancle}>Cancle</Button>
        </Group>
      </form>
    </Box>
  );
}

export default NewOrder;
