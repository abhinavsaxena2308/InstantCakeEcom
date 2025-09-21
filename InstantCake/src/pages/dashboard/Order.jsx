import React from 'react'
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { FaContao, FaPhone } from 'react-icons/fa';

const Order = () => {
  const handleContact = () =>{
  alert("Call on 8081542031 ")
  }
  const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  
    const token = localStorage.getItem('access-token')
    console.log(token)
    const { data: orders = [], refetch } = useQuery({
      queryKey: ["orders", user?.email],
      enabled: !!user?.email, // ✅ only run when user.email exists
      queryFn: async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`,{
          headers: {
            authorization : `Bearer ${token}`
          }
        });
        return res.data;
      },
    });
  
  console.log(orders)

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt)
    return createdAtDate.toLocaleDateString()
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your<span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
         {orders.length > 0 ? (
                <div>
                  <div className="">
                    <div className="overflow-x-auto">
                      <table className="table">
                        {/* head */}
                        <thead className="bg-green text-white rounded-sm ">
                          <tr >
                            <th>#</th>
                            <th>Order Date</th>
                            <th>Transaction ID</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((item, index) => (
                            <tr key={item._id || index}>
                              <td>{index + 1}</td>
                              <td>
                                {formatDate(item.createdAt)}
                              </td>
                              <td className="font-medium">{item.transactionId}</td>
                              <td>
                                {item.price}
                              </td>
                            <td>{item.status}</td>
                              <td>
                                <button onClick={handleContact} className='bg-red rounded-lg w-full text-white'>
                                  Contact
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {/* foot */}
                      </table>
                    </div>
                  </div>
                  <hr />
                  
                </div>
              ) : (
                <div className="text-center mt-20">
                  <p>Cart is empty. Please add products.</p>
                  <Link to="/menu">
                    <button className="btn bg-green text-white mt-3">
                      Back to Menu
                    </button>
                  </Link>
                </div>
              )}
      </div>
    </div>
  )
}

export default Order