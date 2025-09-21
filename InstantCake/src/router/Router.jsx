import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/menuPage/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import PrivateRoute from "../PrivateRouter/PrivateRouter";
import Login from "../components/Login";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import Order from "../pages/dashboard/Order"
import ManageBookings from "../pages/dashboard/admin/ManageBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu/>,
      },
      {
        path: "/cart-page",
        element: <CartPage/>
      },
      {
        path: "/order",
        element: <Order/>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
      },
      {
        path: "/cart-page",
        element: <CartPage/>
      },
      {
        path: "/process-checkout",
        element : <Payment/>
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  // admin routes 

  {
    path : "/dashboard",
    element : <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children : [
    {
      path : "",
      element: <Dashboard/>
    },
    {
      path : "users",
      element: <Users/>
    },
    {
      path: 'add-menu',
      element: <AddMenu/>
    },
    {
      path: 'manage-bookings',
      element: <ManageBookings/>
    },
    {
      path: 'manage-items',
      element: <ManageItems/>
    },
    // {
    //       path: "update-menu/:id",
    //       element: <UpdateMenu/>,
    //       loader: ({params}) => fetch(`http://localhost:3000/menu/${params.id}`)
    // }
  ]
  }

]);

export default router;
