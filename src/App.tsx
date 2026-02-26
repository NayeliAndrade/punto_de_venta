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
import EditCategory from "./pages/editCategory"
import EditProduct from "./pages/EditProduct"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LayoutLogin><Login /></LayoutLogin>} />
      <Route path="/addProduct" element={<Layout><AddProduct /></Layout >} />
      <Route path="/productList" element={<Layout><ProductList /></Layout>} />
      <Route path="/editProduct/:id" element={<Layout><EditProduct /></Layout>} />
      <Route path="/addUser" element={<Layout><AddUser /></Layout>} />
      <Route path="/addCategory" element={<Layout><AddCategory /></Layout>} />
      <Route path="/categoryList" element={<Layout><CategoryList /></Layout>} />
      <Route path="/editCategory/:id" element={<Layout><EditCategory /></Layout>} />
      <Route path="/deleteCategory/:id" element={<Layout><EditCategory /></Layout>} />
      <Route path="/pay" element={<Layout><Pay /></Layout>} />
    </Routes>
  )
}

export default App
