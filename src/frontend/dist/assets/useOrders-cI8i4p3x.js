import { u as useQuery, a as useMutation } from "./useMutation-CVK8QqpV.js";
import { az as useQueryClient } from "./index-CgQGP8Uk.js";
const MOCK_ORDERS = [
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
      country: "US"
    },
    paymentMethod: "stripe",
    createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1e3 * 60 * 60 * 24 * 3
  }
];
function useMyOrders() {
  return useQuery({
    queryKey: ["orders", "mine"],
    queryFn: async () => MOCK_ORDERS,
    staleTime: 1e3 * 60 * 2
  });
}
function useAllOrders() {
  return useQuery({
    queryKey: ["orders", "all"],
    queryFn: async () => MOCK_ORDERS
  });
}
function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_args) => {
      throw new Error("Backend not yet connected");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] })
  });
}
export {
  useAllOrders as a,
  useUpdateOrderStatus as b,
  useMyOrders as u
};
