  import React, { useContext } from 'react' 
  import { useState } from 'react'
  import Title from '../components/Title' 
  import CartTotal from '../components/CartTotal'
  import { assets } from '../assets/assets'
  import { ShopContext } from '../context/ShopContext'
  import axios from 'axios' 
  import { toast } from 'react-toastify'


  const PlaceOrder = () => { 
    const [method, setmethod] = useState('cod'); 
    const {navigate,backendUrl,cartitems,token,setcartitems,getCartAmount,delivery_fee,products}=useContext(ShopContext);
    const [formData,setFormData]=useState({
      firstName:'',
      lastName:'',
      email:'',
      street:'',
      city:'',
      state:'',
      zipcode:'',
      country:'',
      phone:' '
    }) 

    const onChangeHandler=(e)=>{
      const name=e.target.name;
      const value=e.target.value; 

      setFormData((prev)=>{
        return {...prev,[name]:value}
      })

    } 

    const onSubmitHandler=async(e)=>{
      e.preventDefault();
      try{
        let orderitems=[];

        for (const items in cartitems) {
        for (const item in cartitems[items]) {
            if( cartitems[items][item]>0){
              const itemInfo=structuredClone(products.find(product=>product._id===items)) 
              if(itemInfo){
                itemInfo.size=item;
                itemInfo.quantity=cartitems[items][item] 
                orderitems.push(itemInfo);
              }
            }
            
          }
        }

        let orderData={
          address:formData, 
          items:orderitems, 
          amount:getCartAmount()+delivery_fee,
        
        } 

        switch(method){ 

          //api call for cod
          case 'cod': 
            console.log("token",token);
            const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}});

            if(response.data.success){
              setcartitems({}) 
              navigate('/orders')
            }else{
              toast.error(response.data.message);

            }

            break;  

          case 'stripe':
            console.log(token) 
            const responseStripe=await axios.post(backendUrl+"/api/order/stripe",orderData,{headers:{token}});
            if(responseStripe.data.success){ 
              const {session_url}=responseStripe.data;
              window.location.replace(session_url);

            }else{
              toast.error(responseStripe.data.message)
            }

          default:
            break
        }
        }


      catch(err){  
        console.log(err); 
        toast.error(err.message);

      }
    }
    
    return (
      <form onSubmit={onSubmitHandler}className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}></Title>
          </div> 
          <div className='flex gap-3'>
            <input type="text" onChange={onChangeHandler} name='firstName' value={formData.firstName} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name'  required/> 
            <input type="text" onChange={onChangeHandler} name='lastName' value={formData.lastName} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name'  required/>
          </div> 
          <input type="email"  onChange={onChangeHandler} name='email' value={formData.email} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address'  required/> 
          <input type="text"  onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street'  required/> 
          <div className='flex gap-3'>
            <input type="text" onChange={onChangeHandler} name='city' value={formData.city} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City'  required/> 
            <input type="text" onChange={onChangeHandler} name='state' value={formData.state} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State'  required/>
          </div>
          <div className='flex gap-3'>
            <input type="number" onChange={onChangeHandler} name='zipcode' value={formData.zipcode} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip Code'  required/> 
            <input type="text" onChange={onChangeHandler} name='country' value={formData.country} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' required />
          </div> 
          <input type="number" onChange={onChangeHandler} name='phone' requi value={formData.phone} id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone'  required/> 
        </div> 

        <div className='mt-8'>
            <div className='mt-8 min-w-80'>
              <CartTotal/>
            </div> 

            <div className='mt-12'>
              <Title text1={'PAYMENT'} text2={'METHOD'}/> 
              <div className='flex gap-3 flex-col lg:flex-row'>
                <div onClick={()=>{setmethod('stripe')}} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full  ${method==='stripe'?'bg-green-500':''}`}></p> 
                  <img className='h-5 mx-4'src={assets.stripe_logo} alt="" />
                </div> 

                <div onClick={()=>{setmethod('razorpay')}} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full  ${method==='razorpay'?'bg-green-500':''}`}></p> 
                  <img className='h-5 mx-4'src={assets.razorpay_logo} alt="" />
                </div> 


                <div onClick={()=>{setmethod('cod')}} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-500':''}`}></p> 
                  <p className='text-gray-500 text-sm font-medium mx-4'> CASH ON DELIVERY</p>
                </div>

              </div>
            </div> 
            <div className='w-full text-end mt-8'> 
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button> 


            </div>
        </div>
      </form>
    )
  }

  export default PlaceOrder
