import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
  const { backendUrl, navigate, token, setcartitems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      } 
      console.log('success',success);
      console.log('hi');
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { orderId,success },
        { headers: { token } }
      );
      console.log('bye');
      console.log(response.data);
      if (response.data.success) {
        setcartitems({});
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verify</div>;
};

export default Verify;
 