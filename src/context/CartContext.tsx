import React, { createContext, ReactNode, useContext, useState } from 'react'
import {CartContext as cartInterface, CartProducts, ProductProps} from '../types'

const CartContext = createContext({} as cartInterface)

export function useCart() {
    return useContext(CartContext)
}

export const CartProvider = ({children}: {children:ReactNode}) => {

  const [openCart, setOpenCart] = useState(false)
  const [products, setProducts] = useState<ProductProps[]>()
  const [cart, setCart] = useState<CartProducts[]>([])

  const toggleCart = () => {
    setOpenCart(!openCart)
  }

  const addToCart = (id:string):void => {
    const product = products?.find(({_id})=> _id===id ) as ProductProps
    const inCart = cart.some(({product})=> product._id===id)

    if(inCart){
      const cartProduct = cart.find(item => item.product._id===id) as CartProducts
      const indexProduct = cart.findIndex(({product}) => product._id===id)
      const productAdded = {
        product,
        quantity:cartProduct.quantity+1
      }
      const updateCart = [...cart]
      updateCart[indexProduct]=productAdded
      setCart(updateCart)
    } else {
      const productAdded = {
        product,
        quantity:1
      }
      setCart(prev => [...prev,productAdded])
    }
  }

  const removeToCart = (id:string) => {
    const cartProduct = cart.find(item => item.product._id===id) as CartProducts
    if(cartProduct.quantity!==1) {
      const indexProduct = cart.findIndex(({product}) => product._id===id)
      const productRemoved = {
        product:cartProduct.product,
        quantity:cartProduct.quantity-1
      }
      const updateCart = [...cart]
      updateCart[indexProduct]=productRemoved
      setCart(updateCart)
    } else {
      const filteredCart = cart.filter(({product}) => product._id!==id)
      setCart(filteredCart)
    }
  }

  const totalQuantity = ():number => {
    return +(cart.map(({product,quantity}) => product.price*quantity).reduce((prev,cur) => prev+cur)).toFixed(2)
  }

  return <CartContext.Provider value={{openCart, toggleCart,addToCart, cart, removeToCart, setProducts,totalQuantity}}>
    {children}
    </CartContext.Provider>
}
