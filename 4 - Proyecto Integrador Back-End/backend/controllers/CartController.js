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

const addProductToCart = async (req, res) => {
  const newProductInCart = new cart({
    id: req.body.id,
    imageUrl: req.body.imageUrl,
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  try {
    const productInCart = await newProductInCart.save();
    res.status(201).json(productInCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  addProductToCart,
  deleteProductInCart,
  deleteAllProductsInCart,
};
