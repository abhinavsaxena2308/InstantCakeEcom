import React, { useState, useEffect } from "react";
import useMenu from "../../../hooks/useMenu";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const [localMenu, setLocalMenu] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Initialize local menu state
  useEffect(() => {
    setLocalMenu(menu);
  }, [menu]);

  // Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-menu/${id}`);
  };

  // Delete item
  const handleDeleteItem = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/menu/${itemId}`);
          // Remove the deleted item from local state for instant UI update
          setLocalMenu((prev) => prev.filter((item) => item._id !== itemId));

          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete item.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-orange-900">Menu Items</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {localMenu.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="btn btn-ghost btn-xs bg-orange-500 text-white"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn btn-ghost btn-xs text-red"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
