import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductList, CreateProduct, ProductDetail } from "../views/";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Router>
  );
};

export default Routing;
