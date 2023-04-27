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
          title: "Are you sure?",
          text: "You will delete this item from your cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(
              `https://643a093390cd4ba563f1ef3d.mockapi.io/cart/${id}`
            );
            getCart();
            swal2.fire("Deleted!", "Your item has been deleted.", "success");
          } else if (result.dismiss === swal2.DismissReason.cancel) {
            swal2.fire("Cancelled", "Your item is safe :)", "error");
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
        title: "Your cart is empty",
        text: "Please add some items to your cart",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      swal2
        .fire({
          title: "Checkout",
          text: `Your total is $${cart.reduce(
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
        title: "Your cart is empty",
        text: "Please add some items to your cart",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      swal2
        .fire({
          title: "Are you sure?",
          text: "You will empty your cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, empty it!",
          cancelButtonText: "No, keep it",
        })
        .then((result) => {
          if (result.isConfirmed) {
            deleteAllFromCart();
            swal2.fire("Deleted!", "Your cart has been emptied.", "success");
          } else if (result.dismiss === swal2.DismissReason.cancel) {
            swal2.fire("Cancelled", "Your cart is safe :)", "error");
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
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
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
                  Delete <i className="fas fa-trash-alt"></i>
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
            Checkout
          </button>
          <button className="btn btn-danger" onClick={emptyCart}>
            Empty Cart
          </button>
          <button className="btn btn-success" onClick={continueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
