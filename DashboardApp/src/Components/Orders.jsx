import { Table } from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("ordersData")) || []
  );
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    localStorage.setItem("ordersData", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    alert("Data Deleted successfully");
  };
  const handleUpdate = (index) => {
    console.log("index", index);
    const updatedOrders = [...orders];
    const orderToUpdate = updatedOrders[index];
    console.log("orderToUpdate", orderToUpdate);
    navigate("/home/neworder", {
      state: {
        indexofupdatedobject: orderToUpdate,
      },
    });
  };

  const rows = orders.map((order, index) => (
    <tr>
      <td>{order.year}</td>
      <td>{order.VehicleModel}</td>
      <td>{order.VehicleMake}</td>
      <td>{order.Price}</td>
      <td>
        <IconTrash
          onClick={() => handleDelete(index)}
          style={{ cursor: "pointer" }}
        />
      </td>
      <td>
        <IconEdit
          onClick={() => handleUpdate(index)}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  ));

  return (
    <Table striped highlightOnHover withBorder withColumnBorders>
      <thead>
        <tr>
          <th>Year</th>
          <th>Vehicle Make</th>
          <th>Vehicle Model</th>
          <th>Price</th>
          <th>Delete</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default Orders;
