import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Biodatas from "../pages/Biodatas/Biodatas";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthLayout from "../layout/AuthLayout";
import RegistrationForm from "../pages/Auth/RegistrationForm";
import LoginForm from "../pages/Auth/LoginForm";
import DashboardLayout from "../layout/DashboardLayout";
import CreateBiodata from "../pages/dashboard/CreateBiodata/CreateBiodata";
import PrivateRoute from "../Routes/PrivateRoute";
import BiodataDetails from "../pages/Shared/BiodataDetails";
import ManageUser from "../pages/dashboard/Admin/ManageUser/ManageUser";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRout from "../Routes/AdminRout";
import YourPayment from "../pages/YourPayment/YourPayment";
import MyRequestContact from "../pages/dashboard/user/MyRequestContact/MyRequestContact";
import ApprovedRequest from "../pages/dashboard/Admin/ManageUser/ApprovedRequest/ApprovedRequest";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'biodatas',
        Component: Biodatas
      },
      {
        path: 'aboutUs',
        Component: AboutUs
      },
      {
        path: 'biodata/:id',
        element: <PrivateRoute><BiodataDetails></BiodataDetails></PrivateRoute>
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute><YourPayment></YourPayment></PrivateRoute>
      },
      {
        path: 'forbidden',
        Component: Forbidden
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'register',
        Component: RegistrationForm
      },
      {
        path: 'login',
        Component: LoginForm
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'createBiodata',
        Component: CreateBiodata
      },
      {
        path: 'manage',
        element: <AdminRout><ManageUser></ManageUser></AdminRout>
      },
      {
        path: 'myRequest',
        element: <MyRequestContact></MyRequestContact>
      },
      {
        path:'approvedContactRequest',
        element: <AdminRout><ApprovedRequest></ApprovedRequest></AdminRout>
      }
    ]
  }
]);