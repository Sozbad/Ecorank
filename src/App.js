import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { FaHome, FaUpload, FaExchangeAlt, FaHistory, FaUser } from "react-icons/fa";
import "./index.css";

const Home = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Welcome to EcoRank</h1>
    <input
      type="text"
      placeholder="Search a chemical, solvent or product..."
      className="w-full p-2 border rounded-lg"
    />
  </div>
);

const Upload = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Upload a Product</h1>
    <form className="space-y-4">
      <input type="text" placeholder="Product Name" className="w-full p-2 border rounded" />
      <input type="text" placeholder="Brand" className="w-full p-2 border rounded" />
      <textarea placeholder="Ingredients / Composition" className="w-full p-2 border rounded" />
      <input type="file" className="w-full" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
    </form>
  </div>
);

const Alternatives = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAlternative = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`https://us-central1-ecorank-15295.cloudfunctions.net/getProductAlternatives?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to fetch alternatives." });
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Find Safer Alternatives</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter product to replace..."
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={fetchAlternative}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      {result && result.error && <p className="text-red-500">{result.error}</p>}

      {result && !result.error && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="font-semibold">🔍 Suggested Alternative:</p>
          <p className="text-green-700 font-bold">{result.name}</p>
          <ul className="text-sm text-gray-700 list-disc ml-5">
            {result.reasons.map((reason, i) => <li key={i}>✅ {reason}</li>)}
          </ul>
          <p className="text-sm mt-2">EcoRank Score: <span className="font-bold text-green-600">{result.score}</span></p>
        </div>
      )}
    </div>
  );
};

const History = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Scan History</h1>
    <ul className="space-y-2">
      <li className="p-2 border rounded">WD-40 | Score: 58</li>
      <li className="p-2 border rounded">Acetone | Score: 35</li>
      <li className="p-2 border rounded">BioSolv Cleaner | Score: 90</li>
    </ul>
  </div>
);

const Profile = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">My Profile</h1>
    <p>Status: Free User</p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Upgrade to Pro</button>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/alternatives" element={<Alternatives />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <nav className="fixed bottom-0 w-full flex justify-around bg-white border-t py-2 shadow-md">
          <NavLink to="/" className="flex flex-col items-center text-sm">
            <FaHome size={20} /> Home
          </NavLink>
          <NavLink to="/upload" className="flex flex-col items-center text-sm">
            <FaUpload size={20} /> Upload
          </NavLink>
          <NavLink to="/alternatives" className="flex flex-col items-center text-sm">
            <FaExchangeAlt size={20} /> Swap
          </NavLink>
          <NavLink to="/history" className="flex flex-col items-center text-sm">
            <FaHistory size={20} /> History
          </NavLink>
          <NavLink to="/profile" className="flex flex-col items-center text-sm">
            <FaUser size={20} /> Profile
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}
