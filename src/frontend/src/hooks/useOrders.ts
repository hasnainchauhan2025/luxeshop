import type { Order } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MOCK_ORDERS: Order[] = [
  {
    id: "ord_001",
    userId: "demo-user",
    items: [],
    total: 849,
    status: "delivered",
    shippingAddress: {
      name: "Alex Morgan",
      line1: "123 Lakeview Dr",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US",
    },
    paymentMethod: "stripe",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
];

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders", "mine"],
    queryFn: async () => MOCK_ORDERS,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAllOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders", "all"],
    queryFn: async () => MOCK_ORDERS,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      _orderData: Omit<Order, "id" | "userId" | "createdAt" | "updatedAt">,
    ) => {
      throw new Error("Backend not yet connected");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_args: { orderId: string; status: Order["status"] }) => {
      throw new Error("Backend not yet connected");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}
