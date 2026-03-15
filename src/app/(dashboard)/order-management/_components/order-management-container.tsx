"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import MireyagsPagination from "@/components/ui/mireyags-pagination";

import { Eye } from "lucide-react";
import { useSession } from "next-auth/react";

import noUser from "../../../../../public/assets/images/no-user.jpeg";
import { Order, OrdersApiResponse } from "./order-management-data-type";
import OrderManagementView from "./order-management-view";

export default function OrderManagementContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectViewOrder, setSelectViewOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isError, error } = useQuery<OrdersApiResponse>({
    queryKey: ["all-orders", debouncedSearch, currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order?page=${currentPage}&limit=6&search=${debouncedSearch}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.json();
    },
  });

  const orders = data?.data?.data;

  console.log(data?.data);
  console.log(isLoading, isError, error);

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-[8px] border border-[#E4E4E4] p-6">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#252471] leading-normal">
            Orders
          </h4>
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-[#F8F9FA]">
              <tr>
                <th className="px-4 py-4 text-left text-base font-semibold text-[#3B3B3B] leading-normal">
                  Products
                </th>
                <th className="px-4 py-4 text-left text-base font-semibold text-[#3B3B3B] leading-normal">
                  Customers
                </th>
                <th className="px-4 py-4 text-center text-base font-semibold text-[#3B3B3B] leading-normal">
                  Payment
                </th>
                <th className="px-4 py-4 text-center text-base font-semibold text-[#3B3B3B] leading-normal">
                  Amount
                </th>
                <th className="px-4 py-4 text-center text-base font-semibold text-[#3B3B3B] leading-normal">
                  Status
                </th>
                <th className="px-4 py-4 text-right text-base font-semibold text-[#3B3B3B] leading-normal">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order._id}
                  className="border-b last:border-b-0 hover:bg-[#FCFCFD]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {order?.items?.map((info) => {
                        return (
                          <div
                            key={info?.productId}
                            className="flex items-center gap-3"
                          >
                            <div className="relative h-12 w-12">
                              <Image
                                src={info?.image}
                                alt={info?.name}
                                fill
                                className="object-cover rounded-[8px]"
                              />
                            </div>

                            <h4 className="text-sm font-medium text-[#242424] leading-normal capitalize">
                              {info?.name}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={order?.userId?.profileImage || noUser}
                        alt={order?.userId?.name}
                        width={200}
                        height={200}
                        className="w-12 h-12 object-cover rounded-[8px]"
                      />
                     <div>
                       <h4 className="text-sm text-left font-medium text-[#242424] leading-normal capitalize">
                        {order?.userId?.name}
                      </h4>
                      <p className="text-sm text-left font-normal text-[#525252] leading-normal">{order?.userId?.email}</p>
                     </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-center font-medium text-[#242424] leading-normal capitalize">
                    {order?.payment?.method}
                  </td>

                  <td className="px-4 py-4 text-sm text-center font-medium text-[#242424] leading-normal capitalize">
                    $ {order?.totalAmount}
                  </td>
                  <td className="px-4 py-4 text-sm text-center font-medium text-[#242424] leading-normal capitalize">
                    {order?.payment?.paymentStatus}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-4">
                      {/* view */}
                      <button
                        className="text-[#12B5D3]"
                        onClick={() => {
                          setSelectViewOrder(true);
                          setSelectedOrder(order);
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!orders?.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm text-[#6C757D]"
                  >
                    No Customer found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination  */}
          {data &&
            data?.data &&
            data?.data?.pagination &&
            data?.data?.pagination?.totalPages > 1 && (
              <div className="w-full flex items-center justify-between py-2">
                <p className="text-base font-normal text-[#68706A] leading-[150%]">
                  Showing {currentPage} to 6 of{" "}
                  {data?.data?.pagination?.totalData} results
                </p>
                <div>
                  <MireyagsPagination
                    currentPage={currentPage}
                    totalPages={data?.data?.pagination?.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            )}

          {/* Product view modal  */}
          <div>
            {selectViewOrder && (
              <OrderManagementView
                open={selectViewOrder}
                onOpenChange={(open: boolean) => setSelectViewOrder(open)}
                orderData={selectedOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
