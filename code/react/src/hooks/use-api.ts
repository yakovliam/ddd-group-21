import ky, { KyResponse } from "ky";
import useEasyAuth from "./use-easy-auth";
import { Customer } from "@/types/customer";
import { CustomerOrder, CustomerOrderPage } from "@/types/customerorder";
import { CreateProduct, Product, ProductPage } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Cart } from "@/types/cart";
import { CreditCard } from "@/types/creditcard";
import { Address } from "@/types/address";
import { Warehouse } from "@/types/warehouse";
import { Supplier } from "@/types/supplier";
import { SupplierProduct } from "@/types/supplierproduct";
import { Stock } from "@/types/stock";

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
  _onSuccess: (data: Product) => void,
  _onError: (message: string) => void
) => {
  const api = useApi();

  const createProduct = async (product: CreateProduct) => {
    const response = await api.post(`${API_URL}/staff/products`, {
      json: product,
      throwHttpErrors: false,
    });

    if (!response.ok) {
      throw new Error("Failed to create product: " + (await response.text()));
    }

    return (await response.json()) as Product;
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

export const useDeleteProduct = (
  _onSuccess: () => void,
  _onError: (message: string) => void
) => {
  const api = useApi();

  const deleteProduct = async (id: number) => {
    const response = await api.delete(`${API_URL}/staff/products/${id}`, {
      throwHttpErrors: false,
    });

    if (!response.ok) {
      throw new Error("Failed to delete product: " + (await response.text()));
    }

    return;
  };

  const mutation = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: deleteProduct,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};

export const useDeleteCreditCard = (
  _onSuccess: () => void,
  _onError: (message: string) => void
) => {
  const api = useApi();
  const { data: customer } = useCustomer();

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const deleteCreditCard = async (id: number) => {
    const response = await api.delete(
      `${API_URL}/customers/${customerId}/creditcards/${id}`,
      {
        throwHttpErrors: false,
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to delete credit card: " + (await response.text())
      );
    }

    return;
  };

  const mutation = useMutation({
    mutationKey: ["delete-credit-card"],
    mutationFn: deleteCreditCard,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};

export const useSetCreditCardDefault = (
  _onSuccess: () => void,
  _onError: (message: string) => void
) => {
  const api = useApi();
  const { data: customer } = useCustomer();

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const setCreditCardDefault = async (id: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set("action", "set-default");
    const response = await api.post(
      `${API_URL}/customers/${customerId}/creditcards/${id}`,
      {
        throwHttpErrors: false,
        searchParams,
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to set credit card default: " + (await response.text())
      );
    }

    return;
  };

  const mutation = useMutation({
    mutationKey: ["set-credit-card-default"],
    mutationFn: setCreditCardDefault,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};

export const useAddresses = () => {
  const api = useApi();
  const { data: customer } = useCustomer(); // TODO: use customer id

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const fetchAddresses = async (): Promise<Address[]> => {
    const response = await api
      .get(`${API_URL}/customers/${customerId}/addresses`)
      .json();

    return response as Address[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => fetchAddresses(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useDeleteAddress = (
  _onSuccess: () => void,
  _onError: (message: string) => void
) => {
  const api = useApi();
  const { data: customer } = useCustomer();

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const deleteAddress = async (id: number) => {
    const response = await api.delete(
      `${API_URL}/customers/${customerId}/addresses/${id}`,
      {
        throwHttpErrors: false,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete address: " + (await response.text()));
    }

    return;
  };

  const mutation = useMutation({
    mutationKey: ["delete-address"],
    mutationFn: deleteAddress,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};

export const useSetAddressDefault = (
  _onSuccess: () => void,
  _onError: (message: string) => void
) => {
  const api = useApi();
  const { data: customer } = useCustomer();

  const customerId = useMemo(() => {
    return customer?.id;
  }, [customer]);

  const setAddressDefault = async (id: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set("action", "set-default");
    const response = await api.post(
      `${API_URL}/customers/${customerId}/addresses/${id}`,
      {
        throwHttpErrors: false,
        searchParams,
      }
    );
    if (!response.ok) {
      throw new Error(
        "Failed to set address default: " + (await response.text())
      );
    }

    return;
  };

  const mutation = useMutation({
    mutationKey: ["set-address-default"],
    mutationFn: setAddressDefault,
    onSuccess: _onSuccess,
    onError: (error) => {
      _onError(error.message);
    },
  });

  return mutation;
};

export const useWarehouses = () => {
  const api = useApi();

  const fetchWarehouses = async (): Promise<Warehouse[]> => {
    const response = await api
      .get(`${API_URL}/staff/logistics/warehouses`)
      .json();

    return response as Warehouse[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["warehouses"],
    queryFn: () => fetchWarehouses(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useSuppliers = () => {
  const api = useApi();

  const fetchSuppliers = async (): Promise<Supplier[]> => {
    const response = await api
      .get(`${API_URL}/staff/logistics/suppliers`)
      .json();

    return response as Supplier[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetchSuppliers(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useSupplierProducts = () => {
  const api = useApi();

  const fetchSupplierProducts = async (): Promise<SupplierProduct[]> => {
    const response = await api
      .get(`${API_URL}/staff/logistics/supplier-products`)
      .json();

    return response as SupplierProduct[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["supplier-products"],
    queryFn: () => fetchSupplierProducts(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useStocks = () => {
  const api = useApi();

  const fetchStocks = async (): Promise<Stock[]> => {
    const response = await api.get(`${API_URL}/staff/logistics/stocks`).json();

    return response as Stock[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["stocks"],
    queryFn: () => fetchStocks(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useStaffProducts = () => {
  const api = useApi();

  const fetchStaffProducts = async (): Promise<Product[]> => {
    const response = await api
      .get(`${API_URL}/staff/logistics/products`)
      .json();

    return response as Product[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["staff-products"],
    queryFn: () => fetchStaffProducts(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};

export const useStaffCustomerOrders = () => {
  const api = useApi();

  const fetchStaffCustomerOrders = async (): Promise<CustomerOrder[]> => {
    const response = await api
      .get(`${API_URL}/staff/logistics/customer-orders`)
      .json();

    return response as CustomerOrder[];
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["staff-customer-orders"],
    queryFn: () => fetchStaffCustomerOrders(),
  });

  return {
    data,
    isSuccess,
    refetch,
  };
};
