import React,{useState} from 'react' 
import axios from "axios";
import { backendUrl } from '../App'; 
import {toast} from "react-toastify"


const Login = (props) => { 


    const [email, setemail] = useState('') 
    const [password, setpassword] = useState('')
    
    const onSubmitHandler=async (e)=>{ 
        try{
            e.preventDefault();
            console.log(email);
            console.log(password);  

            const response=await axios.post(backendUrl+'/api/user/admin',{email,password}) 
            if(response.data.success){
                props.settoken(response.data.token);
            }
            else{
                toast.error(response.data.message);
            }

            //api call 


        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }
  return (
    <div className='flex justify-center min-h-screen w-full items-center'> 
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4 '>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>      
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p> 
                    <input onChange={(e)=>{setemail(e.target.value)}} value={email} className='rounded-md w-full px-3 py-2 border border-gray-700 outline-none' type="email" placeholder='Email address' required />
                </div>
                <div className='mb-3 min-w-72'>      
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p> 
                    <input onChange={(e)=>{setpassword(e.target.value)}} value={password} className='rounded-md w-full px-3 py-2 border border-gray-700 outline-none' type="password" placeholder='password' required />
                </div> 
                <button className='mt-2 w-full bg-black text-white py-2 px-4 rounded-md'type='submit'>Login</button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
