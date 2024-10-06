import React from 'react'

const NewsletterBox = () => { 

    const onSubmitHandler=(evt)=>{
        evt.preventDefault();  
        
    }
  return ( 
    <div> 
        <br></br>
    <div className='text-center'> 

        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 50% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, quos error autem, itaque repellat ipsam, expedita aliquam odio officiis id veniam dolorum quisquam quidem incidunt saepe commodi omnis ratione voluptatem.
        </p> 
        <form onSubmit={onSubmitHandler} className='w-full smw-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' placeholder='Enter your email' type='email'></input>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
    </div>
  )
}

export default NewsletterBox
