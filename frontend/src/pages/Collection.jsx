import React, { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext,useEffect } from 'react' 
import { assets } from '../assets/assets'
import Title from "../components/Title" 
import ProductItem from "../components/ProductItem"

const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext);  
  const [showFilter, setshowFilter] = useState(true) 
  const [filterproducts, setfilterproducts] = useState([])
  const [category, setcategory] = useState([]) 
  const [subcategory, setsubcategory] = useState([]) 
  const [sortType, setsortType] = useState('relevant')

  const toggleCategory=(e)=> {
    if(category.includes(e.target.value)){
        setcategory((prev)=>{
          return prev.filter((item)=>{
              return item!=e.target.value
          })
        })
    } 
    else{
      setcategory((prev)=>{
        return [...prev,e.target.value]
      })
    }

  }  


  const toggleSubCategory=(e)=> {
    if(subcategory.includes(e.target.value)){
        setsubcategory((prev)=>{
          return prev.filter((item)=>{
              return item!=e.target.value
          })
        })
    } 
    else{
      setsubcategory((prev)=>{
        return [...prev,e.target.value]
      })
    }

  }  

  const applyFilter=()=>{
    let productsCopy=products.slice(); 

    if(showSearch && search){ 
      productsCopy=productsCopy.filter((item,ind)=>{
        return item.name.toLowerCase().includes(search.toLowerCase())
      })

    }
    if (category.length >0){
      productsCopy=productsCopy.filter((item,ind)=>{
        return category.includes(item.category);
    }) 
    } 

    if(subcategory.length >0){
      productsCopy=productsCopy.filter((item,ind)=>{
        return subcategory.includes(item.subCategory);
      })
    }

    setfilterproducts(productsCopy)

  } 

  const sortProduct=()=>{ 
    let fpcopy=filterproducts.slice();

    switch(sortType){
      case 'low-high':
        setfilterproducts(fpcopy.sort((a,b)=>{
          return a.price-b.price
        })) 
        break;
      

      case 'high-low':
        setfilterproducts(fpcopy.sort((a,b)=>{
          return b.price-a.price
        })) 
        break 
      
      default:
        applyFilter();
        break;

    }
  }



  // useEffect(()=>{
  //   setfilterproducts(products);
  // },[]) 


  useEffect(() => {
    console.log(category);
  
  }, [category]) 

  useEffect(() => {
   console.log(subcategory);
  }, [subcategory])
   

  useEffect(()=>{
    applyFilter();
  }

  ,[category,subcategory,search,showSearch]) 

  useEffect(() => {
    sortProduct();
  }, [sortType])
  
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'> 
      {/* Filter options created */}
        <div className='min-w-60'>
            <p onClick={()=>{setshowFilter(!showFilter)}} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
              FILTERS
            </p> 
            {/* Category filter */} 
            <div className={`border border-gray-500 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:display-block`}>
                <p className='mb-3 text-sm font-medium'>FILTERS
                  <img className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
                </p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'>
                    <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory}/>Men
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory}/>Women
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory}/>Kids
                  </p>
                </div>
            </div> 

            {/*Sub category filter */} 
            <div className={`border border-gray-500 pl-5 py-3 my-5 ${showFilter ? '':'hidden'} sm:display-block`}>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'>
                    <input type="checkbox" className="w-3" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className="w-3" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
                  </p>
                </div>
            </div> 

            

          </div>  

          <div className='flex-1'> 
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
              
              <Title text1={'ALL '} text2={'COLLECTIONS'}></Title> 
              <select onChange={(e)=>{setsortType(e.target.value)}} className='border-2 border-gray-300 text-sm px-2'>
                <option value="relevant">Sort by:Relevant</option>
                <option value="low-high">Sort by:Low-High</option>
                <option value="high-low">Sort by:High-Low</option>
              </select>
            </div> 


            {/* Map products */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                  filterproducts.map((item,ind)=>{
                    return <ProductItem key={ind} id={item._id} name={item.name} price={item.price} image={item.image} ></ProductItem>
                  })
                }
            </div>

          </div>

    </div>
  )
}

export default Collection
