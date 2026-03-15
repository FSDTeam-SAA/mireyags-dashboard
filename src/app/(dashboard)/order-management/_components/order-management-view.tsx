"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "./order-management-data-type";
import Image from "next/image";

import noProduct from "../../../../../public/assets/images/no_product.webp";
import noUser from "../../../../../public/assets/images/no-user.jpeg";

const OrderManagementView = ({
  open,
  onOpenChange,
  orderData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: Order | null;
}) => {
  if (!orderData) return null;

  const customerName =
    orderData?.userId?.name ||
    `${orderData?.delivery?.firstName || ""} ${orderData?.delivery?.lastName || ""}`.trim() ||
    "Guest User";

  const customerEmail =
    orderData?.userId?.email ||
    orderData?.delivery?.email ||
    // orderData?.guestEmail ||
    "No email";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[400px] overflow-y-auto bg-white p-6 !rounded-[12px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#343A40]">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-1 space-y-3">
          <div>
            <p className="text-sm font-semibold text-gray-800 pb-1">Customer Info</p>
            <div className="flex items-center gap-3">
              <div>
                <Image
                  src={orderData?.userId?.profileImage || noUser}
                  alt={customerName}
                  width={200}
                  height={200}
                  className="w-12 h-12 object-cover rounded-[8px]"
                />
              </div>
              <div>
                <p className="text-sm text-[#131313] font-medium">{customerName}</p>
                <p className="text-sm text-gray-600">{customerEmail}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Phone</p>
            <p className="text-sm text-gray-600">
              {orderData?.delivery?.phone || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Amount</p>
            <p className="text-sm text-gray-600">$ {orderData?.totalAmount}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Payment Method
            </p>
            <p className="text-sm capitalize text-gray-600">
              {orderData?.payment?.method}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Payment Status
            </p>
            <p className="text-sm capitalize text-gray-600">
              {orderData?.payment?.paymentStatus}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Order Status</p>
            <p className="text-sm capitalize text-gray-600">
              {orderData?.orderStatus}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Address</p>
            <p className="text-sm text-gray-600">
              {orderData?.delivery?.address}, {orderData?.delivery?.area},{" "}
              {orderData?.delivery?.city}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Products</p>
            <div className="mt-2 space-y-2">
              {orderData?.items?.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex items-center gap-3 rounded-md border border-gray-200 p-3"
                >
                  <div>
                    <Image
                      src={item?.image || noProduct}
                      alt={item?.name}
                      width={200}
                      height={200}
                      className="w-12 h-12 object-cover rounded-[8px]"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Quantity : {item.quantity}
                    </p>
                    <p className="text-xs text-gray-600">Size : {item.size}</p>
                    <p className="text-xs text-gray-600">
                      Subtotal : $ {item.subTotal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Ordered At</p>
            <p className="text-sm text-gray-600">
              {new Date(orderData.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderManagementView;
