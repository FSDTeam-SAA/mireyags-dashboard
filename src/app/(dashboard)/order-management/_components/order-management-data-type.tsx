

export interface OrdersApiResponse {
  status: boolean;
  message: string;
  data: OrdersData;
}

export interface OrdersData {
  data: Order[];
  pagination: Pagination;
}

export interface Order {
  _id: string;
  userId: User;
  items: OrderItem[];
  delivery: Delivery;
  payment: Payment;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  profileImage: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
  offerPrice: number;
  subTotal: number;
}

export interface Delivery {
  type: "home" | "office";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
}

export interface Payment {
  method: "cod" | "stripe";
  paymentStatus: string;
  stripeSessionId?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}










