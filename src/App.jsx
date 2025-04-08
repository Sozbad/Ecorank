
import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const placeholderProducts = [
      { id: 1, name: "Eco-Friendly Bike Chain Lube", ecoScore: "Excellent", image: "image_url_1", sdsUrl: "sds_link_1" },
      { id: 2, name: "Organic Shampoo", ecoScore: "Good", image: "image_url_2", sdsUrl: "sds_link_2" },
      { id: 3, name: "Sustainable Cleaning Spray", ecoScore: "Poor", image: "image_url_3", sdsUrl: "sds_link_3" }
    ];
    setProducts(placeholderProducts);
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h1>EcoRank - Discover Eco-Friendly Products</h1>
        <input
          type="text"
          placeholder="Search for eco-friendly products"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>
      
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Eco Score: {product.ecoScore}</p>
            <a href={product.sdsUrl} target="_blank" rel="noopener noreferrer">View SDS</a>
          </div>
        ))}
      </div>
    </div>
  );
}
