import React from "react"
import { BrowserRouter as Router, Routes, Route, Outlet, useRoutes } from "react-router-dom"

import { CartPage } from "./features/cart/pages/index"
// import { LoginPage } from "./features/auth/pages/login"

import { RegisterPage } from "./features/auth/pages/register"
import { AuthRoutes } from "./routes/auth"

import { AddAddress } from "@features/customer/pages/profile/add-address";
import { Header } from "@components/layouts"
import { Layout } from "@features/admin/layouts/sidebar-layout"
import { OrdersDetail } from "@features/customer/pages/profile/order-detail"


const LoginPage = React.lazy(() => import("@features/auth/pages/login.tsx"));
const HomePage = React.lazy(() => import("@features/product/pages/home/index"));
const NotFound = React.lazy(() => import("./pages/404"));
const ProfilePage = React.lazy(() => import("@features/customer/pages/profile/index"));
const SearchPage = React.lazy(() => import("@features/product/pages/search/index"));

// const AdminProductList = React.lazy(() => import("./features/admin/pages/product/list"));
// const AdminProductCreate = React.lazy(() => import("./features/admin/pages/product/create"));
// const AdminHome = React.lazy(() => import("./features/admin/pages/home/index"));

import { routes as AdminRoutes } from "@features/admin/routes"
const AdminModule = () => {
  const routes = useRoutes(AdminRoutes);
  return routes
}
function Application() {

  return (
    <Router>
      <AdminModule />

      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="*" element={<NotFound />} /> */}

        <Route path="/profile/address/add" element={<AddAddress />} />
        <Route path="/profile/orders/detail" element={<OrdersDetail />} />
        {/* <Route path="/product" element={<ProductPage />} /> */}
        <Route path="/cart" element={<CartPage />} />

        <Route element={<>
          <Header />
          <Outlet />
        </>}>

          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Routes >

    </Router >
  )
}

export default Application
