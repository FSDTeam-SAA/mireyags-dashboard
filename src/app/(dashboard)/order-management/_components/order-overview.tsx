"use client";
import { PackageSearch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import { useSession } from "next-auth/react";
import ProductOverviewSkeleton from "../../product-management/_components/product-overview-skeleton";

export interface OrderStatusStatsApiResponse {
  status: boolean;
  message: string;
  data: OrderStatusStats;
}

export interface OrderStatusStats {
  placed: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export function OrderOverview() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, isError, error } =
    useQuery<OrderStatusStatsApiResponse>({
      queryKey: ["order-overview"],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/statistics`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return await res.json();
      },
      enabled: !!token,
    });

  console.log(data);

  let content;

  if (isLoading) {
    content = (
      <div className="p-6">
        <ProductOverviewSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="p-6">
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pt-6">
        <div className="md:col-span-1 h-[89px] flex items-center justify-between bg-white shadow-[0px_4px_6px_0px_#0000001A] px-4 rounded-[8px]">
          <div>
            <p className="text-sm font-semibold text-[#424242] leading-[120%]">
              Delivered Products
            </p>
            <p className="text-3xl leading-[120%] text-primary font-bold font-hexco pt-1">
              {data?.data?.delivered || 0}
            </p>
          </div>
          <div>
            <span className="flex items-center justify-center bg-[#E6F4E6] p-3 rounded-full">
              <PackageSearch className="w-6 h-6 text-primary" />
            </span>
          </div>
        </div>

        <div className="md:col-span-1 h-[89px] flex items-center justify-between bg-white shadow-[0px_4px_6px_0px_#0000001A] px-4 rounded-[8px]">
          <div>
            <p className="text-sm font-semibold text-[#424242] leading-[120%]">
              Shipping Products
            </p>
            <p className="text-3xl leading-[120%] text-primary font-bold font-hexco pt-1">
              {data?.data?.shipped || 0}
            </p>
          </div>
          <div>
            <span className="flex items-center justify-center bg-[#E6F4E6] p-3 rounded-full">
              <PackageSearch className="w-6 h-6 text-primary" />
            </span>
          </div>
        </div>

        <div className="md:col-span-1 h-[89px] flex items-center justify-between bg-white shadow-[0px_4px_6px_0px_#0000001A] px-4 rounded-[8px]">
          <div>
            <p className="text-sm font-semibold text-[#424242] leading-[120%]">
              Processing Products
            </p>
            <p className="text-3xl leading-[120%] text-primary font-bold font-hexco pt-1">
              {data?.data?.processing || 0}
            </p>
          </div>
          <div>
            <span className="flex items-center justify-center bg-[#E6F4E6] p-3 rounded-full">
              <PackageSearch className="w-6 h-6 text-primary" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <div className="">{content}</div>;
}
