
import React, { useState } from "react";
import './App.css';

function App() {
  const [search, setSearch] = useState("");
  const [products] = useState([
    { id: 1, name: "Eco-Friendly Bike Chain Lube", ecoScore: "Excellent" },
    { id: 2, name: "Organic Shampoo", ecoScore: "Good" },
    { id: 3, name: "Sustainable Cleaning Spray", ecoScore: "Poor" }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>EcoRank</h1>
      <input
        type="text"
        placeholder="Search for eco-friendly products"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>Eco Score: {product.ecoScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
