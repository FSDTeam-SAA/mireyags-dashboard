export type Category = {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Product = {
  _id: string;
  name: string;
  weight: string;
  size: string[];
  price: number;
  offerPrice: number;
  stock: number;
  category: Category;
  brand: Brand;
  description: string;
  image: string;
  subImages: string[];
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  orders: unknown[]; // or specific type if you have order schema
  totalSold: number;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ProductListData = {
  data: Product[];
  pagination: Pagination;
};

export type ProductsListApiResponse = {
  status: boolean;
  message: string;
  data: ProductListData;
};