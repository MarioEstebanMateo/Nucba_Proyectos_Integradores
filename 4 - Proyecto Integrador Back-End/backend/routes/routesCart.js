const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/CartController.js");

router.get("/cart", cartControllers.getAllProductsInCart);
router.get("/cart/:id", cartControllers.getProductInCartById);
router.post("/cart/", cartControllers.addProductToCart);
router.delete("/cart/:id", cartControllers.deleteProductInCart);
router.delete("/cart/", cartControllers.deleteAllProductsInCart);

module.exports = router;
