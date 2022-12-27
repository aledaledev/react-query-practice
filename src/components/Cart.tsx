import React from 'react'
import { useCart } from '../context/CartContext'
import {AiOutlineClose, AiOutlineDelete} from 'react-icons/ai'
import {CiFaceMeh} from 'react-icons/ci'

const Cart = () => {

  const {toggleCart,cart,addToCart,removeToCart,totalQuantity,removeItem} = useCart()

  return (
    <div className='fixed right-5 top-3 z-10 w-64 h-64 py-3 bg-zinc-50 border border-zinc-200 rounded-md'>
        <div className='flex justify-between pb-2 px-3 border-b'>
        <h2>Cart</h2>
        <button onClick={toggleCart}><AiOutlineClose/></button>
        </div>
      <div className='my-2 overflow-scroll h-40 px-3'>
        {cart.map(({product,quantity})=>{
          const {image,name,price,_id:id} = product

          return <div className='my-2 flex justify-between items-center gap-1' key={id}>
            <img className='w-14' src={image}/>
            <p className='text-sm font-light'>{name}</p>
            <div className='flex flex-col items-end'>
            <span className='font-medium'>${price}</span>
            <span className='text-sm font-normal'>x {quantity}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <button className='bg-rose-600 hover:bg-rose-700 text-zinc-50 p-1' onClick={() => removeItem(id)}><AiOutlineDelete/></button>
              <button className='bg-cyan-500 hover:bg-cyan-600 text-zinc-50 px-1' onClick={() => addToCart(id)}>+</button>
              <button className='bg-cyan-500 hover:bg-cyan-600 text-zinc-50 px-1' onClick={() => removeToCart(id)}>-</button>
            </div>
          </div>
        })}
        {cart.length===0?
          <div className='mt-6 flex items-center flex-col gap-6'>
            <h4 className='text-2xl font-semibold'>Cart is empty</h4>
            <CiFaceMeh style={{transform:'scale(3)'}}/>
          </div>
        :null}
      </div>
      <div className='mt-2 pt-1 px-3 border-t flex justify-between'>
        <span className='uppercase'>total</span>
        <span className='font-medium'>${cart.length!==0?totalQuantity():0}</span>
      </div>
    </div>
  )
}

export default Cart