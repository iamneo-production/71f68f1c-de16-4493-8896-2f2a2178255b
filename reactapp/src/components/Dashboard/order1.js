import { useEffect, useState } from 'react';
import React  from 'react';
import '../Dashboard/order.css';
import axios from 'axios';


function Order1() {
  const [order, setOrders] = useState([]);
  const username = "ben";
  const password = "12345";
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  
  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
  };
  const fetchData = async () => {
    const orders = await axios.get("http://localhost:8080/getAllOrders",{headers});
    setOrders(orders.data);
  };

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>

<div className="orders-container">
          <h1>Orders</h1>
  <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2%"}}>
          <ul>
              {order.length > 0 && (
                <>
                  {order.map(ord => (
                    <li key={ord.ordid}>
                      <h3><center>Order #{ord.ordid}</center></h3>
                      <ul>
                        {ord.ordername.split(",").map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <div className='butt-dash'>
                        {/* <button className='btn btn-danger m-1' onClick={() => handleDeleteOrder(ord.ordid)}>Delete</button> */}
                      </div>
                      <pre> </pre>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
        
    </>
  );
}

export default Order1;
