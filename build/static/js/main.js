document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ EcoRank main.js executed.");
  const root = document.getElementById("root");
  root.innerHTML = `
    <div style='text-align: center; margin-top: 3rem; font-family: sans-serif;'>
      <h1 style='font-size: 2rem; color: green;'>✅ EcoRank is LIVE</h1>
      <p style='font-size: 1rem;'>This is a working build, deployed successfully.</p>
      <p>JS executed and DOM updated!</p>
    </div>
  `;
});
