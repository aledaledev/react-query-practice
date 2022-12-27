import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { ProductProps } from '../types'

const ProductCard = ({product}:{product:ProductProps}) => {
  const {image,name,description,category,price,_id:id} = product

  const [isHover, setIsHover] = useState(false)

  const {addToCart, cart, removeToCart} = useCart()

  const currentQuantity = cart.find(item => item.product._id === id)?.quantity as number || 0

  return (
    <div key={id} className='flex flex-col items-center border border-zinc-200'>
      <div onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
        <img src={image} style={{width: 'auto', height:'10rem'}}/>
      </div>
      <div className='bg-zinc-100 w-full relative px-2 py-1'>
        <h5 className='text-lg font-light leading-5 my-2'>{name}</h5>
        {
          isHover?<div className='bg-zinc-100 border border-zinc-300 p-1 absolute z-10 w-48 -right-40 -top-32'>
            <div className='overflow-scroll max-h-20 min-h-max'>
              <p className='text-sm font-thin'>{description}</p>
            </div>
            <p className='text-sm font-thin'>Category: {category}</p>
          </div>:null
        }
        <p className='text-sm font-light'>Price: <span className='text-base font-sans font-medium'>${price}</span></p>
          {currentQuantity===0?<button onClick={() =>addToCart(id)} className='block mx-auto bg-emerald-600 text-zinc-50 p-1 mt-2'>Add to cart</button>:null}
          {currentQuantity>0?<div className='flex justify-center items-center mt-2'>
            <button onClick={() =>removeToCart(id)} className='bg-cyan-500  hover:bg-cyan-600 text-zinc-50 py-1 w-1/4'>-</button>
            <span className='bg-zinc-100 w-1/4 text-center py-1'>{currentQuantity}</span>
            <button onClick={() =>addToCart(id)} className='bg-cyan-500 hover:bg-cyan-600 text-zinc-50 py-1 w-1/4'>+</button>
          </div>:null}
      </div>
    </div>
  )
}

export default ProductCard