const cart = require("../models/CartModel.js");

const getAllProductsInCart = async (req, res) => {
  try {
    const allProductsInCart = await cart.find({});
    res.json(allProductsInCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductInCartById = async (req, res) => {
  try {
    const productInCart = await cart.findById(req.params.id);
    res.json(productInCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const productInCart = await cart.findByIdAndDelete(req.params.id);
    res.json(productInCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllProductsInCart = async (req, res) => {
  try {
    const allProductsInCart = await cart.deleteMany({});
    res.json(allProductsInCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProductsInCart,
  getProductInCartById,
  deleteProductInCart,
  deleteAllProductsInCart,
};
