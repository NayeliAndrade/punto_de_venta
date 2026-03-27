import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AddProduct from "./pages/AddProduct"
import AddUser from "./pages/AddUser"
import AddCategory from "./pages/AddCategory"
import Pay from "./pages/Pay"
import ProductList from "./pages/ProductList"
import CategoryList from "./pages/CategoryList"
import Layout from "./layout/Layout"
import LayoutLogin from "./layout/LayoutLogin"
import EditCategory from "./pages/EditCategory"
import EditProduct from "./pages/EditProduct"
import UserList from "./pages/UserList"
import EditUser from "./pages/EditUser"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LayoutLogin><Login /></LayoutLogin>} />
      <Route path="/product/add" element={<Layout><AddProduct /></Layout >} />
      <Route path="/product/list" element={<Layout><ProductList /></Layout>} />
      <Route path="/product/edit/:id" element={<Layout><EditProduct /></Layout>} />
      <Route path="/user/add" element={<Layout><AddUser /></Layout>} />
      <Route path="/category/add" element={<Layout><AddCategory /></Layout>} />
      <Route path="/category/list" element={<Layout><CategoryList /></Layout>} />
      <Route path="/category/edit/:id" element={<Layout><EditCategory /></Layout>} />
      <Route path="/category/delete/:id" element={<Layout><EditCategory /></Layout>} />
      <Route path="/user/list" element={<Layout><UserList /></Layout>} />
      <Route path="/user/edit/:id" element={<Layout><EditUser /></Layout>} />
      <Route path="/pay" element={<Layout><Pay /></Layout>} />
    </Routes>
  )
}

export default App
