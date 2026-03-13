import React from 'react'
import ProductsContainer from './_components/products-container'
import { ProductOverview } from './_components/product-overview'

const ProductManagement = () => {
  return (
    <div>
      <ProductOverview/>
      <ProductsContainer/>
    </div>
  )
}

export default ProductManagement