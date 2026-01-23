import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import AddProduct from "./AddProduct"
import AddUser from "./AddUser"
import AddCategory from "./AddCategory"
import Pay from "./Pay"
import AddProductList from "./AddproductList"
import CategoryList from "./CategoryList"


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/AddProductList" element={<AddProductList />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path="/addCategory" element={<AddCategory />} />
      <Route path="/categoryList" element={<CategoryList />} />
      <Route path="/pay" element={<Pay />} />
    </Routes>
  )
}

export default App
