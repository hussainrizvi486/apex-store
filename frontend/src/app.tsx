import React from "react"
import { Routes, Route, Outlet, useRoutes, Link } from "react-router-dom"

import { RegisterPage } from "./features/auth/pages/register"
import { AuthRoutes } from "./routes/auth"
import { Header } from "@components/layouts"

const LoginPage = React.lazy(() => import("@features/auth/pages/login.tsx"));
const HomePage = React.lazy(() => import("@features/product/pages/home/index"));
const CartPage = React.lazy(() => import("./features/cart/pages/index"));
// const NotFound = React.lazy(() => import("./pages/404"));
const SearchPage = React.lazy(() => import("@features/product/pages/search/index"));
const ProductDetailPage = React.lazy(() => import("@features/product/pages/detail/index"))
import { routes as AdminRoutes } from "@features/admin/routes"
import { routes as CustomerRoutes } from "@features/customer/routes"
import { Linkedin, Twitter } from "lucide-react"
import { DataForm, DataFormProvider } from "@components/data-form/main"
import { formField } from "@features/admin/pages/product/form"
import { TypeField } from "@components/data-form"

const AdminModule = () => {
  const routes = useRoutes(AdminRoutes);
  return routes
}

const CustomerModule = () => {
  return useRoutes(CustomerRoutes);
}



const TestCase = () => {
  let fields: TypeField[] = formField;

  return (

    <div className="p-4 max-w-6xl mx-auto">
      <DataFormProvider fields={fields} >
        <DataForm />
      </DataFormProvider>

    </div>
  )
}

function Application() {

  return (
    <>

      {/* <AdminModule />
      <CustomerModule /> */}
      <Routes>
        <Route path="/test" element={<TestCase />} />

        <Route element={<AuthRoutes />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>


        <Route element={<>
          <Header />
          <Outlet />

          <footer className="border-t p-2">
            <div className="grid justify-center">

              <div className="mb-4">
                <Link to="/">
                  <h1 className="text-2xl font-bold font-poppins"><span className="text-primary">APEX</span>Store</h1>
                </Link>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <Linkedin className="size-5" />
                  <Twitter className="size-5" />
                </div>
              </div>


              <div className="text-center">
                <div className="font-semibold">Discover</div>
                <div className="flex flex-col gap-1 mt-2">
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary">Your Account</Link>
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary">Your Orders</Link>
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary">About US</Link>
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary">FAQs</Link>
                </div>
              </div>
            </div>


            <div className="text-sm text-center pt-4">All Rights Reserved. Apex Store. &copy; 2025</div>
          </footer>
        </>}>

          <Route path="/product/:id" element={<ProductDetailPage />} />
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
