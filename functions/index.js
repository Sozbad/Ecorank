
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getProductAlternatives = functions.https.onRequest(async (req, res) => {
  const query = req.query.query?.toLowerCase();
  if (!query) return res.status(400).json({ error: "Missing query." });

  const exampleResults = {
    "acetone": {
      name: "EcoSolv Bio Cleaner",
      score: 92,
      reasons: [
        "Higher biodegradability",
        "Non-flammable",
        "Less harmful to skin/eyes",
        "Not classified as carcinogenic"
      ]
    },
    "wd-40": {
      name: "GreenLube Plant-Based Spray",
      score: 88,
      reasons: [
        "Derived from renewable resources",
        "Zero VOCs",
        "Better indoor air quality rating"
      ]
    }
  };

  const result = exampleResults[query];
  if (!result) {
    return res.status(404).json({ error: "No alternative found for this product." });
  }

  return res.json(result);
});
