import ky, { KyResponse } from "ky";
import useEasyAuth from "./use-easy-auth";
import { Customer } from "@/types/customer";
import { CustomerOrder, CustomerOrderPage } from "@/types/customerorder";
import { CreateProduct, Product, ProductPage } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Cart } from "@/types/cart";
import { CreditCard } from "@/types/creditcard";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useApi = () => {
  const { authContext } = useEasyAuth();

  const api = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          if (authContext.user) {
            request.headers.set(
              "Authorization",
              `Bearer ${authContext.user?.access_token}`
            );
          }
        },
      ],
    },
  });

  return api;
};

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
    queryKey: [`orders`],
    queryFn: () => fetchOrders(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useSubmitOrder = (
  _onSuccess: (data: CustomerOrder) => void,
  _onError: (message: string) => void
) => {
  const api = useApi();
  const { data: customer } = useCustomer();

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const submitOrder = async (cart: Cart) => {
    const response: KyResponse = await api.post(
      `${API_URL}/customers/${customerId}/orders`,
      {
        json: cart,
        throwHttpErrors: false,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit order: " + (await response.text()));
    }

    return (await response.json()) as CustomerOrder;
  };

  const mutation = useMutation({
    mutationKey: ["submit-order"],
    mutationFn: submitOrder,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};

export const useCreditCards = () => {
  const api = useApi();
  const { data: customer } = useCustomer();

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const fetchCreditCards = async (): Promise<CreditCard[]> => {
    const response = await api
      .get(`${API_URL}/customers/${customerId}/creditcards`)
      .json();

    return response as CreditCard[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["credit-cards"],
    queryFn: () => fetchCreditCards(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useCreateProduct = (
  _onSuccess: (data: string) => void,
  _onError: (message: string) => void
) => {
  const api = useApi();

  const createProduct = async (product: CreateProduct) => {
    const response: KyResponse = await api.post(`${API_URL}/products`, {
      json: product,
      throwHttpErrors: false,
    });

    if (!response.ok) {
      throw new Error("Failed to create product: " + (await response.text()));
    }

    return (await response.json()) as string;
  };

  const mutation = useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};
export const useModifyProduct = (
  _onSuccess: (data: string) => void,
  _onError: (message: string) => void
) => {
  const api = useApi();

  const modifyProduct = async (product: CreateProduct) => {
    const response: KyResponse = await api.post(
      `${API_URL}/products/${product.id}`,
      {
        json: product,
        throwHttpErrors: false,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to modify product: " + (await response.text()));
    }

    return (await response.json()) as string;
  };

  const mutation = useMutation({
    mutationKey: ["modify-product"],
    mutationFn: modifyProduct,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};

export const useStaffOrders = ({ page, limit }: PageableProps) => {
  const api = useApi();

  const fetchOrders = async (): Promise<CustomerOrderPage> => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());

    const response = await api
      .get(`${API_URL}/staff/orders`, { searchParams })
      .json();

    return response as CustomerOrderPage;
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`staff-orders`],
    queryFn: () => fetchOrders(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};
