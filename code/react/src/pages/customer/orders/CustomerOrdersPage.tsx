import Input from "@/components/ui/Input";
import { useOrders } from "@/hooks/use-api";
import { CustomerOrder } from "@/types/customerorder";
import { useState } from "react";
import { useNavigate } from "react-router";

const CustomerOrdersPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isSuccess } = useOrders({
    page,
    limit,
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Orders Page</h1>

      <div className="w-full grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-4 col-span-1">
          <Input
            placeholder="Limit"
            onChange={(e) => {
              setLimit(Number(e.target.value));
            }}
          />

          <Input
            placeholder="Page"
            onChange={(e) => setPage(Number(e.target.value))}
          />
        </div>
        <div className="col-span-3">
          {isSuccess && (
            <div className="grid grid-cols-4 gap-4">
              {data?.content.map((order: CustomerOrder) => {
                return (
                  <OrderCard key={order.id} order={order} navigate={navigate} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({
  order,
  navigate,
}: {
  order: CustomerOrder;
  navigate: (path: string) => void;
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-blue-500 underline dark:text-white cursor-pointer"
          onClick={() => {
            navigate("/customer/orders/" + order.id);
          }}
        >
          {order.id}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ${order.totalAmount}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {new Date(order.orderDate).toDateString()}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          STATUS: {order.orderStatus}
        </p>
      </div>
    </div>
  );
};

export default CustomerOrdersPage;
