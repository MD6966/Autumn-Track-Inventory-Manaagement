import { useRoutes } from "react-router-dom/dist";
import AuthLayout from "./layouts/Auth/AuthLayout";
import Home from "./layouts/Home";
import Landing from "./layouts/Landing/Landing";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import AdminLogin from "./views/Admin/Auth/AdminLogin";
import ErrorPage from "./components/ErrorBoundary/components/ErrorPage";
import Dashboard from "./layouts/Admin/Dashboard";
import DashboardAdmin from "./views/Admin/components/Dashboard/DashboardAdmin";
import Facilities from "./views/Admin/components/Facilities";
import Categories from "./views/Admin/components/Categories";
import Vendors from "./views/Admin/components/Vendors";

export default function Router() {
    let element = useRoutes([
        {
        path:'/',
        element : <Landing /> ,
       },
       {
        path:'auth',
        element: <AuthLayout />, 
        children : [
            { path: 'login', element: <Login />},
            { path: 'register' , element: <SignUp /> }
        ]
       },
       {
        path:'/home',
        element: <Home />,
       },
       {
        path:'/admin-login',
        element: <AdminLogin /> 
       },
       {
        path:'/admin', element: <Dashboard />,
        children:[
            {path:'dashboard', element: <DashboardAdmin /> },
            {path:'facilities', element:<Facilities />},
            {path:'categories', element:<Categories />},
            {path:'vendors', element:<Vendors />}
        ]
       },
       {
        path:'*',
        element: <ErrorPage /> 
       }
    ])
    return element
}