import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email, // only run when user.email exists
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
