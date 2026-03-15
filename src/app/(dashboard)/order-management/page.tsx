import React from 'react'
import OrderManagementContainer from './_components/order-management-container'
import { OrderOverview } from './_components/order-overview'

const OrderManagement = () => {
  return (
    <div>
      <OrderOverview/>
      <OrderManagementContainer/>
    </div>
  )
}

export default OrderManagement