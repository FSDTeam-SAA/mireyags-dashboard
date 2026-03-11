import React from 'react'
import EditProductForm from './_components/edit-product'

const EditProdcutPage = ({params}:{params:{id:string}}) => {
    console.log(params?.id)
  return (
    <div>
        <EditProductForm id={params?.id}/>
    </div>
  )
}

export default EditProdcutPage