const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const getProducts = require("./ApiRouter/ProductsApi");
app.use(getProducts);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
