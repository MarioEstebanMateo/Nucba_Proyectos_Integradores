import React from "react";
import axios from "axios";
import swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./ProductPage.css";

const ProductPage = () => {
  const [product, setProduct] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const product = await axios.get(
        `https://643a093390cd4ba563f1ef3d.mockapi.io/products/${params.id}`
      );
      setProduct(product.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  // Add to cart function and check if the product is already in the cart

  const addToCart = async () => {
    try {
      const cart = await axios.get(
        "https://643a093390cd4ba563f1ef3d.mockapi.io/cart"
      );
      const productInCart = cart.data.find((item) => item.id === product.id);
      if (productInCart) {
        swal2.fire({
          icon: "error",
          title: "Oops...",
          text: "Product already in cart!",
        });
      } else {
        await axios.post("https://643a093390cd4ba563f1ef3d.mockapi.io/cart", {
          ...product,
          quantity: quantity,
        });
        // go to cart page or continue shopping
        const { isConfirmed } = await swal2.fire({
          icon: "success",
          title: "Product added to cart!",
          showCancelButton: true,
          confirmButtonText: "Go to cart",
          cancelButtonText: "Continue shopping",
        });
        if (isConfirmed) {
          navigate("/cart");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-page">
      <div className="product-page__image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="product-page__info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p className="product-page__price">Price: ${product.price}</p>
        <div className="product-page__quantity">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button className="product-page__button" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
