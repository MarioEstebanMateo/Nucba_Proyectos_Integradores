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

  const addToCart = async () => {
    try {
      const cart = await axios.get(
        "https://643a093390cd4ba563f1ef3d.mockapi.io/cart"
      );
      const productInCart = cart.data.find(
        (product) => product.productId === params.id
      );
      if (productInCart) {
        swal2
          .fire({
            icon: "error",
            title: "Oops...",
            text: "El producto ya esta en el carrito!",
          })
          .then(() => {
            navigate("/");
          });
      } else {
        if (quantity < 1) {
          swal2
            .fire({
              icon: "error",
              title: "Oops...",
              text: "La cantidad no puede ser menor a 1!",
            })
            .then(() => {
              setQuantity(1);
            });
          return;
        }
        if (quantity > 50) {
          swal2.fire({
            icon: "error",
            title: "Oops...",
            text: "La cantidad no puede ser mayor a 50!",
          });
          return;
        }
        await axios.post("https://643a093390cd4ba563f1ef3d.mockapi.io/cart", {
          productId: params.id,
          imageUrl: product.imageUrl,
          title: product.title,
          quantity: quantity,
          price: product.price,
        });
        const { isConfirmed } = await swal2.fire({
          icon: "success",
          title: "Producto agregado al carrito!",
          showCancelButton: true,
          confirmButtonText: "Ir al carrito",
          cancelButtonText: "Continuar comprando",
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
        <p className="product-page__info__description">{product.description}</p>
        <p className="product-page__price">Precio: ${product.price}</p>
        <div className="product-page__quantity">
          <label htmlFor="quantity">Cantidad</label>
          <input
            className="mx-2"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="50"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button
          className="product-page__button btn btn-primary mt-3"
          onClick={addToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
