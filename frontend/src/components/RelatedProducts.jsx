import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'; 
import Title from './Title';

const RelatedProducts = ({category,subcategory}) => { 

    const {products}=useContext(ShopContext); 
    const [related, setrelated] = useState([]); 

    useEffect(() => { 

        if (products.length>0){  
            let productsCopy=products.slice(); 
            

            productsCopy=productsCopy.filter((item)=>{
                return item.category===category
            })  
            

            productsCopy=productsCopy.filter((item)=>{
                return item.subCategory===subcategory
            })  
           

            productsCopy=productsCopy.slice(0,5); 
          
            setrelated(productsCopy);

        }
      
    
      
    }, [products])
    

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED '} text2={'PRODUCTS'}></Title>
        </div>  

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item,ind)=>{
                return <ProductItem key={ind} id={item._id} name={item.name} price={item.price} image={item.image}></ProductItem>
            })}
        </div>
    
      
    </div>
  )
}

export default RelatedProducts
