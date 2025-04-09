document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <section style='text-align:center;padding:2rem;font-family:sans-serif'>
        <h1 style='color:green;'>✅ EcoRank is LIVE</h1>
        <p>Your CSP-safe deploy is now working!</p>
      </section>
    `;
  }
});