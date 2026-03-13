"use client";
import Image from "next/image";
// import { useSession } from "next-auth/react";
import React from "react";
import admin from "../../../../public/assets/images/no-user.jpeg";

const DashboardOverviewHeader = () => {
  // const session = useSession();
  // console.log(session)
  // const user = (session?.data?.user as {firstName:string})?.firstName
  // console.log(user)

  return (
    <div className="sticky top-0  z-50">
      {/* Header */}
      <div className="bg-white p-6 flex items-center justify-end">
       <div className="flex items-center gap-2">
         <div>
          <h1 className="text-base lg:text-lg font-bold text-[#191919] leading-normal text-right">
            mireyags
          </h1>
          <p className="text-sm font-normal text-[#191919] leading-normal text-right">
            mireyags@gmail.com
          </p>
        </div>
        <div>
          <Image
            src={admin}
            alt="admin"
            width={200}
            height={200}
            className="w-12 h-12 rounded-full"
          />
        </div>
       </div>
      </div>
    </div>
  );
};

export default DashboardOverviewHeader;
