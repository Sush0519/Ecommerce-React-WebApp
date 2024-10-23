import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import SingleProduct from "./SingleProduct";
import Header from "./Header";

function App() {
  return (
    <div className="flex  flex-col">
      <Header />
      <Router>
        <Routes>
          {/* Home page with product list */}
          <Route path="/" element={<ProductList />} />

          {/* Single product page */}
          <Route path="/product/:productId" element={<SingleProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
