"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Product } from "./products-data-type";

type ProductTableProps = {
  products?: Product[];
  onDelete?: (id: string) => void;
};

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {

    console.log(products)
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9ECEF] bg-white shadow-sm">
        <div className="flex items-center justify-between">
            <h4>Products</h4>
            <Link href="/product-management/add-product">
            <button className="bg-primary rounded-[8px] h-[44px] text-base font-medium px-10">Add New</button>
            </Link>
            
        </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-[#F8F9FA]">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-[#343A40]">
                Products
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-[#343A40]">
                Categories
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-[#343A40]">
                Price
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-[#343A40]">
                Stock
              </th>
              <th className="px-4 py-4 text-right text-sm font-semibold text-[#343A40]">
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
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-[#343A40]">
                      {product.name}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-[#495057] capitalize">
                  {product.category.name}
                </td>

                <td className="px-4 py-4 text-sm text-[#495057]">
                  ${product.price}
                </td>

                <td className="px-4 py-4 text-sm text-[#495057]">
                  {product.stock}
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/product-management/edit-product/${product._id}t`}
                      className="text-[#495057] transition hover:text-[#12B5D3]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      className="text-[#495057] transition hover:text-[#12B5D3]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(product._id)}
                      className="text-red-500 transition hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
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
      </div>
    </div>
  );
}