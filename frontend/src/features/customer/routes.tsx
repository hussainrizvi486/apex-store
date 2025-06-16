import * as React from "react";
import { RouteObject } from "react-router-dom";
import { Layout } from "./layout";


const Profile = React.lazy(() => import("./pages/profile/index"));
const EditProfile = React.lazy(() => import("./pages/profile/edit"));
const OrderList = React.lazy(() => import("./pages/orders/list"));
const AddressList = React.lazy(() => import("./pages/address/index"));
const AddressForm = React.lazy(() => import("./pages/address/form"));
export const routes: RouteObject[] = [
    {
        path: "/profile",
        element: <Layout />,

        children: [
            { index: true, element: <Profile /> },
            { path: "edit", element: <EditProfile /> },
            { path: "orders", element: <OrderList /> },
            { path: "address", element: <AddressList /> },
            { path: "address/:action/:id", element: <AddressForm /> },
            { path: "address/:action", element: <AddressForm /> },
        ]
    },
]