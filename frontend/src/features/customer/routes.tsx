import * as React from "react";
import { RouteObject } from "react-router-dom";

import { Menu as MenuIcon } from "lucide-react";
import { Outlet } from "react-router-dom";

const Profile = React.lazy(() => import("./pages/profile/index"));
const EditProfile = React.lazy(() => import("./pages/profile/edit"));
const OrderList = React.lazy(() => import("./pages/orders/list"));

const ProfileLayout = () => {
    return (
        <div>
            <header className="flex justify-between items-center px-2 py-2 bg-white shadow-md">
                <h1 className="text-lg font-bold font-poppins"><span className="text-primary">APEX</span>Store</h1>
                <div>
                    <MenuIcon className="size-6" />
                </div>
            </header>
            <div className="max-w-6xl mx-auto">
                <Outlet />
            </div>
        </div>
    )
}
export const routes: RouteObject[] = [
    {
        path: "/profile",
        element: <ProfileLayout />,

        children: [
            { index: true, element: <Profile /> },
            { path: "edit", element: <EditProfile /> },
            { path: "orders", element: <OrderList /> },
        ]
    },
]