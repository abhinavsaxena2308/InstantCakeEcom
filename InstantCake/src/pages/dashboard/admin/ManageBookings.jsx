import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth("");
  const axiosSecure = useAxiosSecure("");

  // Fetch all orders/payments
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch cart items
  const { data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  // Compute totals
  const totalOrders = orders.length;
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalSpent = orders.reduce((acc, order) => acc + order.price, 0);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">

      {/* Recent Orders Table */}
      <div className="">
        <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-orange-900">Recent Bookings</span>
      </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.transactionId || index}>
                  <td>{index + 1}</td>
                  <td>{order.transactionId}</td>
                  <td>{order.itemName.join(", ")}</td>
                  <td>{order.quantity}</td>
                  <td>${order.price}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
