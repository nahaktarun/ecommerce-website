import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
export default function App() {
  return (
    // Layout
    // Header
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* // /(root path) -> homepage // / // footer */}
        <main className="flex grow p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Products />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
