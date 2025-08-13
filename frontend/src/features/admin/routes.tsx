import * as React from "react";
import { RouteObject } from "react-router-dom";
import { Layout } from "./layouts/sidebar-layout";

const Home = React.lazy(() => import("./pages/home/index"));
const ProductList = React.lazy(() => import("./pages/product/list"));
const OrderList = React.lazy(() => import("./pages/orders/list"));
const OrderForm = React.lazy(() => import("./pages/orders/form"));
const ProductForm = React.lazy(() => import("./pages/product/form"));



export const routes: RouteObject[] = [
    {
        path: "/admin",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products/list", element: <ProductList /> },
            { path: "orders/list", element: <OrderList /> },
            { path: "product/create", element: <ProductForm /> },
            { path: "product/:id", element: <ProductForm /> },
            { path: "order/create", element: <OrderForm /> },

        ]
    },
]
