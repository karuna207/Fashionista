import React, { useContext } from 'react' 
import { useState } from 'react'
import Title from '../components/Title' 
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'


const PlaceOrder = () => { 
  const [method, setmethod] = useState('cod') 
  const {navigate}=useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}></Title>
        </div> 
        <div className='flex gap-3'>
          <input type="text" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' /> 
          <input type="text" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' />
        </div> 
        <input type="email" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address' /> 
        <input type="text" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' /> 
        <div className='flex gap-3'>
          <input type="text" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' /> 
          <input type="text" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input type="number" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip Code' /> 
          <input type="text" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' />
        </div> 
        <input type="number" name='' id='' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' /> 
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
            <button onClick={()=>{navigate("/orders")}}className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button> 


          </div>
      </div>
    </div>
  )
}

export default PlaceOrder
