import { Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "./styling/main.scss";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
