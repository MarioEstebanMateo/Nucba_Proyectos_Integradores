import React from "react";
import axios from "axios";
import swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = React.useState([]);

  const getCart = async () => {
    try {
      const cart = await axios.get(
        "https://643a093390cd4ba563f1ef3d.mockapi.io/cart"
      );
      setCart(cart.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCart();
  }, []);

  const deleteFromCart = async (id) => {
    try {
      swal2
        .fire({
          title: "Esta seguro?",
          text: "No podra recuperar el producto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, eliminarlo!",
          cancelButtonText: "No, cancelar!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(
              `https://643a093390cd4ba563f1ef3d.mockapi.io/cart/${id}`
            );
            getCart();
            swal2.fire("Su producto ha sido eliminado!", "", "success");
          } else if (result.dismiss === swal2.DismissReason.cancel) {
            swal2.fire("Cancelado", "Su producto esta a salvo :)", "error");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllFromCart = async () => {
    const cartLength = cart.length;
    try {
      for (let i = 0; i < cartLength; i++) {
        await axios.delete(
          `https://643a093390cd4ba563f1ef3d.mockapi.io/cart/${cart[i].id}`
        );
      }
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      quantity = 1;
    }
    try {
      await axios.put(
        `https://643a093390cd4ba563f1ef3d.mockapi.io/cart/${id}`,
        {
          quantity: quantity,
        }
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = () => {
    if (cart.length === 0) {
      swal2.fire({
        title: "Su carrito esta vacio",
        text: "Por favor agregue algunos productos a su carrito",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      swal2
        .fire({
          title: "Compra Finalizada!",
          text: `Su compra se realizo con exito! Muchas gracias por confiar en nosotros! El Total a pagar es: $${cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )}`,
          icon: "success",
          confirmButtonText: "Ok",
        })
        .then(() => {
          deleteAllFromCart();
          navigate("/");
        });
    }
  };

  const emptyCart = () => {
    if (cart.length === 0) {
      swal2.fire({
        title: "Su carrito esta vacio",
        text: "Por favor agregue algunos productos a su carrito",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      swal2
        .fire({
          title: "Esta seguro?",
          text: "No podra recuperar los productos!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, vaciarlo",
          cancelButtonText: "No, cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            deleteAllFromCart();
            swal2.fire("Su carrito ha sido vaciado!", "", "success");
          } else if (result.dismiss === swal2.DismissReason.cancel) {
            swal2.fire("Cancelado", "Su carrito esta a salvo :)", "error");
          }
        });
    }
  };

  const continueShopping = () => {
    navigate("/");
  };

  return (
    <div className="cart-page">
      <h1 className="mt-2">Cart</h1>
      <table className="table table-hover table-bordered mt-3">
        <thead className="tableHead">
          <tr>
            <th scope="col"></th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Subtotal</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  className="imgTable"
                  src={item.imageUrl}
                  alt={item.title}
                />
              </td>
              <td>{item.title}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
              </td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteFromCart(item.id)}
                >
                  Borrar <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>
          Total: $
          {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        </h3>
        <div className="totalButtons">
          <button className="btn btn-primary" onClick={checkout}>
            Finalizar Compra
          </button>
          <button className="btn btn-danger" onClick={emptyCart}>
            Vaciar Carrito
          </button>
          <button className="btn btn-success" onClick={continueShopping}>
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
