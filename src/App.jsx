import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cartpage from "./pages/Cart";
export default function App() {
  return (
    // Layout
    // Header
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* // /(root path) -> homepage // / // footer */}
        <main className="flex grow p-4 bg-gray-100 justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/cart" element={<Cartpage/>}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
