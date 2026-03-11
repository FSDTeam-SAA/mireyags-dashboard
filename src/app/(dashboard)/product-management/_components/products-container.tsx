"use client";

import { toast } from "sonner";
import ProductTable from "./product-table";
import { useQuery } from "@tanstack/react-query";
import { ProductsListApiResponse } from "./products-data-type";

export default function ProductContainer() {
  const handleDelete = (id: string) => {
    toast.success(`Delete clicked for product id: ${id}`);
  };


  const {data, isLoading, isError, error} = useQuery<ProductsListApiResponse>({
    queryKey: ["all-products"],
    queryFn: async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-all-products`)

        return res.json();
    }
  })

  console.log(data?.data)
  console.log(isLoading, isError, error)

  return (
    <div className="p-4 md:p-6">
      <ProductTable products={data?.data?.data} onDelete={handleDelete} />
    </div>
  );
}