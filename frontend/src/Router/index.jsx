import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import Auth from "../Pages/Auth";
import NotFound from "../NotFound";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>

            },
            {
                path:'auth',
                element:<Auth/>
            },
            {
                path:'*',
                element:<NotFound/>
            }
        ]
    }
])

export default router