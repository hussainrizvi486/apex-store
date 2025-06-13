import React from "react"
import { Routes, Route, Outlet, useRoutes } from "react-router-dom"

import { CartPage } from "./features/cart/pages/index"
import { RegisterPage } from "./features/auth/pages/register"
import { AuthRoutes } from "./routes/auth"
import { Header } from "@components/layouts"

const LoginPage = React.lazy(() => import("@features/auth/pages/login.tsx"));
const HomePage = React.lazy(() => import("@features/product/pages/home/index"));
// const NotFound = React.lazy(() => import("./pages/404"));
const SearchPage = React.lazy(() => import("@features/product/pages/search/index"));

import { routes as AdminRoutes } from "@features/admin/routes"
import { routes as CustomerRoutes } from "@features/customer/routes"

const AdminModule = () => {
  const routes = useRoutes(AdminRoutes);
  return routes
}

const CustomerModule = () => {
  return useRoutes(CustomerRoutes);
}


function Application() {

  return (
    <>

      <AdminModule />
      <CustomerModule />
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>

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

      </Routes>
    </>
  )
}

export default Application
