const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const getProducts = require("./ApiRouter/ProductsApi");
const getComputerData = require("./ApiRouter/GetComputerData");
const getSingleComputerData = require("./ApiRouter/GetSingleComputerData");

app.use(getProducts);
app.use(getComputerData);
app.use(getSingleComputerData);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
