import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem('access-token')
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email, // ✅ only run when user.email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`,{
         
        headers: { Authorization: `Bearer ${token}` } // space after Bearer
      
      });
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
