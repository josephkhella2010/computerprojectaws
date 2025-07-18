const express = require("express");
const router = express.Router();
const { findAll } = require("../awsDynamoDBFunctions/DynamoDBFunction");
router.get("/api/products", async (req, res) => {
  try {
    const products = await findAll();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error: "error with get product request" });
  }
});

module.exports = router;
