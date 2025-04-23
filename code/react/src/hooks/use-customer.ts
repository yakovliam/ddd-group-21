import { useCustomer as useCustomerApi } from "@/api/api";

const useCustomer = () => {
  const { data, isSuccess, refetch } = useCustomerApi();

  return {
    data: data?.id,
    isSuccess,
    refetch,
  };
};

export default useCustomer;
