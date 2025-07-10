import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Biodatas from "../pages/Biodatas/Biodatas";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthLayout from "../layout/AuthLayout";
import RegistrationForm from "../pages/Auth/RegistrationForm";
import LoginForm from "../pages/Auth/LoginForm";
import DashboardLayout from "../layout/DashboardLayout";


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
    Component: DashboardLayout
  }
]);