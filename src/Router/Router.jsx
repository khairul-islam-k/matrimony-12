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
import EditBiodata from "../pages/dashboard/EditBiodata/EditBiodata";
import MyFavoriteBiodata from "../pages/dashboard/MyFavoriteBiodata/MyFavoriteBiodata";
import ViewBiodata from "../pages/dashboard/ViewBiodata/ViewBiodata";
import ApprovedPremium from "../pages/dashboard/ApprovedPremium/ApprovedPremium";
import PremiumApproval from "../pages/dashboard/PremiumAproval/PremiumApproval";
import UserRout from "../Routes/UserRout";
import MyContactApproval from "../pages/dashboard/Admin/MyContactApproval/MyContactApproval";
import CreateGotMarried from "../pages/dashboard/CreateGotMarried/CreateGotMarried";
import ContactUs from "../pages/ContactUs/ContactUs";
import HomeDashboard from "../pages/dashboard/HomeDashboard/HomeDashboard";
import SuccessStoryAdmin from "../pages/dashboard/Admin/SuccessStory/SuccessStoryAdmin";
import Demo from "../pages/dashboard/Admin/Demo/Demo";
import ManageAllBioData from "../pages/dashboard/Admin/ManageAllBioData/ManageAllBioData";


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
        path: 'contact',
        Component: ContactUs
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
        index: true,
        Component: HomeDashboard
      },
      {
        path: 'createBiodata',
        Component: CreateBiodata
      },
      {
        path: 'editBiodata',
        element: <EditBiodata></EditBiodata>
      },
      {
        path: 'manage',
        element: <AdminRout><ManageUser></ManageUser></AdminRout>
      },
      {
        path: 'myRequest',
        element: <UserRout><MyRequestContact></MyRequestContact></UserRout>
      },
      {
        path: 'favorite',
        element: <UserRout><MyFavoriteBiodata></MyFavoriteBiodata></UserRout>
      },
      {
        path: 'viewBiodata',
        element: <UserRout><ViewBiodata></ViewBiodata></UserRout>
      },
      {
        path: 'gotMarried',
        element: <UserRout><CreateGotMarried></CreateGotMarried></UserRout>
      },
      {
        path: 'approvedContactRequest',
        element: <AdminRout><ApprovedRequest></ApprovedRequest></AdminRout>
      },
      {
        path: 'myContactApproval',
        element: <AdminRout><MyContactApproval></MyContactApproval></AdminRout>
      },
      {
        path: 'approvedPremium',
        element: <AdminRout><ApprovedPremium></ApprovedPremium></AdminRout>
      },
      {
        path: 'premiumApproval',
        element: <AdminRout><PremiumApproval></PremiumApproval></AdminRout>
      },
      {
        path: 'successStory',
        element: <AdminRout><SuccessStoryAdmin></SuccessStoryAdmin></AdminRout>
      },
      {
        path: 'manageAllBioData',
        element: <AdminRout><ManageAllBioData></ManageAllBioData></AdminRout>
      },
    ]
  },
  {
    path: '*',
    Component: Forbidden
  }
]);