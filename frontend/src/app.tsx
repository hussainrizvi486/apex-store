import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PublicRoutes } from "./routes/public"
import { CartPage } from "./features/cart/pages/index"
import MoreProductsPage from "@features/product/pages/moreProductsPage"
import ProductPage from "@features/product/pages/productPage"
// import { LoginPage } from "./features/auth/pages/login"

import { RegisterPage } from "./features/auth/pages/register"
import React from "react"
import { AuthRoutes } from "./routes/auth"



const LoginPage = React.lazy(() => import("@features/auth/pages/login"))
const HomePage = React.lazy(() => import("@features/product/pages/home/index"));

function Application() {
  return (
    <Router>

      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<MoreProductsPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

    </Router>
  )
}

export default Application
