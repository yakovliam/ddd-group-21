import useApi from "@/hooks/use-api";
import useEasyAuth from "@/hooks/use-easy-auth";
import { Customer } from "@/types/customer";
import { CustomerOrderPage } from "@/types/customerorder";
import { Product, ProductPage } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type PageableProps = {
  page: number;
  limit: number;
};

type UseProductsProps = {
  name?: string;
};

export const useProducts = ({
  page,
  limit,
  name,
}: PageableProps & UseProductsProps) => {
  const api = useApi();

  const fetchProducts = async (): Promise<ProductPage> => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());

    if (name) {
      searchParams.set("name", name);
    }

    const response = await api
      .get(`${API_URL}/products`, { searchParams })
      .json();

    return response as ProductPage;
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`products`],
    queryFn: () => fetchProducts(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useProductSpecific = (id: string) => {
  const api = useApi();

  const fetchProduct = async (): Promise<Product> => {
    const response = await api.get(`${API_URL}/products/${id}`).json();

    return response as Product;
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`products/${id}`],
    queryFn: () => fetchProduct(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useCustomer = () => {
  const api = useApi();
  const { user } = useEasyAuth();

  const sub = useMemo(() => {
    return user?.profile.sub;
  }, [user]);

  const fetchCustomer = async (): Promise<Customer> => {
    const searchParams = new URLSearchParams();
    if (sub) {
      searchParams.set("keycloak_id", sub);
    }
    const response = await api
      .get(`${API_URL}/customers`, { searchParams })
      .json();

    return (response as Customer[])[0] as Customer;
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`customer-specific`],
    queryFn: () => fetchCustomer(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useOrders = ({ page, limit }: PageableProps) => {
  const api = useApi();
  const { data: customer } = useCustomer();

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const fetchOrders = async (): Promise<CustomerOrderPage> => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());

    const response = await api
      .get(`${API_URL}/customers/${customerId}/orders`, { searchParams })
      .json();

    return response as CustomerOrderPage;
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`orders/${customerId}`],
    queryFn: () => fetchOrders(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};
