"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const brandSchema = z.object({
  name: z.string().min(2, "Brand name is required"),
});

type BrandFormValues = z.infer<typeof brandSchema>;

type CreateBrandResponse = {
  status: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
};

export default function AddBrandForm() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;
  const router = useRouter()

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useMutation<
    CreateBrandResponse,
    Error,
    BrandFormValues
  >({
    mutationKey: ["create-brand"],
    mutationFn: async (values) => {
      if (!token) {
        throw new Error("Unauthorized. Please login again.");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
        }),
      });

      const data: CreateBrandResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to create brand");
      }

      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Brand created successfully");
      form.reset();
      router.push("/brand-management")
      await queryClient.invalidateQueries({ queryKey: ["all-brands"] });
    },
    onError: (error) => {
      toast.error(error.message || "Create brand failed");
    },
  });

  const onSubmit = (values: BrandFormValues) => {
    mutate(values);
  };

  return (
    <div className="rounded-[8px] border border-[#E4E4E4] bg-white p-6">
      <Link href="/brand-management">
        <button
          type="button"
          className="bg-primary flex h-[40px] items-center gap-2 rounded-[8px] px-5 text-lg font-normal leading-normal text-white"
        >
          <ArrowLeft />
          Back
        </button>
      </Link>

      <h4 className="py-5 text-lg font-semibold leading-normal text-[#4C4C4C] md:text-xl lg:text-2xl">
        Add New Brand
      </h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium leading-normal text-[#1E1E1E]">
                  Brand Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter brand name"
                    className="h-[48px] w-full rounded-[8px] border border-[#CECECE] text-base font-medium leading-normal text-[#1E1E1E] placeholder:text-[#CECECE]"
                  />
                </FormControl>
                <FormMessage  className="text-red-500"/>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center pb-20">
            <Button
              type="submit"
              disabled={isPending}
              className="h-[44px] rounded-[8px] px-14 text-lg font-normal leading-normal text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}