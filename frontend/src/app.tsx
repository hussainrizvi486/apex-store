import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PublicRoutes } from "./routes/public"
import { CartPage } from "./features/cart/pages/index"
// import { ProductPage } from "./features/product/pages/index"
// import { LoginPage } from "./features/auth/pages/login"

import { RegisterPage } from "./features/auth/pages/register"
import React from "react"
import { AuthRoutes } from "./routes/auth"



const LoginPage = React.lazy(() => import("@features/auth/pages/login"))
const HomePage = React.lazy(() => import("@features/product/pages/index"));

function Application() {
  return (
    <Router>
      <AuthRoutes>
        <Routes>
          {/* Add any authorized routes here if needed */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>

      </AuthRoutes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

    </Router>
  )
}

export default Application
