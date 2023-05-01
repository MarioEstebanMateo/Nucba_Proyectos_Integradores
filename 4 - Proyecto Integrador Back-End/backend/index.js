require("dotenv").config();
const express = require("express");
const dbConnection = require("./database/db.js");
const cors = require("cors");
const routesProducts = require("./routes/routesProducts.js");
const routesCart = require("./routes/routesCart.js");

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routesProducts);
app.use("/api", routesCart);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

dbConnection();
