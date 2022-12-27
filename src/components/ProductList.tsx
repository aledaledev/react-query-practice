import React, { useState } from 'react'
import {useQuery } from 'react-query'
import ProductCard from './ProductCard'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useCart } from '../context/CartContext'
import { ProductProps } from '../types'
import Cart from './Cart'

const ProductList = () => {

    const {openCart,toggleCart,setProducts} = useCart()

    const [page, setPage] = useState(1)

    const saveProducts = (fetchedProducts:any[]) => {
      const products = fetchedProducts.map(({_id,name,description,price,category,image}:ProductProps) => ({_id,name,description,price,category,image}))
      setProducts(products)
   }

    const getProducts = async ({queryKey}:{queryKey:(string | number)[]}) => {
        const response = await fetch(`https://peticiones.online/api/products?page=${queryKey[1]}`)
        const data = await response.json()
        saveProducts(data.results)
        return data
    }

//          diferenciamos querys(identidficador), como recuperamos
    const { data, status } = useQuery(['products',page],getProducts)

    if(status === 'loading'){
        return <p>Checking products...</p>
    }

    if(status === 'error'){
        return <p>Error</p>
    }

    //IoCartOutline
  return (
    <div className=''>
        {!openCart?<button onClick={toggleCart} className='fixed z-10 right-6 top-3 border-2 rounded-full p-5 border-zinc-500 bg-zinc-50'><AiOutlineShoppingCart style={{transform:'scale(1.8)', color:'black'}}/></button>:null}
        {openCart?<Cart/>:null}
        <h2 className='font-bold text-3xl my-6 ml-5'>List of products</h2>
        <div className='grid grid-cols-2 gap-2 m-2'>
        {data.results.map((product:ProductProps) => (
            <ProductCard key={product._id} product={product}/>
        ))}
        </div>
        <p>pages:</p>
        <div className='flex gap-2'>
          <button onClick={() => setPage(1)}>1</button>
          <button onClick={() => setPage(2)}>2</button>
        </div>
    </div>
  )
}

export default ProductList