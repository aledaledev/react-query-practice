import React from 'react'
import { useQuery } from 'react-query'

const ProductList = () => {
 
    const getProducts = async () => {
        const response = await fetch('https://peticiones.online/api/products')
        return await response.json()
    }

//                        diferenciamos querys, como recuperamos
  const { data, status } = useQuery('products',getProducts)

    if(status === 'loading'){
        return <p>Checking products...</p>
    }

    if(status === 'error'){
        return <p>Error</p>
    }

  return (
    <div>
        <h2>List of products</h2>
    </div>
  )
}

export default ProductList