"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Plus, SquarePen, Trash2 } from "lucide-react";

// import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { ProductsListApiResponse } from "./products-data-type";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import MireyagsPagination from "@/components/ui/mireyags-pagination";

export default function ProductContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
   const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isError, error } = useQuery<ProductsListApiResponse>(
    {
      queryKey: ["all-products", debouncedSearch, currentPage],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-all-products?page=${currentPage}&limit=6&search=${debouncedSearch}`,
        );

        return res.json();
      },
    },
  );

  const products = data?.data?.data;
  // const totalPages = data?.meta
  //   ? Math.ceil(data.meta.total / data.meta.limit)
  //   : 0;

  console.log(data?.data);
  console.log(isLoading, isError, error);

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-[8px] border border-[#E4E4E4] p-6">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#252471] leading-normal">Products</h4>
          <div className="flex items-center gap-5">
             {/* search  */}
        <div>
          <Input
            type="search"
            className="w-full  md:w-[297px] h-[44px] px-3 rounded-[8px] bg-transparent placeholder:text-[#929292] border border-[#969B9C]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}

            placeholder="Search"
          />
        </div>
          <Link href="/product-management/add-product">
            <button className="flex items-center gap-2 bg-primary rounded-[8px] h-[44px] text-base font-medium text-white px-6">
            <Plus />  Add New
            </button>
          </Link>
        </div>
          </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-[#F8F9FA]">
              <tr>
                <th className="px-4 py-4 text-left text-base font-semibold text-[#3B3B3B] leading-normal">
                  Products
                </th>
                <th className="px-4 py-4 text-center text-base font-semibold text-[#3B3B3B] leading-normal">
                  Categories
                </th>
                <th className="px-4 py-4 text-center text-base font-semibold text-[#3B3B3B] leading-normal">
                  Price
                </th>
                <th className="px-4 py-4 text-center text-base font-semibold text-[#3B3B3B] leading-normal">
                  Stock
                </th>
                <th className="px-4 py-4 text-right text-base font-semibold text-[#3B3B3B] leading-normal">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className="border-b last:border-b-0 hover:bg-[#FCFCFD]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-white">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-[4px]"
                        />
                      </div>
                      <p className="text-sm font-medium text-[#242424] leading-normal">
                        {product.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-center font-medium text-[#242424] leading-normal capitalize">
                    {product.category.name}
                  </td>

                  <td className="px-4 py-4 text-sm text-center font-medium text-[#242424] leading-normal">
                    ${product.price}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-[#242424] leading-normal text-center">
                    {product.stock}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/product-management/edit-product/${product._id}t`}
                        className="text-[#1E1E1E] transition hover:text-[#12B5D3]"
                      >
                        <SquarePen className="h-6 w-6 " />
                      </Link>

                      <button
                        type="button"
                        className="text-[#1E1E1E] transition hover:text-[#12B5D3]"
                      >
                        <Eye className="h-6 w-6" />
                      </button>

                      <button
                        type="button"
                        className="text-[#CE0000] transition hover:text-red-600"
                      >
                        <Trash2 className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!products?.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm text-[#6C757D]"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination  */}
        {
          data && data?.data && data?.data?.pagination && data?.data?.pagination?.totalPages > 1 && (
            <div className="w-full flex items-center justify-between py-2">
              <p className="text-base font-normal text-[#68706A] leading-[150%]">
                Showing {currentPage} to 6 of {data?.data?.pagination?.totalData} results
              </p>
              <div>
                <MireyagsPagination
                  currentPage={currentPage}
                  totalPages={data?.data?.pagination?.totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div>
  );
}
