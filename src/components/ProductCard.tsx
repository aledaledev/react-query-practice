import React, { useState } from 'react'

export interface PropductProps {
    image:string,
    name:string,
    description:string,
    category: string,
    price: number,
    _id:string,
}

const ProductCard = ({product}:{product:PropductProps}) => {
  const {image,name,description,category,price,_id} = product

  const [isHover, setIsHover] = useState(false)

  return (
    <div key={_id} className='flex flex-col items-center border border-zinc-100'>
      <div onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
        <img src={image} style={{width: 'auto', height:'10rem'}}/>
      </div>
      <div className='bg-zinc-50 w-full relative px-2 py-1'>
        <h5 className='text-lg font-light'>{name}</h5>
        {
          isHover?<div className='bg-zinc-100 border border-zinc-300 p-1 absolute z-10 w-48 -right-40 -top-32'>
            <div className='overflow-scroll max-h-20 min-h-max'>
              <p className='text-sm font-thin'>{description}</p>
            </div>
            <p className='text-sm font-thin'>Category: {category}</p>
          </div>:null
        }
        <p className='text-sm font-light'>Price: <span className='text-base font-sans font-medium'>${price}</span></p>
          {true?<button className='block mx-auto bg-emerald-600 text-zinc-50 p-1 mt-2'>Add to cart</button>:null}
          {false?<div className='flex justify-center items-center mt-2'>
            <button className='bg-cyan-500  hover:bg-cyan-600 text-zinc-50 py-1 w-1/4'>-</button>
            <span className='bg-zinc-100 w-1/4 text-center py-1'>2</span>
            <button className='bg-cyan-500 hover:bg-cyan-600 text-zinc-50 py-1 w-1/4'>+</button>
          </div>:null}
      </div>
    </div>
  )
}

export default ProductCard