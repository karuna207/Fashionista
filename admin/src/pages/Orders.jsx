import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);

  const fetchAllOrders = async () => {
    console.log("token in fetch", token);
    if (!token) {
      return null;
    }
    try {
      console.log(backendUrl);
      console.log(`${backendUrl}/api/order/list`);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      console.log("hi");
      console.log(response.data);
      if (response.data.success) {
        setorders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
      console.log(orders);
    } catch (err) {
      toast.error(err.message);
    }
  }; 


  const statusHandler=async (e,orderId)=>{
    try{ 
      console.log('hi from status'); 
      console.log(e.target.value);
      const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:e.target.value},{headers:{token}}); 

      if(response.data.success){
        await fetchAllOrders()
      }

    }catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>

      <div>
        {orders.map((order, ind) => {
          return (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={ind}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, ind) => {
                    if (ind == order.items.length - 1) {
                      return (
                        <p className='py-0.5' key={ind}>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={ind}>
                          {item.name} x {item.quantity}{" "}
                          <span>{item.size},</span>
                        </p>
                      );
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      " , " +
                      order.address.state +
                      " , " +
                      order.address.country +
                      " , " +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items:{order.items.length}</p>
                <p className='mt-3'>Method:{order.paymentMethod}</p>
                <p>Payment:{order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p> 
              <select onChange={(e)=>{statusHandler(e,order._id)}} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
