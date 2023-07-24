import React, { useState } from 'react';
import './order2.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Order2 = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const username = "ben";
  const password = "12345";
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
  };
  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setOrderItems((prevItems) => [...prevItems, newItem]);
      setNewItem('');
    }
  };

  const handleDeleteItem = (index) => {
    setOrderItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const orderCreate = async(e) => {
    console.log(orderItems);
    var size = Object.keys(orderItems).length;
      // console.log(size);
      let ordername = orderItems[0];
      for(let i=1; i < size ; i++){
          ordername = ordername+","+(orderItems[i]);
      }
      console.log(ordername);

      const order = {"ordername":ordername};
      const result=await axios.post("http://localhost:8080/dash/neworder",order,{headers});
      console.log(result.data);
    toast.success("Order created Succesfully!",{
      theme:"light",
    });
    
  }

  return (
    <div className="food-order-container">
      <h2 className="food-order-title">Food Order</h2>
      <div className="input-container">
        <input
          type="text"
          value={newItem}
          onChange={handleInputChange}
          placeholder="Enter food item"
          className="input-field"
        />
        <button onClick={handleAddItem} className="add-button">
          Add Item
        </button>
      </div>
      <ul className="order-list">
        {orderItems.map((item, index) => (
          <li key={index} className="order-item">
            {item}
            <button
              onClick={() => handleDeleteItem(index)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={orderCreate}>Add Order</button>
    </div>
  );
};

export default Order2;