import React, { useState } from 'react'
import {useQuery } from 'react-query'
import ProductCard, { PropductProps } from './ProductCard'

const ProductList = () => {

    const [page, setPage] = useState(1)

    const getProducts = async ({queryKey}:{queryKey:(string | number)[]}) => {
        const response = await fetch(`https://peticiones.online/api/products?page=${queryKey[1]}`)
        return await response.json()
    }

//          diferenciamos querys(identidficador), como recuperamos
  const { data, status } = useQuery(['products',page],getProducts)

    if(status === 'loading'){
        return <p>Checking products...</p>
    }

    if(status === 'error'){
        return <p>Error</p>
    }

  return (
    <div>
        <h2 className='font-bold text-3xl my-5 ml-5'>List of products</h2>
        <div className='grid grid-cols-2 gap-2 m-2'>
        {data.results.map((product:PropductProps) => (
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