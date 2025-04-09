
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ EcoRank CSP-safe main.js executed");
  const root = document.getElementById("root");
  if (root) {
    const wrapper = document.createElement("div");
    wrapper.style = "font-family: sans-serif; padding: 2rem; text-align: center;";
    wrapper.innerHTML = `
      <h1 style='font-size: 2rem; color: green;'>🌱 EcoRank is Running (Safe Build)</h1>
      <p>This version is compliant with Firebase's Content Security Policy.</p>
    `;
    root.innerHTML = "";
    root.appendChild(wrapper);
  }
});
