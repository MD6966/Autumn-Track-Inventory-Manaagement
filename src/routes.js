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
import UserDashboard from "./views/User/UserDashboard";
import UserDashboardDefault from "./views/User/components/UserDashboardDefault";
import UserFacilities from "./views/User/components/UserFacilities";
import Invoices from "./views/User/components/Invoices";
import Users from "./views/Admin/components/Users";
import ManageInvoices from "./views/Admin/components/Invoices/ManageInvoices";
import ManageRolesPermissions from "./views/Admin/components/Users/components/ManageRoles&Permissions";
import NewInvoices from "./views/Admin/components/NewInvoices";
import ApprByAdm from "./views/Admin/components/ApprByAdm";
import ApprByRA from "./views/Admin/components/ApprByRA";

export default function Router() {
    let element = useRoutes([
    //     {
    //     path:'/',
    //     element : <Landing /> ,
    //    },
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
        path:'/',
        element: <AdminLogin /> 
       },
       {
        path:'/admin', element: <Dashboard />,
        children:[
            {path:'dashboard', element: <DashboardAdmin /> },
            {path:'invoices', element:<ManageInvoices/>},
            {path:'facilities', element:<Facilities />},
            {path:'categories', element:<Categories />},
            {path:'vendors', element:<Vendors />},
            {path:'users', element:<Users />},
            {path:'manage-roles', element: <ManageRolesPermissions />},
            {path:'new-invoices', element: <NewInvoices />},
            {path:'approved-by-admin', element: <ApprByAdm />},
            {path:'approved-by-ra', element: <ApprByRA />},


        ]
       },
       {path:'/user', element:<UserDashboard />,
        children:[
            {path:'dashboard', element: <UserDashboardDefault /> },
            {path:'invoices', element: <Invoices />},
            {path:'facilities', element:<UserFacilities />},
        ]
    
        },
        {
            path:'/manage-roles', element: <ManageRolesPermissions />
        },
       {
        path:'*',
        element: <ErrorPage /> 
       }
    ])
    return element
}