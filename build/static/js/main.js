document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style='font-family: sans-serif; padding: 2rem; text-align: center;'>
        <h1 style='font-size: 2rem;'>🎉 EcoRank is Live</h1>
        <p>You're now seeing a real working build, deployed from Firebase.</p>
        <p>Next step: hook up database + dynamic search!</p>
      </div>`;
  }
});